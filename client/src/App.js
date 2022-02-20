import BodyComponent from './components/BodyComponent';
import Articles from './components/Articles';
import { useEffect , useState } from 'react';
import axios from 'axios';
import { Alert, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Client , PrivateKey , AccountCreateTransaction, AccountBalanceQuery , Hbar , TransferTransaction } from '@hashgraph/sdk';


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
    reward();
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
