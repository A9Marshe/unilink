import { createContext, useState, useEffect } from "react";
import Web3 from "web3/dist/web3.min.js";
import collegeContract from "../college.json";
const Web3Context = createContext();

let Collegeabi = [
  {
    inputs: [{ internalType: "address", name: "_dean", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "dean",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gradCertifcationTokenAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_student", type: "address" },
      { internalType: "string", name: "URI", type: "string" },
    ],
    name: "mintCert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "populationContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_GCT", type: "address" }],
    name: "setGradCertifcationTokenAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_populationContract", type: "address" },
    ],
    name: "setPopulationContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
let Populationabi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "newPerson",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "newHash",
        type: "bytes32",
      },
    ],
    name: "setInfoValidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes1",
        name: "_secPrev",
        type: "bytes1",
      },
      {
        internalType: "address",
        name: "_personAddress",
        type: "address",
      },
    ],
    name: "SetSecurityPrivileges",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_college",
        type: "address",
      },
      {
        internalType: "address",
        name: "deanAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "address2ID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_minter",
        type: "address",
      },
    ],
    name: "canMint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "college",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dean",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSecurityPrivileges",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ID2person",
    outputs: [
      {
        internalType: "bytes1",
        name: "securityPrev",
        type: "bytes1",
      },
      {
        internalType: "address",
        name: "backupAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "infoValidation",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "securityGlossary",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let GradCertabi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export function Web3Provider({ children }) {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [networkID, setNetworkID] = useState("");
  const [isSignedUP, setisSignedUP] = useState(false);
  let shortAccount = shorten(selectedAccount);

  useEffect(() => {
    let shortAccount = selectedAccount.slice(0, 6);
    shortAccount += "....";
    shortAccount += selectedAccount.slice(40, 2);
  }, [selectedAccount]);

  async function getDean() {
    console.log("getting dean");
    return Collegecontract.methods
      .dean()
      .call({ from: selectedAccount })
      .then(function (result) {
        console.log(
          "dean address is: ",
          result,
          "\n called from: ",
          selectedAccount
        );
      });
  }

  function shorten(account) {
    let shortAccount = selectedAccount.slice(0, 4);
    shortAccount += " .... ";
    shortAccount += selectedAccount.substring(40);
    return shortAccount;
  }
  console.log("connecting");
  let provider = window.ethereum;
  const web3 = new Web3(provider);

  web3.eth.net.getId().then((Response) => {
    setNetworkID(Response);
  });
  const connectAccount = () => {
    if (typeof provider !== "undefined") {
      console.log("wallet detected");
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setSelectedAccount(accounts[0]);
          console.log(`Selected account changedto ${selectedAccount}`);
        })
        .catch((err) => {
          console.log(err);
        });

      window.ethereum.on("accountsChanged", function (accounts) {
        setSelectedAccount(accounts[0]);
        console.log(`Selected account changedto ${selectedAccount}`);
      });
    } else {
      console.log("wallet provider not found, please install metamask");
    }
  };

  //contracts
  const CollegeAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const PopulationAddress = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
  const GradCertAddress = "0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968";

  const GradCertContract = new web3.eth.Contract(GradCertabi, GradCertAddress);
  const PoulationContract = new web3.eth.Contract(
    Populationabi,
    PopulationAddress
  );
  const Collegecontract = new web3.eth.Contract(Collegeabi, CollegeAddress);
  return (
    <Web3Context.Provider
      value={{
        web3Instance: web3,
        connectAccount: Collegecontract,
        account: selectedAccount,
        shortAccount: shortAccount,
        connect: connectAccount,
        GradCertContract: GradCertContract,
        PoulationContract: PoulationContract,
        Collegecontract: Collegecontract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export default Web3Context;
