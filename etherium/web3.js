import Web3 from 'web3'
import env from './env.js'
let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider)
} else {
  // We are not in the browser or no metamask
  const provider = new Web3.providers.HttpProvider(env.address)
  web3 = new Web3(provider)
}

export default web3
