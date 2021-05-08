import React from 'react'
import Web3 from 'web3'
import NFTJSON from '../abis/NFT.json'

let contract;

const initializeWeb3 = () => {
    var web3;
    if (window.ethereum) {
        // initialize web3
        web3 = new Web3(window.ethereum);
    }
    else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
        alert('You have to install MetaMask !');
    }
    console.log(web3)

    return web3
}

const web3 = initializeWeb3()


const getCurrentAddressMetamask = async () => {

    const { eth } = web3
    let accounts = await eth.getAccounts();
    return accounts[0]
}

const getContract = async () => {
    const { eth } = web3
    const { abi, networks } = NFTJSON
    const networkIds = Object.keys(networks)
    const address = networks[networkIds[0]].address
    const contract = new eth.Contract(abi, address)
    return contract;
} 

const createToken = async (ownerAddress) => {
   

    // initialize the contract 
    let contract = await getContract();
    await contract.methods.createNFT(ownerAddress,"http://localhost:5000/").send({from:window.web3.currentProvider.selectedAddress})
}

const getBalance = async (ownerAddress) => {
    try {
        let contract = await getContract();
        let balance = await contract.methods.balanceOf(ownerAddress).call({})
        return balance;
    } catch(e) {
        alert("Please remove the abi's and redeploy contracts")
    }
}

const getTokenURI = async (tokenId) => {
    let contract = await getContract();
    let tokenURI = await contract.methods.tokenURI(tokenId).call({})
    console.log(tokenURI)
    return tokenURI;
}

export { createToken, getCurrentAddressMetamask, getBalance, getTokenURI }
