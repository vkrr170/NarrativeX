import { a as ALGORAND_TESTNET_GENESIS_HASH, c as isValidAlgorandAddress, o as USDC_MAINNET_ASA_ID, r as ALGORAND_MAINNET_GENESIS_HASH, s as USDC_TESTNET_ASA_ID } from "../_libs/x402__avm+x402__core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/config.server-D8HcCAW8.js
var ALGORAND_MAINNET_NETWORK = `algorand:${ALGORAND_MAINNET_GENESIS_HASH}`;
var ALGORAND_TESTNET_NETWORK = `algorand:${ALGORAND_TESTNET_GENESIS_HASH}`;
var DEFAULT_PRICE = "0.10";
function env(name) {
	return (process.env[name] ?? "").trim();
}
/**
* Reads x402 configuration from the environment.
*
* @returns The resolved configuration plus a list of missing/invalid variables.
*/
function readX402Config() {
	const missing = [];
	const isMainnet = (env("X402_NETWORK") || env("ALGORAND_NETWORK") || "testnet").toLowerCase() === "mainnet";
	const payTo = env("AVM_ADDRESS");
	if (!payTo) missing.push("AVM_ADDRESS");
	else if (!isValidAlgorandAddress(payTo)) missing.push("AVM_ADDRESS (not a valid Algorand address)");
	const DEFAULT_FACILITATOR = "https://facilitator.goplausible.xyz";
	const facilitatorEnv = env("FACILITATOR_URL");
	const facilitatorUrl = facilitatorEnv && /^https:\/\/facilitator\.goplausible\.xyz/i.test(facilitatorEnv) ? facilitatorEnv.replace(/\/+$/, "") : DEFAULT_FACILITATOR;
	const rawPrice = env("PITCH_DECK_PRICE") || DEFAULT_PRICE;
	const priceValue = Number.parseFloat(rawPrice.replace(/^\$/, ""));
	const safePrice = Number.isFinite(priceValue) && priceValue > 0 ? priceValue : Number(DEFAULT_PRICE);
	return {
		network: isMainnet ? ALGORAND_MAINNET_NETWORK : ALGORAND_TESTNET_NETWORK,
		networkLabel: isMainnet ? "Algorand MainNet" : "Algorand TestNet",
		asset: isMainnet ? USDC_MAINNET_ASA_ID : USDC_TESTNET_ASA_ID,
		assetLabel: isMainnet ? "USDC (MainNet)" : "USDC (TestNet)",
		payTo,
		facilitatorUrl,
		price: `$${safePrice.toFixed(2)}`,
		priceValue: safePrice.toFixed(2),
		missing
	};
}
/**
* Public, secret-free configuration snapshot for the diagnostic endpoints.
*
* @param config - Resolved x402 configuration.
* @returns A JSON-safe status object with no secret values.
*/
function toPublicStatus(config) {
	const receiverConfigured = Boolean(config.payTo) && !config.missing.some((m) => m.startsWith("AVM_ADDRESS"));
	return {
		configured: config.missing.length === 0,
		x402Configured: config.missing.length === 0,
		network: config.networkLabel,
		networkId: config.network,
		algorandTestnetConfigured: config.networkLabel === "Algorand TestNet",
		price: config.price,
		asset: config.assetLabel,
		assetId: config.asset,
		paymentAssetConfigured: Boolean(config.asset),
		receiverConfigured,
		facilitatorConfigured: /^https:\/\/facilitator\.goplausible\.xyz/i.test(config.facilitatorUrl),
		missing: config.missing
	};
}
//#endregion
export { readX402Config, toPublicStatus };
