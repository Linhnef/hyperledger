/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const path = require("path");

const createProduct = async (
    ProductId,
    Name,
    FactoryId,
    Status,
    Factory,
    Price
) => {
    try {
        const ccpPath = path.resolve(
            __dirname,
            "..",
            "..",
            "test-network",
            "organizations",
            "peerOrganizations",
            "org1.example.com",
            "connection-org1.json"
        );
        let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), "wallet");
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`-------> Seeding ----->`);

        // Check to see if we've alreaPdy enrolled the user.
        const identity = await wallet.get("appUser");
        if (!identity) {
            console.log(
                'An identity for the user "appUser" does not exist in the wallet'
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: "appUser",
            discovery: { enabled: true, asLocalhost: true },
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork("mychannel");

        // Get the contract from the network.
        const contract = network.getContract("supply");
        const result = await contract.submitTransaction(
            "CreateProduct",
            ProductId + "",
            Name + "",
            FactoryId + "",
            Status + "",
            Factory + "",
            parseFloat(Price)
        );
        return { sucess: result };
    } catch (error) {
        console.log(error);
        return { error: "Failure !" };
    }
};

module.exports = createProduct;
