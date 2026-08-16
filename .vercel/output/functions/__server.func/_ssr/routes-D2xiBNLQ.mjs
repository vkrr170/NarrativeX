import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as Panel, n as Chip, o as SiteFooter, s as SiteHeader, t as Button } from "./site-chrome-CJUCEv0V.mjs";
import { d as FileCodeCorner, n as Sparkles, o as Presentation, v as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D2xiBNLQ.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 paper-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-28",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-rise",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: "ember",
									dot: true,
									children: "Documentation → Narrative"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-6 text-5xl leading-[1.04] sm:text-6xl",
									children: [
										"Your README is technical.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "italic text-ember",
											children: "Your pitch shouldn't be."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground",
									children: "NarrativeX reads your README, docs, or technical description and rewrites it as an investor-ready presentation — problem, market, product, traction — in the language capital understands."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-9 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "ink",
										size: "xl",
										className: "min-h-12",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/workspace",
											children: ["Generate Pitch Deck ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "quiet",
										size: "xl",
										className: "min-h-12",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/workspace",
											children: "Upload README or paste docs"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "x402" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Algorand TestNet" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "0.10 USDC per deck" })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-fade",
							style: { animationDelay: "120ms" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckPreview, {})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-6xl px-5 py-20 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-3",
						children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							interactive: true,
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "size-4 text-ember" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rule-label",
										children: ["Step ", String(i + 1).padStart(2, "0")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 text-2xl",
									children: step.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: step.body
								})
							]
						}, step.title))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var STEPS = [
	{
		icon: FileCodeCorner,
		title: "Give it the source",
		body: "Drop a README file or paste raw documentation. No setup, no account, no configuration."
	},
	{
		icon: Sparkles,
		title: "It finds the story",
		body: "Architecture notes become a product narrative. Feature lists become differentiation."
	},
	{
		icon: Presentation,
		title: "Leave with a deck",
		body: "A structured, investor-legible presentation ready to export and take into the room."
	}
];
function DeckPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-x-4 top-8 bottom-0 rotate-[1.5deg] rounded-xl border border-border bg-surface" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-xl border border-border bg-card shadow-lift",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-ember" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 rule-label",
							children: "deck.pptx"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-px bg-border",
					children: SLIDES.map((slide) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rule-label",
								children: slide.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-lg leading-snug",
								children: slide.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 space-y-1.5",
								children: slide.lines.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 rounded-full bg-surface-strong",
									style: { width: w }
								}, i))
							})
						]
					}, slide.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[0.7rem] text-muted-foreground",
						children: ["## Installation → ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ember",
							children: "Go-to-market"
						})]
					})
				})
			]
		})]
	});
}
var SLIDES = [
	{
		label: "01",
		title: "The problem",
		lines: [
			"90%",
			"70%",
			"80%"
		]
	},
	{
		label: "02",
		title: "The product",
		lines: [
			"75%",
			"88%",
			"60%"
		]
	},
	{
		label: "03",
		title: "Market",
		lines: [
			"65%",
			"82%",
			"72%"
		]
	},
	{
		label: "04",
		title: "Why now",
		lines: [
			"85%",
			"58%",
			"78%"
		]
	}
];
//#endregion
export { Landing as component };
