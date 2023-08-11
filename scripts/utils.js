const { CCIP_BnM_ADDRESSES, CCIP_LnM_ADDRESSES, PayFeesIn, routerConfig } = require("./constants");

const getProviderRpcUrl = (network) => {
    let rpcUrl;

    switch (network) {
        case "ethereumSepolia":
            rpcUrl = process.env.ETHEREUM_SEPOLIA_RPC_URL;
            break;
        case "optimismGoerli":
            rpcUrl = process.env.OPTIMISM_GOERLI_RPC_URL;
            break;
        case "arbitrumTestnet":
            rpcUrl = process.env.ARBITRUM_TESTNET_RPC_URL;
            break;
        case "avalancheFuji":
            rpcUrl = process.env.AVALANCHE_FUJI_RPC_URL;
            break;
        case "polygonMumbai":
            rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL;
            break;
        default:
            throw new Error("Unknown network: " + network);
    }

    if (!rpcUrl)
        throw new Error(
            `rpcUrl empty for network ${network} - check your environment variables`
        );

    return rpcUrl;
};

const getPrivateKey = () => {
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey)
        throw new Error(
            "private key not provided - check your environment variables"
        );

    return privateKey;
};

const getRouterConfig = (network) => {
    switch (network) {
        case "ethereumSepolia":
            return routerConfig.ethereumSepolia;
        case "optimismGoerli":
            return routerConfig.optimismGoerli;
        case "arbitrumTestnet":
            return routerConfig.arbitrumTestnet;
        case "avalancheFuji":
            return routerConfig.avalancheFuji;
        case "polygonMumbai":
            return routerConfig.polygonMumbai;
        default:
            throw new Error("Unknown network: " + network);
    }
};

const getPayFeesIn = (payFeesIn) => {
    let fees;

    switch (payFeesIn) {
        case "Native":
        case "native":
            fees = PayFeesIn.Native;
            break;
        case "LINK":
        case "link":
            fees = PayFeesIn.LINK;
            break;
        default:
            fees = PayFeesIn.Native;
            break;
    }

    return fees;
}

const getFaucetTokensAddresses = (network) => {
    return { ccipBnM: CCIP_BnM_ADDRESSES[network], ccipLnM: CCIP_LnM_ADDRESSES[network] };
}

module.exports = {
    getProviderRpcUrl,
    getPrivateKey,
    getRouterConfig,
    getPayFeesIn,
    getFaucetTokensAddresses
};
