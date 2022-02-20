import BodyComponent from './components/BodyComponent';
import Articles from './components/Articles';
import { useEffect , useState } from 'react';
import axios from 'axios';
import { Alert, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {AccountId , TokenCreateTransaction , TokenSupplyType, Client , PrivateKey , AccountCreateTransaction, AccountBalanceQuery , Hbar , TransferTransaction , TokenType, TokenMintTransaction, TokenAssociateTransaction } from '@hashgraph/sdk';


async function reward() {

  // Grab your Hedera testnet account ID and private key from your .env file
  const opAccountId = process.env.REACT_APP_MY_ACCOUNT_ID;
  const opPrivateKey = process.env.REACT_APP_MY_PRIVATE_KEY;

  // If we weren't able to grab it, we should throw a new error
  if (opAccountId == null ||
      opPrivateKey == null ) {
      throw new Error("Environment variables opAccountId and opPrivateKey must be present");
  }

  console.log("Operator's Account ID and Private Key retrieved.");
  
  // Create our connection to the Hedera network
  // The Hedera JS SDK makes this really easy!
  const client = Client.forTestnet();

  client.setOperator(opAccountId, opPrivateKey);


  /****************************************************************************************************/
  /*
      For NEW reader, they earn hbar for correctly answering questions.
      2000 tinybar upon first ever full and correct completion. 
  */
  /****************************************************************************************************/
  console.log("Rewarding NEW reader...");

  // Create new keys
  const newAccountPrivateKey = await PrivateKey.generateED25519(); 
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  // Create a new account with 2,000 tinybar starting balance
  const newAccountTransactionResponse = await new AccountCreateTransaction()
      .setKey(newAccountPublicKey)
      .setInitialBalance(Hbar.fromTinybars(2000))
      .execute(client);

  // Get the new account ID
  const getReceipt = await newAccountTransactionResponse.getReceipt(client);
  const newAccountId = getReceipt.accountId;

  console.log("The new account ID is: " +newAccountId);

  //Verify the account balance
  const accountBalance = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);

  console.log("The new account's balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");


  /****************************************************************************************************/
  /*
      For EXISTING reader, they earn hbar for correctly answering questions.
      500 tinybar for full and correct completion.
  */
  /****************************************************************************************************/
  console.log("Rewarding EXISTING reader...");


  /*
      Somewhere around here you can implement login credentials to verify existing user.
      Need existing user's Account ID as distributed by Hedera.
  */
  // Let's pretend we know the Account ID, replace later for true implementation
  var existAccountID = "0.0.30772856";

  // Transfer amount as variable for easy changes
  var transAmt = 500;

  //Create the transfer transaction
  var sendHbar = await new TransferTransaction()
      .addHbarTransfer(opAccountId, Hbar.fromTinybars(-transAmt))     // sending acct
      .addHbarTransfer(existAccountID, Hbar.fromTinybars(transAmt))     // receiving acct
      .execute(client);

  //Verify the transaction reached consensus
  var transactionReceipt = await sendHbar.getReceipt(client);
  console.log("The transfer transaction from op account to the existing account was: " + transactionReceipt.status.toString());

  //Check the account's new balance
  var getNewBalance = await new AccountBalanceQuery()
      .setAccountId(existAccountID)
      .execute(client);

  console.log("The existing account's new balance after the transfer is: " +getNewBalance.hbars.toTinybars() +" tinybar.")

  alert("The transfer transaction from op account to the existing account was: " + transactionReceipt.status.toString() +  "\n" + "The existing account's new balance after the transfer is: " +getNewBalance.hbars.toTinybars() +" tinybar." );
}


async function createNFT() {
	
	/*********************************************************************************************/
	/*
		So here is where we make a fake account to receive a brand new NFT.
		In practice, you would want to get user credentials and verify the account,
		then verify whether the reader has completed their weekly reading streak,
		THEN you would make an NFT and transfer to their account.
		In this demo, Alice has completed her reading streak and is rewarded a Cherry Fruit NFT. 
	*/
	/*********************************************************************************************/
	// Create a new account with 0 starting balance

	const operatorId = AccountId.fromString(process.env.REACT_APP_MY_ACCOUNT_ID);
		const operatorKey = PrivateKey.fromString(process.env.REACT_APP_MY_PRIVATE_KEY);
		console.log("Generated operatorKey as " + operatorKey);

		const treasuryId = operatorId;
		const treasuryKey = operatorKey;
		console.log("Generated treasuryKey as " + treasuryKey);

		// aliceId will be created in main() thru legit account creation
		// makes use of AccountCreateTransaction
		const aliceKey = PrivateKey.generateED25519();
		console.log("Generated aliceKey as " + aliceKey);

		const supplyKey = PrivateKey.generate();
		console.log("Generated supplyKey as " + supplyKey);

		const client = Client.forTestnet().setOperator(operatorId, operatorKey);
	const newAccountTransactionResponse = await new AccountCreateTransaction()
		.setKey(aliceKey)
		.setInitialBalance(0)
		.execute(client);

	// Get the new account ID
	const getReceipt = await newAccountTransactionResponse.getReceipt(client);
	const aliceId = getReceipt.accountId;

	console.log("The aliceId is: " +aliceId);

	//Verify the account balance
	const accountBalance = await new AccountBalanceQuery()
		.setAccountId(aliceId)
		.execute(client);

	console.log("The aliceId account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");
	
	/*********************************************************************************************/
	/*
		END OF FAKE ALICE ACCOUNT CREATION
	*/
	/*********************************************************************************************/
	
	//Create the NFT
    console.log("Attempting to create NFT...");
	let nftCreate = await new TokenCreateTransaction()
		.setTokenName("Cherry Fruit")
		.setTokenSymbol("CHERRY")
		.setTokenType(TokenType.NonFungibleUnique)
		.setDecimals(0)
		.setInitialSupply(0)
		.setTreasuryAccountId(treasuryId)
		.setSupplyType(TokenSupplyType.Finite)
		.setMaxSupply(250)
		.setSupplyKey(supplyKey)
		.freezeWith(client);

	//Sign the transaction with the treasury key
    console.log("Attempting to sign transaction with treasury key...");
	let nftCreateTxSign = await nftCreate.sign(treasuryKey);

	//Submit the transaction to a Hedera network
    console.log("Attempting to submit transaction to Hedera network...");
	let nftCreateSubmit = await nftCreateTxSign.execute(client);

	//Get the transaction receipt
    console.log("Attempting to get transaction receipt...");
	let nftCreateRx = await nftCreateSubmit.getReceipt(client);

	//Get the token ID
	let tokenId = nftCreateRx.tokenId;

	//Log the token ID
	console.log(`- Created NFT with Token ID: ${tokenId} \n`);

	//IPFS content identifiers for which we will create a NFT
	// it's a cherry, precede this with https://ipfs.io/ipfs/ to see the image for yourself
	var CID = ["QmU36R6QsPrQvKDpdij8C7dxisSMmesqdmDmjo3wa2ZCUV"];
	// this is a bunch of grapes
	//CID = ["QmW45vACEx71Vssxaags9Ter1UNXLwpBmKSCfyQykwZMk1"];
	// this one is a mandarin
	//CID = ["QmSy9J8GR8XpDgG3vjaZNKqnHGHDvUzwcX2icuaXfmKLzo"];

	// Mint new NFT (type is based on CID above)
	let mintTx = await new TokenMintTransaction()
		.setTokenId(tokenId)
		.setMetadata([Buffer.from(CID)])
		.freezeWith(client);

	//Sign the transaction with the supply key
	let mintTxSign = await mintTx.sign(supplyKey);

	//Submit the transaction to a Hedera network
	let mintTxSubmit = await mintTxSign.execute(client);

	//Get the transaction receipt
	let mintRx = await mintTxSubmit.getReceipt(client);

	//Log the serial number
	console.log(`- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`);
	
	//Create the associate transaction and sign with Alice's key 
	let associateAliceTx = await new TokenAssociateTransaction()
		.setAccountId(aliceId)
		.setTokenIds([tokenId])
		.freezeWith(client)
		.sign(aliceKey);

	//Submit the transaction to a Hedera network
	let associateAliceTxSubmit = await associateAliceTx.execute(client);

	//Get the transaction receipt
	let associateAliceRx = await associateAliceTxSubmit.getReceipt(client);

	//Confirm the transaction was successful
	console.log(`- NFT association with Alice's account: ${associateAliceRx.status}\n`);


	// Check the balance before the transfer for the treasury account
	var balanceCheckTx = await new AccountBalanceQuery().setAccountId(treasuryId).execute(client);
	console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

	// Check the balance before the transfer for Alice's account
	var balanceCheckTx = await new AccountBalanceQuery().setAccountId(aliceId).execute(client);
	console.log(`- Alice's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

	// Transfer the NFT from treasury to Alice
	// Sign with the treasury key to authorize the transfer
	let tokenTransferTx = await new TransferTransaction()
		.addNftTransfer(tokenId, 1, treasuryId, aliceId)
		.freezeWith(client)
		.sign(treasuryKey);

	let tokenTransferSubmit = await tokenTransferTx.execute(client);
	let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);

	console.log(`\n- NFT transfer from Treasury to Alice: ${tokenTransferRx.status} \n`);

	// Check the balance of the treasury account after the transfer
	var balanceCheckTx = await new AccountBalanceQuery().setAccountId(treasuryId).execute(client);
	console.log(`- Treasury balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);

	// Check the balance of Alice's account after the transfer
	var balanceCheckTx = await new AccountBalanceQuery().setAccountId(aliceId).execute(client);
	console.log(`- Alice's balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} NFTs of ID ${tokenId}`);
  alert("Your gift NFT creation and transfer is complete! Take a look at https://ipfs.io/ipfs/" +CID[0]);
}
function createArticle(prop) {
  return <Articles 
    title={prop.title}
    img = {prop.img}
    img_caption = {prop.img_caption}
    body = {prop.body} />
}
function App() {

  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  function inc() {
    setCount(count + 1);
    if(count%7 === 0) {
    createNFT();
    } else {
      reward();
    }
  }

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    fetch("/streak")
    .then((res) => res.json())
    .then((count) => setCount(count));
  }, []);


  return (
    <div className="App">
    <Typography fontFamily="'Bebas Neue', cursive" align = "center" variant="h1" color="white">Smarticle</Typography>
    <Typography variant="h4" component="h2" color="white" gutterBottom ={true} align = "center">Streak Count : {count}</Typography>
    {!data ? "" : data.map(createArticle)}
    <Typography variant="h4" component="h2" color="white" gutterBottom ={true} align = "center">Did you read the articles?</Typography>
    <div className='button'><Button variant="contained" size="large" onClick={inc}>
          I absolutely did
        </Button></div>
    </div>
  );
}

export default App;
