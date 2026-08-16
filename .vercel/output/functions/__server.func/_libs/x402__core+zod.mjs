import { i as __require$1 } from "../_runtime.mjs";
import { d as Base64EncodedRegex, f as deepEqual, g as toComparableArray, h as safeBase64Encode, l as ADDITIVE_ARRAY_INFO_FIELDS, m as safeBase64Decode, p as findByNetworkAndScheme, u as ADDITIVE_ARRAY_MAX_LENGTHS } from "./x402__avm+x402__core.mjs";
//#region node_modules/zod/v3/helpers/util.js
var util;
(function(util) {
	util.assertEqual = (_) => {};
	function assertIs(_arg) {}
	util.assertIs = assertIs;
	function assertNever(_x) {
		throw new Error();
	}
	util.assertNever = assertNever;
	util.arrayToEnum = (items) => {
		const obj = {};
		for (const item of items) obj[item] = item;
		return obj;
	};
	util.getValidEnumValues = (obj) => {
		const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
		const filtered = {};
		for (const k of validKeys) filtered[k] = obj[k];
		return util.objectValues(filtered);
	};
	util.objectValues = (obj) => {
		return util.objectKeys(obj).map(function(e) {
			return obj[e];
		});
	};
	util.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
		const keys = [];
		for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key)) keys.push(key);
		return keys;
	};
	util.find = (arr, checker) => {
		for (const item of arr) if (checker(item)) return item;
	};
	util.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
	function joinValues(array, separator = " | ") {
		return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
	}
	util.joinValues = joinValues;
	util.jsonStringifyReplacer = (_, value) => {
		if (typeof value === "bigint") return value.toString();
		return value;
	};
})(util || (util = {}));
var objectUtil;
(function(objectUtil) {
	objectUtil.mergeShapes = (first, second) => {
		return {
			...first,
			...second
		};
	};
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]);
var getParsedType = (data) => {
	switch (typeof data) {
		case "undefined": return ZodParsedType.undefined;
		case "string": return ZodParsedType.string;
		case "number": return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
		case "boolean": return ZodParsedType.boolean;
		case "function": return ZodParsedType.function;
		case "bigint": return ZodParsedType.bigint;
		case "symbol": return ZodParsedType.symbol;
		case "object":
			if (Array.isArray(data)) return ZodParsedType.array;
			if (data === null) return ZodParsedType.null;
			if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return ZodParsedType.promise;
			if (typeof Map !== "undefined" && data instanceof Map) return ZodParsedType.map;
			if (typeof Set !== "undefined" && data instanceof Set) return ZodParsedType.set;
			if (typeof Date !== "undefined" && data instanceof Date) return ZodParsedType.date;
			return ZodParsedType.object;
		default: return ZodParsedType.unknown;
	}
};
//#endregion
//#region node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]);
var ZodError = class ZodError extends Error {
	get errors() {
		return this.issues;
	}
	constructor(issues) {
		super();
		this.issues = [];
		this.addIssue = (sub) => {
			this.issues = [...this.issues, sub];
		};
		this.addIssues = (subs = []) => {
			this.issues = [...this.issues, ...subs];
		};
		const actualProto = new.target.prototype;
		if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto);
		else this.__proto__ = actualProto;
		this.name = "ZodError";
		this.issues = issues;
	}
	format(_mapper) {
		const mapper = _mapper || function(issue) {
			return issue.message;
		};
		const fieldErrors = { _errors: [] };
		const processError = (error) => {
			for (const issue of error.issues) if (issue.code === "invalid_union") issue.unionErrors.map(processError);
			else if (issue.code === "invalid_return_type") processError(issue.returnTypeError);
			else if (issue.code === "invalid_arguments") processError(issue.argumentsError);
			else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < issue.path.length) {
					const el = issue.path[i];
					if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
					else {
						curr[el] = curr[el] || { _errors: [] };
						curr[el]._errors.push(mapper(issue));
					}
					curr = curr[el];
					i++;
				}
			}
		};
		processError(this);
		return fieldErrors;
	}
	static assert(value) {
		if (!(value instanceof ZodError)) throw new Error(`Not a ZodError: ${value}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(mapper = (issue) => issue.message) {
		const fieldErrors = {};
		const formErrors = [];
		for (const sub of this.issues) if (sub.path.length > 0) {
			const firstEl = sub.path[0];
			fieldErrors[firstEl] = fieldErrors[firstEl] || [];
			fieldErrors[firstEl].push(mapper(sub));
		} else formErrors.push(mapper(sub));
		return {
			formErrors,
			fieldErrors
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
ZodError.create = (issues) => {
	return new ZodError(issues);
};
//#endregion
//#region node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
	let message;
	switch (issue.code) {
		case ZodIssueCode.invalid_type:
			if (issue.received === ZodParsedType.undefined) message = "Required";
			else message = `Expected ${issue.expected}, received ${issue.received}`;
			break;
		case ZodIssueCode.invalid_literal:
			message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
			break;
		case ZodIssueCode.unrecognized_keys:
			message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
			break;
		case ZodIssueCode.invalid_union:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_union_discriminator:
			message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
			break;
		case ZodIssueCode.invalid_enum_value:
			message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
			break;
		case ZodIssueCode.invalid_arguments:
			message = `Invalid function arguments`;
			break;
		case ZodIssueCode.invalid_return_type:
			message = `Invalid function return type`;
			break;
		case ZodIssueCode.invalid_date:
			message = `Invalid date`;
			break;
		case ZodIssueCode.invalid_string:
			if (typeof issue.validation === "object") {
				if ("includes" in issue.validation) {
					message = `Invalid input: must include "${issue.validation.includes}"`;
					if (typeof issue.validation.position === "number") message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
				} else if ("startsWith" in issue.validation) message = `Invalid input: must start with "${issue.validation.startsWith}"`;
				else if ("endsWith" in issue.validation) message = `Invalid input: must end with "${issue.validation.endsWith}"`;
				else util.assertNever(issue.validation);
			} else if (issue.validation !== "regex") message = `Invalid ${issue.validation}`;
			else message = "Invalid";
			break;
		case ZodIssueCode.too_small:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "bigint") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.too_big:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.custom:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_intersection_types:
			message = `Intersection results could not be merged`;
			break;
		case ZodIssueCode.not_multiple_of:
			message = `Number must be a multiple of ${issue.multipleOf}`;
			break;
		case ZodIssueCode.not_finite:
			message = "Number must be finite";
			break;
		default:
			message = _ctx.defaultError;
			util.assertNever(issue);
	}
	return { message };
};
//#endregion
//#region node_modules/zod/v3/errors.js
var overrideErrorMap = errorMap;
function getErrorMap() {
	return overrideErrorMap;
}
//#endregion
//#region node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
	const { data, path, errorMaps, issueData } = params;
	const fullPath = [...path, ...issueData.path || []];
	const fullIssue = {
		...issueData,
		path: fullPath
	};
	if (issueData.message !== void 0) return {
		...issueData,
		path: fullPath,
		message: issueData.message
	};
	let errorMessage = "";
	const maps = errorMaps.filter((m) => !!m).slice().reverse();
	for (const map of maps) errorMessage = map(fullIssue, {
		data,
		defaultError: errorMessage
	}).message;
	return {
		...issueData,
		path: fullPath,
		message: errorMessage
	};
};
function addIssueToContext(ctx, issueData) {
	const overrideMap = getErrorMap();
	const issue = makeIssue({
		issueData,
		data: ctx.data,
		path: ctx.path,
		errorMaps: [
			ctx.common.contextualErrorMap,
			ctx.schemaErrorMap,
			overrideMap,
			overrideMap === errorMap ? void 0 : errorMap
		].filter((x) => !!x)
	});
	ctx.common.issues.push(issue);
}
var ParseStatus = class ParseStatus {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		if (this.value === "valid") this.value = "dirty";
	}
	abort() {
		if (this.value !== "aborted") this.value = "aborted";
	}
	static mergeArray(status, results) {
		const arrayValue = [];
		for (const s of results) {
			if (s.status === "aborted") return INVALID;
			if (s.status === "dirty") status.dirty();
			arrayValue.push(s.value);
		}
		return {
			status: status.value,
			value: arrayValue
		};
	}
	static async mergeObjectAsync(status, pairs) {
		const syncPairs = [];
		for (const pair of pairs) {
			const key = await pair.key;
			const value = await pair.value;
			syncPairs.push({
				key,
				value
			});
		}
		return ParseStatus.mergeObjectSync(status, syncPairs);
	}
	static mergeObjectSync(status, pairs) {
		const finalObject = {};
		for (const pair of pairs) {
			const { key, value } = pair;
			if (key.status === "aborted") return INVALID;
			if (value.status === "aborted") return INVALID;
			if (key.status === "dirty") status.dirty();
			if (value.status === "dirty") status.dirty();
			if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) finalObject[key.value] = value.value;
		}
		return {
			status: status.value,
			value: finalObject
		};
	}
};
var INVALID = Object.freeze({ status: "aborted" });
var DIRTY = (value) => ({
	status: "dirty",
	value
});
var OK = (value) => ({
	status: "valid",
	value
});
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
//#endregion
//#region node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil) {
	errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
	errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
//#endregion
//#region node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
	constructor(parent, value, path, key) {
		this._cachedPath = [];
		this.parent = parent;
		this.data = value;
		this._path = path;
		this._key = key;
	}
	get path() {
		if (!this._cachedPath.length) {
			if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
			else this._cachedPath.push(...this._path, this._key);
		}
		return this._cachedPath;
	}
};
var handleResult = (ctx, result) => {
	if (isValid(result)) return {
		success: true,
		data: result.value
	};
	else {
		if (!ctx.common.issues.length) throw new Error("Validation failed but no issues detected.");
		return {
			success: false,
			get error() {
				if (this._error) return this._error;
				const error = new ZodError(ctx.common.issues);
				this._error = error;
				return this._error;
			}
		};
	}
};
function processCreateParams(params) {
	if (!params) return {};
	const { errorMap, invalid_type_error, required_error, description } = params;
	if (errorMap && (invalid_type_error || required_error)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
	if (errorMap) return {
		errorMap,
		description
	};
	const customMap = (iss, ctx) => {
		const { message } = params;
		if (iss.code === "invalid_enum_value") return { message: message ?? ctx.defaultError };
		if (typeof ctx.data === "undefined") return { message: message ?? required_error ?? ctx.defaultError };
		if (iss.code !== "invalid_type") return { message: ctx.defaultError };
		return { message: message ?? invalid_type_error ?? ctx.defaultError };
	};
	return {
		errorMap: customMap,
		description
	};
}
var ZodType = class {
	get description() {
		return this._def.description;
	}
	_getType(input) {
		return getParsedType(input.data);
	}
	_getOrReturnCtx(input, ctx) {
		return ctx || {
			common: input.parent.common,
			data: input.data,
			parsedType: getParsedType(input.data),
			schemaErrorMap: this._def.errorMap,
			path: input.path,
			parent: input.parent
		};
	}
	_processInputParams(input) {
		return {
			status: new ParseStatus(),
			ctx: {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent
			}
		};
	}
	_parseSync(input) {
		const result = this._parse(input);
		if (isAsync(result)) throw new Error("Synchronous parse encountered promise.");
		return result;
	}
	_parseAsync(input) {
		const result = this._parse(input);
		return Promise.resolve(result);
	}
	parse(data, params) {
		const result = this.safeParse(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	safeParse(data, params) {
		const ctx = {
			common: {
				issues: [],
				async: params?.async ?? false,
				contextualErrorMap: params?.errorMap
			},
			path: params?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		return handleResult(ctx, this._parseSync({
			data,
			path: ctx.path,
			parent: ctx
		}));
	}
	"~validate"(data) {
		const ctx = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		if (!this["~standard"].async) try {
			const result = this._parseSync({
				data,
				path: [],
				parent: ctx
			});
			return isValid(result) ? { value: result.value } : { issues: ctx.common.issues };
		} catch (err) {
			if (err?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = true;
			ctx.common = {
				issues: [],
				async: true
			};
		}
		return this._parseAsync({
			data,
			path: [],
			parent: ctx
		}).then((result) => isValid(result) ? { value: result.value } : { issues: ctx.common.issues });
	}
	async parseAsync(data, params) {
		const result = await this.safeParseAsync(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	async safeParseAsync(data, params) {
		const ctx = {
			common: {
				issues: [],
				contextualErrorMap: params?.errorMap,
				async: true
			},
			path: params?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		const maybeAsyncResult = this._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
		return handleResult(ctx, await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult)));
	}
	refine(check, message) {
		const getIssueProperties = (val) => {
			if (typeof message === "string" || typeof message === "undefined") return { message };
			else if (typeof message === "function") return message(val);
			else return message;
		};
		return this._refinement((val, ctx) => {
			const result = check(val);
			const setError = () => ctx.addIssue({
				code: ZodIssueCode.custom,
				...getIssueProperties(val)
			});
			if (typeof Promise !== "undefined" && result instanceof Promise) return result.then((data) => {
				if (!data) {
					setError();
					return false;
				} else return true;
			});
			if (!result) {
				setError();
				return false;
			} else return true;
		});
	}
	refinement(check, refinementData) {
		return this._refinement((val, ctx) => {
			if (!check(val)) {
				ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
				return false;
			} else return true;
		});
	}
	_refinement(refinement) {
		return new ZodEffects({
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: {
				type: "refinement",
				refinement
			}
		});
	}
	superRefine(refinement) {
		return this._refinement(refinement);
	}
	constructor(def) {
		/** Alias of safeParseAsync */
		this.spa = this.safeParseAsync;
		this._def = def;
		this.parse = this.parse.bind(this);
		this.safeParse = this.safeParse.bind(this);
		this.parseAsync = this.parseAsync.bind(this);
		this.safeParseAsync = this.safeParseAsync.bind(this);
		this.spa = this.spa.bind(this);
		this.refine = this.refine.bind(this);
		this.refinement = this.refinement.bind(this);
		this.superRefine = this.superRefine.bind(this);
		this.optional = this.optional.bind(this);
		this.nullable = this.nullable.bind(this);
		this.nullish = this.nullish.bind(this);
		this.array = this.array.bind(this);
		this.promise = this.promise.bind(this);
		this.or = this.or.bind(this);
		this.and = this.and.bind(this);
		this.transform = this.transform.bind(this);
		this.brand = this.brand.bind(this);
		this.default = this.default.bind(this);
		this.catch = this.catch.bind(this);
		this.describe = this.describe.bind(this);
		this.pipe = this.pipe.bind(this);
		this.readonly = this.readonly.bind(this);
		this.isNullable = this.isNullable.bind(this);
		this.isOptional = this.isOptional.bind(this);
		this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (data) => this["~validate"](data)
		};
	}
	optional() {
		return ZodOptional.create(this, this._def);
	}
	nullable() {
		return ZodNullable.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return ZodArray.create(this);
	}
	promise() {
		return ZodPromise.create(this, this._def);
	}
	or(option) {
		return ZodUnion.create([this, option], this._def);
	}
	and(incoming) {
		return ZodIntersection.create(this, incoming, this._def);
	}
	transform(transform) {
		return new ZodEffects({
			...processCreateParams(this._def),
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: {
				type: "transform",
				transform
			}
		});
	}
	default(def) {
		const defaultValueFunc = typeof def === "function" ? def : () => def;
		return new ZodDefault({
			...processCreateParams(this._def),
			innerType: this,
			defaultValue: defaultValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodDefault
		});
	}
	brand() {
		return new ZodBranded({
			typeName: ZodFirstPartyTypeKind.ZodBranded,
			type: this,
			...processCreateParams(this._def)
		});
	}
	catch(def) {
		const catchValueFunc = typeof def === "function" ? def : () => def;
		return new ZodCatch({
			...processCreateParams(this._def),
			innerType: this,
			catchValue: catchValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodCatch
		});
	}
	describe(description) {
		const This = this.constructor;
		return new This({
			...this._def,
			description
		});
	}
	pipe(target) {
		return ZodPipeline.create(this, target);
	}
	readonly() {
		return ZodReadonly.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
	let secondsRegexSource = `[0-5]\\d`;
	if (args.precision) secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
	else if (args.precision == null) secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
	const secondsQuantifier = args.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
	return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
	let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
	const opts = [];
	opts.push(args.local ? `Z?` : `Z`);
	if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
	regex = `${regex}(${opts.join("|")})`;
	return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
	if ((version === "v4" || !version) && ipv4Regex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6Regex.test(ip)) return true;
	return false;
}
function isValidJWT(jwt, alg) {
	if (!jwtRegex.test(jwt)) return false;
	try {
		const [header] = jwt.split(".");
		if (!header) return false;
		const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
		const decoded = JSON.parse(atob(base64));
		if (typeof decoded !== "object" || decoded === null) return false;
		if ("typ" in decoded && decoded?.typ !== "JWT") return false;
		if (!decoded.alg) return false;
		if (alg && decoded.alg !== alg) return false;
		return true;
	} catch {
		return false;
	}
}
function isValidCidr(ip, version) {
	if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) return true;
	return false;
}
var ZodString = class ZodString extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = String(input.data);
		if (this._getType(input) !== ZodParsedType.string) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.string,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) if (check.kind === "min") {
			if (input.data.length < check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "string",
					inclusive: true,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (input.data.length > check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "string",
					inclusive: true,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "length") {
			const tooBig = input.data.length > check.value;
			const tooSmall = input.data.length < check.value;
			if (tooBig || tooSmall) {
				ctx = this._getOrReturnCtx(input, ctx);
				if (tooBig) addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "string",
					inclusive: true,
					exact: true,
					message: check.message
				});
				else if (tooSmall) addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "string",
					inclusive: true,
					exact: true,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "email") {
			if (!emailRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "email",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "emoji") {
			if (!emojiRegex) emojiRegex = new RegExp(_emojiRegex, "u");
			if (!emojiRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "emoji",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "uuid") {
			if (!uuidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "uuid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "nanoid") {
			if (!nanoidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "nanoid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cuid") {
			if (!cuidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cuid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cuid2") {
			if (!cuid2Regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cuid2",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "ulid") {
			if (!ulidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "ulid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "url") try {
			new URL(input.data);
		} catch {
			ctx = this._getOrReturnCtx(input, ctx);
			addIssueToContext(ctx, {
				validation: "url",
				code: ZodIssueCode.invalid_string,
				message: check.message
			});
			status.dirty();
		}
		else if (check.kind === "regex") {
			check.regex.lastIndex = 0;
			if (!check.regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "regex",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "trim") input.data = input.data.trim();
		else if (check.kind === "includes") {
			if (!input.data.includes(check.value, check.position)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: {
						includes: check.value,
						position: check.position
					},
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "toLowerCase") input.data = input.data.toLowerCase();
		else if (check.kind === "toUpperCase") input.data = input.data.toUpperCase();
		else if (check.kind === "startsWith") {
			if (!input.data.startsWith(check.value)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: { startsWith: check.value },
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "endsWith") {
			if (!input.data.endsWith(check.value)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: { endsWith: check.value },
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "datetime") {
			if (!datetimeRegex(check).test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "datetime",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "date") {
			if (!dateRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "date",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "time") {
			if (!timeRegex(check).test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "time",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "duration") {
			if (!durationRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "duration",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "ip") {
			if (!isValidIP(input.data, check.version)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "ip",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "jwt") {
			if (!isValidJWT(input.data, check.alg)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "jwt",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cidr") {
			if (!isValidCidr(input.data, check.version)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cidr",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "base64") {
			if (!base64Regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "base64",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "base64url") {
			if (!base64urlRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "base64url",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	_regex(regex, validation, message) {
		return this.refinement((data) => regex.test(data), {
			validation,
			code: ZodIssueCode.invalid_string,
			...errorUtil.errToObj(message)
		});
	}
	_addCheck(check) {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	email(message) {
		return this._addCheck({
			kind: "email",
			...errorUtil.errToObj(message)
		});
	}
	url(message) {
		return this._addCheck({
			kind: "url",
			...errorUtil.errToObj(message)
		});
	}
	emoji(message) {
		return this._addCheck({
			kind: "emoji",
			...errorUtil.errToObj(message)
		});
	}
	uuid(message) {
		return this._addCheck({
			kind: "uuid",
			...errorUtil.errToObj(message)
		});
	}
	nanoid(message) {
		return this._addCheck({
			kind: "nanoid",
			...errorUtil.errToObj(message)
		});
	}
	cuid(message) {
		return this._addCheck({
			kind: "cuid",
			...errorUtil.errToObj(message)
		});
	}
	cuid2(message) {
		return this._addCheck({
			kind: "cuid2",
			...errorUtil.errToObj(message)
		});
	}
	ulid(message) {
		return this._addCheck({
			kind: "ulid",
			...errorUtil.errToObj(message)
		});
	}
	base64(message) {
		return this._addCheck({
			kind: "base64",
			...errorUtil.errToObj(message)
		});
	}
	base64url(message) {
		return this._addCheck({
			kind: "base64url",
			...errorUtil.errToObj(message)
		});
	}
	jwt(options) {
		return this._addCheck({
			kind: "jwt",
			...errorUtil.errToObj(options)
		});
	}
	ip(options) {
		return this._addCheck({
			kind: "ip",
			...errorUtil.errToObj(options)
		});
	}
	cidr(options) {
		return this._addCheck({
			kind: "cidr",
			...errorUtil.errToObj(options)
		});
	}
	datetime(options) {
		if (typeof options === "string") return this._addCheck({
			kind: "datetime",
			precision: null,
			offset: false,
			local: false,
			message: options
		});
		return this._addCheck({
			kind: "datetime",
			precision: typeof options?.precision === "undefined" ? null : options?.precision,
			offset: options?.offset ?? false,
			local: options?.local ?? false,
			...errorUtil.errToObj(options?.message)
		});
	}
	date(message) {
		return this._addCheck({
			kind: "date",
			message
		});
	}
	time(options) {
		if (typeof options === "string") return this._addCheck({
			kind: "time",
			precision: null,
			message: options
		});
		return this._addCheck({
			kind: "time",
			precision: typeof options?.precision === "undefined" ? null : options?.precision,
			...errorUtil.errToObj(options?.message)
		});
	}
	duration(message) {
		return this._addCheck({
			kind: "duration",
			...errorUtil.errToObj(message)
		});
	}
	regex(regex, message) {
		return this._addCheck({
			kind: "regex",
			regex,
			...errorUtil.errToObj(message)
		});
	}
	includes(value, options) {
		return this._addCheck({
			kind: "includes",
			value,
			position: options?.position,
			...errorUtil.errToObj(options?.message)
		});
	}
	startsWith(value, message) {
		return this._addCheck({
			kind: "startsWith",
			value,
			...errorUtil.errToObj(message)
		});
	}
	endsWith(value, message) {
		return this._addCheck({
			kind: "endsWith",
			value,
			...errorUtil.errToObj(message)
		});
	}
	min(minLength, message) {
		return this._addCheck({
			kind: "min",
			value: minLength,
			...errorUtil.errToObj(message)
		});
	}
	max(maxLength, message) {
		return this._addCheck({
			kind: "max",
			value: maxLength,
			...errorUtil.errToObj(message)
		});
	}
	length(len, message) {
		return this._addCheck({
			kind: "length",
			value: len,
			...errorUtil.errToObj(message)
		});
	}
	/**
	* Equivalent to `.min(1)`
	*/
	nonempty(message) {
		return this.min(1, errorUtil.errToObj(message));
	}
	trim() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((ch) => ch.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((ch) => ch.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((ch) => ch.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((ch) => ch.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((ch) => ch.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((ch) => ch.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((ch) => ch.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((ch) => ch.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((ch) => ch.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((ch) => ch.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((ch) => ch.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((ch) => ch.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((ch) => ch.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((ch) => ch.kind === "base64url");
	}
	get minLength() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxLength() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
};
ZodString.create = (params) => {
	return new ZodString({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodString,
		coerce: params?.coerce ?? false,
		...processCreateParams(params)
	});
};
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
var ZodNumber = class ZodNumber extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
		this.step = this.multipleOf;
	}
	_parse(input) {
		if (this._def.coerce) input.data = Number(input.data);
		if (this._getType(input) !== ZodParsedType.number) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.number,
				received: ctx.parsedType
			});
			return INVALID;
		}
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) if (check.kind === "int") {
			if (!util.isInteger(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: "integer",
					received: "float",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "min") {
			if (check.inclusive ? input.data < check.value : input.data <= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "number",
					inclusive: check.inclusive,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (check.inclusive ? input.data > check.value : input.data >= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "number",
					inclusive: check.inclusive,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "multipleOf") {
			if (floatSafeRemainder(input.data, check.value) !== 0) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_multiple_of,
					multipleOf: check.value,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "finite") {
			if (!Number.isFinite(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_finite,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, {
				kind,
				value,
				inclusive,
				message: errorUtil.toString(message)
			}]
		});
	}
	_addCheck(check) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	int(message) {
		return this._addCheck({
			kind: "int",
			message: errorUtil.toString(message)
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message)
		});
	}
	finite(message) {
		return this._addCheck({
			kind: "finite",
			message: errorUtil.toString(message)
		});
	}
	safe(message) {
		return this._addCheck({
			kind: "min",
			inclusive: true,
			value: Number.MIN_SAFE_INTEGER,
			message: errorUtil.toString(message)
		})._addCheck({
			kind: "max",
			inclusive: true,
			value: Number.MAX_SAFE_INTEGER,
			message: errorUtil.toString(message)
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
	get isInt() {
		return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
	}
	get isFinite() {
		let max = null;
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") return true;
		else if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		} else if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return Number.isFinite(min) && Number.isFinite(max);
	}
};
ZodNumber.create = (params) => {
	return new ZodNumber({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodNumber,
		coerce: params?.coerce || false,
		...processCreateParams(params)
	});
};
var ZodBigInt = class ZodBigInt extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
	}
	_parse(input) {
		if (this._def.coerce) try {
			input.data = BigInt(input.data);
		} catch {
			return this._getInvalidInput(input);
		}
		if (this._getType(input) !== ZodParsedType.bigint) return this._getInvalidInput(input);
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) if (check.kind === "min") {
			if (check.inclusive ? input.data < check.value : input.data <= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					type: "bigint",
					minimum: check.value,
					inclusive: check.inclusive,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (check.inclusive ? input.data > check.value : input.data >= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					type: "bigint",
					maximum: check.value,
					inclusive: check.inclusive,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "multipleOf") {
			if (input.data % check.value !== BigInt(0)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_multiple_of,
					multipleOf: check.value,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	_getInvalidInput(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.bigint,
			received: ctx.parsedType
		});
		return INVALID;
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, {
				kind,
				value,
				inclusive,
				message: errorUtil.toString(message)
			}]
		});
	}
	_addCheck(check) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message)
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
};
ZodBigInt.create = (params) => {
	return new ZodBigInt({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodBigInt,
		coerce: params?.coerce ?? false,
		...processCreateParams(params)
	});
};
var ZodBoolean = class extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = Boolean(input.data);
		if (this._getType(input) !== ZodParsedType.boolean) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.boolean,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodBoolean.create = (params) => {
	return new ZodBoolean({
		typeName: ZodFirstPartyTypeKind.ZodBoolean,
		coerce: params?.coerce || false,
		...processCreateParams(params)
	});
};
var ZodDate = class ZodDate extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = new Date(input.data);
		if (this._getType(input) !== ZodParsedType.date) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.date,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (Number.isNaN(input.data.getTime())) {
			addIssueToContext(this._getOrReturnCtx(input), { code: ZodIssueCode.invalid_date });
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) if (check.kind === "min") {
			if (input.data.getTime() < check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					message: check.message,
					inclusive: true,
					exact: false,
					minimum: check.value,
					type: "date"
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (input.data.getTime() > check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					message: check.message,
					inclusive: true,
					exact: false,
					maximum: check.value,
					type: "date"
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: new Date(input.data.getTime())
		};
	}
	_addCheck(check) {
		return new ZodDate({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	min(minDate, message) {
		return this._addCheck({
			kind: "min",
			value: minDate.getTime(),
			message: errorUtil.toString(message)
		});
	}
	max(maxDate, message) {
		return this._addCheck({
			kind: "max",
			value: maxDate.getTime(),
			message: errorUtil.toString(message)
		});
	}
	get minDate() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min != null ? new Date(min) : null;
	}
	get maxDate() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max != null ? new Date(max) : null;
	}
};
ZodDate.create = (params) => {
	return new ZodDate({
		checks: [],
		coerce: params?.coerce || false,
		typeName: ZodFirstPartyTypeKind.ZodDate,
		...processCreateParams(params)
	});
};
var ZodSymbol = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.symbol) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.symbol,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodSymbol.create = (params) => {
	return new ZodSymbol({
		typeName: ZodFirstPartyTypeKind.ZodSymbol,
		...processCreateParams(params)
	});
};
var ZodUndefined = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.undefined,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodUndefined.create = (params) => {
	return new ZodUndefined({
		typeName: ZodFirstPartyTypeKind.ZodUndefined,
		...processCreateParams(params)
	});
};
var ZodNull = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.null) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.null,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodNull.create = (params) => {
	return new ZodNull({
		typeName: ZodFirstPartyTypeKind.ZodNull,
		...processCreateParams(params)
	});
};
var ZodAny = class extends ZodType {
	constructor() {
		super(...arguments);
		this._any = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodAny.create = (params) => {
	return new ZodAny({
		typeName: ZodFirstPartyTypeKind.ZodAny,
		...processCreateParams(params)
	});
};
var ZodUnknown = class extends ZodType {
	constructor() {
		super(...arguments);
		this._unknown = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodUnknown.create = (params) => {
	return new ZodUnknown({
		typeName: ZodFirstPartyTypeKind.ZodUnknown,
		...processCreateParams(params)
	});
};
var ZodNever = class extends ZodType {
	_parse(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.never,
			received: ctx.parsedType
		});
		return INVALID;
	}
};
ZodNever.create = (params) => {
	return new ZodNever({
		typeName: ZodFirstPartyTypeKind.ZodNever,
		...processCreateParams(params)
	});
};
var ZodVoid = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.void,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodVoid.create = (params) => {
	return new ZodVoid({
		typeName: ZodFirstPartyTypeKind.ZodVoid,
		...processCreateParams(params)
	});
};
var ZodArray = class ZodArray extends ZodType {
	_parse(input) {
		const { ctx, status } = this._processInputParams(input);
		const def = this._def;
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (def.exactLength !== null) {
			const tooBig = ctx.data.length > def.exactLength.value;
			const tooSmall = ctx.data.length < def.exactLength.value;
			if (tooBig || tooSmall) {
				addIssueToContext(ctx, {
					code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
					minimum: tooSmall ? def.exactLength.value : void 0,
					maximum: tooBig ? def.exactLength.value : void 0,
					type: "array",
					inclusive: true,
					exact: true,
					message: def.exactLength.message
				});
				status.dirty();
			}
		}
		if (def.minLength !== null) {
			if (ctx.data.length < def.minLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.minLength.message
				});
				status.dirty();
			}
		}
		if (def.maxLength !== null) {
			if (ctx.data.length > def.maxLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.maxLength.message
				});
				status.dirty();
			}
		}
		if (ctx.common.async) return Promise.all([...ctx.data].map((item, i) => {
			return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		})).then((result) => {
			return ParseStatus.mergeArray(status, result);
		});
		const result = [...ctx.data].map((item, i) => {
			return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		});
		return ParseStatus.mergeArray(status, result);
	}
	get element() {
		return this._def.type;
	}
	min(minLength, message) {
		return new ZodArray({
			...this._def,
			minLength: {
				value: minLength,
				message: errorUtil.toString(message)
			}
		});
	}
	max(maxLength, message) {
		return new ZodArray({
			...this._def,
			maxLength: {
				value: maxLength,
				message: errorUtil.toString(message)
			}
		});
	}
	length(len, message) {
		return new ZodArray({
			...this._def,
			exactLength: {
				value: len,
				message: errorUtil.toString(message)
			}
		});
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodArray.create = (schema, params) => {
	return new ZodArray({
		type: schema,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: ZodFirstPartyTypeKind.ZodArray,
		...processCreateParams(params)
	});
};
function deepPartialify(schema) {
	if (schema instanceof ZodObject) {
		const newShape = {};
		for (const key in schema.shape) {
			const fieldSchema = schema.shape[key];
			newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
		}
		return new ZodObject({
			...schema._def,
			shape: () => newShape
		});
	} else if (schema instanceof ZodArray) return new ZodArray({
		...schema._def,
		type: deepPartialify(schema.element)
	});
	else if (schema instanceof ZodOptional) return ZodOptional.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodNullable) return ZodNullable.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodTuple) return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
	else return schema;
}
var ZodObject = class ZodObject extends ZodType {
	constructor() {
		super(...arguments);
		this._cached = null;
		/**
		* @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
		* If you want to pass through unknown properties, use `.passthrough()` instead.
		*/
		this.nonstrict = this.passthrough;
		/**
		* @deprecated Use `.extend` instead
		*  */
		this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const shape = this._def.shape();
		const keys = util.objectKeys(shape);
		this._cached = {
			shape,
			keys
		};
		return this._cached;
	}
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.object) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const { status, ctx } = this._processInputParams(input);
		const { shape, keys: shapeKeys } = this._getCached();
		const extraKeys = [];
		if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
			for (const key in ctx.data) if (!shapeKeys.includes(key)) extraKeys.push(key);
		}
		const pairs = [];
		for (const key of shapeKeys) {
			const keyValidator = shape[key];
			const value = ctx.data[key];
			pairs.push({
				key: {
					status: "valid",
					value: key
				},
				value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
				alwaysSet: key in ctx.data
			});
		}
		if (this._def.catchall instanceof ZodNever) {
			const unknownKeys = this._def.unknownKeys;
			if (unknownKeys === "passthrough") for (const key of extraKeys) pairs.push({
				key: {
					status: "valid",
					value: key
				},
				value: {
					status: "valid",
					value: ctx.data[key]
				}
			});
			else if (unknownKeys === "strict") {
				if (extraKeys.length > 0) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.unrecognized_keys,
						keys: extraKeys
					});
					status.dirty();
				}
			} else if (unknownKeys === "strip") {} else throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
		} else {
			const catchall = this._def.catchall;
			for (const key of extraKeys) {
				const value = ctx.data[key];
				pairs.push({
					key: {
						status: "valid",
						value: key
					},
					value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
					alwaysSet: key in ctx.data
				});
			}
		}
		if (ctx.common.async) return Promise.resolve().then(async () => {
			const syncPairs = [];
			for (const pair of pairs) {
				const key = await pair.key;
				const value = await pair.value;
				syncPairs.push({
					key,
					value,
					alwaysSet: pair.alwaysSet
				});
			}
			return syncPairs;
		}).then((syncPairs) => {
			return ParseStatus.mergeObjectSync(status, syncPairs);
		});
		else return ParseStatus.mergeObjectSync(status, pairs);
	}
	get shape() {
		return this._def.shape();
	}
	strict(message) {
		errorUtil.errToObj;
		return new ZodObject({
			...this._def,
			unknownKeys: "strict",
			...message !== void 0 ? { errorMap: (issue, ctx) => {
				const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
				if (issue.code === "unrecognized_keys") return { message: errorUtil.errToObj(message).message ?? defaultError };
				return { message: defaultError };
			} } : {}
		});
	}
	strip() {
		return new ZodObject({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new ZodObject({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(augmentation) {
		return new ZodObject({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...augmentation
			})
		});
	}
	/**
	* Prior to zod@1.0.12 there was a bug in the
	* inferred type of merged objects. Please
	* upgrade if you are experiencing issues.
	*/
	merge(merging) {
		return new ZodObject({
			unknownKeys: merging._def.unknownKeys,
			catchall: merging._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...merging._def.shape()
			}),
			typeName: ZodFirstPartyTypeKind.ZodObject
		});
	}
	setKey(key, schema) {
		return this.augment({ [key]: schema });
	}
	catchall(index) {
		return new ZodObject({
			...this._def,
			catchall: index
		});
	}
	pick(mask) {
		const shape = {};
		for (const key of util.objectKeys(mask)) if (mask[key] && this.shape[key]) shape[key] = this.shape[key];
		return new ZodObject({
			...this._def,
			shape: () => shape
		});
	}
	omit(mask) {
		const shape = {};
		for (const key of util.objectKeys(this.shape)) if (!mask[key]) shape[key] = this.shape[key];
		return new ZodObject({
			...this._def,
			shape: () => shape
		});
	}
	/**
	* @deprecated
	*/
	deepPartial() {
		return deepPartialify(this);
	}
	partial(mask) {
		const newShape = {};
		for (const key of util.objectKeys(this.shape)) {
			const fieldSchema = this.shape[key];
			if (mask && !mask[key]) newShape[key] = fieldSchema;
			else newShape[key] = fieldSchema.optional();
		}
		return new ZodObject({
			...this._def,
			shape: () => newShape
		});
	}
	required(mask) {
		const newShape = {};
		for (const key of util.objectKeys(this.shape)) if (mask && !mask[key]) newShape[key] = this.shape[key];
		else {
			let newField = this.shape[key];
			while (newField instanceof ZodOptional) newField = newField._def.innerType;
			newShape[key] = newField;
		}
		return new ZodObject({
			...this._def,
			shape: () => newShape
		});
	}
	keyof() {
		return createZodEnum(util.objectKeys(this.shape));
	}
};
ZodObject.create = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
ZodObject.strictCreate = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strict",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
ZodObject.lazycreate = (shape, params) => {
	return new ZodObject({
		shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
var ZodUnion = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const options = this._def.options;
		function handleResults(results) {
			for (const result of results) if (result.result.status === "valid") return result.result;
			for (const result of results) if (result.result.status === "dirty") {
				ctx.common.issues.push(...result.ctx.common.issues);
				return result.result;
			}
			const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors
			});
			return INVALID;
		}
		if (ctx.common.async) return Promise.all(options.map(async (option) => {
			const childCtx = {
				...ctx,
				common: {
					...ctx.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await option._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx
				}),
				ctx: childCtx
			};
		})).then(handleResults);
		else {
			let dirty = void 0;
			const issues = [];
			for (const option of options) {
				const childCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: []
					},
					parent: null
				};
				const result = option._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx
				});
				if (result.status === "valid") return result;
				else if (result.status === "dirty" && !dirty) dirty = {
					result,
					ctx: childCtx
				};
				if (childCtx.common.issues.length) issues.push(childCtx.common.issues);
			}
			if (dirty) {
				ctx.common.issues.push(...dirty.ctx.common.issues);
				return dirty.result;
			}
			const unionErrors = issues.map((issues) => new ZodError(issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors
			});
			return INVALID;
		}
	}
	get options() {
		return this._def.options;
	}
};
ZodUnion.create = (types, params) => {
	return new ZodUnion({
		options: types,
		typeName: ZodFirstPartyTypeKind.ZodUnion,
		...processCreateParams(params)
	});
};
var getDiscriminator = (type) => {
	if (type instanceof ZodLazy) return getDiscriminator(type.schema);
	else if (type instanceof ZodEffects) return getDiscriminator(type.innerType());
	else if (type instanceof ZodLiteral) return [type.value];
	else if (type instanceof ZodEnum) return type.options;
	else if (type instanceof ZodNativeEnum) return util.objectValues(type.enum);
	else if (type instanceof ZodDefault) return getDiscriminator(type._def.innerType);
	else if (type instanceof ZodUndefined) return [void 0];
	else if (type instanceof ZodNull) return [null];
	else if (type instanceof ZodOptional) return [void 0, ...getDiscriminator(type.unwrap())];
	else if (type instanceof ZodNullable) return [null, ...getDiscriminator(type.unwrap())];
	else if (type instanceof ZodBranded) return getDiscriminator(type.unwrap());
	else if (type instanceof ZodReadonly) return getDiscriminator(type.unwrap());
	else if (type instanceof ZodCatch) return getDiscriminator(type._def.innerType);
	else return [];
};
var ZodDiscriminatedUnion = class ZodDiscriminatedUnion extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const discriminator = this.discriminator;
		const discriminatorValue = ctx.data[discriminator];
		const option = this.optionsMap.get(discriminatorValue);
		if (!option) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union_discriminator,
				options: Array.from(this.optionsMap.keys()),
				path: [discriminator]
			});
			return INVALID;
		}
		if (ctx.common.async) return option._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
		else return option._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	/**
	* The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
	* However, it only allows a union of objects, all of which need to share a discriminator property. This property must
	* have a different value for each object in the union.
	* @param discriminator the name of the discriminator property
	* @param types an array of object schemas
	* @param params
	*/
	static create(discriminator, options, params) {
		const optionsMap = /* @__PURE__ */ new Map();
		for (const type of options) {
			const discriminatorValues = getDiscriminator(type.shape[discriminator]);
			if (!discriminatorValues.length) throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
			for (const value of discriminatorValues) {
				if (optionsMap.has(value)) throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
				optionsMap.set(value, type);
			}
		}
		return new ZodDiscriminatedUnion({
			typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
			discriminator,
			options,
			optionsMap,
			...processCreateParams(params)
		});
	}
};
function mergeValues(a, b) {
	const aType = getParsedType(a);
	const bType = getParsedType(b);
	if (a === b) return {
		valid: true,
		data: a
	};
	else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		const bKeys = util.objectKeys(b);
		const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return { valid: false };
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) return { valid: false };
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return { valid: false };
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) return {
		valid: true,
		data: a
	};
	else return { valid: false };
}
var ZodIntersection = class extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const handleParsed = (parsedLeft, parsedRight) => {
			if (isAborted(parsedLeft) || isAborted(parsedRight)) return INVALID;
			const merged = mergeValues(parsedLeft.value, parsedRight.value);
			if (!merged.valid) {
				addIssueToContext(ctx, { code: ZodIssueCode.invalid_intersection_types });
				return INVALID;
			}
			if (isDirty(parsedLeft) || isDirty(parsedRight)) status.dirty();
			return {
				status: status.value,
				value: merged.data
			};
		};
		if (ctx.common.async) return Promise.all([this._def.left._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}), this._def.right._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		})]).then(([left, right]) => handleParsed(left, right));
		else return handleParsed(this._def.left._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}), this._def.right._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}));
	}
};
ZodIntersection.create = (left, right, params) => {
	return new ZodIntersection({
		left,
		right,
		typeName: ZodFirstPartyTypeKind.ZodIntersection,
		...processCreateParams(params)
	});
};
var ZodTuple = class ZodTuple extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (ctx.data.length < this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_small,
				minimum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array"
			});
			return INVALID;
		}
		if (!this._def.rest && ctx.data.length > this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_big,
				maximum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array"
			});
			status.dirty();
		}
		const items = [...ctx.data].map((item, itemIndex) => {
			const schema = this._def.items[itemIndex] || this._def.rest;
			if (!schema) return null;
			return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
		}).filter((x) => !!x);
		if (ctx.common.async) return Promise.all(items).then((results) => {
			return ParseStatus.mergeArray(status, results);
		});
		else return ParseStatus.mergeArray(status, items);
	}
	get items() {
		return this._def.items;
	}
	rest(rest) {
		return new ZodTuple({
			...this._def,
			rest
		});
	}
};
ZodTuple.create = (schemas, params) => {
	if (!Array.isArray(schemas)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new ZodTuple({
		items: schemas,
		typeName: ZodFirstPartyTypeKind.ZodTuple,
		rest: null,
		...processCreateParams(params)
	});
};
var ZodRecord = class ZodRecord extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const pairs = [];
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		for (const key in ctx.data) pairs.push({
			key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
			value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
			alwaysSet: key in ctx.data
		});
		if (ctx.common.async) return ParseStatus.mergeObjectAsync(status, pairs);
		else return ParseStatus.mergeObjectSync(status, pairs);
	}
	get element() {
		return this._def.valueType;
	}
	static create(first, second, third) {
		if (second instanceof ZodType) return new ZodRecord({
			keyType: first,
			valueType: second,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(third)
		});
		return new ZodRecord({
			keyType: ZodString.create(),
			valueType: first,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(second)
		});
	}
};
var ZodMap = class extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.map) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.map,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		const pairs = [...ctx.data.entries()].map(([key, value], index) => {
			return {
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
				value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
			};
		});
		if (ctx.common.async) {
			const finalMap = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					if (key.status === "aborted" || value.status === "aborted") return INVALID;
					if (key.status === "dirty" || value.status === "dirty") status.dirty();
					finalMap.set(key.value, value.value);
				}
				return {
					status: status.value,
					value: finalMap
				};
			});
		} else {
			const finalMap = /* @__PURE__ */ new Map();
			for (const pair of pairs) {
				const key = pair.key;
				const value = pair.value;
				if (key.status === "aborted" || value.status === "aborted") return INVALID;
				if (key.status === "dirty" || value.status === "dirty") status.dirty();
				finalMap.set(key.value, value.value);
			}
			return {
				status: status.value,
				value: finalMap
			};
		}
	}
};
ZodMap.create = (keyType, valueType, params) => {
	return new ZodMap({
		valueType,
		keyType,
		typeName: ZodFirstPartyTypeKind.ZodMap,
		...processCreateParams(params)
	});
};
var ZodSet = class ZodSet extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.set) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.set,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const def = this._def;
		if (def.minSize !== null) {
			if (ctx.data.size < def.minSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.minSize.message
				});
				status.dirty();
			}
		}
		if (def.maxSize !== null) {
			if (ctx.data.size > def.maxSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.maxSize.message
				});
				status.dirty();
			}
		}
		const valueType = this._def.valueType;
		function finalizeSet(elements) {
			const parsedSet = /* @__PURE__ */ new Set();
			for (const element of elements) {
				if (element.status === "aborted") return INVALID;
				if (element.status === "dirty") status.dirty();
				parsedSet.add(element.value);
			}
			return {
				status: status.value,
				value: parsedSet
			};
		}
		const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
		if (ctx.common.async) return Promise.all(elements).then((elements) => finalizeSet(elements));
		else return finalizeSet(elements);
	}
	min(minSize, message) {
		return new ZodSet({
			...this._def,
			minSize: {
				value: minSize,
				message: errorUtil.toString(message)
			}
		});
	}
	max(maxSize, message) {
		return new ZodSet({
			...this._def,
			maxSize: {
				value: maxSize,
				message: errorUtil.toString(message)
			}
		});
	}
	size(size, message) {
		return this.min(size, message).max(size, message);
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodSet.create = (valueType, params) => {
	return new ZodSet({
		valueType,
		minSize: null,
		maxSize: null,
		typeName: ZodFirstPartyTypeKind.ZodSet,
		...processCreateParams(params)
	});
};
var ZodFunction = class ZodFunction extends ZodType {
	constructor() {
		super(...arguments);
		this.validate = this.implement;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.function) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.function,
				received: ctx.parsedType
			});
			return INVALID;
		}
		function makeArgsIssue(args, error) {
			return makeIssue({
				data: args,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_arguments,
					argumentsError: error
				}
			});
		}
		function makeReturnsIssue(returns, error) {
			return makeIssue({
				data: returns,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_return_type,
					returnTypeError: error
				}
			});
		}
		const params = { errorMap: ctx.common.contextualErrorMap };
		const fn = ctx.data;
		if (this._def.returns instanceof ZodPromise) {
			const me = this;
			return OK(async function(...args) {
				const error = new ZodError([]);
				const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
					error.addIssue(makeArgsIssue(args, e));
					throw error;
				});
				const result = await Reflect.apply(fn, this, parsedArgs);
				return await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
					error.addIssue(makeReturnsIssue(result, e));
					throw error;
				});
			});
		} else {
			const me = this;
			return OK(function(...args) {
				const parsedArgs = me._def.args.safeParse(args, params);
				if (!parsedArgs.success) throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
				const result = Reflect.apply(fn, this, parsedArgs.data);
				const parsedReturns = me._def.returns.safeParse(result, params);
				if (!parsedReturns.success) throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
				return parsedReturns.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...items) {
		return new ZodFunction({
			...this._def,
			args: ZodTuple.create(items).rest(ZodUnknown.create())
		});
	}
	returns(returnType) {
		return new ZodFunction({
			...this._def,
			returns: returnType
		});
	}
	implement(func) {
		return this.parse(func);
	}
	strictImplement(func) {
		return this.parse(func);
	}
	static create(args, returns, params) {
		return new ZodFunction({
			args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
			returns: returns || ZodUnknown.create(),
			typeName: ZodFirstPartyTypeKind.ZodFunction,
			...processCreateParams(params)
		});
	}
};
var ZodLazy = class extends ZodType {
	get schema() {
		return this._def.getter();
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		return this._def.getter()._parse({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
	}
};
ZodLazy.create = (getter, params) => {
	return new ZodLazy({
		getter,
		typeName: ZodFirstPartyTypeKind.ZodLazy,
		...processCreateParams(params)
	});
};
var ZodLiteral = class extends ZodType {
	_parse(input) {
		if (input.data !== this._def.value) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_literal,
				expected: this._def.value
			});
			return INVALID;
		}
		return {
			status: "valid",
			value: input.data
		};
	}
	get value() {
		return this._def.value;
	}
};
ZodLiteral.create = (value, params) => {
	return new ZodLiteral({
		value,
		typeName: ZodFirstPartyTypeKind.ZodLiteral,
		...processCreateParams(params)
	});
};
function createZodEnum(values, params) {
	return new ZodEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodEnum,
		...processCreateParams(params)
	});
}
var ZodEnum = class ZodEnum extends ZodType {
	_parse(input) {
		if (typeof input.data !== "string") {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type
			});
			return INVALID;
		}
		if (!this._cache) this._cache = new Set(this._def.values);
		if (!this._cache.has(input.data)) {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Values() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Enum() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	extract(values, newDef = this._def) {
		return ZodEnum.create(values, {
			...this._def,
			...newDef
		});
	}
	exclude(values, newDef = this._def) {
		return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
			...this._def,
			...newDef
		});
	}
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
	_parse(input) {
		const nativeEnumValues = util.getValidEnumValues(this._def.values);
		const ctx = this._getOrReturnCtx(input);
		if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type
			});
			return INVALID;
		}
		if (!this._cache) this._cache = new Set(util.getValidEnumValues(this._def.values));
		if (!this._cache.has(input.data)) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get enum() {
		return this._def.values;
	}
};
ZodNativeEnum.create = (values, params) => {
	return new ZodNativeEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
		...processCreateParams(params)
	});
};
var ZodPromise = class extends ZodType {
	unwrap() {
		return this._def.type;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.promise,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK((ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data)).then((data) => {
			return this._def.type.parseAsync(data, {
				path: ctx.path,
				errorMap: ctx.common.contextualErrorMap
			});
		}));
	}
};
ZodPromise.create = (schema, params) => {
	return new ZodPromise({
		type: schema,
		typeName: ZodFirstPartyTypeKind.ZodPromise,
		...processCreateParams(params)
	});
};
var ZodEffects = class extends ZodType {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const effect = this._def.effect || null;
		const checkCtx = {
			addIssue: (arg) => {
				addIssueToContext(ctx, arg);
				if (arg.fatal) status.abort();
				else status.dirty();
			},
			get path() {
				return ctx.path;
			}
		};
		checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
		if (effect.type === "preprocess") {
			const processed = effect.transform(ctx.data, checkCtx);
			if (ctx.common.async) return Promise.resolve(processed).then(async (processed) => {
				if (status.value === "aborted") return INVALID;
				const result = await this._def.schema._parseAsync({
					data: processed,
					path: ctx.path,
					parent: ctx
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			});
			else {
				if (status.value === "aborted") return INVALID;
				const result = this._def.schema._parseSync({
					data: processed,
					path: ctx.path,
					parent: ctx
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			}
		}
		if (effect.type === "refinement") {
			const executeRefinement = (acc) => {
				const result = effect.refinement(acc, checkCtx);
				if (ctx.common.async) return Promise.resolve(result);
				if (result instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return acc;
			};
			if (ctx.common.async === false) {
				const inner = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				executeRefinement(inner.value);
				return {
					status: status.value,
					value: inner.value
				};
			} else return this._def.schema._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}).then((inner) => {
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				return executeRefinement(inner.value).then(() => {
					return {
						status: status.value,
						value: inner.value
					};
				});
			});
		}
		if (effect.type === "transform") {
			if (ctx.common.async === false) {
				const base = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (!isValid(base)) return INVALID;
				const result = effect.transform(base.value, checkCtx);
				if (result instanceof Promise) throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
				return {
					status: status.value,
					value: result
				};
			} else return this._def.schema._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}).then((base) => {
				if (!isValid(base)) return INVALID;
				return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
					status: status.value,
					value: result
				}));
			});
		}
		util.assertNever(effect);
	}
};
ZodEffects.create = (schema, effect, params) => {
	return new ZodEffects({
		schema,
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		effect,
		...processCreateParams(params)
	});
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
	return new ZodEffects({
		schema,
		effect: {
			type: "preprocess",
			transform: preprocess
		},
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		...processCreateParams(params)
	});
};
var ZodOptional = class extends ZodType {
	_parse(input) {
		if (this._getType(input) === ZodParsedType.undefined) return OK(void 0);
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodOptional.create = (type, params) => {
	return new ZodOptional({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodOptional,
		...processCreateParams(params)
	});
};
var ZodNullable = class extends ZodType {
	_parse(input) {
		if (this._getType(input) === ZodParsedType.null) return OK(null);
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodNullable.create = (type, params) => {
	return new ZodNullable({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodNullable,
		...processCreateParams(params)
	});
};
var ZodDefault = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		let data = ctx.data;
		if (ctx.parsedType === ZodParsedType.undefined) data = this._def.defaultValue();
		return this._def.innerType._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
ZodDefault.create = (type, params) => {
	return new ZodDefault({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodDefault,
		defaultValue: typeof params.default === "function" ? params.default : () => params.default,
		...processCreateParams(params)
	});
};
var ZodCatch = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const newCtx = {
			...ctx,
			common: {
				...ctx.common,
				issues: []
			}
		};
		const result = this._def.innerType._parse({
			data: newCtx.data,
			path: newCtx.path,
			parent: { ...newCtx }
		});
		if (isAsync(result)) return result.then((result) => {
			return {
				status: "valid",
				value: result.status === "valid" ? result.value : this._def.catchValue({
					get error() {
						return new ZodError(newCtx.common.issues);
					},
					input: newCtx.data
				})
			};
		});
		else return {
			status: "valid",
			value: result.status === "valid" ? result.value : this._def.catchValue({
				get error() {
					return new ZodError(newCtx.common.issues);
				},
				input: newCtx.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
ZodCatch.create = (type, params) => {
	return new ZodCatch({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodCatch,
		catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
		...processCreateParams(params)
	});
};
var ZodNaN = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.nan) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.nan,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return {
			status: "valid",
			value: input.data
		};
	}
};
ZodNaN.create = (params) => {
	return new ZodNaN({
		typeName: ZodFirstPartyTypeKind.ZodNaN,
		...processCreateParams(params)
	});
};
var ZodBranded = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const data = ctx.data;
		return this._def.type._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
	}
	unwrap() {
		return this._def.type;
	}
};
var ZodPipeline = class ZodPipeline extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.common.async) {
			const handleAsync = async () => {
				const inResult = await this._def.in._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inResult.status === "aborted") return INVALID;
				if (inResult.status === "dirty") {
					status.dirty();
					return DIRTY(inResult.value);
				} else return this._def.out._parseAsync({
					data: inResult.value,
					path: ctx.path,
					parent: ctx
				});
			};
			return handleAsync();
		} else {
			const inResult = this._def.in._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
			if (inResult.status === "aborted") return INVALID;
			if (inResult.status === "dirty") {
				status.dirty();
				return {
					status: "dirty",
					value: inResult.value
				};
			} else return this._def.out._parseSync({
				data: inResult.value,
				path: ctx.path,
				parent: ctx
			});
		}
	}
	static create(a, b) {
		return new ZodPipeline({
			in: a,
			out: b,
			typeName: ZodFirstPartyTypeKind.ZodPipeline
		});
	}
};
var ZodReadonly = class extends ZodType {
	_parse(input) {
		const result = this._def.innerType._parse(input);
		const freeze = (data) => {
			if (isValid(data)) data.value = Object.freeze(data.value);
			return data;
		};
		return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodReadonly.create = (type, params) => {
	return new ZodReadonly({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodReadonly,
		...processCreateParams(params)
	});
};
function cleanParams(params, data) {
	const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
	return typeof p === "string" ? { message: p } : p;
}
function custom(check, _params = {}, fatal) {
	if (check) return ZodAny.create().superRefine((data, ctx) => {
		const r = check(data);
		if (r instanceof Promise) return r.then((r) => {
			if (!r) {
				const params = cleanParams(_params, data);
				const _fatal = params.fatal ?? fatal ?? true;
				ctx.addIssue({
					code: "custom",
					...params,
					fatal: _fatal
				});
			}
		});
		if (!r) {
			const params = cleanParams(_params, data);
			const _fatal = params.fatal ?? fatal ?? true;
			ctx.addIssue({
				code: "custom",
				...params,
				fatal: _fatal
			});
		}
	});
	return ZodAny.create();
}
ZodObject.lazycreate;
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind) {
	ZodFirstPartyTypeKind["ZodString"] = "ZodString";
	ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
	ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
	ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
	ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
	ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
	ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
	ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
	ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
	ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
	ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
	ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
	ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
	ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
	ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
	ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
	ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
	ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
	ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
	ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
	ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
	ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
	ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
	ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
	ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
	ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
	ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
	ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
	ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
	ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
	ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
	ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
	ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
	ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
	ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
	ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var stringType = ZodString.create;
var numberType = ZodNumber.create;
ZodNaN.create;
ZodBigInt.create;
var booleanType = ZodBoolean.create;
ZodDate.create;
ZodSymbol.create;
ZodUndefined.create;
ZodNull.create;
ZodAny.create;
var unknownType = ZodUnknown.create;
ZodNever.create;
ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
ZodIntersection.create;
ZodTuple.create;
var recordType = ZodRecord.create;
ZodMap.create;
ZodSet.create;
ZodFunction.create;
ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
ZodNativeEnum.create;
ZodPromise.create;
ZodEffects.create;
ZodOptional.create;
ZodNullable.create;
ZodEffects.createWithPreprocess;
ZodPipeline.create;
//#endregion
//#region node_modules/@x402/core/dist/esm/chunk-BJTO5JO5.mjs
var __require = /* @__PURE__ */ ((x) => typeof __require$1 !== "undefined" ? __require$1 : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof __require$1 !== "undefined" ? __require$1 : a)[b] }) : x)(function(x) {
	if (typeof __require$1 !== "undefined") return __require$1.apply(this, arguments);
	throw Error("Dynamic require of \"" + x + "\" is not supported");
});
//#endregion
//#region node_modules/@x402/core/dist/esm/chunk-N4QXZG2Z.mjs
var NonEmptyString = stringType().min(1);
var Any = recordType(unknownType());
var OptionalAny = recordType(unknownType()).optional().nullable();
var NetworkSchemaV1 = NonEmptyString;
var NetworkSchemaV2 = stringType().min(3).refine((val) => val.includes(":"), { message: "Network must be in CAIP-2 format (e.g., 'eip155:84532')" });
unionType([NetworkSchemaV1, NetworkSchemaV2]);
var PRINTABLE_ASCII_REGEX = /^[\x20-\x7e]+$/;
var ResourceInfoSchema = objectType({
	url: NonEmptyString,
	description: stringType().nullish().transform((v) => v ?? void 0),
	mimeType: stringType().nullish().transform((v) => v ?? void 0),
	serviceName: stringType().min(1).max(32).regex(PRINTABLE_ASCII_REGEX).nullish().transform((v) => v ?? void 0),
	tags: arrayType(stringType().min(1).max(32).regex(PRINTABLE_ASCII_REGEX)).max(5).nullish().transform((v) => v ?? void 0),
	iconUrl: stringType().max(2048).nullish().transform((v) => v ?? void 0)
});
var PaymentRequirementsV1Schema = objectType({
	scheme: NonEmptyString,
	network: NetworkSchemaV1,
	maxAmountRequired: NonEmptyString,
	resource: NonEmptyString,
	description: stringType(),
	mimeType: stringType().optional(),
	outputSchema: Any.optional().nullable(),
	payTo: NonEmptyString,
	maxTimeoutSeconds: numberType().positive(),
	asset: NonEmptyString,
	extra: OptionalAny
});
var PaymentRequiredV1Schema = objectType({
	x402Version: literalType(1),
	error: stringType().optional(),
	accepts: arrayType(PaymentRequirementsV1Schema).min(1)
});
var PaymentPayloadV1Schema = objectType({
	x402Version: literalType(1),
	scheme: NonEmptyString,
	network: NetworkSchemaV1,
	payload: Any
});
var PaymentRequirementsV2Schema = objectType({
	scheme: NonEmptyString,
	network: NetworkSchemaV2,
	amount: NonEmptyString,
	asset: NonEmptyString,
	payTo: NonEmptyString,
	maxTimeoutSeconds: numberType().positive(),
	extra: OptionalAny
});
var PaymentRequiredV2Schema = objectType({
	x402Version: literalType(2),
	error: stringType().nullish().transform((v) => v ?? void 0),
	resource: ResourceInfoSchema,
	accepts: arrayType(PaymentRequirementsV2Schema).min(1),
	extensions: OptionalAny
});
var PaymentPayloadV2Schema = objectType({
	x402Version: literalType(2),
	resource: ResourceInfoSchema.nullish().transform((v) => v ?? void 0),
	accepted: PaymentRequirementsV2Schema,
	payload: Any,
	extensions: OptionalAny
});
unionType([PaymentRequirementsV1Schema, PaymentRequirementsV2Schema]);
discriminatedUnionType("x402Version", [PaymentRequiredV1Schema, PaymentRequiredV2Schema]);
discriminatedUnionType("x402Version", [PaymentPayloadV1Schema, PaymentPayloadV2Schema]);
//#endregion
//#region node_modules/@x402/core/dist/esm/chunk-P3DFEIO7.mjs
var VerifyError = class extends Error {
	/**
	* Creates a VerifyError from a failed verification response.
	*
	* @param statusCode - HTTP status code from the facilitator
	* @param response - The verify response containing failure details
	*/
	constructor(statusCode, response) {
		const reason = response.invalidReason || "unknown reason";
		const message = response.invalidMessage;
		super(message ? `${reason}: ${message}` : reason);
		this.name = "VerifyError";
		this.statusCode = statusCode;
		this.invalidReason = response.invalidReason;
		this.invalidMessage = response.invalidMessage;
		this.payer = response.payer;
	}
};
var SettleError = class extends Error {
	/**
	* Creates a SettleError from a failed settlement response.
	*
	* @param statusCode - HTTP status code from the facilitator
	* @param response - The settle response containing error details
	*/
	constructor(statusCode, response) {
		const reason = response.errorReason || "unknown reason";
		const message = response.errorMessage;
		super(message ? `${reason}: ${message}` : reason);
		this.name = "SettleError";
		this.statusCode = statusCode;
		this.errorReason = response.errorReason;
		this.errorMessage = response.errorMessage;
		this.payer = response.payer;
		this.transaction = response.transaction;
		this.network = response.network;
	}
};
var FacilitatorResponseError = class extends Error {
	/**
	* Creates a FacilitatorResponseError for malformed facilitator responses.
	*
	* @param message - The boundary error message
	*/
	constructor(message) {
		super(message);
		this.name = "FacilitatorResponseError";
	}
};
var FacilitatorTimeoutError = class extends FacilitatorResponseError {
	/**
	* Creates a FacilitatorTimeoutError.
	*
	* @param operation - The facilitator operation that timed out
	* @param timeoutMs - The configured timeout in milliseconds
	*/
	constructor(operation, timeoutMs) {
		super(`Facilitator ${operation} request timed out after ${timeoutMs}ms`);
		this.name = "FacilitatorTimeoutError";
		this.operation = operation;
		this.timeoutMs = timeoutMs;
	}
};
function getFacilitatorResponseError(error) {
	let current = error;
	while (current instanceof Error) {
		if (current instanceof FacilitatorResponseError) return current;
		current = current.cause;
	}
	return null;
}
//#endregion
//#region node_modules/@x402/core/dist/esm/chunk-VKJGPEW2.mjs
var SETTLEMENT_OVERRIDES_HEADER = "Settlement-Overrides";
var PAYMENT_REQUIRED_CACHE_CONTROL = "no-store";
function withPrivateCacheControl(value) {
	if (!value) return "private";
	if (value.split(",").map((directive) => directive.trim().toLowerCase()).includes("private")) return value;
	return `${value}, private`;
}
var RouteConfigurationError = class extends Error {
	/**
	* Creates a new RouteConfigurationError with the given validation errors.
	*
	* @param errors - The validation errors that caused this exception.
	*/
	constructor(errors) {
		const message = `x402 Route Configuration Errors:
${errors.map((e) => `  - ${e.message}`).join("\n")}`;
		super(message);
		this.name = "RouteConfigurationError";
		this.errors = errors;
	}
};
var FALLBACK_PAYWALL_HTML = `<!DOCTYPE html>
<html>
  <head>
    <title>Payment Required</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div style="max-width: 600px; margin: 50px auto; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
      <h1>Payment Required</h1>
      <p>This resource is protected by the x402 payment protocol.</p>
      <p style="margin-top: 2rem; padding: 1rem; background: #fef3c7; border-radius: 0.5rem;">
        <strong>Note to developers:</strong> install <code>@x402/paywall</code> to enable
        the in-browser wallet connection and payment UI. Programmatic clients should read
        the payment requirements from the 402 response headers and JSON body.
      </p>
    </div>
  </body>
</html>`;
var x402HTTPResourceServer = class {
	/**
	* Creates a new x402HTTPResourceServer instance.
	*
	* @param ResourceServer - The core x402ResourceServer instance to use
	* @param routes - Route configuration for payment-protected endpoints
	*/
	constructor(ResourceServer, routes) {
		this.compiledRoutes = [];
		this.protectedRequestHooks = [];
		this.ResourceServer = ResourceServer;
		this.routesConfig = routes;
		const normalizedRoutes = typeof routes === "object" && !("accepts" in routes) ? routes : { "*": routes };
		for (const [pattern, config] of Object.entries(normalizedRoutes)) {
			const parsed = this.parseRoutePattern(pattern);
			this.compiledRoutes.push({
				verb: parsed.verb,
				regex: parsed.regex,
				config,
				pattern: parsed.path
			});
		}
	}
	/**
	* Get the underlying x402ResourceServer instance.
	*
	* @returns The underlying x402ResourceServer instance
	*/
	get server() {
		return this.ResourceServer;
	}
	/**
	* Get the routes configuration.
	*
	* @returns The routes configuration
	*/
	get routes() {
		return this.routesConfig;
	}
	/**
	* Initialize the HTTP resource server.
	*
	* This method initializes the underlying resource server (fetching facilitator support)
	* and then validates that all route payment configurations have corresponding
	* registered schemes and facilitator support.
	*
	* @throws RouteConfigurationError if any route's payment options don't have
	*         corresponding registered schemes or facilitator support
	*
	* @example
	* ```typescript
	* const httpServer = new x402HTTPResourceServer(server, routes);
	* await httpServer.initialize();
	* ```
	*/
	async initialize() {
		await this.ResourceServer.initialize();
		const errors = this.validateRouteConfiguration();
		if (errors.length > 0) throw new RouteConfigurationError(errors);
	}
	/**
	* Register a custom paywall provider for generating HTML
	*
	* @param provider - PaywallProvider instance
	* @returns This service instance for chaining
	*/
	registerPaywallProvider(provider) {
		this.paywallProvider = provider;
		return this;
	}
	/**
	* Register a hook that runs on every request to a protected route, before payment processing.
	* Hooks are executed in order of registration. The first hook to return a non-void result wins.
	*
	* @param hook - The request hook function
	* @returns The x402HTTPResourceServer instance for chaining
	*/
	onProtectedRequest(hook) {
		this.protectedRequestHooks.push(hook);
		return this;
	}
	/**
	* Process HTTP request and return response instructions
	* This is the main entry point for framework middleware
	*
	* @param context - HTTP request context
	* @param paywallConfig - Optional paywall configuration
	* @returns Process result indicating next action for middleware
	*/
	async processHTTPRequest(context, paywallConfig) {
		const method = context.method || context.adapter.getMethod();
		context = {
			...context,
			method
		};
		const { adapter, path } = context;
		const routeMatch = this.getRouteConfig(path, method);
		if (!routeMatch) return { type: "no-payment-required" };
		const { config: routeConfig, pattern: routePattern } = routeMatch;
		const enrichedContext = {
			...context,
			routePattern
		};
		for (const hook of this.getProtectedRequestHooks(routeConfig)) {
			const result = await hook(enrichedContext, routeConfig);
			if (result && "grantAccess" in result) return { type: "no-payment-required" };
			if (result && "abort" in result) return {
				type: "payment-error",
				response: {
					status: 403,
					headers: { "Content-Type": "application/json" },
					body: { error: result.reason }
				}
			};
		}
		const paymentOptions = this.normalizePaymentOptions(routeConfig);
		const paymentPayload = this.extractPayment(adapter);
		const resourceInfo = {
			url: routeConfig.resource || enrichedContext.adapter.getUrl(),
			description: routeConfig.description || "",
			mimeType: routeConfig.mimeType || "",
			...routeConfig.serviceName !== void 0 && { serviceName: routeConfig.serviceName },
			...routeConfig.tags !== void 0 && { tags: routeConfig.tags },
			...routeConfig.iconUrl !== void 0 && { iconUrl: routeConfig.iconUrl }
		};
		let requirements = await this.ResourceServer.buildPaymentRequirementsFromOptions(paymentOptions, enrichedContext);
		let extensions = routeConfig.extensions;
		if (extensions) extensions = this.ResourceServer.enrichExtensions(extensions, enrichedContext);
		const transportContext = { request: enrichedContext };
		const paymentRequired = await this.ResourceServer.createPaymentRequiredResponse(requirements, resourceInfo, !paymentPayload ? "Payment required" : void 0, extensions, transportContext);
		if (!paymentPayload) {
			const unpaidBody = routeConfig.unpaidResponseBody ? await routeConfig.unpaidResponseBody(enrichedContext) : void 0;
			return {
				type: "payment-error",
				response: this.createHTTPResponse(paymentRequired, this.isWebBrowser(adapter), paywallConfig, routeConfig.customPaywallHtml, unpaidBody)
			};
		}
		try {
			const matchingRequirements = this.ResourceServer.findMatchingRequirements(paymentRequired.accepts, paymentPayload);
			if (!matchingRequirements) {
				const errorResponse = await this.ResourceServer.createPaymentRequiredResponse(requirements, resourceInfo, "No matching payment requirements", extensions, transportContext);
				return {
					type: "payment-error",
					response: this.createHTTPResponse(errorResponse, false, paywallConfig)
				};
			}
			const extensionResult = this.ResourceServer.validateExtensions(paymentRequired, paymentPayload);
			if (!extensionResult.valid) {
				const errorResponse = await this.ResourceServer.createPaymentRequiredResponse(requirements, resourceInfo, extensionResult.invalidReason, extensions, transportContext, paymentPayload);
				return {
					type: "payment-error",
					response: this.createHTTPResponse(errorResponse, false, paywallConfig)
				};
			}
			const verifyResult = await this.ResourceServer.verifyPayment(paymentPayload, matchingRequirements, extensions, transportContext);
			if (!verifyResult.isValid) {
				const errorResponse = await this.ResourceServer.createPaymentRequiredResponse(requirements, resourceInfo, verifyResult.invalidReason, extensions, transportContext, paymentPayload);
				return {
					type: "payment-error",
					response: this.createHTTPResponse(errorResponse, false, paywallConfig)
				};
			}
			if (verifyResult.skipHandler) return await this.processSkipHandlerSettlement(paymentPayload, matchingRequirements, extensions, transportContext, verifyResult.skipHandler);
			return {
				type: "payment-verified",
				cancellationDispatcher: this.ResourceServer.createPaymentCancellationDispatcher(paymentPayload, matchingRequirements, extensions, transportContext),
				paymentPayload,
				paymentRequirements: matchingRequirements,
				declaredExtensions: extensions
			};
		} catch (error) {
			if (error instanceof FacilitatorResponseError) throw error;
			const errorResponse = await this.ResourceServer.createPaymentRequiredResponse(requirements, resourceInfo, error instanceof Error ? error.message : "Payment verification failed", extensions, transportContext);
			return {
				type: "payment-error",
				response: this.createHTTPResponse(errorResponse, false, paywallConfig)
			};
		}
	}
	/**
	* Process settlement after successful response
	*
	* @param paymentPayload - The verified payment payload
	* @param requirements - The matching payment requirements
	* @param declaredExtensions - Optional declared extensions (for per-key enrichment)
	* @param transportContext - Optional HTTP transport context
	* @param settlementOverrides - Optional settlement overrides (e.g., partial settlement amount)
	* @returns ProcessSettleResultResponse - SettleResponse with headers if success or errorReason if failure
	*/
	async processSettlement(paymentPayload, requirements, declaredExtensions, transportContext, settlementOverrides) {
		if (transportContext?.request && !transportContext.request.method) transportContext = {
			...transportContext,
			request: {
				...transportContext.request,
				method: transportContext.request.adapter.getMethod()
			}
		};
		try {
			let resolvedOverrides = settlementOverrides;
			if (!resolvedOverrides && transportContext?.responseHeaders) {
				const overridesKey = SETTLEMENT_OVERRIDES_HEADER.toLowerCase();
				const rawValue = Object.entries(transportContext.responseHeaders).find(([key]) => key.toLowerCase() === overridesKey)?.[1];
				if (rawValue) try {
					resolvedOverrides = JSON.parse(rawValue);
				} catch {}
			}
			const settleResponse = await this.ResourceServer.settlePayment(paymentPayload, requirements, declaredExtensions, transportContext, resolvedOverrides);
			if (!settleResponse.success) {
				const failure = {
					...settleResponse,
					success: false,
					errorReason: settleResponse.errorReason || "Settlement failed",
					errorMessage: settleResponse.errorMessage || settleResponse.errorReason || "Settlement failed",
					headers: this.createSettlementHeaders(settleResponse)
				};
				const response = await this.buildSettlementFailureResponse(failure, transportContext);
				return {
					...failure,
					response
				};
			}
			return {
				...settleResponse,
				success: true,
				headers: this.createSettlementHeaders(settleResponse),
				requirements
			};
		} catch (error) {
			if (error instanceof FacilitatorResponseError) throw error;
			if (error instanceof SettleError) {
				const errorReason2 = error.errorReason || error.message;
				const settleResponse2 = {
					success: false,
					errorReason: errorReason2,
					errorMessage: error.errorMessage || errorReason2,
					payer: error.payer,
					network: error.network,
					transaction: error.transaction
				};
				const failure2 = {
					...settleResponse2,
					success: false,
					errorReason: errorReason2,
					headers: this.createSettlementHeaders(settleResponse2)
				};
				const response2 = await this.buildSettlementFailureResponse(failure2, transportContext);
				return {
					...failure2,
					response: response2
				};
			}
			const errorReason = error instanceof Error ? error.message : "Settlement failed";
			const settleResponse = {
				success: false,
				errorReason,
				errorMessage: errorReason,
				network: requirements.network,
				transaction: ""
			};
			const failure = {
				...settleResponse,
				success: false,
				errorReason,
				headers: this.createSettlementHeaders(settleResponse)
			};
			const response = await this.buildSettlementFailureResponse(failure, transportContext);
			return {
				...failure,
				response
			};
		}
	}
	/**
	* Check if a request requires payment based on route configuration
	*
	* @param context - HTTP request context
	* @returns True if the route requires payment, false otherwise
	*/
	requiresPayment(context) {
		const method = context.method || context.adapter.getMethod();
		return this.getRouteConfig(context.path, method) !== void 0;
	}
	/**
	* Settle a verified payment that requested `skipHandler`, packaging the
	* result as a `payment-error` HTTPProcessResult so framework adapters can
	* write the response without invoking the route handler.
	*
	* - On success: status 200 + PAYMENT-RESPONSE header + configured body.
	* - On failure: the standard 402 settlement-failure response.
	*
	* @param paymentPayload - Verified payment payload.
	* @param requirements - Matched payment requirements.
	* @param declaredExtensions - Optional declared extensions for the route.
	* @param transportContext - Optional HTTP transport context.
	* @param skipHandlerResponse - Optional content type + body to return on success.
	* @returns A `payment-error` HTTPProcessResult carrying the final response.
	*/
	async processSkipHandlerSettlement(paymentPayload, requirements, declaredExtensions, transportContext, skipHandlerResponse) {
		const settleResult = await this.processSettlement(paymentPayload, requirements, declaredExtensions, transportContext);
		if (!settleResult.success) return {
			type: "payment-error",
			response: settleResult.response
		};
		const contentType = skipHandlerResponse?.contentType ?? "application/json";
		const body = skipHandlerResponse?.body ?? {};
		return {
			type: "payment-error",
			response: {
				status: 200,
				headers: {
					"Content-Type": contentType,
					...settleResult.headers,
					"Cache-Control": withPrivateCacheControl(null)
				},
				body,
				isHtml: contentType.includes("text/html")
			}
		};
	}
	/**
	* Build HTTPResponseInstructions for settlement failure.
	* Uses settlementFailedResponseBody hook if configured, otherwise defaults to empty body.
	*
	* @param failure - Settlement failure result with headers
	* @param transportContext - Optional HTTP transport context for the request
	* @returns HTTP response instructions for the 402 settlement failure response
	*/
	async buildSettlementFailureResponse(failure, transportContext) {
		const settlementHeaders = failure.headers;
		const routeConfig = transportContext ? this.getRouteConfig(transportContext.request.path, transportContext.request.method) : void 0;
		const customBody = routeConfig?.config.settlementFailedResponseBody ? await routeConfig.config.settlementFailedResponseBody(transportContext.request, failure) : void 0;
		const contentType = customBody ? customBody.contentType : "application/json";
		const body = customBody ? customBody.body : {};
		return {
			status: 402,
			headers: {
				"Content-Type": contentType,
				...settlementHeaders,
				"Cache-Control": PAYMENT_REQUIRED_CACHE_CONTROL
			},
			body,
			isHtml: contentType.includes("text/html")
		};
	}
	/**
	* Normalizes a RouteConfig's accepts field into an array of PaymentOptions
	* Handles both single PaymentOption and array formats
	*
	* @param routeConfig - Route configuration
	* @returns Array of payment options
	*/
	normalizePaymentOptions(routeConfig) {
		return Array.isArray(routeConfig.accepts) ? routeConfig.accepts : [routeConfig.accepts];
	}
	/**
	* Manual request hooks run before extension transport hooks for declared extensions.
	*
	* @param routeConfig - Route configuration for the matched request
	* @returns Hooks in invocation order
	*/
	getProtectedRequestHooks(routeConfig) {
		const hooks = [...this.protectedRequestHooks];
		const declaredExtensions = routeConfig.extensions;
		if (!declaredExtensions) return hooks;
		for (const extension of this.ResourceServer.getExtensions()) {
			const hook = extension.transportHooks?.http?.onProtectedRequest;
			if (!hook || !(extension.key in declaredExtensions)) continue;
			hooks.push((context, routeConfig2) => hook(declaredExtensions[extension.key], context, routeConfig2));
		}
		return hooks;
	}
	/**
	* Validates that all payment options in routes have corresponding registered schemes
	* and facilitator support.
	*
	* @returns Array of validation errors (empty if all routes are valid)
	*/
	validateRouteConfiguration() {
		const errors = [];
		const normalizedRoutes = typeof this.routesConfig === "object" && !("accepts" in this.routesConfig) ? Object.entries(this.routesConfig) : [["*", this.routesConfig]];
		for (const [pattern, config] of normalizedRoutes) {
			const pathPart = pattern.includes(" ") ? pattern.split(/\s+/)[1] : pattern;
			if (pathPart && pathPart.includes("*") && config.extensions && "bazaar" in config.extensions) console.warn(`[x402] Route "${pattern}": Wildcard (*) patterns with bazaar discovery extensions will auto-generate parameter names (var1, var2, ...). Consider using named parameters instead (e.g. /weather/:city) for better discovery metadata.`);
			const paymentOptions = this.normalizePaymentOptions(config);
			for (const option of paymentOptions) {
				if (!this.ResourceServer.hasRegisteredScheme(option.network, option.scheme)) {
					errors.push({
						routePattern: pattern,
						scheme: option.scheme,
						network: option.network,
						reason: "missing_scheme",
						message: `Route "${pattern}": No scheme implementation registered for "${option.scheme}" on network "${option.network}"`
					});
					continue;
				}
				if (!this.ResourceServer.getSupportedKind(2, option.network, option.scheme)) errors.push({
					routePattern: pattern,
					scheme: option.scheme,
					network: option.network,
					reason: "missing_facilitator",
					message: `Route "${pattern}": Facilitator does not support scheme "${option.scheme}" on network "${option.network}"`
				});
			}
		}
		return errors;
	}
	/**
	* Get route configuration for a request
	*
	* @param path - Request path
	* @param method - HTTP method
	* @returns Route configuration and pattern, or undefined if no match
	*/
	getRouteConfig(path, method) {
		const normalizedPath = this.normalizePath(path);
		const upperMethod = method.toUpperCase();
		const matchingRoute = this.compiledRoutes.find((route) => route.regex.test(normalizedPath) && (route.verb === "*" || route.verb === upperMethod));
		if (!matchingRoute) return void 0;
		return {
			config: matchingRoute.config,
			pattern: matchingRoute.pattern
		};
	}
	/**
	* Extract payment from HTTP headers (handles v1 and v2)
	*
	* @param adapter - HTTP adapter
	* @returns Decoded payment payload or null
	*/
	extractPayment(adapter) {
		const header = adapter.getHeader("payment-signature") || adapter.getHeader("PAYMENT-SIGNATURE");
		if (header) try {
			return decodePaymentSignatureHeader(header);
		} catch (error) {
			console.warn("Failed to decode PAYMENT-SIGNATURE header:", error);
		}
		return null;
	}
	/**
	* Check if request is from a web browser
	*
	* @param adapter - HTTP adapter
	* @returns True if request appears to be from a browser
	*/
	isWebBrowser(adapter) {
		const accept = adapter.getAcceptHeader();
		const userAgent = adapter.getUserAgent();
		return accept.includes("text/html") && userAgent.includes("Mozilla");
	}
	/**
	* Create HTTP response instructions from payment required
	*
	* @param paymentRequired - Payment requirements
	* @param isWebBrowser - Whether request is from browser
	* @param paywallConfig - Paywall configuration
	* @param customHtml - Custom HTML template
	* @param unpaidResponse - Optional custom response (content type and body) for unpaid API requests
	* @returns Response instructions
	*/
	createHTTPResponse(paymentRequired, isWebBrowser, paywallConfig, customHtml, unpaidResponse) {
		const status = paymentRequired.error === "permit2_allowance_required" ? 412 : 402;
		const response = this.createHTTPPaymentRequiredResponse(paymentRequired);
		if (isWebBrowser) {
			const html = this.generatePaywallHTML(paymentRequired, paywallConfig, customHtml);
			return {
				status,
				headers: {
					"Content-Type": "text/html",
					...response.headers
				},
				body: html,
				isHtml: true
			};
		}
		const contentType = unpaidResponse ? unpaidResponse.contentType : "application/json";
		const body = unpaidResponse ? unpaidResponse.body : {};
		return {
			status,
			headers: {
				"Content-Type": contentType,
				...response.headers
			},
			body
		};
	}
	/**
	* Create HTTP payment required response (v1 puts in body, v2 puts in header)
	*
	* @param paymentRequired - Payment required object
	* @returns Headers and body for the HTTP response
	*/
	createHTTPPaymentRequiredResponse(paymentRequired) {
		return { headers: {
			"PAYMENT-REQUIRED": encodePaymentRequiredHeader(paymentRequired),
			"Cache-Control": PAYMENT_REQUIRED_CACHE_CONTROL
		} };
	}
	/**
	* Create settlement response headers
	*
	* @param settleResponse - Settlement response
	* @returns Headers to add to response
	*/
	createSettlementHeaders(settleResponse) {
		return { "PAYMENT-RESPONSE": encodePaymentResponseHeader(settleResponse) };
	}
	/**
	* Parse route pattern into verb and regex
	*
	* @param pattern - Route pattern like "GET /api/*", "/api/[id]", or "/api/:id"
	* @returns Parsed pattern with verb and regex
	*/
	parseRoutePattern(pattern) {
		const [verb, path] = pattern.includes(" ") ? pattern.split(/\s+/) : ["*", pattern];
		const regex = new RegExp(`^${path.replace(/\\/g, "\\\\").replace(/[$()+.?^{|}]/g, "\\$&").replace(/\*/g, ".*?").replace(/\[([^\]]+)\]/g, "[^/]+").replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, "[^/]+").replace(/\//g, "\\/")}$`, "is");
		return {
			verb: verb.toUpperCase(),
			regex,
			path
		};
	}
	/**
	* Normalize path for matching
	*
	* @param path - Raw path from request
	* @returns Normalized path
	*/
	normalizePath(path) {
		return path.split(/[?#]/)[0].split(/(%2[fF]|%5[cC])/).map((part, i) => {
			if (i % 2 === 1) return part;
			try {
				return decodeURIComponent(part);
			} catch {
				return part;
			}
		}).join("").replace(/\\/g, "/").replace(/\/+/g, "/").replace(/(.+?)\/+$/, "$1");
	}
	/**
	* Generate paywall HTML for browser requests
	*
	* @param paymentRequired - Payment required response
	* @param paywallConfig - Optional paywall configuration
	* @param customHtml - Optional custom HTML template
	* @returns HTML string
	*/
	generatePaywallHTML(paymentRequired, paywallConfig, customHtml) {
		if (customHtml) return customHtml;
		if (this.paywallProvider) return this.paywallProvider.generateHtml(paymentRequired, paywallConfig);
		try {
			const paywall = __require("@x402/paywall");
			const displayAmount = this.getDisplayAmount(paymentRequired);
			const resource = paymentRequired.resource;
			return paywall.getPaywallHtml({
				amount: displayAmount,
				paymentRequired,
				currentUrl: resource?.url || paywallConfig?.currentUrl || "",
				testnet: paywallConfig?.testnet ?? true,
				appName: paywallConfig?.appName,
				appLogo: paywallConfig?.appLogo,
				sessionTokenEndpoint: paywallConfig?.sessionTokenEndpoint
			});
		} catch {}
		return FALLBACK_PAYWALL_HTML;
	}
	/**
	* Extract display amount from payment requirements.
	* Uses the registered scheme's decimal precision for the asset, falling back to 6.
	*
	* @param paymentRequired - The payment required object
	* @returns The display amount in decimal format
	*/
	getDisplayAmount(paymentRequired) {
		const accepts = paymentRequired.accepts;
		if (accepts && accepts.length > 0) {
			const firstReq = accepts[0];
			if ("amount" in firstReq) {
				const decimals = this.ResourceServer.getAssetDecimalsForRequirements(firstReq);
				return parseFloat(firstReq.amount) / 10 ** decimals;
			}
		}
		return 0;
	}
};
var DEFAULT_FACILITATOR_URL = "https://x402.org/facilitator";
var DEFAULT_TIMEOUT_MS = 3e4;
var MAX_TIMEOUT_MS = 2147483647;
var GET_SUPPORTED_RETRIES = 3;
var GET_SUPPORTED_RETRY_DELAY_MS = 1e3;
var MAX_RETRY_DELAY_MS = 3e4;
function computeRetryDelay(retryAfter, attempt) {
	let delay = null;
	if (retryAfter !== null) {
		const trimmedRetryAfter = retryAfter.trim();
		if (/^\d+$/.test(trimmedRetryAfter)) delay = Number(trimmedRetryAfter) * 1e3;
		else {
			const retryDate = Date.parse(retryAfter);
			if (!isNaN(retryDate)) delay = retryDate - Date.now();
		}
	}
	if (delay === null || delay <= 0) delay = GET_SUPPORTED_RETRY_DELAY_MS * Math.pow(2, attempt);
	return Math.min(delay, MAX_RETRY_DELAY_MS);
}
var verifyResponseSchema = objectType({
	isValid: booleanType(),
	invalidReason: stringType().nullish().transform((v) => v ?? void 0),
	invalidMessage: stringType().nullish().transform((v) => v ?? void 0),
	payer: stringType().nullish().transform((v) => v ?? void 0),
	extensions: recordType(stringType(), unknownType()).nullish().transform((v) => v ?? void 0),
	extra: recordType(stringType(), unknownType()).nullish().transform((v) => v ?? void 0)
});
var settleResponseSchema = objectType({
	success: booleanType(),
	errorReason: stringType().nullish().transform((v) => v ?? void 0),
	errorMessage: stringType().nullish().transform((v) => v ?? void 0),
	payer: stringType().nullish().transform((v) => v ?? void 0),
	transaction: stringType(),
	network: custom((value) => typeof value === "string"),
	amount: stringType().nullish().transform((v) => v ?? void 0),
	extensions: recordType(stringType(), unknownType()).nullish().transform((v) => v ?? void 0),
	extra: recordType(stringType(), unknownType()).nullish().transform((v) => v ?? void 0)
});
var supportedResponseSchema = objectType({
	kinds: arrayType(objectType({
		x402Version: numberType(),
		scheme: stringType(),
		network: custom((value) => typeof value === "string"),
		extra: recordType(stringType(), unknownType()).nullish().transform((v) => v ?? void 0)
	})),
	extensions: arrayType(stringType()).default([]),
	signers: recordType(stringType(), arrayType(stringType())).default({})
});
function responseExcerpt(text, limit = 200) {
	const compact = text.trim().replace(/\s+/g, " ");
	if (!compact) return "<empty response>";
	if (compact.length <= limit) return compact;
	return `${compact.slice(0, limit - 3)}...`;
}
function isAbortOrTimeoutError(error) {
	let current = error;
	for (let depth = 0; depth < 10 && current !== null && typeof current === "object"; depth++) {
		const name = current.name;
		if (name === "TimeoutError" || name === "AbortError") return true;
		current = current.cause;
	}
	return false;
}
var EXTENSION_RESPONSE_LOG_FIELD_ALLOWLIST = [
	"status",
	"rejectedReason",
	"reason",
	"code"
];
function logExtensionResponsesHeader(response) {
	const header = response.headers.get("EXTENSION-RESPONSES");
	if (!header) return;
	try {
		const decoded = JSON.parse(safeBase64Decode(header));
		if (!decoded || typeof decoded !== "object" || Array.isArray(decoded)) return;
		const sanitized = {};
		for (const [extensionKey, payload] of Object.entries(decoded)) {
			const source = payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
			const filtered = {};
			for (const key of EXTENSION_RESPONSE_LOG_FIELD_ALLOWLIST) if (source[key] !== void 0) filtered[key] = source[key];
			sanitized[extensionKey] = filtered;
		}
		console.log(`[x402] extension responses: ${JSON.stringify(sanitized)}`);
	} catch {}
}
async function parseSuccessResponse(response, schema, operation) {
	const text = await response.text();
	let data;
	try {
		data = JSON.parse(text);
	} catch {
		throw new FacilitatorResponseError(`Facilitator ${operation} returned invalid JSON: ${responseExcerpt(text)}`);
	}
	const parsed = schema.safeParse(data);
	if (!parsed.success) throw new FacilitatorResponseError(`Facilitator ${operation} returned invalid data: ${responseExcerpt(text)}`);
	return parsed.data;
}
var HTTPFacilitatorClient = class {
	/**
	* Creates a new HTTPFacilitatorClient instance.
	*
	* @param config - Configuration options for the facilitator client
	*/
	constructor(config) {
		this.url = (config?.url || DEFAULT_FACILITATOR_URL).replace(/\/+$/, "");
		const timeoutMs = config?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
		if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0 || timeoutMs > MAX_TIMEOUT_MS) throw new RangeError(`timeoutMs must be a positive integer number of milliseconds no greater than ${MAX_TIMEOUT_MS}, got ${timeoutMs}`);
		this.timeoutMs = timeoutMs;
		this._createAuthHeaders = config?.createAuthHeaders;
	}
	/**
	* Verify a payment with the facilitator
	*
	* @param paymentPayload - The payment to verify
	* @param paymentRequirements - The requirements to verify against
	* @returns Verification response
	*/
	async verify(paymentPayload, paymentRequirements) {
		let headers = { "Content-Type": "application/json" };
		if (this._createAuthHeaders) {
			const authHeaders = await this.createAuthHeaders("verify");
			headers = {
				...headers,
				...authHeaders.headers
			};
		}
		return this.withRequestTimeout("verify", async (signal) => {
			const response = await fetch(`${this.url}/verify`, {
				method: "POST",
				headers,
				redirect: "follow",
				body: JSON.stringify({
					x402Version: paymentPayload.x402Version,
					paymentPayload: this.toJsonSafe(paymentPayload),
					paymentRequirements: this.toJsonSafe(paymentRequirements)
				}),
				signal
			});
			if (!response.ok) {
				const text = await response.text();
				let data;
				try {
					data = JSON.parse(text);
				} catch {
					throw new Error(`Facilitator verify failed (${response.status}): ${responseExcerpt(text)}`);
				}
				if (typeof data === "object" && data !== null && "isValid" in data) throw new VerifyError(response.status, data);
				throw new Error(`Facilitator verify failed (${response.status}): ${responseExcerpt(JSON.stringify(data))}`);
			}
			const verifyResult = await parseSuccessResponse(response, verifyResponseSchema, "verify");
			logExtensionResponsesHeader(response);
			return verifyResult;
		});
	}
	/**
	* Settle a payment with the facilitator
	*
	* @param paymentPayload - The payment to settle
	* @param paymentRequirements - The requirements for settlement
	* @returns Settlement response
	*/
	async settle(paymentPayload, paymentRequirements) {
		let headers = { "Content-Type": "application/json" };
		if (this._createAuthHeaders) {
			const authHeaders = await this.createAuthHeaders("settle");
			headers = {
				...headers,
				...authHeaders.headers
			};
		}
		return this.withRequestTimeout("settle", async (signal) => {
			const response = await fetch(`${this.url}/settle`, {
				method: "POST",
				headers,
				redirect: "follow",
				body: JSON.stringify({
					x402Version: paymentPayload.x402Version,
					paymentPayload: this.toJsonSafe(paymentPayload),
					paymentRequirements: this.toJsonSafe(paymentRequirements)
				}),
				signal
			});
			if (!response.ok) {
				const text = await response.text();
				let data;
				try {
					data = JSON.parse(text);
				} catch {
					throw new Error(`Facilitator settle failed (${response.status}): ${responseExcerpt(text)}`);
				}
				if (typeof data === "object" && data !== null && "success" in data) throw new SettleError(response.status, data);
				throw new Error(`Facilitator settle failed (${response.status}): ${responseExcerpt(JSON.stringify(data))}`);
			}
			const settleResult = await parseSuccessResponse(response, settleResponseSchema, "settle");
			logExtensionResponsesHeader(response);
			return settleResult;
		});
	}
	/**
	* Get supported payment kinds and extensions from the facilitator.
	* Retries with exponential backoff on 429 rate limit errors.
	*
	* @returns Supported payment kinds and extensions
	*/
	async getSupported() {
		let headers = { "Content-Type": "application/json" };
		if (this._createAuthHeaders) {
			const authHeaders = await this.createAuthHeaders("supported");
			headers = {
				...headers,
				...authHeaders.headers
			};
		}
		let lastError = null;
		for (let attempt = 0; attempt < GET_SUPPORTED_RETRIES; attempt++) {
			const outcome = await this.withRequestTimeout("supported", async (signal) => {
				const response = await fetch(`${this.url}/supported`, {
					method: "GET",
					headers,
					redirect: "follow",
					signal
				});
				if (response.ok) return {
					kind: "success",
					value: await parseSuccessResponse(response, supportedResponseSchema, "supported")
				};
				const errorText = await response.text().catch((cause) => {
					if (isAbortOrTimeoutError(cause)) throw cause;
					return response.statusText;
				});
				return {
					kind: "http-error",
					status: response.status,
					retryAfter: response.headers.get("Retry-After"),
					error: /* @__PURE__ */ new Error(`Facilitator getSupported failed (${response.status}): ${responseExcerpt(errorText)}`)
				};
			});
			if (outcome.kind === "success") return outcome.value;
			lastError = outcome.error;
			if (outcome.status === 429 && attempt < GET_SUPPORTED_RETRIES - 1) {
				const delay = computeRetryDelay(outcome.retryAfter, attempt);
				await new Promise((resolve) => setTimeout(resolve, delay));
				continue;
			}
			throw lastError;
		}
		throw lastError ?? /* @__PURE__ */ new Error("Facilitator getSupported failed after retries");
	}
	/**
	* Creates authentication headers for a specific path.
	*
	* @param path - The path to create authentication headers for (e.g., "verify", "settle", "supported")
	* @returns An object containing the authentication headers for the specified path
	*/
	async createAuthHeaders(path) {
		if (!this._createAuthHeaders) return { headers: {} };
		const authHeaders = await this._createAuthHeaders();
		const isHeaderObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
		if (![
			"verify",
			"settle",
			"supported",
			"bazaar"
		].some((key) => isHeaderObject(authHeaders[key])) && Object.values(authHeaders).some((value) => !isHeaderObject(value))) throw new Error("createAuthHeaders must return an object keyed by facilitator path, e.g. { verify: { Authorization: \"...\" }, settle: { ... }, supported: { ... } }, but received a flat headers object. See https://github.com/x402-foundation/x402/issues/2762");
		const headersForPath = authHeaders[path];
		return { headers: isHeaderObject(headersForPath) ? headersForPath : {} };
	}
	/**
	* Runs a single facilitator HTTP attempt under this client's request deadline.
	* The provided signal must be passed to `fetch` so the deadline also covers
	* response-body consumption.
	*
	* @param operation - The facilitator operation name ("verify", "settle", "supported")
	* @param run - The attempt to execute with the deadline's AbortSignal
	* @returns The attempt's result
	* @throws FacilitatorTimeoutError when the deadline elapses before completion
	*/
	async withRequestTimeout(operation, run) {
		const signal = AbortSignal.timeout(this.timeoutMs);
		try {
			return await run(signal);
		} catch (error) {
			if (signal.aborted && isAbortOrTimeoutError(error)) throw new FacilitatorTimeoutError(operation, this.timeoutMs);
			throw error;
		}
	}
	/**
	* Helper to convert objects to JSON-safe format.
	* Handles BigInt and other non-JSON types.
	*
	* @param obj - The object to convert
	* @returns The JSON-safe representation of the object
	*/
	toJsonSafe(obj) {
		return JSON.parse(JSON.stringify(obj, (_, value) => typeof value === "bigint" ? value.toString() : value));
	}
};
function decodePaymentSignatureHeader(paymentSignatureHeader) {
	if (!Base64EncodedRegex.test(paymentSignatureHeader)) throw new Error("Invalid payment signature header");
	return JSON.parse(safeBase64Decode(paymentSignatureHeader));
}
function encodePaymentRequiredHeader(paymentRequired) {
	return safeBase64Encode(JSON.stringify(paymentRequired));
}
function decodePaymentRequiredHeader(paymentRequiredHeader) {
	if (!Base64EncodedRegex.test(paymentRequiredHeader)) throw new Error("Invalid payment required header");
	return JSON.parse(safeBase64Decode(paymentRequiredHeader));
}
function encodePaymentResponseHeader(paymentResponse) {
	return safeBase64Encode(JSON.stringify(paymentResponse));
}
//#endregion
//#region node_modules/@x402/core/dist/esm/server/index.mjs
function isVacantStringField(value) {
	return value.trim() === "";
}
function snapshotPaymentRequirementsList(requirements) {
	return requirements.map((req) => ({
		...req,
		extra: structuredClone(req.extra)
	}));
}
function assertAcceptsAllowlistedAfterExtensionEnrich(baseline, current, extensionKey) {
	if (baseline.length !== current.length) throw new Error(`[x402] extension "${extensionKey}" violated accepts mutation policy: accepts length changed (${baseline.length} \u2192 ${current.length})`);
	for (let i = 0; i < baseline.length; i++) {
		const b = baseline[i];
		const c = current[i];
		if (b.scheme !== c.scheme || b.network !== c.network) throw new Error(`[x402] extension "${extensionKey}" violated accepts mutation policy: scheme/network are immutable (index ${i})`);
		if (b.maxTimeoutSeconds !== c.maxTimeoutSeconds) throw new Error(`[x402] extension "${extensionKey}" violated accepts mutation policy: maxTimeoutSeconds is immutable (index ${i})`);
		for (const field of [
			"payTo",
			"amount",
			"asset"
		]) {
			const bv = b[field];
			const cv = c[field];
			if (!isVacantStringField(bv) && cv !== bv) throw new Error(`[x402] extension "${extensionKey}" violated accepts mutation policy: "${field}" may only be set when the resource left it vacant (""); non-vacant values are immutable (index ${i})`);
		}
		for (const key of Object.keys(b.extra)) {
			if (!Object.prototype.hasOwnProperty.call(c.extra, key)) throw new Error(`[x402] extension "${extensionKey}" violated accepts mutation policy: extra["${key}"] was removed (index ${i})`);
			if (!deepEqual(c.extra[key], b.extra[key])) throw new Error(`[x402] extension "${extensionKey}" violated accepts mutation policy: extra["${key}"] may not be changed (index ${i})`);
		}
	}
}
function assertAcceptsAdditiveExtraAfterSchemeEnrich(baseline, current, scheme, network) {
	if (baseline.length !== current.length) throw new Error(`[x402] scheme "${scheme}" violated accepts mutation policy: accepts length changed (${baseline.length} \u2192 ${current.length})`);
	for (let i = 0; i < baseline.length; i++) {
		const b = baseline[i];
		const c = current[i];
		const isMatchingAccept = b.scheme === scheme && b.network === network;
		if (b.scheme !== c.scheme || b.network !== c.network) throw new Error(`[x402] scheme "${scheme}" violated accepts mutation policy: scheme/network are immutable (index ${i})`);
		if (b.maxTimeoutSeconds !== c.maxTimeoutSeconds || b.payTo !== c.payTo || b.amount !== c.amount || b.asset !== c.asset) throw new Error(`[x402] scheme "${scheme}" violated accepts mutation policy: payment terms are immutable (index ${i})`);
		for (const key of Object.keys(b.extra)) {
			if (!Object.prototype.hasOwnProperty.call(c.extra, key)) throw new Error(`[x402] scheme "${scheme}" violated accepts mutation policy: extra["${key}"] was removed (index ${i})`);
			if (!deepEqual(c.extra[key], b.extra[key])) throw new Error(`[x402] scheme "${scheme}" violated accepts mutation policy: extra["${key}"] may not be changed (index ${i})`);
		}
		if (!isMatchingAccept && Object.keys(c.extra).length !== Object.keys(b.extra).length) throw new Error(`[x402] scheme "${scheme}" violated accepts mutation policy: only matching accepts may receive new extra fields (index ${i})`);
	}
}
function snapshotSettleResponseCore(result) {
	return {
		success: result.success,
		transaction: result.transaction,
		network: result.network,
		amount: result.amount,
		payer: result.payer,
		errorReason: result.errorReason,
		errorMessage: result.errorMessage
	};
}
function assertSettleResponseCoreUnchanged(before, after, extensionKey) {
	for (const k of [
		"success",
		"transaction",
		"network",
		"amount",
		"payer",
		"errorReason",
		"errorMessage"
	]) if (!deepEqual(after[k], before[k])) throw new Error(`[x402] extension "${extensionKey}" violated settlement mutation policy: field "${String(k)}" is immutable after facilitator settle`);
}
function assertAdditivePayloadEnrichment(payload, enrichment, callerLabel) {
	for (const key of Object.keys(enrichment)) {
		if (!Object.prototype.hasOwnProperty.call(payload, key)) continue;
		throw new Error(`[x402] ${callerLabel} violated settlement payload enrichment policy: "${key}" already exists on the client payload`);
	}
}
function isPlainRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function assertAdditiveSettlementExtra(extra, enrichment, callerLabel) {
	assertAdditiveRecord(extra, enrichment, callerLabel, "extra");
}
function mergeAdditiveSettlementExtra(extra, enrichment) {
	return mergeAdditiveRecord(extra, enrichment);
}
function assertAdditiveRecord(target, enrichment, callerLabel, path) {
	for (const [key, enrichmentValue] of Object.entries(enrichment)) {
		const nextPath = `${path}["${key}"]`;
		if (!Object.prototype.hasOwnProperty.call(target, key)) continue;
		const targetValue = target[key];
		if (isPlainRecord(targetValue) && isPlainRecord(enrichmentValue)) {
			assertAdditiveRecord(targetValue, enrichmentValue, callerLabel, nextPath);
			continue;
		}
		throw new Error(`[x402] ${callerLabel} violated settlement response enrichment policy: ${nextPath} already exists on the settlement result`);
	}
}
function mergeAdditiveRecord(target, enrichment) {
	const merged = { ...target };
	for (const [key, enrichmentValue] of Object.entries(enrichment)) {
		const targetValue = merged[key];
		if (isPlainRecord(targetValue) && isPlainRecord(enrichmentValue)) {
			merged[key] = mergeAdditiveRecord(targetValue, enrichmentValue);
			continue;
		}
		merged[key] = enrichmentValue;
	}
	return merged;
}
function resolveSettlementOverrideAmount(rawAmount, requirements, decimals = 6) {
	const percentMatch = rawAmount.match(/^(\d+(?:\.\d{0,2})?)%$/);
	if (percentMatch) {
		const [intPart, decPart = ""] = percentMatch[1].split(".");
		const scaledPercent = BigInt(intPart) * 100n + BigInt(decPart.padEnd(2, "0").slice(0, 2));
		return (BigInt(requirements.amount) * scaledPercent / 10000n).toString();
	}
	const dollarMatch = rawAmount.match(/^\$(\d+(?:\.\d+)?)$/);
	if (dollarMatch) {
		const dollars = parseFloat(dollarMatch[1]);
		return Math.round(dollars * 10 ** decimals).toString();
	}
	return rawAmount;
}
var x402ResourceServer = class {
	/**
	* Creates a new x402ResourceServer instance.
	*
	* @param facilitatorClients - Optional facilitator client(s) for payment processing
	*/
	constructor(facilitatorClients) {
		this.registeredServerSchemes = /* @__PURE__ */ new Map();
		this.schemeHookAdapters = /* @__PURE__ */ new Map();
		this.supportedResponsesMap = /* @__PURE__ */ new Map();
		this.facilitatorClientsMap = /* @__PURE__ */ new Map();
		this.registeredExtensions = /* @__PURE__ */ new Map();
		this.extensionHookAdapters = /* @__PURE__ */ new Map();
		this.beforeVerifyHooks = [];
		this.afterVerifyHooks = [];
		this.onVerifyFailureHooks = [];
		this.beforeSettleHooks = [];
		this.afterSettleHooks = [];
		this.onSettleFailureHooks = [];
		this.onVerifiedPaymentCanceledHooks = [];
		if (!facilitatorClients) this.facilitatorClients = [new HTTPFacilitatorClient()];
		else if (Array.isArray(facilitatorClients)) this.facilitatorClients = facilitatorClients.length > 0 ? facilitatorClients : [new HTTPFacilitatorClient()];
		else this.facilitatorClients = [facilitatorClients];
	}
	/**
	* Register a scheme/network server implementation.
	*
	* @param network - The network identifier
	* @param server - The scheme/network server implementation
	* @returns The x402ResourceServer instance for chaining
	*/
	register(network, server) {
		if (!this.registeredServerSchemes.has(network)) this.registeredServerSchemes.set(network, /* @__PURE__ */ new Map());
		this.registeredServerSchemes.get(network).set(server.scheme, server);
		if (!this.schemeHookAdapters.has(network)) this.schemeHookAdapters.set(network, /* @__PURE__ */ new Map());
		const hooksByScheme = this.schemeHookAdapters.get(network);
		const hooks = server.schemeHooks;
		if (!hooks) {
			hooksByScheme.delete(server.scheme);
			return this;
		}
		const handles = {};
		if (hooks.onBeforeVerify) handles.beforeVerify = hooks.onBeforeVerify;
		if (hooks.onAfterVerify) handles.afterVerify = hooks.onAfterVerify;
		if (hooks.onVerifyFailure) handles.onVerifyFailure = hooks.onVerifyFailure;
		if (hooks.onBeforeSettle) handles.beforeSettle = hooks.onBeforeSettle;
		if (hooks.onAfterSettle) handles.afterSettle = hooks.onAfterSettle;
		if (hooks.onSettleFailure) handles.onSettleFailure = hooks.onSettleFailure;
		if (hooks.onVerifiedPaymentCanceled) handles.onVerifiedPaymentCanceled = hooks.onVerifiedPaymentCanceled;
		if (Object.keys(handles).length > 0) hooksByScheme.set(server.scheme, handles);
		else hooksByScheme.delete(server.scheme);
		return this;
	}
	/**
	* Check if a scheme is registered for a given network.
	*
	* @param network - The network identifier
	* @param scheme - The payment scheme name
	* @returns True if the scheme is registered for the network, false otherwise
	*/
	hasRegisteredScheme(network, scheme) {
		return !!findByNetworkAndScheme(this.registeredServerSchemes, scheme, network);
	}
	/**
	* Returns the decimal precision for the asset specified in the given payment requirements.
	* Looks up the registered scheme for the network and delegates to its getAssetDecimals
	* method if available. Falls back to 6 (standard for USDC stablecoins) when the scheme
	* does not implement getAssetDecimals or is not registered.
	*
	* @param requirements - The payment requirements containing scheme, network, and asset
	* @returns The number of decimal places for the asset
	*/
	getAssetDecimalsForRequirements(requirements) {
		return findByNetworkAndScheme(this.registeredServerSchemes, requirements.scheme, requirements.network)?.getAssetDecimals?.(requirements.asset ?? "", requirements.network) ?? 6;
	}
	/**
	* Registers a resource server extension (enrichment and optional verify/settle hooks).
	* Re-registering the same key overwrites; omitting `hooks` removes adapter handles for that key.
	*
	* @param extension - Extension definition including `key` and optional `hooks`
	* @returns This server instance for chaining
	*/
	registerExtension(extension) {
		this.registeredExtensions.set(extension.key, extension);
		const extensionKey = extension.key;
		const extensionHooks = extension.hooks;
		if (!extensionHooks) {
			this.extensionHookAdapters.delete(extensionKey);
			return this;
		}
		const handles = {};
		const bindExtensionHookAdapter = (extensionHookKey, adapterPhase) => {
			const impl = extensionHooks[extensionHookKey];
			if (!impl) return;
			handles[adapterPhase] = (async (ctx) => {
				if (ctx.declaredExtensions[extensionKey] === void 0) return;
				return impl(ctx.declaredExtensions[extensionKey], ctx);
			});
		};
		bindExtensionHookAdapter("onBeforeVerify", "beforeVerify");
		bindExtensionHookAdapter("onAfterVerify", "afterVerify");
		bindExtensionHookAdapter("onVerifyFailure", "onVerifyFailure");
		bindExtensionHookAdapter("onBeforeSettle", "beforeSettle");
		bindExtensionHookAdapter("onAfterSettle", "afterSettle");
		bindExtensionHookAdapter("onSettleFailure", "onSettleFailure");
		bindExtensionHookAdapter("onVerifiedPaymentCanceled", "onVerifiedPaymentCanceled");
		if (Object.keys(handles).length > 0) this.extensionHookAdapters.set(extensionKey, handles);
		else this.extensionHookAdapters.delete(extensionKey);
		return this;
	}
	/**
	* Check if an extension is registered.
	*
	* @param key - The extension key
	* @returns True if the extension is registered
	*/
	hasExtension(key) {
		return this.registeredExtensions.has(key);
	}
	/**
	* Get all registered extensions.
	*
	* @returns Array of registered extensions
	*/
	getExtensions() {
		return Array.from(this.registeredExtensions.values());
	}
	/**
	* Enriches declared extensions using registered extension hooks.
	*
	* @param declaredExtensions - Extensions declared on the route
	* @param transportContext - Transport-specific context (HTTP, A2A, MCP, etc.)
	* @returns Enriched extensions map
	*/
	enrichExtensions(declaredExtensions, transportContext) {
		const enriched = {};
		for (const [key, declaration] of Object.entries(declaredExtensions)) {
			const extension = this.registeredExtensions.get(key);
			if (extension?.enrichDeclaration) try {
				enriched[key] = extension.enrichDeclaration(declaration, transportContext);
			} catch (error) {
				this.warnExtensionHookFailure(key, "enrichDeclaration", error);
				enriched[key] = declaration;
			}
			else enriched[key] = declaration;
		}
		return enriched;
	}
	/**
	* Register a hook to execute before payment verification.
	* Can abort verification by returning { abort: true, reason: string }
	*
	* @param hook - The hook function to register
	* @returns The x402ResourceServer instance for chaining
	*/
	onBeforeVerify(hook) {
		this.beforeVerifyHooks.push(hook);
		return this;
	}
	/**
	* Register a hook to execute after successful payment verification.
	*
	* @param hook - The hook function to register
	* @returns The x402ResourceServer instance for chaining
	*/
	onAfterVerify(hook) {
		this.afterVerifyHooks.push(hook);
		return this;
	}
	/**
	* Register a hook to execute when payment verification fails.
	* Can recover from failure by returning { recovered: true, result: VerifyResponse }
	*
	* @param hook - The hook function to register
	* @returns The x402ResourceServer instance for chaining
	*/
	onVerifyFailure(hook) {
		this.onVerifyFailureHooks.push(hook);
		return this;
	}
	/**
	* Register a hook to execute before payment settlement.
	* Can abort settlement by returning { abort: true, reason: string }
	*
	* @param hook - The hook function to register
	* @returns The x402ResourceServer instance for chaining
	*/
	onBeforeSettle(hook) {
		this.beforeSettleHooks.push(hook);
		return this;
	}
	/**
	* Register a hook to execute after successful payment settlement.
	*
	* @param hook - The hook function to register
	* @returns The x402ResourceServer instance for chaining
	*/
	onAfterSettle(hook) {
		this.afterSettleHooks.push(hook);
		return this;
	}
	/**
	* Register a hook to execute when payment settlement fails.
	* Can recover from failure by returning { recovered: true, result: SettleResponse }
	*
	* @param hook - The hook function to register
	* @returns The x402ResourceServer instance for chaining
	*/
	onSettleFailure(hook) {
		this.onSettleFailureHooks.push(hook);
		return this;
	}
	/**
	* Register a hook to execute when verified payment work is canceled before settlement.
	*
	* @param hook - The hook function to register
	* @returns The x402ResourceServer instance for chaining
	*/
	onVerifiedPaymentCanceled(hook) {
		this.onVerifiedPaymentCanceledHooks.push(hook);
		return this;
	}
	/**
	* Initialize by fetching supported kinds from all facilitators
	* Creates mappings for supported responses and facilitator clients
	* Earlier facilitators in the array get precedence
	*/
	async initialize() {
		this.supportedResponsesMap.clear();
		this.facilitatorClientsMap.clear();
		let lastError;
		for (const facilitatorClient of this.facilitatorClients) try {
			const supported = await facilitatorClient.getSupported();
			for (const kind of supported.kinds) {
				const x402Version2 = kind.x402Version;
				if (!this.supportedResponsesMap.has(x402Version2)) this.supportedResponsesMap.set(x402Version2, /* @__PURE__ */ new Map());
				const responseVersionMap = this.supportedResponsesMap.get(x402Version2);
				if (!this.facilitatorClientsMap.has(x402Version2)) this.facilitatorClientsMap.set(x402Version2, /* @__PURE__ */ new Map());
				const clientVersionMap = this.facilitatorClientsMap.get(x402Version2);
				if (!responseVersionMap.has(kind.network)) responseVersionMap.set(kind.network, /* @__PURE__ */ new Map());
				const responseNetworkMap = responseVersionMap.get(kind.network);
				if (!clientVersionMap.has(kind.network)) clientVersionMap.set(kind.network, /* @__PURE__ */ new Map());
				const clientNetworkMap = clientVersionMap.get(kind.network);
				if (!responseNetworkMap.has(kind.scheme)) {
					responseNetworkMap.set(kind.scheme, supported);
					clientNetworkMap.set(kind.scheme, facilitatorClient);
				}
			}
		} catch (error) {
			lastError = error;
			console.warn(`Failed to fetch supported kinds from facilitator: ${error}`);
		}
		if (this.supportedResponsesMap.size === 0) throw lastError ? new Error("Failed to initialize: no supported payment kinds loaded from any facilitator.", { cause: lastError }) : /* @__PURE__ */ new Error("Failed to initialize: no supported payment kinds loaded from any facilitator.");
		this.validateFacilitatorCapabilities();
	}
	/**
	* Get supported kind for a specific version, network, and scheme
	*
	* @param x402Version - The x402 version
	* @param network - The network identifier
	* @param scheme - The payment scheme
	* @returns The supported kind or undefined if not found
	*/
	getSupportedKind(x402Version2, network, scheme) {
		const versionMap = this.supportedResponsesMap.get(x402Version2);
		if (!versionMap) return void 0;
		const supportedResponse = findByNetworkAndScheme(versionMap, scheme, network);
		if (!supportedResponse) return void 0;
		return supportedResponse.kinds.find((kind) => kind.x402Version === x402Version2 && kind.network === network && kind.scheme === scheme);
	}
	/**
	* Get facilitator extensions for a specific version, network, and scheme
	*
	* @param x402Version - The x402 version
	* @param network - The network identifier
	* @param scheme - The payment scheme
	* @returns The facilitator extensions or empty array if not found
	*/
	getFacilitatorExtensions(x402Version2, network, scheme) {
		const versionMap = this.supportedResponsesMap.get(x402Version2);
		if (!versionMap) return [];
		return findByNetworkAndScheme(versionMap, scheme, network)?.extensions || [];
	}
	/**
	* Build payment requirements for a protected resource
	*
	* @param resourceConfig - Configuration for the protected resource
	* @returns Array of payment requirements
	*/
	async buildPaymentRequirements(resourceConfig) {
		const requirements = [];
		const scheme = resourceConfig.scheme;
		const SchemeNetworkServer = findByNetworkAndScheme(this.registeredServerSchemes, scheme, resourceConfig.network);
		if (!SchemeNetworkServer) {
			console.warn(`No server implementation registered for scheme: ${scheme}, network: ${resourceConfig.network}`);
			return requirements;
		}
		const supportedKind = this.getSupportedKind(2, resourceConfig.network, SchemeNetworkServer.scheme);
		if (!supportedKind) throw new Error(`Facilitator does not support ${SchemeNetworkServer.scheme} on ${resourceConfig.network}. Make sure to call initialize() to fetch supported kinds from facilitators.`);
		const facilitatorExtensions = this.getFacilitatorExtensions(2, resourceConfig.network, SchemeNetworkServer.scheme);
		const parsedPrice = await SchemeNetworkServer.parsePrice(resourceConfig.price, resourceConfig.network);
		const baseRequirements = {
			scheme: SchemeNetworkServer.scheme,
			network: resourceConfig.network,
			amount: parsedPrice.amount,
			asset: parsedPrice.asset,
			payTo: resourceConfig.payTo,
			maxTimeoutSeconds: resourceConfig.maxTimeoutSeconds || 300,
			extra: {
				...parsedPrice.extra,
				...resourceConfig.extra
			}
		};
		const requirement = await SchemeNetworkServer.enhancePaymentRequirements(baseRequirements, supportedKind, facilitatorExtensions);
		requirements.push(requirement);
		return requirements;
	}
	/**
	* Build payment requirements from multiple payment options
	* This method handles resolving dynamic payTo/price functions and builds requirements for each option
	*
	* @param paymentOptions - Array of payment options to convert
	* @param context - HTTP request context for resolving dynamic functions
	* @returns Array of payment requirements (one per option)
	*/
	async buildPaymentRequirementsFromOptions(paymentOptions, context) {
		const allRequirements = [];
		for (const option of paymentOptions) {
			const resolvedPayTo = typeof option.payTo === "function" ? await option.payTo(context) : option.payTo;
			const resolvedPrice = typeof option.price === "function" ? await option.price(context) : option.price;
			const resourceConfig = {
				scheme: option.scheme,
				payTo: resolvedPayTo,
				price: resolvedPrice,
				network: option.network,
				maxTimeoutSeconds: option.maxTimeoutSeconds,
				extra: option.extra
			};
			const requirements = await this.buildPaymentRequirements(resourceConfig);
			allRequirements.push(...requirements);
		}
		return allRequirements;
	}
	/**
	* Create a payment required response
	*
	* @param requirements - Payment requirements
	* @param resourceInfo - Resource information
	* @param error - Error message
	* @param extensions - Optional declared extensions (for per-key enrichment)
	* @param transportContext - Optional transport-specific context (e.g., HTTP request, MCP tool context)
	* @param paymentPayload - Optional failed payment payload for response-time scheme enrichment
	* @returns Payment required response object
	*/
	async createPaymentRequiredResponse(requirements, resourceInfo, error, extensions, transportContext, paymentPayload) {
		let workingAccepts = requirements.map((req) => ({
			...req,
			extra: structuredClone(req.extra)
		}));
		let baselineAccepts = snapshotPaymentRequirementsList(workingAccepts);
		let response = {
			x402Version: 2,
			error,
			resource: resourceInfo,
			accepts: workingAccepts
		};
		if (extensions && Object.keys(extensions).length > 0) response.extensions = extensions;
		for (let i = 0; i < workingAccepts.length; i++) {
			const accept = workingAccepts[i];
			const scheme = findByNetworkAndScheme(this.registeredServerSchemes, accept.scheme, accept.network);
			if (!scheme?.enrichPaymentRequiredResponse) continue;
			const context = {
				requirements: workingAccepts,
				paymentPayload,
				resourceInfo,
				error,
				paymentRequiredResponse: response,
				transportContext
			};
			const enrichedAccepts = await scheme.enrichPaymentRequiredResponse(context);
			if (enrichedAccepts !== void 0) {
				workingAccepts = enrichedAccepts;
				response.accepts = workingAccepts;
			}
			assertAcceptsAdditiveExtraAfterSchemeEnrich(baselineAccepts, response.accepts, accept.scheme, accept.network);
			baselineAccepts = snapshotPaymentRequirementsList(response.accepts);
		}
		if (extensions) for (const [key, declaration] of Object.entries(extensions)) {
			const extension = this.registeredExtensions.get(key);
			if (extension?.enrichPaymentRequiredResponse) {
				try {
					const context = {
						requirements: workingAccepts,
						resourceInfo,
						error,
						paymentRequiredResponse: response,
						transportContext
					};
					const extensionData = await extension.enrichPaymentRequiredResponse(declaration, context);
					if (extensionData !== void 0) {
						if (!response.extensions) response.extensions = {};
						response.extensions[key] = extensionData;
					}
				} catch (error2) {
					this.warnExtensionHookFailure(key, "enrichPaymentRequiredResponse", error2);
				}
				assertAcceptsAllowlistedAfterExtensionEnrich(baselineAccepts, workingAccepts, key);
				baselineAccepts = snapshotPaymentRequirementsList(workingAccepts);
			}
		}
		return response;
	}
	/**
	* Verifies a payment against requirements, running manual and in-use extension hooks.
	*
	* @param paymentPayload - Signed payment payload from the client
	* @param requirements - Requirements matched to the payload
	* @param declaredExtensions - Optional per-extension declarations for the request
	* @param transportContext - Optional transport-specific context (e.g. HTTP, MCP)
	* @returns Facilitator verify outcome (optionally carrying a `skipHandler` directive),
	*   or abort/recovery as driven by hooks
	*/
	async verifyPayment(paymentPayload, requirements, declaredExtensions, transportContext) {
		const resolvedDeclaredExtensions = declaredExtensions ?? {};
		const extensionKeysInUse = Object.keys(resolvedDeclaredExtensions);
		const matchedScheme = {
			network: requirements.network,
			scheme: requirements.scheme
		};
		const context = {
			paymentPayload,
			requirements,
			declaredExtensions: resolvedDeclaredExtensions,
			transportContext
		};
		for (const { label, hook } of this.getLabeledHooks("beforeVerify", extensionKeysInUse, matchedScheme)) try {
			const result = await hook(context);
			if (result && "abort" in result && result.abort) return {
				isValid: false,
				invalidReason: result.reason,
				invalidMessage: result.message
			};
			if (result && "skip" in result && result.skip) return this.runAfterVerifyHooks(result.result, context, extensionKeysInUse, matchedScheme);
		} catch (error) {
			this.warnResourceServerHookFailure("beforeVerify", label, error);
		}
		try {
			const facilitatorClient = this.getFacilitatorClient(paymentPayload.x402Version, requirements.network, requirements.scheme);
			let verifyResult;
			if (!facilitatorClient) {
				let lastError;
				for (const client of this.facilitatorClients) try {
					verifyResult = await client.verify(paymentPayload, requirements);
					break;
				} catch (error) {
					lastError = error;
				}
				if (!verifyResult) throw lastError || /* @__PURE__ */ new Error(`No facilitator supports ${requirements.scheme} on ${requirements.network} for v${paymentPayload.x402Version}`);
			} else verifyResult = await facilitatorClient.verify(paymentPayload, requirements);
			return this.runAfterVerifyHooks(verifyResult, context, extensionKeysInUse, matchedScheme);
		} catch (error) {
			const failureContext = {
				...context,
				error
			};
			for (const { label, hook } of this.getLabeledHooks("onVerifyFailure", extensionKeysInUse, matchedScheme)) try {
				const result = await hook(failureContext);
				if (result && "recovered" in result && result.recovered) return this.runAfterVerifyHooks(result.result, context, extensionKeysInUse, matchedScheme);
			} catch (error2) {
				this.warnResourceServerHookFailure("onVerifyFailure", label, error2);
			}
			throw error;
		}
	}
	/**
	* Create cancellation controls for a verified payment attempt.
	*
	* @param paymentPayload - Signed payment payload from the client
	* @param requirements - Requirements matched to the payload
	* @param declaredExtensions - Optional per-extension declarations for the request
	* @param transportContext - Optional transport-specific context
	* @returns Cancellation controls for the verified payment attempt
	*/
	createPaymentCancellationDispatcher(paymentPayload, requirements, declaredExtensions, transportContext) {
		const resolvedDeclaredExtensions = declaredExtensions ?? {};
		let cancelPromise;
		return { cancel: (options) => {
			if (!cancelPromise) cancelPromise = this.dispatchVerifiedPaymentCanceled(paymentPayload, requirements, resolvedDeclaredExtensions, options, transportContext);
			return cancelPromise;
		} };
	}
	/**
	* Settle a verified payment
	*
	* @param paymentPayload - The payment payload to settle
	* @param requirements - The payment requirements
	* @param declaredExtensions - Optional declared extensions (for per-key enrichment)
	* @param transportContext - Optional transport-specific context (e.g., HTTP request/response, MCP tool context)
	* @param settlementOverrides - Optional overrides for settlement parameters (e.g., partial settlement amount)
	* @returns Settlement response
	*/
	async settlePayment(paymentPayload, requirements, declaredExtensions, transportContext, settlementOverrides) {
		const resolvedDeclaredExtensions = declaredExtensions ?? {};
		const extensionKeysInUse = Object.keys(resolvedDeclaredExtensions);
		let effectiveRequirements = requirements;
		if (settlementOverrides?.amount !== void 0) {
			const decimals = findByNetworkAndScheme(this.registeredServerSchemes, requirements.scheme, requirements.network)?.getAssetDecimals?.(requirements.asset ?? "", requirements.network) ?? 6;
			effectiveRequirements = {
				...requirements,
				amount: resolveSettlementOverrideAmount(settlementOverrides.amount, requirements, decimals)
			};
		}
		const context = {
			paymentPayload,
			requirements: effectiveRequirements,
			declaredExtensions: resolvedDeclaredExtensions,
			transportContext
		};
		const matchedScheme = {
			network: effectiveRequirements.network,
			scheme: effectiveRequirements.scheme
		};
		for (const { label, hook } of this.getLabeledHooks("beforeSettle", extensionKeysInUse, matchedScheme)) try {
			const result = await hook(context);
			if (result && "abort" in result && result.abort) throw new SettleError(400, {
				success: false,
				errorReason: result.reason,
				errorMessage: result.message,
				transaction: "",
				network: requirements.network
			});
			if (result && "skip" in result && result.skip) {
				const settleResult = result.result;
				const skipResultContext = {
					...context,
					result: settleResult,
					transportContext
				};
				for (const { label: label2, hook: hook2 } of this.getLabeledHooks("afterSettle", extensionKeysInUse, matchedScheme)) try {
					await hook2(skipResultContext);
				} catch (error) {
					this.warnResourceServerHookFailure("afterSettle", label2, error);
				}
				await this.enrichSettlementResponse(settleResult, skipResultContext, resolvedDeclaredExtensions, matchedScheme);
				return settleResult;
			}
		} catch (error) {
			if (error instanceof SettleError) throw error;
			this.warnResourceServerHookFailure("beforeSettle", label, error);
		}
		try {
			const payloadEnrichmentHook = findByNetworkAndScheme(this.registeredServerSchemes, matchedScheme.scheme, matchedScheme.network)?.enrichSettlementPayload;
			if (payloadEnrichmentHook) {
				const label = `scheme "${matchedScheme.scheme}" enrichSettlementPayload`;
				const enrichment = await payloadEnrichmentHook(context);
				if (enrichment !== void 0) {
					assertAdditivePayloadEnrichment(paymentPayload.payload, enrichment, label);
					paymentPayload.payload = {
						...paymentPayload.payload,
						...enrichment
					};
				}
			}
			const facilitatorClient = this.getFacilitatorClient(paymentPayload.x402Version, effectiveRequirements.network, effectiveRequirements.scheme);
			let settleResult;
			if (!facilitatorClient) {
				let lastError;
				for (const client of this.facilitatorClients) try {
					settleResult = await client.settle(paymentPayload, effectiveRequirements);
					break;
				} catch (error) {
					lastError = error;
				}
				if (!settleResult) throw lastError || /* @__PURE__ */ new Error(`No facilitator supports ${effectiveRequirements.scheme} on ${effectiveRequirements.network} for v${paymentPayload.x402Version}`);
			} else settleResult = await facilitatorClient.settle(paymentPayload, effectiveRequirements);
			const resultContext = {
				...context,
				result: settleResult
			};
			for (const { label, hook } of this.getLabeledHooks("afterSettle", extensionKeysInUse, matchedScheme)) try {
				await hook(resultContext);
			} catch (error) {
				this.warnResourceServerHookFailure("afterSettle", label, error);
			}
			await this.enrichSettlementResponse(settleResult, resultContext, resolvedDeclaredExtensions, matchedScheme);
			return settleResult;
		} catch (error) {
			const failureContext = {
				...context,
				error
			};
			for (const { label, hook } of this.getLabeledHooks("onSettleFailure", extensionKeysInUse, matchedScheme)) try {
				const result = await hook(failureContext);
				if (result && "recovered" in result && result.recovered) return result.result;
			} catch (error2) {
				this.warnResourceServerHookFailure("onSettleFailure", label, error2);
			}
			throw error;
		}
	}
	/**
	* Find matching payment requirements for a payment
	*
	* @param availableRequirements - Array of available payment requirements
	* @param paymentPayload - The payment payload
	* @returns Matching payment requirements or undefined
	*/
	/**
	* Validates optional client extension echoes against server-advertised extension info.
	* When the client omits extensions entirely, validation passes.
	*
	* @param paymentRequired - Server payment required response used for matching
	* @param paymentPayload - Client payment payload
	* @returns Whether echoed extension info preserves server-advertised values
	*/
	validateExtensions(paymentRequired, paymentPayload) {
		if (paymentPayload.x402Version !== 2) return { valid: true };
		const serverExtensions = paymentRequired.extensions;
		if (!serverExtensions || Object.keys(serverExtensions).length === 0) return { valid: true };
		const clientExtensions = paymentPayload.extensions;
		if (!clientExtensions || Object.keys(clientExtensions).length === 0) return { valid: true };
		for (const [key, echoedValue] of Object.entries(clientExtensions)) {
			if (!Object.prototype.hasOwnProperty.call(serverExtensions, key)) continue;
			const advertisedInfo = getExtensionInfo(serverExtensions[key]);
			const echoedInfo = getExtensionInfo(echoedValue);
			const dynamicFields = this.registeredExtensions.get(key)?.dynamicInfoFields;
			const additiveFields = ADDITIVE_ARRAY_INFO_FIELDS[key];
			const maxLengths = ADDITIVE_ARRAY_MAX_LENGTHS[key];
			if (!extensionInfoMatchesAdvertised(omitFields(advertisedInfo, dynamicFields), omitFields(echoedInfo, dynamicFields), additiveFields, maxLengths)) return {
				valid: false,
				invalidReason: "extension_echo_mismatch",
				extensionKey: key
			};
		}
		return { valid: true };
	}
	/**
	* Finds the server-advertised requirement that matches a client payment payload.
	*
	* @param availableRequirements - Payment requirements advertised for the resource.
	* @param paymentPayload - Signed payment payload from the client.
	* @returns The matching requirement, or undefined when none match.
	*/
	findMatchingRequirements(availableRequirements, paymentPayload) {
		switch (paymentPayload.x402Version) {
			case 2: return availableRequirements.find((paymentRequirements) => paymentRequirementsMatchAccepted(paymentRequirements, paymentPayload.accepted));
			case 1: return availableRequirements.find((req) => req.scheme === paymentPayload.accepted.scheme && req.network === paymentPayload.accepted.network);
			default: throw new Error(`Unsupported x402 version: ${paymentPayload.x402Version}`);
		}
	}
	/**
	* Validates that each registered scheme's configuration is compatible with the
	* facilitator capabilities advertised for the scheme/network combinations it
	* supports. Only schemes the facilitator actually supports are validated.
	*
	* @throws Error listing every capability problem when one or more schemes report one.
	*/
	validateFacilitatorCapabilities() {
		const configErrors = [];
		for (const [network, schemeMap] of this.registeredServerSchemes) for (const [scheme, server] of schemeMap) {
			if (!server.validateFacilitatorSupport) continue;
			for (const x402Version2 of this.supportedResponsesMap.keys()) {
				const supportedKind = this.getSupportedKind(x402Version2, network, scheme);
				if (!supportedKind) continue;
				const extensions = this.getFacilitatorExtensions(x402Version2, network, scheme);
				const problem = server.validateFacilitatorSupport(network, supportedKind, extensions);
				if (problem) configErrors.push(`${scheme} on ${network}: ${problem}`);
			}
		}
		if (configErrors.length > 0) throw new Error(`x402 facilitator capability errors:
${configErrors.map((e) => `  - ${e}`).join("\n")}`);
	}
	/**
	* Logs a warning when a manual or extension adapter lifecycle hook throws.
	*
	* @param phase - Lifecycle phase name (e.g. `beforeVerify`)
	* @param label - Hook source label from {@link getLabeledHooks} (manual index or extension key)
	* @param error - Thrown value or rejection reason
	*/
	warnResourceServerHookFailure(phase, label, error) {
		const detail = error instanceof Error ? error.message : String(error);
		console.warn(`[x402] Resource server ${phase} hook threw (${label}): ${detail}`);
	}
	/**
	* Logs a warning when a registered extension enrichment hook throws.
	*
	* @param extensionKey - Registered extension identifier
	* @param hookName - Hook method name (e.g. `enrichDeclaration`)
	* @param error - Thrown value or rejection reason
	*/
	warnExtensionHookFailure(extensionKey, hookName, error) {
		const detail = error instanceof Error ? error.message : String(error);
		console.warn(`[x402] extension "${extensionKey}" ${hookName} threw: ${detail}`);
	}
	/**
	* Executes after-verify hooks for facilitator and hook-provided verify results.
	*
	* @param verifyResult - Verify response passed to after-verify hooks.
	* @param context - Verify context shared with before-verify hooks.
	* @param extensionKeysInUse - Declared extension keys for this request.
	* @param matchedScheme - Scheme/network selected for this payment.
	* @param matchedScheme.network - Matched payment network.
	* @param matchedScheme.scheme - Matched payment scheme.
	* @returns Verify response with any in-process skip handler directive.
	*/
	async runAfterVerifyHooks(verifyResult, context, extensionKeysInUse, matchedScheme) {
		const resultContext = {
			...context,
			result: verifyResult
		};
		let skipHandler;
		for (const { label, hook } of this.getLabeledHooks("afterVerify", extensionKeysInUse, matchedScheme)) try {
			const directive = await hook(resultContext);
			if (directive && "abort" in directive && directive.abort) {
				await this.dispatchVerifiedPaymentCanceled(context.paymentPayload, context.requirements, context.declaredExtensions, { reason: "after_verify_aborted" }, context.transportContext);
				return {
					isValid: false,
					invalidReason: directive.reason,
					invalidMessage: directive.message
				};
			}
			if (directive && "skipHandler" in directive && directive.skipHandler) skipHandler = directive.response ?? {};
		} catch (error) {
			this.warnResourceServerHookFailure("afterVerify", label, error);
		}
		return skipHandler ? {
			...verifyResult,
			skipHandler
		} : verifyResult;
	}
	/**
	* Runs response enrichment after settlement lifecycle hooks complete.
	*
	* @param settleResult - Mutable settlement result being returned to the caller
	* @param context - Read-only hook context for enrichment callbacks
	* @param declaredExtensions - Extension declarations present on this payment
	* @param matchedScheme - Scheme/network selected for this settlement
	* @param matchedScheme.network - Matched payment network
	* @param matchedScheme.scheme - Matched payment scheme
	*/
	async enrichSettlementResponse(settleResult, context, declaredExtensions, matchedScheme) {
		if (Object.keys(declaredExtensions).length > 0) {
			const settleCoreSnapshot = snapshotSettleResponseCore(settleResult);
			for (const [key, declaration] of Object.entries(declaredExtensions)) {
				const extension = this.registeredExtensions.get(key);
				if (!extension?.enrichSettlementResponse) continue;
				try {
					const extensionData = await extension.enrichSettlementResponse(declaration, context);
					if (extensionData !== void 0) {
						if (!settleResult.extensions) settleResult.extensions = {};
						settleResult.extensions[key] = extensionData;
					}
				} catch (error) {
					this.warnExtensionHookFailure(key, "enrichSettlementResponse", error);
				}
				assertSettleResponseCoreUnchanged(settleCoreSnapshot, settleResult, key);
			}
		}
		const hook = findByNetworkAndScheme(this.registeredServerSchemes, matchedScheme.scheme, matchedScheme.network)?.enrichSettlementResponse;
		if (!hook) return;
		const label = `scheme "${matchedScheme.scheme}" enrichSettlementResponse`;
		try {
			const enrichment = await hook(context);
			if (enrichment === void 0) return;
			assertAdditiveSettlementExtra(settleResult.extra ?? {}, enrichment, label);
			settleResult.extra = mergeAdditiveSettlementExtra(settleResult.extra ?? {}, enrichment);
		} catch (error) {
			this.warnResourceServerHookFailure("enrichSettlementResponse", label, error);
		}
	}
	/**
	* Notify hooks that verified work ended before settlement.
	*
	* @param paymentPayload - Signed payment payload from the client
	* @param requirements - Requirements matched to the payload
	* @param declaredExtensions - Optional per-extension declarations for the request
	* @param options - Cancellation reason and optional diagnostics
	* @param fallbackTransportContext - Optional transport-specific context
	*/
	async dispatchVerifiedPaymentCanceled(paymentPayload, requirements, declaredExtensions, options, fallbackTransportContext) {
		const extensionKeysInUse = Object.keys(declaredExtensions);
		const matchedScheme = {
			network: requirements.network,
			scheme: requirements.scheme
		};
		const context = {
			paymentPayload,
			requirements,
			declaredExtensions,
			transportContext: fallbackTransportContext,
			reason: options.reason,
			error: options.error,
			responseStatus: options.responseStatus
		};
		for (const { label, hook } of this.getLabeledHooks("onVerifiedPaymentCanceled", extensionKeysInUse, matchedScheme)) try {
			await hook(context);
		} catch (error) {
			this.warnResourceServerHookFailure("onVerifiedPaymentCanceled", label, error);
		}
	}
	/**
	* Manual hooks first, then the matched scheme adapter, then extension adapters for keys in use.
	* Each entry carries a stable label for logging when a hook throws.
	*
	* @param phase - Hook slot (e.g. `beforeVerify`)
	* @param extensionKeysInUse - Declared extension keys for this request
	* @param matchedScheme - Scheme/network selected for this payment
	* @param matchedScheme.network - Matched payment network
	* @param matchedScheme.scheme - Matched payment scheme
	* @returns Hooks in invocation order with source labels
	*/
	getLabeledHooks(phase, extensionKeysInUse, matchedScheme) {
		const manualKey = `${phase}Hooks`;
		const manual = this[manualKey];
		const out = [];
		manual.forEach((hook, index) => {
			out.push({
				label: `manual ${phase} hook #${index}`,
				hook
			});
		});
		if (matchedScheme) {
			const hook = findByNetworkAndScheme(this.schemeHookAdapters, matchedScheme.scheme, matchedScheme.network)?.[phase];
			if (hook !== void 0) out.push({
				label: `scheme "${matchedScheme.scheme}" ${phase}`,
				hook
			});
		}
		const inUse = new Set(extensionKeysInUse);
		for (const [extensionKey, adapterHandles] of this.extensionHookAdapters.entries()) {
			if (!inUse.has(extensionKey)) continue;
			const hook = adapterHandles[phase];
			if (hook !== void 0) out.push({
				label: `extension "${extensionKey}" ${phase}`,
				hook
			});
		}
		return out;
	}
	/**
	* Get facilitator client for a specific version, network, and scheme
	*
	* @param x402Version - The x402 version
	* @param network - The network identifier
	* @param scheme - The payment scheme
	* @returns The facilitator client or undefined if not found
	*/
	getFacilitatorClient(x402Version2, network, scheme) {
		const versionMap = this.facilitatorClientsMap.get(x402Version2);
		if (!versionMap) return void 0;
		return findByNetworkAndScheme(versionMap, scheme, network);
	}
};
function getExtensionInfo(value) {
	if (value !== null && typeof value === "object" && !Array.isArray(value) && Object.prototype.hasOwnProperty.call(value, "info")) return value.info;
	return value;
}
function omitFields(value, fields) {
	if (!fields || fields.length === 0) return value;
	if (value === null || typeof value !== "object" || Array.isArray(value)) return value;
	const copy = { ...value };
	for (const field of fields) delete copy[field];
	return copy;
}
function extensionInfoMatchesAdvertised(advertised, echoed, additiveFields, maxLengths) {
	return objectContainsSubset(advertised, echoed, additiveFields, maxLengths);
}
function paymentRequirementsMatchAccepted(required, accepted) {
	const { extra: requiredExtra, ...requiredCore } = required;
	const { extra: acceptedExtra, ...acceptedCore } = accepted;
	if (!deepEqual(requiredCore, acceptedCore)) return false;
	if (requiredExtra === void 0) return true;
	return objectContainsSubset(requiredExtra, acceptedExtra);
}
function objectContainsSubset(expected, actual, additiveFields, maxLengths, fieldKey) {
	if (fieldKey !== void 0 && additiveFields?.has(fieldKey) && (Array.isArray(expected) || Array.isArray(actual))) {
		const expectedArray = toComparableArray(expected);
		const actualArray = toComparableArray(actual);
		if (!expectedArray || !actualArray) return false;
		const maxLength = maxLengths?.[fieldKey];
		if (maxLength !== void 0 && actualArray.length > maxLength) return false;
		return expectedArray.every((expItem) => actualArray.some((actItem) => deepEqual(expItem, actItem)));
	}
	if (expected === null || typeof expected !== "object" || Array.isArray(expected)) return deepEqual(expected, actual);
	if (actual === null || typeof actual !== "object" || Array.isArray(actual)) return false;
	const actualRecord = actual;
	return Object.entries(expected).every(([key, value]) => {
		if (!Object.prototype.hasOwnProperty.call(actualRecord, key)) return value === void 0;
		return objectContainsSubset(value, actualRecord[key], additiveFields, maxLengths, key);
	});
}
//#endregion
export { x402HTTPResourceServer as a, arrayType as c, numberType as d, objectType as f, withPrivateCacheControl as i, booleanType as l, HTTPFacilitatorClient as n, FacilitatorResponseError as o, stringType as p, decodePaymentRequiredHeader as r, getFacilitatorResponseError as s, x402ResourceServer as t, enumType as u };
