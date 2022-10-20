import { NavLink } from "react-router-dom";
import Web3Context from "../contexts/Web3Context";
import { useContext } from "react";
import AlphaBanner from "./AlphaBanner";

export default function Navbar() {
  const { networkID, account, shortAccount, connect } = useContext(Web3Context);

  return (
    <>
      <AlphaBanner />
      <nav className="sticky top-8 navbar bg-base-100 bg-opacity-60 backdrop-blur-md w-full justify-center pl-0  mx-auto py-3 border-b-2 border-b-base-100 ">
        <div className="navbar-start justify-start ">
          <div className="select-none bg-white ml-10 rounded-full bg-opacity-60">
            <NavLink to="/">
              <h1 className=" px-8 text-slate-500 text-3xl font-mono font-bold">
                Uni
                <span className=" inline-block first-letter:text-secondary">
                  Link
                </span>
              </h1>
            </NavLink>
          </div>
        </div>
        <div className="navbar-center hidden md:flex mx-10 ">
          <ul className="menu menu-horizontal p-0 font-semibold space-x-8 ">
            <li className="hover:text-primary">
              <NavLink to="/Mint">publish</NavLink>
            </li>
            <li className="hover:text-primary">
              <NavLink to="/verify">verify NFT</NavLink>
            </li>
            <li className="hover:text-primary">
              <NavLink to="/signup">register</NavLink>
            </li>
          </ul>
        </div>
        <div className="md:navbar-end">
          {!account ? (
            <button
              className=" transition-all duration-200 mx-auto btn btn-md btn-primary font-bold normal-case btn-outline rounded-xl hover:scale-110 hover:translate-y-1 hover:text-white"
              onClick={connect}
            >
              connect Wallet
            </button>
          ) : (
            <a
              href={`http://polygonscan.com/address/${account}`}
              className="btn btn-secondary btn-outline cursor-pointer mx-auto"
            >
              {shortAccount}
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
