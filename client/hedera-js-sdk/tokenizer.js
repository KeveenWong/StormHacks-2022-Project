console.clear();
require("dotenv").config();
const {
	AccountId,
	PrivateKey,
	Client,
	AccountCreateTransaction,
	TokenCreateTransaction,
	TokenType,
	TokenSupplyType,
	TokenMintTransaction,
	TransferTransaction,
	AccountBalanceQuery,
	TokenAssociateTransaction,
	Hbar,
} = require("@hashgraph/sdk");

/*********************************************************************************************/
/*
	Configuring account IDs, needed keys, and the client.
*/
/*********************************************************************************************/
const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
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

async function main() {
	
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
	CID = ["QmU36R6QsPrQvKDpdij8C7dxisSMmesqdmDmjo3wa2ZCUV"];
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
}
main();