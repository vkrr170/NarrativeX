//#region node_modules/.nitro/vite/services/ssr/assets/idempotency.server-BoiqNaLe.js
var TTL_MS = 18e5;
var MAX_ENTRIES = 200;
var store = /* @__PURE__ */ new Map();
function prune() {
	const now = Date.now();
	for (const [key, entry] of store) if (now - entry.at > TTL_MS) store.delete(key);
	while (store.size > MAX_ENTRIES) {
		const oldest = store.keys().next();
		if (oldest.done) break;
		store.delete(oldest.value);
	}
}
/**
* Reads a previously completed result for an idempotency key.
*
* @param key - Client-supplied idempotency key.
* @returns The stored value, or undefined when unknown/expired.
*/
function getCompleted(key) {
	prune();
	const entry = store.get(key);
	return entry ? entry.value : void 0;
}
/**
* Records a completed result so retries are served without a second payment.
*
* @param key - Client-supplied idempotency key.
* @param value - The result to remember.
*/
function setCompleted(key, value) {
	store.set(key, {
		value,
		at: Date.now()
	});
	prune();
}
//#endregion
export { getCompleted, setCompleted };
