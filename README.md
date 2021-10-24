# NEAR NCD Bootcamp - Level 2 :: 1-day course on building full stack dApps on NEAR

This repository contains an implementation of the front-end and NEAR protocolor interaction via RPC API.
The smart contract to interact is the one implemented on the NCD Bootcamp - Level 1. [TrustMe Smart Contract](https://github.com/leomanza/trust-me).

**Prerequisites**
In order to interact with the smart contract, we need it deployed. Once you have it, copy the smart contract account Id that we are going to use on the daap.

## Environment Setup

### Local Environment Setup
1. clone this repo locally
```bash
git clone ...
```
2. install dependencies
```bash
yarn
```
4. open next.config.js and set the CONTRACT_ID env variable with the trus-me smart contract account id deployed on prerequisites.
```json
module.exports = {
  reactStrictMode: true,
  env: {
    CONTRACT_ID: 'dev-839242103921-12345'
  }
}
````
3. run the development server
```bash
npm run dev
# or
yarn dev
```

### DEV Environment Setup
1. clone this repo locally (skip if already done on local env setup)
```bash
git clone ...
```
2. install dependencies (skip if already done on local env setup)
```bash
yarn
```
3. deploy
```bash
vercel
```
4. add CONTRACT_ID env variable
```bash
vercel env add NEXT_PUBLIC_CONTRACT_ID
```
copy/paste contract account id

### DEV Production Setup
1. clone this repo locally (skip if already done on local/dev env setup)
```bash
git clone ... 
```
2. install dependencies (skip if already done on local/dev env setup)
```bash
yarn 
```
3. deploy
```bash
vercel --prod
```
4. add CONTRACT_ID env variable (skip if already done on dev env setup)
```bash
vercel env add NEXT_PUBLIC_CONTRACT_ID
```
copy/paste contract account id
