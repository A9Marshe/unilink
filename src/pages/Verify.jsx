import React, { useState, useRef } from "react";
import NFTcert from "../components/NFTcert";
import Form from "../components/Form";
import Web3Context from "../contexts/Web3Context";
import { useContext } from "react";

const Verify = () => {
  const [tokenID, setTokenID] = useState("");
  const [accountAvailable, setAccountAvailable] = useState(false);
  const [tokenURI, settokenURI] = useState("");

  const tokenOwner = useRef("");
  const ID = useRef(-1);
  const [personHash, setpersonHash] = useState("0x000");

  const {
    web3Instance,
    getDean,
    GradCertContract,
    account,
    PoulationContract,
  } = useContext(Web3Context);

  const gethash = () => {
    getID().then(() => {
      getPerson();
    });
  };

  async function getTokenURI() {
    console.log("1-- getting token URI");
    const token = await GradCertContract.methods
      .tokenURI(tokenID)
      .call({ from: account })
      .then(function (result) {
        console.log("token URI is: ", result);
        settokenURI("https://" + result.substring(7) + ".ipfs.dweb.link");
        setAccountAvailable(true);
        getTokenOwner();
      });
  }

  async function getTokenOwner() {
    console.log("2-- getting token owner");
    GradCertContract.methods
      .ownerOf(tokenID)
      .call({ from: account })
      .then(function (res) {
        console.log("got the owner!: ", res);
        tokenOwner.current = res;
        getID();
      });
  }

  async function getID() {
    console.log("3-- getting ID from address");
    PoulationContract.methods
      .address2ID(tokenOwner.current)
      .call({ from: account })
      .then(function (result) {
        console.log("account: " + account + "\n ID: " + result);
        ID.current = result;
        getPerson();
      });
  }

  async function getPerson() {
    console.log("4-- getting person");

    PoulationContract.methods
      .ID2person(ID.current)
      .call({ from: account })
      .then(function (result) {
        console.log("got the person hash: " + String(result[2]));

        setpersonHash(result[2]);
      });
  }

  async function getEverything() {
    const tokenURI = await getTokenURI();
    const tokenowner = await getTokenOwner();
    const id = await getID();
    const personHasha = await getPerson();
  }
  return !accountAvailable ? (
    <div className="flex flex-col items-center justify-evenly text-center h-2/3 font-medium text-neutral ">
      <p>
        you can search for a graduation NFT certificate
        <br />
        use the token ID provided by the student
      </p>
      <input
        type="text"
        className="input input-neutral input-bordered w-1/3  focus:input-primary  text-gray-800"
        onChange={(e) => {
          setTokenID(e.target.value);
        }}
        value={tokenID}
      />
      <button
        className="btn btn-lg btn-primary"
        onClick={() => {
          getTokenURI();
        }}
      >
        🔎 search
      </button>
    </div>
  ) : (
    <div className="flex flex-row items-center justify-evenly">
      <div className="w-2/4">
        <Form
          title="verify personal hash over here"
          isHash="true"
          personhash={personHash}
        />
      </div>
      <div className="w-1/3">
        <NFTcert tokenURI={tokenURI} />
      </div>
    </div>
  );
};

export default Verify;
