import "./App.css";
import contractABI from "./abi.json";
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const { BrowserProvider, Contract } = ethers;
  const [age, setAge] = useState("");
  const [name, setName] = useState("");

  const contractAddress = "0x8a412fDC9c3CC998AB4bc38592c7445021934F2C";

  //This function is used to get access to the user's ethereum account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function updateAge() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      try {
        const transaction = await contract.updateAge(age);
        await transaction.wait();
        console.log("Message sent");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function updateName() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      try {
        const transaction = await contract.updateName(name);
        await transaction.wait();
        console.log("Message sent");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function getEntityDetails() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      try {
        const transaction = await contract.getEntityDetails();
        console.log(transaction);
        // await transaction.wait();
        console.log("Message retrieved");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    //inline css styling
    <div className="App">
      <div className="container mx-auto bg-green-100 p-8 bg-red border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold ">Register 🖋️</h1>
        <div className="w-[467px] m-auto">
          <input
            type="text"
            // value={entityName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="appearance-none block mt-4 w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 relative"
            style={{ paddingTop: "1rem" }} // Adjust the value to vertically center the placeholder
          />
          <button
            onClick={() => {
              updateName();
            }}
          >
            Update Name
          </button>
        </div>
        <div className="w-[467px] m-auto">
          <input
            type="text"
            // value={entityAge}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age.."
            className="appearance-none block mt-4 w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 relative"
            style={{ paddingTop: "1rem" }} // Adjust the value to vertically center the placeholder
          />
          <button
            onClick={() => {
              updateAge();
            }}
          >
            Update Age
          </button>
        </div>
        <button
          onClick={getEntityDetails}
          class="bg-green-500 hover:bg-blue-400 text-white mr-5 ml-5 font-bold py-2 mt-5 px-4 rounded"
        >
          Get Detail
        </button>
      </div>
    </div>
  );
}

export default App;
