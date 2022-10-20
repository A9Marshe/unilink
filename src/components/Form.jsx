import React, { useState, useEffect } from "react";
import Web3Context from "../contexts/Web3Context";
import { useContext } from "react";
import { useRef } from "react";

const Form = (props) => {
  const { web3Instance, account, PoulationContract } = useContext(Web3Context);
  const [hasSignedUp, sethasSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    number: "",
    personalID: "",
  });
  const [hashSet, setHashSet] = useState({ currentHash: "", eternalHash: "" });

  const localHash = useRef();
  const [verifiedHash, setverifiedHash] = useState(false);
  function gethash() {
    let s =
      formData.firstName +
      formData.lastName +
      formData.address +
      formData.email +
      formData.number +
      formData.personalID;
    localHash.current = web3Instance.utils.soliditySha3(s);
    return localHash.current;
  }
  useEffect(() => {
    setHashSet({
      ...hashSet,
      currentHash: gethash(),
    });

    if (localHash.current == props.personhash) setverifiedHash(true);
    else setverifiedHash(false);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let infoHash = gethash();
    console.log(formData + "the hash is=" + infoHash);

    PoulationContract.methods
      .newPerson(localHash.current)
      .send({ from: account, gas: "4700000" }, (err, transactionHash) => {
        console.log("Transaction Hash :", transactionHash);
      })
      .then(function (err, res) {
        console.log("sign up success");
        sethasSignedUp(true);
      });
  };
  return hasSignedUp ? (
    <div className="alert alert-success bg-secondary shadow-lg  mx-auto flex flex-col w-3/5 rounded-full pt-2">
      <div className="text-white mx-auto ">Sign up success!</div>
      <div className="text-white mx-auto text-sm font-bold">
        ✔ you have successfully registered a UniLink account
      </div>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="form-control  h-auto  py-10 items-center space-y-5 flex flex-col  bg-secondary rounded-3xl min-w-max mx-20 "
    >
      <h1 className="text-3xl text-white font-semibold text-center pb-10">
        {props.title}
      </h1>
      <input
        type="text"
        placeholder="First Name"
        id="firstName"
        className="input input-bordered input-primary text-gray-800  w-full max-w-xs"
        onChange={(e) => {
          setFormData({ ...formData, firstName: e.target.value });
        }}
        value={formData.firstName}
      />
      <input
        type="text"
        placeholder="Last Name"
        id="lastName"
        className="input input-bordered input-primary text-gray-800 w-full max-w-xs"
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="email address"
        id="email"
        className="input input-bordered input-primary text-gray-800 w-full max-w-xs"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="address"
        placeholder="home address"
        id="address"
        className="input input-bordered input-primary text-gray-800 w-full max-w-xs"
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <input
        type="number"
        placeholder="phone number"
        id="number"
        className="input input-bordered input-primary text-gray-800 w-full max-w-xs"
        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
      />
      <input
        type="text"
        placeholder="Personal ID"
        id="personalID"
        className="input input-bordered input-primary text-gray-800 w-full max-w-xs"
        onChange={(e) =>
          setFormData({ ...formData, personalID: e.target.value })
        }
      />
      {props.isHash === "true" ? (
        <textarea
          readOnly
          className={`textarea textarea-primary text-gray-800  ${
            verifiedHash
              ? "border-[10px] border-emerald-400"
              : " border-4 border-red-800"
          }`}
          name="hash"
          id=""
          cols="30"
          rows="3"
          value={props.personhash}
        ></textarea>
      ) : (
        <button className="btn btn-primary" type="submit">
          sign up
        </button>
      )}
    </form>
  );
};

export default Form;
