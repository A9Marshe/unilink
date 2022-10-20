import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import Web3Context from "../contexts/Web3Context";
import { useContext } from "react";
const NFT_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJlZDc4OTBmMjE3MTBEMUI4MzZFYThlMzM2MDFiMzdhN2JkMzJlYjIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTc2NTY1Mzc3MCwibmFtZSI6Imx5bngifQ.3_h9OYYOVTYUsr2nXNSgQrpXwOVexAVMnDsFRQDiq5M";

const Mint = () => {
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const { web3Instance, getDean, Collegecontract, account, PoulationContract } =
    useContext(Web3Context);

  const [selectedFile, setselectedFile] = useState();
  const [isFilePicked, setisFilePicked] = useState(false);
  const [contectCID, setcontectCID] = useState();
  const [studentAddress, setstudentAddress] = useState("");
  const [studentVerified, setstudentVerified] = useState(false);
  const [certID, setcertID] = useState(-1);

  const checkStudent = () => {
    PoulationContract.methods
      .address2ID(studentAddress)
      .call({ from: account })
      .then(function (result) {
        console.log("getting the ID of the student", result);
        result ? setstudentVerified(true) : console.log("no student found");
      });
  };

  const changeHandler = (event) => {
    setselectedFile(event.target.files[0]);
    setisFilePicked(true);
  };

  const handleUpload = () => {
    console.log("uploading");
    client.storeBlob(selectedFile).then((res) => {
      console.log("minted success,/n CID: " + res);
      setcontectCID(res);
    });
  };

  const mintToken = (e) => {
    e.preventDefault();
    console.log("minting token for person ID ", studentVerified);
    Collegecontract.methods
      .mintCert(studentAddress, contectCID)
      .send({ from: account }, (err, transactionHash) => {
        console.log("Transaction Hash :", transactionHash);
      })
      .on("confirmation", (tokenID) => {})
      .then(() => {
        console.log("mint success, " + certID);
      });
  };

  return (
    <>
      {account ? (
        <form className="form-control  w-1/3 h-auto  py-10 items-center space-y-5 flex flex-col  bg-secondary rounded-3xl min-w-max mx-auto ">
          <input
            type="text"
            placeholder="Student Public Address"
            id="studentaddress"
            className="input input-bordered input-primary text-gray-800  w-full max-w-xs"
            onChange={(e) => {
              setstudentAddress(e.target.value);
            }}
            value={studentAddress}
          />
          {studentVerified ? (
            <div className=" w-3/5 alert bg-blue-700  alert-sm text-sm text-white font-bold px-10 ">
              ✅ student verified
            </div>
          ) : (
            <input
              className="btn btn-primary"
              type="button"
              value="verify account"
              onClick={checkStudent}
            ></input>
          )}
          {isFilePicked ? (
            <div>
              {contectCID ? (
                <div className="alert bg-blue-700 px-4 alert-sm text-sm text-white font-bold  ">
                  ✅ uploaded at: &emsp; {contectCID}
                </div>
              ) : (
                <input
                  className="btn btn-primary"
                  type="button"
                  value="upload to IPFS"
                  onClick={handleUpload}
                ></input>
              )}
            </div>
          ) : (
            <input
              className="block mb-5  text-sm text-gray-900  rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400"
              id="file"
              type="file"
              name="file"
              onChange={changeHandler}
            ></input>
          )}
          <button
            className={`btn btn-primary   ${
              studentVerified && contectCID
                ? "text-white"
                : "select-disabled bg-warning text-gray-400"
            }`}
            type="submit"
            onClick={mintToken}
          >
            Publish Certificate
          </button>
        </form>
      ) : (
        <div className="modal-box relative bg-opacity-40 bg-gray-500 border-2 border-gray-800 backdrop-blur-lg  mx-auto text-center text-sm font-semibold max-w-xs">
          please connect to wallet
        </div>
      )}
    </>
  );
};

export default Mint;
