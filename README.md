# Ticket Booking Dapp

This Dapp provides a platform to book the tickets. It is developed using the Solidity, Javascript and Reactjs for the frontend. 

## Setup

1) Clone the git repository to your local system using following command:
```bash
git clone https://github.com/krishansinghal/Ticket_Booking
```
2) Go to main folder:
```bash
cd Ticket_Booking 
```
3) Go to backend folder:
```bash
cd backend
```
- Install the dependencies using the following command:
```bash
npm i
```
4) Go to frontend folder and install the dependencies:
```bash
cd frontend
npm i
```
## Deployment

### Backend: 
1) Open the `hardhat.config.js` file and choose the network. 

-The default network is `ganache`. Make sure to replace the `YOUR_ACCOUNT_ADDRESS` for ganache.

-If selected network is `amoy` then make sure to replace the `YOUR_PRIVATE_KEY`.

2) Open the Terminal and run the following commands:
- `Compile` the contract:
```bash 
npx hardhat compile
```
- `Deploy` the contract
```bash
npx hardhat run ./scripts/deploy.js
```

### frontend
Make sure you are inside the frontend folder: `cd frontend`

1) Copy the deployed `contract address` after the deployment and paste it at `YOUR_CONTRACT_ADDRESS` inside the `TicketBooking.js` file.

2) Run the following command to start the Dapp:
```bash
npm start
```
It'll start the Application in the local host port:3000.





