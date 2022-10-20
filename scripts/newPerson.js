let selectedAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

deployedpop.methods
  .newPerson(0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563)
  .send({ from: selectedAccount, gas: "4700000" }, (err, transactionHash) => {
    console.log(
      "Transaction Hash SIGN UP SUSCHSUCSUCUSUCUSCUS :",
      transactionHash
    );
  });
