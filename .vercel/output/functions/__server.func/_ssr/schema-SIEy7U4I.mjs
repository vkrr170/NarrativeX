import { c as arrayType, f as objectType, l as booleanType, p as stringType } from "../_libs/x402__core+zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schema-SIEy7U4I.js
/**
* Strict investor-pitch contract. Every field is required in the response;
* missing evidence in the source is represented as "" or [] — never invented.
*/
var pitchSchema = objectType({
	project_name: stringType(),
	tagline: stringType(),
	problem: stringType(),
	solution: stringType(),
	target_users: arrayType(stringType()),
	key_features: arrayType(stringType()),
	market_opportunity: stringType(),
	/** True only when the documentation itself contains quantitative market data. */
	market_data_available: booleanType(),
	business_model: stringType(),
	competitive_advantage: arrayType(stringType()),
	technology: arrayType(stringType()),
	traction: stringType(),
	roadmap: arrayType(stringType()),
	call_to_action: stringType(),
	/** Short notes on sections that were incomplete or inferred rather than stated. */
	confidence_notes: arrayType(stringType()),
	/** Three concise questions an investor would likely ask about this project. */
	investor_questions: arrayType(stringType())
});
var emptyPitch = {
	project_name: "",
	tagline: "",
	problem: "",
	solution: "",
	target_users: [],
	key_features: [],
	market_opportunity: "",
	market_data_available: false,
	business_model: "",
	competitive_advantage: [],
	technology: [],
	traction: "",
	roadmap: [],
	call_to_action: "",
	confidence_notes: [],
	investor_questions: []
};
var ANALYZE_LIMITS = {
	minChars: 200,
	maxChars: 6e4
};
var analyzeInputSchema = objectType({ content: stringType().trim().min(ANALYZE_LIMITS.minChars, "Documentation is too short to analyse.").max(ANALYZE_LIMITS.maxChars, "Documentation exceeds the maximum supported length.") });
//#endregion
export { pitchSchema as i, analyzeInputSchema as n, emptyPitch as r, ANALYZE_LIMITS as t };
