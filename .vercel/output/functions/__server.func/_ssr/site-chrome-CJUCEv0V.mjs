import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-chrome-CJUCEv0V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			ink: "bg-ink text-ink-foreground shadow-paper hover:bg-ink/90 hover:shadow-lift transition-all duration-300",
			ember: "bg-ember text-ember-foreground shadow-paper hover:bg-ember/90 hover:shadow-lift transition-all duration-300",
			quiet: "border border-border bg-card text-foreground hover:border-foreground/30 hover:bg-surface transition-all duration-300"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			xl: "h-12 rounded-md px-7 text-[0.95rem]",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
/** Small monospace uppercase label used to title sections and cards. */
function Eyebrow({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rule-label", className),
		children
	});
}
var DOT_TONE = {
	neutral: "bg-muted-foreground/50",
	positive: "bg-chart-3",
	ember: "bg-ember",
	warning: "bg-chart-4",
	danger: "bg-destructive"
};
var CHIP_TONE = {
	neutral: "border-border bg-surface text-muted-foreground",
	positive: "border-chart-3/35 bg-chart-3/8 text-foreground",
	ember: "border-ember/35 bg-ember/8 text-foreground",
	warning: "border-chart-4/40 bg-chart-4/10 text-foreground",
	danger: "border-destructive/35 bg-destructive/8 text-destructive"
};
/** A tiny status dot; `pulse` marks an in-flight state. */
function StatusDot({ tone = "neutral", pulse = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "relative inline-flex size-2 shrink-0 items-center justify-center",
		children: [pulse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inline-flex size-2 rounded-full opacity-60 motion-safe:animate-ping", DOT_TONE[tone]) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("relative inline-flex size-1.5 rounded-full", DOT_TONE[tone]) })]
	});
}
/** Compact pill for statuses, tags and technical markers. */
function Chip({ children, tone = "neutral", dot = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em]", CHIP_TONE[tone], className),
		children: [dot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { tone: tone === "neutral" ? "neutral" : tone }), children]
	});
}
/** Standard elevated panel used across the workspace. */
function Panel({ children, className, interactive = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-2xl border border-border bg-card shadow-paper", interactive && "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lift", className),
		children
	});
}
/** Section heading with an eyebrow rule and an optional right-hand note. */
function SectionHeading({ step, title, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: step }), title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 truncate text-2xl sm:text-3xl",
				children: title
			})]
		}), note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rule-label",
			children: note
		})]
	});
}
/** Structured failure card: what happened + what to do next. */
function StateCard({ kind = "error", title, what, next, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: kind === "info" ? void 0 : "alert",
		className: cn("rounded-2xl border p-5 animate-rise", kind === "error" ? "border-destructive/35 bg-destructive/5" : kind === "warning" ? "border-chart-4/45 bg-chart-4/8" : "border-border bg-surface", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { tone: kind === "error" ? "danger" : kind === "warning" ? "warning" : "neutral" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rule-label",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-3 space-y-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "rule-label",
				children: "What happened"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 leading-relaxed text-foreground",
				children: what
			})] }), next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "rule-label",
				children: "Next step"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 leading-relaxed text-muted-foreground",
				children: next
			})] })]
		})]
	});
}
function SiteHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex min-w-0 items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7 shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-display text-xl tracking-tight",
							children: "NarrativeX"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 hidden truncate font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground sm:block",
							children: "AI Pitch Intelligence"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "ember",
						className: "ml-2 hidden lg:inline-flex",
						children: "Pay-per-generation"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex items-center gap-2 sm:gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/workspace",
					className: "rounded-md px-3 py-2 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					activeProps: { className: "text-ember" },
					children: "Workspace"
				})
			})]
		})
	});
}
function Mark({ className = "size-6" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "1",
				y: "1",
				width: "22",
				height: "22",
				rx: "6",
				className: "fill-ink"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7 17.5V6.5l6 11v-11",
				className: "stroke-ink-foreground",
				strokeWidth: "1.8",
				strokeLinejoin: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M15.5 6.5 19 12l-3.5 5.5",
				className: "stroke-ember",
				strokeWidth: "1.8",
				fill: "none"
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rule-label",
					children: ["NarrativeX — ", (/* @__PURE__ */ new Date()).getFullYear()]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rule-label",
				children: "x402 · Algorand TestNet · USDC"
			})]
		})
	});
}
//#endregion
export { SectionHeading as a, StateCard as c, Panel as i, StatusDot as l, Chip as n, SiteFooter as o, Eyebrow as r, SiteHeader as s, Button as t, cn as u };
