import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
// import Web3Connector, { init } from "./contexts/Web3Client";
import Form from "./components/Form";
import { Web3Provider } from "./contexts/Web3Context";
import SignUp from "./pages/SignUp";
import Mint from "./pages/Mint";

const App = () => {
  return (
    <Web3Provider>
      <div data-theme="winter">
        <Navbar />
        <div className="w-full mx-auto text-3xl py-20 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white h-screen">
          <Routes>
            <Route path="/" element={<Verify />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Web3Provider>
  );
};

export default App;
