# Prequisites
### Node 
### Ganache Cli (npm i -g ganache-cli)
### Truffle (npm i -g truffle)
### Metamask chrome extension


# Setup

```
1. Open Ganache Cli by typing "ganache-cli" in the terminal

2. Go to the project directory and type "npm i" in the root directory

3. Run "truffle migrate --reset --network development" in the root directory

4. Go to backend directory and type "npm i"

5. Start the backend server by typing "node sever.js"

6. Open new terminal and go to the frontend directory and type "npm i"

7. Start the frontend by typing the command "npm run start"

8. It will run on port 3000, connect metamask with it and you will be able to see you current metamask address on the page

9. Please take private key from ganache and add it in metamask so you can use those funds in order to pay gas fee

9. You will see a button "Create NFT" please click on it and you will create a NFT and it will show on the front end

10. You can create multiple NFT's(max 3) and they all will be listed there.

11. You can now change address from the metamask extension and you won't be able to see that same NFT listing there
```

## Note

```
To make it simple i have used a backend server to get the NFT's metadata using URI but we can use IPFS to store the data and image which will be there forever and no one can change it
```

# Debugging
```
If you see this alert "Please remove the abi's and redeploy contracts" please remove the contract abi's from frontend/src and reploy the contracts and restart the front end
```