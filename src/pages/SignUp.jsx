import React from "react";
import Form from "../components/Form";
import Web3Context from "../contexts/Web3Context";
import { useContext } from "react";

function SignUp() {
  const { account } = useContext(Web3Context);
  return account ? (
    <div className=" w-2/4 mx-auto">
      <Form title="sign up" isHash="0" />
    </div>
  ) : (
    <div className="modal-box relative bg-opacity-40 bg-gray-500 border-2 border-gray-800 backdrop-blur-lg  mx-auto text-center text-sm font-semibold max-w-xs">
      please connect to wallet
    </div>
  );
}

export default SignUp;
