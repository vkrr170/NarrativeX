import { t as isValidAddress } from "./@algorandfoundation/algokit-utils+[...].mjs";
//#region node_modules/@x402/core/dist/esm/chunk-HX5GESJI.mjs
function numberToDecimalString(n) {
	const str = n.toString();
	if (!/[eE]/.test(str)) return str;
	const [significand, exponentStr] = str.split(/[eE]/);
	const exp = parseInt(exponentStr, 10);
	const negative = significand.startsWith("-");
	const [intDigits, fracDigits = ""] = (negative ? significand.slice(1) : significand).split(".");
	const allDigits = intDigits + fracDigits;
	const decimalPos = intDigits.length + exp;
	let result;
	if (decimalPos <= 0) result = "0." + "0".repeat(-decimalPos) + allDigits;
	else if (decimalPos >= allDigits.length) result = allDigits + "0".repeat(decimalPos - allDigits.length);
	else result = allDigits.slice(0, decimalPos) + "." + allDigits.slice(decimalPos);
	return (negative ? "-" : "") + result;
}
function parseMoneyString(money) {
	const cleaned = money.replace(/^\$/, "").trim();
	if (!/^-?\d+(?:\.\d+)?$/.test(cleaned) || /[eE]/.test(cleaned)) throw new Error(`Invalid money format: ${money}`);
	const amount = Number(cleaned);
	if (!Number.isFinite(amount) || amount < 0) throw new Error(`Invalid money format: ${money}`);
	return amount;
}
function convertToTokenAmount(decimalAmount, decimals) {
	if (/[eE]/.test(decimalAmount)) throw new Error(`Invalid amount: ${decimalAmount} \u2014 use decimal notation, not scientific notation`);
	if (!/^-?\d+\.?\d*$/.test(decimalAmount)) throw new Error(`Invalid amount: ${decimalAmount}`);
	const [intPart, decPart = ""] = decimalAmount.split(".");
	const tokenAmount = (intPart + decPart.padEnd(decimals, "0").slice(0, decimals)).replace(/^0+/, "") || "0";
	if (tokenAmount === "0" && /[1-9]/.test(decimalAmount)) throw new Error(`Amount ${decimalAmount} is too small to represent with ${decimals} decimal places`);
	return tokenAmount;
}
var escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var networkPatternToRegExp = (pattern) => {
	const source = escapeRegExp(pattern).replace(/\\\*/g, ".*");
	return new RegExp(`^${source}$`);
};
var networkMatchesPattern = (pattern, network) => {
	return networkPatternToRegExp(pattern).test(network);
};
var findSchemesByNetwork = (map, network) => {
	let implementationsByScheme = map.get(network);
	if (!implementationsByScheme) {
		for (const [registeredNetworkPattern, implementations] of map.entries()) if (networkMatchesPattern(registeredNetworkPattern, network)) {
			implementationsByScheme = implementations;
			break;
		}
	}
	return implementationsByScheme;
};
var findByNetworkAndScheme = (map, scheme, network) => {
	return findSchemesByNetwork(map, network)?.get(scheme);
};
var Base64EncodedRegex = /^[A-Za-z0-9+/]*={0,2}$/;
function safeBase64Encode(data) {
	if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
		const bytes = new TextEncoder().encode(data);
		const binaryString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
		return globalThis.btoa(binaryString);
	}
	return Buffer.from(data, "utf8").toString("base64");
}
function safeBase64Decode(data) {
	if (typeof globalThis !== "undefined" && typeof globalThis.atob === "function") {
		const binaryString = globalThis.atob(data);
		const bytes = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
		return new TextDecoder("utf-8").decode(bytes);
	}
	return Buffer.from(data, "base64").toString("utf-8");
}
function deepEqual(obj1, obj2) {
	const normalize = (obj) => {
		if (obj === null || obj === void 0) return JSON.stringify(obj);
		if (typeof obj !== "object") return JSON.stringify(obj);
		if (Array.isArray(obj)) return JSON.stringify(obj.map((item) => typeof item === "object" && item !== null ? JSON.parse(normalize(item)) : item));
		const sorted = {};
		Object.keys(obj).sort().forEach((key) => {
			const value = obj[key];
			sorted[key] = typeof value === "object" && value !== null ? JSON.parse(normalize(value)) : value;
		});
		return JSON.stringify(sorted);
	};
	try {
		return normalize(obj1) === normalize(obj2);
	} catch {
		return JSON.stringify(obj1) === JSON.stringify(obj2);
	}
}
function toComparableArray(value) {
	if (Array.isArray(value)) return value;
	if (value === null || value === void 0 || typeof value === "object") return;
	return [value];
}
var ADDITIVE_ARRAY_INFO_FIELDS = { "builder-code": /* @__PURE__ */ new Set(["s"]) };
var ADDITIVE_ARRAY_MAX_LENGTHS = { "builder-code": { s: 10 } };
//#endregion
//#region node_modules/@x402/avm/dist/esm/chunk-HQQAQJ7L.mjs
var ALGORAND_MAINNET_CAIP2 = "algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73k";
var ALGORAND_TESTNET_CAIP2 = "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe";
var ALGORAND_MAINNET_GENESIS_HASH = "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=";
var ALGORAND_TESTNET_GENESIS_HASH = "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=";
var USDC_MAINNET_ASA_ID = "31566704";
var USDC_TESTNET_ASA_ID = "10458941";
var USDC_CONFIG = {
	[ALGORAND_MAINNET_CAIP2]: {
		asaId: USDC_MAINNET_ASA_ID,
		name: "USDC",
		decimals: 6
	},
	[ALGORAND_TESTNET_CAIP2]: {
		asaId: USDC_TESTNET_ASA_ID,
		name: "USDC",
		decimals: 6
	}
};
function normalizeAlgorandNetwork(network) {
	if (!network.startsWith("algorand:")) throw new Error(`Unsupported Algorand network: ${network}`);
	if (network === "algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73k" || network === "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe") return network;
	if (network === `algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=`) return ALGORAND_MAINNET_CAIP2;
	if (network === `algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=`) return ALGORAND_TESTNET_CAIP2;
	throw new Error(`Unsupported Algorand network: ${network}`);
}
function isValidAlgorandAddress(address) {
	return isValidAddress(address);
}
//#endregion
//#region node_modules/@x402/avm/dist/esm/exact/server/index.mjs
var ExactAvmScheme = class {
	constructor() {
		this.scheme = "exact";
		this.moneyParsers = [];
	}
	/**
	* Register a custom money parser in the parser chain.
	* Multiple parsers can be registered - they will be tried in registration order.
	* Each parser receives a decimal amount (e.g., 1.50 for $1.50).
	* If a parser returns null, the next parser in the chain will be tried.
	* The default parser is always the final fallback.
	*
	* @param parser - Custom function to convert amount to AssetAmount (or null to skip)
	* @returns The server instance for chaining
	*
	* @example
	* ```typescript
	* avmServer.registerMoneyParser(async (amount, network) => {
	*   // Custom conversion logic for non-USDC assets
	*   if (amount > 100) {
	*     return { amount: (amount * 1e6).toString(), asset: "12345678" };
	*   }
	*   return null; // Use next parser
	* });
	* ```
	*/
	registerMoneyParser(parser) {
		this.moneyParsers.push(parser);
		return this;
	}
	/**
	* Parses a price into an asset amount.
	* If price is already an AssetAmount, returns it directly.
	* If price is Money (string | number), parses to decimal and tries custom parsers.
	* Falls back to default conversion if all custom parsers return null.
	*
	* @param price - The price to parse
	* @param network - The network to use
	* @returns Promise that resolves to the parsed asset amount
	*/
	async parsePrice(price, network) {
		if (typeof price === "object" && price !== null && "amount" in price) {
			if (!price.asset) throw new Error(`Asset ID must be specified for AssetAmount on network ${network}`);
			return {
				amount: price.amount,
				asset: price.asset,
				extra: price.extra || {}
			};
		}
		const amount = this.parseMoneyToDecimal(price);
		for (const parser of this.moneyParsers) {
			const result = await parser(amount, network);
			if (result !== null) return result;
		}
		return this.defaultMoneyConversion(amount, network);
	}
	/**
	* Build payment requirements for this scheme/network combination
	*
	* @param paymentRequirements - The base payment requirements
	* @param supportedKind - The supported kind from facilitator (contains extra data like feePayer)
	* @param supportedKind.x402Version - The x402 version
	* @param supportedKind.scheme - The logical payment scheme
	* @param supportedKind.network - The network identifier in CAIP-2 format
	* @param supportedKind.extra - Optional extra metadata (e.g., feePayer address)
	* @param extensionKeys - Extension keys supported by the facilitator
	* @returns Payment requirements ready to be sent to clients
	*/
	enhancePaymentRequirements(paymentRequirements, supportedKind, extensionKeys) {
		if (!supportedKind.extra?.feePayer) return Promise.resolve(paymentRequirements);
		return Promise.resolve({
			...paymentRequirements,
			extra: {
				...paymentRequirements.extra,
				feePayer: supportedKind.extra.feePayer
			}
		});
	}
	/**
	* Parse Money (string | number) to a decimal number.
	* Handles formats like "$1.50", "1.50", 1.50, etc.
	*
	* @param money - The money value to parse
	* @returns Decimal number
	*/
	parseMoneyToDecimal(money) {
		if (typeof money === "number") return money;
		return parseMoneyString(money);
	}
	/**
	* Default money conversion implementation.
	* Converts decimal amount to the default stablecoin (USDC) on the specified network.
	*
	* @param amount - The decimal amount (e.g., 1.50)
	* @param network - The network to use
	* @returns The parsed asset amount in USDC
	*/
	defaultMoneyConversion(amount, network) {
		const assetInfo = this.getDefaultAsset(network);
		return {
			amount: convertToTokenAmount(numberToDecimalString(amount), assetInfo.decimals),
			asset: assetInfo.asaId
		};
	}
	/**
	* Get the default asset info for a network (USDC)
	*
	* @param network - The network to get asset info for
	* @returns The asset information including ASA ID, name, and decimals
	*/
	getDefaultAsset(network) {
		const assetInfo = USDC_CONFIG[normalizeAlgorandNetwork(network)];
		if (!assetInfo) throw new Error(`No default asset configured for network ${network}`);
		return assetInfo;
	}
};
//#endregion
export { ALGORAND_TESTNET_GENESIS_HASH as a, isValidAlgorandAddress as c, Base64EncodedRegex as d, deepEqual as f, toComparableArray as g, safeBase64Encode as h, ALGORAND_TESTNET_CAIP2 as i, ADDITIVE_ARRAY_INFO_FIELDS as l, safeBase64Decode as m, ALGORAND_MAINNET_CAIP2 as n, USDC_MAINNET_ASA_ID as o, findByNetworkAndScheme as p, ALGORAND_MAINNET_GENESIS_HASH as r, USDC_TESTNET_ASA_ID as s, ExactAvmScheme as t, ADDITIVE_ARRAY_MAX_LENGTHS as u };
