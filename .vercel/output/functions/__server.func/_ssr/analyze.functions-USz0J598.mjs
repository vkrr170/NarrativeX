import { n as createServerFn, t as TSS_SERVER_FUNCTION } from "./server-BsDv6-O0.mjs";
import { n as analyzeInputSchema } from "./schema-SIEy7U4I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze.functions-USz0J598.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var analyzeReadmeFn_createServerFn_handler = createServerRpc({
	id: "8aa51df83cf50803dc7e9a862f5da8173ccd2f7ace2337161069f98d21229019",
	name: "analyzeReadmeFn",
	filename: "src/lib/pitch/analyze.functions.ts"
}, (opts) => analyzeReadmeFn.__executeServer(opts));
var analyzeReadmeFn = createServerFn({ method: "POST" }).validator((input) => analyzeInputSchema.parse(input)).handler(analyzeReadmeFn_createServerFn_handler, async ({ data }) => {
	const { analyzeReadme } = await import("./analyze.server-Dc1gA1p5.mjs");
	return analyzeReadme(data);
});
//#endregion
export { analyzeReadmeFn_createServerFn_handler };
