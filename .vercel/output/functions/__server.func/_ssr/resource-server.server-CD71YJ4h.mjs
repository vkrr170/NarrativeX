import { a as x402HTTPResourceServer, i as withPrivateCacheControl, n as HTTPFacilitatorClient, o as FacilitatorResponseError, s as getFacilitatorResponseError, t as x402ResourceServer } from "../_libs/x402__core+zod.mjs";
import { t as ExactAvmScheme } from "../_libs/x402__avm+x402__core.mjs";
import { readX402Config } from "./config.server-D8HcCAW8.mjs";
import { Buffer } from "node:buffer";
//#region node_modules/.nitro/vite/services/ssr/assets/resource-server.server-CD71YJ4h.js
/**
* Framework-agnostic HTTP adapter over the Web `Request` used by TanStack
* Start server routes. Mirrors the official Hono/Next adapters.
*/
var FetchAdapter = class {
	request;
	body;
	url;
	/**
	* @param request - Incoming request.
	* @param body - Already-parsed JSON body, if any.
	*/
	constructor(request, body) {
		this.request = request;
		this.body = body;
		this.url = new URL(request.url);
	}
	/**
	* @param name - Header name.
	* @returns The header value, or undefined.
	*/
	getHeader(name) {
		return this.request.headers.get(name) ?? void 0;
	}
	/** @returns The HTTP method. */
	getMethod() {
		return this.request.method;
	}
	/** @returns The request path. */
	getPath() {
		return this.url.pathname;
	}
	/** @returns The absolute request URL. */
	getUrl() {
		return this.request.url;
	}
	/** @returns The Accept header. */
	getAcceptHeader() {
		return this.request.headers.get("Accept") ?? "";
	}
	/** @returns The User-Agent header. */
	getUserAgent() {
		return this.request.headers.get("User-Agent") ?? "";
	}
	/** @returns All query parameters. */
	getQueryParams() {
		return Object.fromEntries(this.url.searchParams.entries());
	}
	/**
	* @param name - Query parameter name.
	* @returns The parameter value, or undefined.
	*/
	getQueryParam(name) {
		return this.url.searchParams.get(name) ?? void 0;
	}
	/** @returns The parsed request body. */
	getBody() {
		return this.body;
	}
};
var cached = null;
/**
* Builds (and memoises) the x402 HTTP resource server for the protected route.
*
* @param routePattern - Route pattern to protect, e.g. `POST /api/public/generate-deck`.
* @param config - Resolved x402 configuration.
* @returns The configured resource server.
*/
function getResourceServer(routePattern, config) {
	const key = `${routePattern}|${config.network}|${config.payTo}|${config.facilitatorUrl}|${config.price}|${config.asset}`;
	if (cached?.key === key) return cached.server;
	const facilitator = new HTTPFacilitatorClient({ url: config.facilitatorUrl });
	const resourceServer = new x402ResourceServer(facilitator).register(config.network, new ExactAvmScheme());
	const httpServer = new x402HTTPResourceServer(resourceServer, { [routePattern]: {
		accepts: {
			scheme: "exact",
			network: config.network,
			payTo: config.payTo,
			price: {
				asset: config.asset,
				amount: toAtomicUsdc(config.priceValue)
			},
			maxTimeoutSeconds: 300
		},
		description: "PitchForge investor deck generation",
		serviceName: "PitchForge",
		mimeType: "application/json"
	} });
	cached = {
		key,
		server: httpServer,
		initialized: false
	};
	return httpServer;
}
/**
* Converts a decimal USD/USDC amount to atomic units (6 decimals).
*
* @param value - Decimal amount, e.g. "0.10".
* @returns Atomic amount string, e.g. "100000".
*/
function toAtomicUsdc(value) {
	return BigInt(Math.round(Number.parseFloat(value) * 1e6)).toString();
}
function jsonResponse(body, status, headers = {}) {
	return new Response(JSON.stringify(body ?? {}), {
		status,
		headers: {
			"content-type": "application/json",
			...headers
		}
	});
}
var REDACTED_LOG_KEYS = /authorization|cookie|mnemonic|private|secret|signature|token|x-payment/i;
/**
* Produces a JSON-safe diagnostic value while removing credentials, signed
* payment payloads, and other values that must never enter server logs.
*/
function toSafeLogValue(value, seen = /* @__PURE__ */ new WeakSet()) {
	if (value instanceof Error) return {
		name: value.name,
		message: value.message,
		cause: toSafeLogValue(value.cause, seen)
	};
	if (value === null || typeof value !== "object") return value;
	if (seen.has(value)) return "[circular]";
	seen.add(value);
	if (Array.isArray(value)) return value.map((item) => toSafeLogValue(item, seen));
	return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, REDACTED_LOG_KEYS.test(key) ? "[redacted]" : toSafeLogValue(item, seen)]));
}
function logX402Failure(stage, config, details) {
	console.error("x402 payment failure", JSON.stringify({
		stage,
		facilitator: config.facilitatorUrl,
		network: config.network,
		asset: config.asset,
		amountAtomic: toAtomicUsdc(config.priceValue),
		payTo: config.payTo,
		details: toSafeLogValue(details)
	}));
}
/**
* Runs `handler` behind the official x402 resource-server middleware.
*
* Unpaid requests receive a genuine HTTP 402 with x402 payment requirements.
* The handler only runs after the facilitator has verified the payment, and
* settlement happens afterwards — a settlement failure never returns a deck.
*
* @param request - Incoming request.
* @param options - Route pattern, parsed body and the protected handler.
* @param options.routePattern - x402 route pattern, e.g. "POST /api/public/generate-deck".
* @param options.body - Parsed JSON request body.
* @param options.skipPayment - Optional predicate granting access without payment (idempotent retries).
* @param options.handler - The protected work to perform once payment is verified.
* @returns The HTTP response, including settlement headers when paid.
*/
async function withX402(request, options) {
	const config = readX402Config();
	if (config.missing.length > 0) return jsonResponse({
		error: "server_not_configured",
		message: "PitchForge payments are not configured on this server. Missing environment variables are listed below.",
		missing: config.missing
	}, 503);
	if (options.skipPayment?.()) {
		const result = await options.handler();
		return jsonResponse(result.body, result.status ?? 200);
	}
	const adapter = new FetchAdapter(request, options.body);
	const context = {
		adapter,
		path: adapter.getPath(),
		method: request.method,
		...adapter.getHeader("payment-signature") || adapter.getHeader("x-payment") ? { paymentHeader: adapter.getHeader("payment-signature") ?? adapter.getHeader("x-payment") } : {}
	};
	const httpServer = getResourceServer(options.routePattern, config);
	if (cached && !cached.initialized) try {
		await httpServer.initialize();
		cached.initialized = true;
	} catch (error) {
		const facilitatorError = getFacilitatorResponseError(error);
		logX402Failure("initialization", config, facilitatorError ?? error);
		return jsonResponse({
			error: "facilitator_unavailable",
			message: facilitatorError?.message ?? "The x402 facilitator could not be reached. Payment cannot be verified right now."
		}, 502);
	}
	let processed;
	try {
		processed = await httpServer.processHTTPRequest(context);
	} catch (error) {
		logX402Failure("verification", config, getFacilitatorResponseError(error) ?? error);
		if (error instanceof FacilitatorResponseError) return jsonResponse({
			error: "facilitator_error",
			message: error.message
		}, 502);
		throw error;
	}
	if (processed.type === "payment-error") {
		const { response } = processed;
		logX402Failure("verification", config, {
			status: response.status,
			body: response.body,
			headers: response.headers
		});
		return jsonResponse(response.body, response.status, response.headers);
	}
	if (processed.type === "no-payment-required") {
		const result = await options.handler();
		return jsonResponse(result.body, result.status ?? 200);
	}
	const { cancellationDispatcher, paymentPayload, paymentRequirements, declaredExtensions } = processed;
	let result;
	try {
		result = await options.handler();
	} catch (error) {
		await cancellationDispatcher.cancel({
			reason: "handler_threw",
			error
		});
		return jsonResponse({
			error: "generation_failed",
			message: "Deck generation failed after payment authorization; the payment was not settled."
		}, 500);
	}
	const responseBody = Buffer.from(JSON.stringify(result.body ?? {}));
	try {
		const settle = await httpServer.processSettlement(paymentPayload, paymentRequirements, declaredExtensions, {
			request: context,
			responseBody,
			responseHeaders: { "content-type": "application/json" }
		});
		if (!settle.success) {
			logX402Failure("settlement", config, {
				status: settle.response.status,
				body: settle.response.body,
				headers: settle.response.headers
			});
			return jsonResponse(settle.response.body, settle.response.status, settle.response.headers);
		}
		return jsonResponse(result.body, result.status ?? 200, {
			...settle.headers,
			"Cache-Control": withPrivateCacheControl(null)
		});
	} catch (error) {
		logX402Failure("settlement", config, getFacilitatorResponseError(error) ?? error);
		if (error instanceof FacilitatorResponseError) return jsonResponse({
			error: "settlement_failed",
			message: error.message
		}, 502);
		return jsonResponse({
			error: "settlement_failed",
			message: "Payment settlement failed. You were not charged."
		}, 402);
	}
}
//#endregion
export { withX402 };
