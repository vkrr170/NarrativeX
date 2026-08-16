import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as arrayType, d as numberType, f as objectType, l as booleanType, p as stringType, u as enumType } from "../_libs/x402__core+zod.mjs";
import { i as pitchSchema } from "./schema-SIEy7U4I.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { Buffer } from "buffer";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DgLLSD8_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Deck styles are structural, not cosmetic: each one carries its own palette,
* type roles, density and composition traits, and the layout engine reads all
* of them when it draws a slide.
*/
var deckStyleIds = [
	"investor-minimal",
	"dark-tech",
	"modern-startup",
	"data-driven",
	"bold-founder",
	"editorial"
];
var SANS = {
	css: "\"Helvetica Neue\", Helvetica, Arial, sans-serif",
	pptx: "Calibri",
	pdf: "helvetica"
};
var SANS_BLACK = {
	css: "\"Arial Black\", \"Helvetica Neue\", Arial, sans-serif",
	pptx: "Arial Black",
	pdf: "helvetica"
};
var SERIF = {
	css: "Georgia, \"Times New Roman\", serif",
	pptx: "Georgia",
	pdf: "times"
};
var MONO = {
	css: "\"IBM Plex Mono\", Consolas, \"Courier New\", monospace",
	pptx: "Consolas",
	pdf: "courier"
};
var DECK_STYLES = {
	"investor-minimal": {
		id: "investor-minimal",
		name: "Investor Minimal",
		summary: "Neutral paper, hairline rules, typography doing all the work.",
		bestFor: "Classic YC / seed-round reading decks",
		palette: {
			bg: "FFFFFF",
			panel: "F6F5F3",
			panelAlt: "EFEEEB",
			ink: "141210",
			muted: "6B665F",
			accent: "141210",
			accentInk: "FFFFFF",
			rule: "DEDCD7"
		},
		fonts: {
			display: SANS,
			body: SANS,
			mono: MONO
		},
		scale: 1,
		margin: 88,
		radius: 0,
		density: 5,
		capsEyebrow: true,
		cover: "rule",
		header: "rule",
		card: "outline",
		favours: [
			"statement",
			"split",
			"features"
		]
	},
	"dark-tech": {
		id: "dark-tech",
		name: "Dark Tech",
		summary: "Deep console background, mono labels, high-contrast diagrams.",
		bestFor: "AI, SaaS and developer infrastructure",
		palette: {
			bg: "0B0F14",
			panel: "141C25",
			panelAlt: "1B2530",
			ink: "E9EFF6",
			muted: "8CA0B3",
			accent: "2DD4A7",
			accentInk: "062018",
			rule: "22303D"
		},
		fonts: {
			display: SANS,
			body: SANS,
			mono: MONO
		},
		scale: .98,
		margin: 80,
		radius: 10,
		density: 6,
		capsEyebrow: true,
		cover: "block",
		header: "bar",
		card: "filled",
		favours: [
			"architecture",
			"process",
			"metrics"
		]
	},
	"modern-startup": {
		id: "modern-startup",
		name: "Modern Startup",
		summary: "Soft gradients, elegant cards, bold contemporary section heads.",
		bestFor: "Product-led consumer and B2B startups",
		palette: {
			bg: "FBFBFE",
			panel: "FFFFFF",
			panelAlt: "EFF0FB",
			ink: "121826",
			muted: "5C6478",
			accent: "5B5BD6",
			accentInk: "FFFFFF",
			rule: "E4E6F2"
		},
		fonts: {
			display: SANS,
			body: SANS,
			mono: MONO
		},
		scale: 1.02,
		margin: 84,
		radius: 18,
		density: 6,
		capsEyebrow: true,
		cover: "band",
		header: "stack",
		card: "filled",
		favours: [
			"features",
			"process",
			"split"
		]
	},
	"data-driven": {
		id: "data-driven",
		name: "Data Driven",
		summary: "Metric cards, comparison matrices and analytical framing.",
		bestFor: "Evidence-heavy, analytical investor audiences",
		palette: {
			bg: "F6F9FB",
			panel: "FFFFFF",
			panelAlt: "E7F0F5",
			ink: "0F1B2A",
			muted: "56697B",
			accent: "0E7490",
			accentInk: "FFFFFF",
			rule: "D8E4EC"
		},
		fonts: {
			display: SANS,
			body: SANS,
			mono: MONO
		},
		scale: .98,
		margin: 80,
		radius: 8,
		density: 6,
		capsEyebrow: true,
		cover: "split",
		header: "bar",
		card: "outline",
		favours: [
			"metrics",
			"matrix",
			"market"
		]
	},
	"bold-founder": {
		id: "bold-founder",
		name: "Bold Founder",
		summary: "Enormous type, one idea per slide, dramatic dark transitions.",
		bestFor: "Live pitching and demo-day storytelling",
		palette: {
			bg: "101010",
			panel: "1B1B1B",
			panelAlt: "262626",
			ink: "FFFFFF",
			muted: "B6B2AC",
			accent: "FFC94A",
			accentInk: "1A1400",
			rule: "2E2E2E"
		},
		fonts: {
			display: SANS_BLACK,
			body: SANS,
			mono: MONO
		},
		scale: 1.14,
		margin: 92,
		radius: 4,
		density: 4,
		capsEyebrow: true,
		cover: "full",
		header: "stack",
		card: "bare",
		favours: [
			"statement",
			"quote",
			"divider"
		]
	},
	editorial: {
		id: "editorial",
		name: "Editorial",
		summary: "Magazine composition, asymmetric columns, generous whitespace.",
		bestFor: "Narrative-first, story-led pitches",
		palette: {
			bg: "FBF7F0",
			panel: "FFFDF9",
			panelAlt: "F2ECE1",
			ink: "241F1A",
			muted: "6E655A",
			accent: "C2410C",
			accentInk: "FFFFFF",
			rule: "E3DACB"
		},
		fonts: {
			display: SERIF,
			body: SANS,
			mono: MONO
		},
		scale: 1,
		margin: 96,
		radius: 14,
		density: 5,
		capsEyebrow: true,
		cover: "rule",
		header: "side",
		card: "filled",
		favours: [
			"quote",
			"split",
			"statement"
		]
	}
};
var DECK_STYLE_LIST = deckStyleIds.map((id) => DECK_STYLES[id]);
function getDeckStyle(id) {
	return DECK_STYLES[id ?? "modern-startup"] ?? DECK_STYLES["modern-startup"];
}
var deckLengthIds = [
	"quick",
	"standard",
	"deep"
];
var DECK_LENGTHS = {
	quick: {
		id: "quick",
		name: "Quick Pitch",
		label: "8–10 slides",
		summary: "The core narrative only — problem, solution, market, ask.",
		min: 8,
		max: 10,
		tier: 1
	},
	standard: {
		id: "standard",
		name: "Standard Pitch",
		label: "12–15 slides",
		summary: "The full investor arc with product, technology and roadmap.",
		min: 12,
		max: 15,
		tier: 2
	},
	deep: {
		id: "deep",
		name: "Deep Dive",
		label: "16–20 slides",
		summary: "Everything, including landscape, go-to-market and the investor lens.",
		min: 16,
		max: 20,
		tier: 3
	}
};
var DECK_LENGTH_LIST = deckLengthIds.map((id) => DECK_LENGTHS[id]);
function getDeckLength(id) {
	return DECK_LENGTHS[id ?? "standard"] ?? DECK_LENGTHS["standard"];
}
var TECH_SIGNALS = /\b(ai|ml|llm|api|sdk|kubernetes|rust|go|python|infrastructure|observability|data|pipeline|model|agent|protocol|blockchain)\b/i;
/**
* Picks a style from evidence that already exists in the analysis — never from
* invented company facts.
*
* @param pitch - The analysed pitch.
* @returns The recommended style id and the evidence behind it.
*/
function recommendStyle(pitch) {
	const techText = [
		...pitch.technology,
		pitch.solution,
		pitch.tagline
	].join(" ");
	const featureCount = pitch.key_features.length;
	const proseLength = (pitch.problem + pitch.solution + pitch.market_opportunity).length;
	if (pitch.market_data_available) return {
		style: "data-driven",
		reason: "Your documentation contains quantitative market evidence."
	};
	if (pitch.technology.length >= 3 && TECH_SIGNALS.test(techText)) return {
		style: "dark-tech",
		reason: "A technical stack and developer-facing product were detected."
	};
	if (featureCount >= 5) return {
		style: "modern-startup",
		reason: "A rich feature set suits card-led product storytelling."
	};
	if (proseLength > 1200) return {
		style: "editorial",
		reason: "Long-form narrative content reads best in an editorial layout."
	};
	if (proseLength < 400 && featureCount <= 3) return {
		style: "bold-founder",
		reason: "Concise source material works best as high-impact statements."
	};
	return {
		style: "investor-minimal",
		reason: "A balanced, evidence-led deck suits a classic investor format."
	};
}
/**
* Deterministic slide model. The AI never produces layout — it produces pitch
* data, and the application maps that data into these predefined templates.
*/
var slideLayouts = [
	"cover",
	"divider",
	"statement",
	"split",
	"flow",
	"process",
	"features",
	"market",
	"metrics",
	"matrix",
	"model",
	"architecture",
	"technology",
	"advantage",
	"comparison",
	"timeline",
	"roadmap",
	"quote",
	"questions",
	"gap",
	"closing"
];
var deckBulletSchema = objectType({
	label: stringType(),
	detail: stringType().default("")
});
var deckMetricSchema = objectType({
	value: stringType(),
	label: stringType(),
	detail: stringType().default("")
});
var deckColumnSchema = objectType({
	title: stringType(),
	items: arrayType(stringType()).default([]),
	highlight: booleanType().default(false)
});
var deckPhaseSchema = objectType({
	phase: stringType(),
	label: stringType(),
	detail: stringType().default("")
});
var deckSlideSchema = objectType({
	id: stringType(),
	/** 1-based position in the deck. */
	number: numberType(),
	layout: enumType(slideLayouts),
	eyebrow: stringType(),
	title: stringType(),
	subtitle: stringType().default(""),
	body: stringType().default(""),
	bullets: arrayType(deckBulletSchema).default([]),
	steps: arrayType(stringType()).default([]),
	tags: arrayType(stringType()).default([]),
	metrics: arrayType(deckMetricSchema).default([]),
	columns: arrayType(deckColumnSchema).default([]),
	phases: arrayType(deckPhaseSchema).default([]),
	/** Honest disclosure shown when the source documentation lacked evidence. */
	note: stringType().default(""),
	closing: stringType().default("")
});
var deckOptionsSchema = objectType({
	style: enumType(deckStyleIds).default("modern-startup"),
	length: enumType(deckLengthIds).default("standard")
});
var deckQualitySchema = objectType({
	/** Sections whose slides are honest placeholders rather than evidence. */
	gaps: arrayType(stringType()).default([]),
	/** Sections fully backed by the source documentation. */
	supported: arrayType(stringType()).default([]),
	score: numberType().default(0)
});
objectType({
	title: stringType(),
	subtitle: stringType(),
	generatedAt: stringType(),
	style: enumType(deckStyleIds).default("modern-startup"),
	length: enumType(deckLengthIds).default("standard"),
	quality: deckQualitySchema.default({
		gaps: [],
		supported: [],
		score: 0
	}),
	slides: arrayType(deckSlideSchema)
});
var DECK_SIZE = {
	width: 1280,
	height: 720
};
var NO_MARKET_DATA_NOTE = "Market sizing not provided in source documentation.";
var styles_default = "/assets/styles-Cv1HN4Z2.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
if (typeof window !== "undefined") window.Buffer = window.Buffer || Buffer;
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "NarrativeX — README to investor pitch deck" },
			{
				name: "description",
				content: "NarrativeX — Turn your README into an investor-ready pitch."
			},
			{
				property: "og:title",
				content: "NarrativeX"
			},
			{
				property: "og:description",
				content: "Your README is technical. Your pitch shouldn't be."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})]
	});
}
var $$splitComponentImporter$1 = () => import("./routes-D2xiBNLQ.mjs");
var Route$4 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "NarrativeX — Turn your README into an investor pitch deck" },
		{
			name: "description",
			content: "NarrativeX converts READMEs and technical documentation into investor-ready pitch decks. Pay per generation with x402 on Algorand."
		},
		{
			property: "og:title",
			content: "NarrativeX — Your README is technical. Your pitch shouldn't be."
		},
		{
			property: "og:description",
			content: "Transform technical documentation into investor-ready presentations."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./workspace-D1rSxV0S.mjs").then((n) => n.t);
var Route$3 = createFileRoute("/workspace")({
	head: () => ({ meta: [
		{ title: "Workspace — Turn a README into a pitch deck | NarrativeX" },
		{
			name: "description",
			content: "Upload a README or paste documentation, review the extracted pitch, and pay $0.10 USDC on Algorand TestNet to generate a 10-slide investor deck."
		},
		{
			property: "og:title",
			content: "NarrativeX Workspace"
		},
		{
			property: "og:description",
			content: "Upload a README or paste docs and generate an investor-ready deck."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ROUTE_PATTERN = "POST /api/public/generate-deck";
var bodySchema = objectType({
	pitch: pitchSchema,
	options: deckOptionsSchema.default({
		style: "modern-startup",
		length: "standard"
	})
});
/**
* Payment-protected deck generation.
*
* The x402 resource-server middleware runs *before* any deck work: an unpaid
* request receives a real HTTP 402 with payment requirements, and generation
* only happens after the facilitator verifies the payment.
*/
var Route$2 = createFileRoute("/api/public/generate-deck")({ server: { handlers: {
	OPTIONS: async () => new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, PAYMENT-SIGNATURE, X-PAYMENT, Idempotency-Key",
			"Access-Control-Expose-Headers": "PAYMENT-REQUIRED, PAYMENT-RESPONSE"
		}
	}),
	POST: async ({ request }) => {
		let raw;
		try {
			raw = await request.json();
		} catch {
			return Response.json({
				error: "invalid_body",
				message: "Expected a JSON body."
			}, { status: 400 });
		}
		const parsed = bodySchema.safeParse(raw);
		if (!parsed.success) return Response.json({
			error: "invalid_body",
			message: "The pitch payload was malformed or incomplete."
		}, { status: 400 });
		const idempotencyKey = request.headers.get("Idempotency-Key")?.trim() || "";
		const { withX402 } = await import("./resource-server.server-CD71YJ4h.mjs");
		const { getCompleted, setCompleted } = await import("./idempotency.server-BoiqNaLe.mjs");
		return withX402(request, {
			routePattern: ROUTE_PATTERN,
			body: parsed.data,
			skipPayment: () => Boolean(idempotencyKey && getCompleted(idempotencyKey)),
			handler: async () => {
				if (idempotencyKey) {
					const existing = getCompleted(idempotencyKey);
					if (existing) return { body: {
						success: true,
						deck: existing,
						replayed: true
					} };
				}
				const { buildDeck } = await import("./build-CL-eLi0C.mjs");
				const deck = buildDeck(parsed.data.pitch, parsed.data.options);
				if (idempotencyKey) setCompleted(idempotencyKey, deck);
				return { body: {
					success: true,
					deck
				} };
			}
		});
	}
} } });
/**
* Deployment health + configuration check. Reports only whether values are
* present — never the values themselves.
*/
var Route$1 = createFileRoute("/api/public/health")({ server: { handlers: { GET: async () => {
	const { readX402Config, toPublicStatus } = await import("./config.server-D8HcCAW8.mjs");
	const status = toPublicStatus(readX402Config());
	return Response.json({
		status: "ok",
		service: "PitchForge",
		aiConfigured: Boolean(process.env["LOVABLE_API_KEY"] || process.env["OPENAI_API_KEY"]),
		x402Configured: status.configured,
		algorandNetwork: status.network,
		algorandTestnetConfigured: status.algorandTestnetConfigured,
		paymentAssetConfigured: status.paymentAssetConfigured,
		receiverConfigured: status.receiverConfigured,
		facilitatorConfigured: status.facilitatorConfigured
	}, { headers: { "cache-control": "no-store" } });
} } } });
/**
* x402 configuration diagnostics. Never performs a payment and never exposes
* secret values — only presence flags and public protocol parameters.
*/
var Route = createFileRoute("/api/public/x402-status")({ server: { handlers: { GET: async () => {
	const { readX402Config, toPublicStatus } = await import("./config.server-D8HcCAW8.mjs");
	return Response.json(toPublicStatus(readX402Config()), { headers: { "cache-control": "no-store" } });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	WorkspaceRoute: Route$3.update({
		id: "/workspace",
		path: "/workspace",
		getParentRoute: () => Route$5
	}),
	ApiPublicGenerateDeckRoute: Route$2.update({
		id: "/api/public/generate-deck",
		path: "/api/public/generate-deck",
		getParentRoute: () => Route$5
	}),
	ApiPublicHealthRoute: Route$1.update({
		id: "/api/public/health",
		path: "/api/public/health",
		getParentRoute: () => Route$5
	}),
	ApiPublicX402StatusRoute: Route.update({
		id: "/api/public/x402-status",
		path: "/api/public/x402-status",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { DECK_STYLE_LIST as a, recommendStyle as c, DECK_LENGTH_LIST as i, DECK_SIZE as n, getDeckLength as o, NO_MARKET_DATA_NOTE as r, getDeckStyle as s, router_exports as t };
