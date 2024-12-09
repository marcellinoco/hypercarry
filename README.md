## Requirements

<details>
<summary>Foundry</summary>

Install foundry based on the [official guide](https://book.getfoundry.sh/getting-started/installation). It's recommended to use `foundryup` to install foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

</details>

<details>
<summary>Rivet</summary>

Rivet can be used as an alternative to running Foundry's anvil on terminal. Install the browser extension:

```bash
https://github.com/paradigmxyz/rivet
```

</details>

## Smart Contracts

### Development

Start by installing dependencies:

```bash
cd contracts
forge soldeer install
```

Then, build the project:

```bash
forge build
```

To run tests:

```bash
forge test
forge coverage
```

### Local Deployment

Start a local anvil node:

```bash
anvil
```

Note down the private keys generated, then deploy the contract using the local anvil network:

```bash
forge script script/Contract.s.sol:Script --rpc-url anvil --broadcast --private-key <private-key>
```

### Deployment

To deploy, create a new wallet keystore:

```bash
cast wallet import --interactive
# or
cast wallet new
```

Make sure to have native tokens in the wallet to pay for deployment. Then, deploy the contract:

```bash
forge script script/Contract.s.sol:Script --rpc-url opbnb-testnet --account dev --sender <wallet-address> --broadcast
```

To get the standard json input (for verification), run:

```bash
# (Optional) Constructor arguments in abi-encoded format:
cast abi-encode "constructor(address)" "<address>"
forge verify-contract --show-standard-json-input <contract-address> src/Contract.sol:Contract > output.json
```

## Frontend

Start the development server:

```bash
cd frontend
npm install
npm run dev
```
