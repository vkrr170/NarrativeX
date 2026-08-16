import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { F as isRedirect, b as ClientOnly, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./server-BsDv6-O0.mjs";
import { r as decodePaymentRequiredHeader } from "../_libs/x402__core+zod.mjs";
import { n as analyzeInputSchema } from "./schema-SIEy7U4I.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DECK_STYLE_LIST, c as recommendStyle, i as DECK_LENGTH_LIST, n as DECK_SIZE, o as getDeckLength, s as getDeckStyle } from "./router-DgLLSD8_.mjs";
import { a as ALGORAND_TESTNET_GENESIS_HASH, r as ALGORAND_MAINNET_GENESIS_HASH } from "../_libs/x402__avm+x402__core.mjs";
import { a as SectionHeading, c as StateCard, i as Panel, l as StatusDot, n as Chip, o as SiteFooter, r as Eyebrow, s as SiteHeader, t as Button, u as cn } from "./site-chrome-CJUCEv0V.mjs";
import { _ as Check, a as Quote, c as LoaderCircle, d as FileCodeCorner, f as ExternalLink, g as ChevronLeft, h as ChevronRight, i as RotateCcw, l as FileText, m as CloudUpload, n as Sparkles, o as Presentation, p as Download, r as ShieldCheck, s as Palette, t as X, u as FileExclamationPoint } from "../_libs/lucide-react.mjs";
import "../_libs/x402__fetch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-D1rSxV0S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var W = DECK_SIZE.width;
var H = DECK_SIZE.height;
/** Rough wrapped-line count so stacked blocks never collide. */
function estimateLines(text, width, size) {
	const perLine = Math.max(1, Math.floor(width / (size * .5)));
	return Math.max(1, Math.ceil(text.length / perLine));
}
function blockHeight(text, width, size, lh = 1.32) {
	return estimateLines(text, width, size) * size * lh;
}
function luminance(hex) {
	const n = parseInt(hex, 16);
	const r = n >> 16 & 255;
	const g = n >> 8 & 255;
	const b = n & 255;
	return (.299 * r + .587 * g + .114 * b) / 255;
}
/** Inverted panel colours for full-bleed slides, safe on light and dark styles. */
function inverse(p) {
	return luminance(p.pal.bg) < .5 ? {
		bg: p.pal.panelAlt,
		fg: p.pal.ink,
		sub: p.pal.muted
	} : {
		bg: p.pal.ink,
		fg: p.pal.bg,
		sub: p.pal.muted
	};
}
function clamp(text, max) {
	if (text.length <= max) return text;
	return `${text.slice(0, max - 1).trimEnd()}…`;
}
var Painter = class {
	ops = [];
	style;
	m;
	content;
	constructor(style) {
		this.style = style;
		this.m = style.margin;
		this.content = W - style.margin * 2;
	}
	get pal() {
		return this.style.palette;
	}
	/** Scales a base type size by the style's type scale. */
	t(size) {
		return Math.round(size * this.style.scale);
	}
	rect(op) {
		this.ops.push({
			kind: "rect",
			...op
		});
		return this;
	}
	text(op) {
		if (!op.text) return this;
		this.ops.push({
			kind: "text",
			...op
		});
		return this;
	}
	/** Card background honouring the style's card treatment. */
	card(x, y, w, h, accent = false) {
		const { card, radius } = this.style;
		if (card === "filled") this.rect({
			x,
			y,
			w,
			h,
			color: accent ? this.pal.panelAlt : this.pal.panel,
			radius
		});
		else if (card === "outline") this.rect({
			x,
			y,
			w,
			h,
			color: accent ? this.pal.panelAlt : this.pal.bg,
			radius,
			borderColor: this.pal.rule,
			borderWidth: 1
		});
		else this.rect({
			x,
			y: y + h - 2,
			w,
			h: 2,
			color: accent ? this.pal.accent : this.pal.rule
		});
		return this;
	}
	eyebrow(text, x, y, w, align = "left") {
		return this.text({
			x,
			y,
			w,
			text,
			size: this.t(14),
			color: this.pal.accent,
			font: "mono",
			bold: true,
			caps: this.style.capsEyebrow,
			align
		});
	}
};
function header(p, slide) {
	const { m, content, pal, style } = p;
	if (style.header === "bar") {
		p.rect({
			x: 0,
			y: 0,
			w: W,
			h: 108,
			color: pal.panel
		});
		p.rect({
			x: 0,
			y: 108,
			w: W,
			h: 2,
			color: pal.accent
		});
		p.eyebrow(slide.eyebrow, m, 26, content);
		p.text({
			x: m,
			y: 52,
			w: content,
			text: clamp(slide.title, 64),
			size: p.t(40),
			color: pal.ink,
			font: "display",
			bold: true
		});
		return 156;
	}
	if (style.header === "stack") {
		p.eyebrow(slide.eyebrow, m, 54, content);
		p.text({
			x: m,
			y: 84,
			w: content,
			text: clamp(slide.title, 64),
			size: p.t(46),
			color: pal.ink,
			font: "display",
			bold: true
		});
		return 168;
	}
	if (style.header === "side") {
		p.rect({
			x: m,
			y: 58,
			w: 4,
			h: 74,
			color: pal.accent
		});
		p.eyebrow(slide.eyebrow, m + 22, 58, content - 22);
		p.text({
			x: m + 22,
			y: 84,
			w: content - 22,
			text: clamp(slide.title, 64),
			size: p.t(46),
			color: pal.ink,
			font: "display"
		});
		return 176;
	}
	p.eyebrow(slide.eyebrow, m, 56, content);
	p.rect({
		x: m,
		y: 90,
		w: content,
		h: 1,
		color: pal.rule
	});
	p.text({
		x: m,
		y: 114,
		w: content,
		text: clamp(slide.title, 64),
		size: p.t(46),
		color: pal.ink,
		font: "display",
		bold: style.fonts.display.pdf !== "times"
	});
	return 196;
}
function footer(p, slide) {
	const { m, content, pal } = p;
	p.rect({
		x: m,
		y: H - 58,
		w: content,
		h: 1,
		color: pal.rule
	});
	p.text({
		x: m,
		y: H - 44,
		w: content - 80,
		text: "Generated from your project documentation",
		size: 12,
		color: pal.muted,
		font: "mono"
	});
	p.text({
		x: W - m - 80,
		y: H - 44,
		w: 80,
		text: String(slide.number).padStart(2, "0"),
		size: 12,
		color: pal.muted,
		font: "mono",
		bold: true,
		align: "right"
	});
}
function note(p, slide) {
	if (!slide.note) return;
	const { m, content, pal } = p;
	const y = H - 116;
	p.rect({
		x: m,
		y,
		w: 3,
		h: 38,
		color: pal.accent
	});
	p.text({
		x: m + 16,
		y: y + 6,
		w: content - 24,
		text: slide.note,
		size: p.t(14),
		color: pal.muted,
		font: "body",
		italic: true
	});
}
function bulletList(p, slide, x, y, w, cols = 1) {
	const items = slide.bullets.slice(0, p.style.density);
	if (!items.length) return y;
	const hasDetail = items.some((b) => b.detail);
	const gap = 26;
	const colW = cols > 1 ? (w - gap * (cols - 1)) / cols : w;
	const rowH = hasDetail ? 74 : 48;
	items.forEach((bullet, i) => {
		const col = i % cols;
		const row = Math.floor(i / cols);
		const bx = x + col * (colW + gap);
		const by = y + row * rowH;
		p.rect({
			x: bx,
			y: by + 10,
			w: 7,
			h: 7,
			color: p.pal.accent,
			radius: 4
		});
		p.text({
			x: bx + 22,
			y: by,
			w: colW - 22,
			text: clamp(bullet.label, 90),
			size: p.t(20),
			color: p.pal.ink,
			font: "body",
			bold: true
		});
		if (bullet.detail) p.text({
			x: bx + 22,
			y: by + 30,
			w: colW - 22,
			text: clamp(bullet.detail, 130),
			size: p.t(15),
			color: p.pal.muted,
			font: "body"
		});
	});
	return y + Math.ceil(items.length / cols) * rowH + 8;
}
function tagCloud(p, tags, x, y, w) {
	let tx = x;
	let ty = y;
	for (const tag of tags.slice(0, 12)) {
		const tw = Math.max(86, tag.length * 9 + 34);
		if (tx + tw > x + w) {
			tx = x;
			ty += 50;
		}
		p.rect({
			x: tx,
			y: ty,
			w: tw,
			h: 40,
			color: p.style.card === "bare" ? p.pal.panelAlt : p.pal.panel,
			radius: 20,
			borderColor: p.pal.rule,
			borderWidth: 1
		});
		p.text({
			x: tx + 17,
			y: ty + 12,
			w: tw - 34,
			text: clamp(tag, 22),
			size: p.t(14),
			color: p.pal.ink,
			font: "mono"
		});
		tx += tw + 12;
	}
	return ty + 62;
}
function drawCover(p, slide) {
	const { m, content, pal, style } = p;
	if (style.cover === "full" || style.cover === "block") {
		p.rect({
			x: 0,
			y: 0,
			w: W,
			h: H,
			color: pal.bg
		});
		p.rect({
			x: 0,
			y: 0,
			w: 220,
			h: 8,
			color: pal.accent
		});
	} else if (style.cover === "band") {
		p.rect({
			x: 0,
			y: 0,
			w: W,
			h: 300,
			color: pal.panelAlt
		});
		p.rect({
			x: 0,
			y: 300,
			w: W,
			h: 3,
			color: pal.accent
		});
	} else if (style.cover === "split") {
		p.rect({
			x: W - 380,
			y: 0,
			w: 380,
			h: H,
			color: pal.panelAlt
		});
		p.rect({
			x: W - 380,
			y: 0,
			w: 4,
			h: H,
			color: pal.accent
		});
	} else p.rect({
		x: 0,
		y: 0,
		w: 10,
		h: H,
		color: pal.accent
	});
	const titleW = style.cover === "split" ? content - 340 : content - 120;
	p.eyebrow(slide.eyebrow, m, 148, titleW);
	p.text({
		x: m,
		y: 190,
		w: titleW,
		text: clamp(slide.title, 44),
		size: p.t(style.cover === "full" ? 94 : 82),
		color: pal.ink,
		font: "display",
		bold: style.fonts.display.pdf !== "times"
	});
	if (slide.subtitle) p.text({
		x: m,
		y: 340,
		w: titleW,
		text: clamp(slide.subtitle, 120),
		size: p.t(30),
		color: pal.accent,
		font: "display",
		italic: style.fonts.display.pdf === "times"
	});
	if (slide.body) p.text({
		x: m,
		y: 452,
		w: Math.min(titleW, 640),
		text: clamp(slide.body, 220),
		size: p.t(18),
		color: pal.muted,
		font: "body"
	});
	if (slide.tags.length) tagCloud(p, slide.tags, m, 540, content - 120);
}
function drawDivider(p, slide) {
	const { pal } = p;
	const inv = inverse(p);
	p.rect({
		x: 0,
		y: 0,
		w: W,
		h: H,
		color: inv.bg
	});
	p.text({
		x: 0,
		y: 268,
		w: W,
		text: slide.eyebrow,
		size: p.t(15),
		color: pal.accent,
		font: "mono",
		bold: true,
		caps: true,
		align: "center"
	});
	p.text({
		x: 120,
		y: 312,
		w: W - 240,
		text: clamp(slide.title, 46),
		size: p.t(64),
		color: inv.fg,
		font: "display",
		bold: true,
		align: "center"
	});
	if (slide.subtitle) p.text({
		x: 220,
		y: 420,
		w: W - 440,
		text: clamp(slide.subtitle, 150),
		size: p.t(19),
		color: inv.sub,
		font: "body",
		align: "center"
	});
}
function drawStatement(p, slide, top) {
	const { m, content, pal } = p;
	let y = top;
	if (slide.subtitle) {
		p.eyebrow(slide.subtitle, m, y, content);
		y += 36;
	}
	if (slide.body) {
		const size = p.t(slide.body.length > 220 ? 26 : 32);
		p.text({
			x: m,
			y,
			w: content - 120,
			text: slide.body,
			size,
			color: pal.ink,
			font: "display"
		});
		y += blockHeight(slide.body, content - 120, size) + 30;
	}
	bulletList(p, slide, m, y, content, slide.bullets.length > 3 ? 2 : 1);
}
function drawSplit(p, slide, top) {
	const { m, content, pal } = p;
	const leftW = Math.round(content * .46);
	const rightX = m + leftW + 44;
	const rightW = content - leftW - 44;
	let ly = top;
	if (slide.body) {
		const size = p.t(23);
		p.text({
			x: m,
			y: ly,
			w: leftW,
			text: slide.body,
			size,
			color: pal.ink,
			font: "body"
		});
		ly += blockHeight(slide.body, leftW, size) + 28;
	}
	if (slide.subtitle) p.eyebrow(slide.subtitle, m, Math.min(ly, H - 190), leftW);
	const items = slide.bullets.slice(0, p.style.density);
	const hasDetail = items.some((b) => b.detail);
	const listH = items.length * (hasDetail ? 74 : 48);
	const panelTop = top - 18;
	const panelH = Math.min(H - panelTop - 130, Math.max(180, listH + 62, slide.tags.length && !items.length ? 190 : 0));
	p.card(rightX, panelTop, rightW, panelH, true);
	bulletList(p, slide, rightX + 28, panelTop + 30, rightW - 56, 1);
	if (!items.length && slide.tags.length) tagCloud(p, slide.tags, rightX + 28, panelTop + 30, rightW - 56);
}
function drawFlow(p, slide, top) {
	const { m, content, pal } = p;
	const steps = slide.steps.slice(0, 5);
	if (!steps.length) return;
	const gap = 18;
	const cardW = (content - gap * (steps.length - 1)) / steps.length;
	const cardH = 210;
	steps.forEach((step, i) => {
		const x = m + i * (cardW + gap);
		p.card(x, top, cardW, cardH, i === 0);
		p.rect({
			x,
			y: top,
			w: cardW,
			h: 4,
			color: pal.accent,
			radius: 2
		});
		p.text({
			x: x + 22,
			y: top + 26,
			w: cardW - 44,
			text: String(i + 1).padStart(2, "0"),
			size: p.t(15),
			color: pal.accent,
			font: "mono",
			bold: true
		});
		p.text({
			x: x + 22,
			y: top + 62,
			w: cardW - 44,
			text: clamp(step, 110),
			size: p.t(17),
			color: pal.ink,
			font: "body"
		});
		if (i < steps.length - 1) p.rect({
			x: x + cardW + 4,
			y: top + cardH / 2,
			w: 10,
			h: 2,
			color: pal.rule
		});
	});
}
function drawProcess(p, slide, top) {
	const { m, content, pal } = p;
	const steps = slide.steps.slice(0, 4);
	const rowH = 84;
	steps.forEach((step, i) => {
		const y = top + i * 96;
		p.card(m, y, content, rowH);
		p.rect({
			x: m,
			y,
			w: 5,
			h: rowH,
			color: pal.accent
		});
		p.text({
			x: m + 28,
			y: y + 28,
			w: 60,
			text: String(i + 1).padStart(2, "0"),
			size: p.t(22),
			color: pal.accent,
			font: "mono",
			bold: true
		});
		p.text({
			x: m + 100,
			y: y + 28,
			w: content - 130,
			text: clamp(step, 140),
			size: p.t(19),
			color: pal.ink,
			font: "body"
		});
	});
}
function drawFeatures(p, slide, top) {
	const { m, content, pal } = p;
	const items = slide.bullets.slice(0, 6);
	if (!items.length) return;
	const cols = items.length <= 2 ? items.length : items.length <= 4 ? 2 : 3;
	const rows = Math.ceil(items.length / cols);
	const gap = 20;
	const cardW = (content - gap * (cols - 1)) / cols;
	const hasDetail = items.some((i) => i.detail);
	const cardH = Math.min(hasDetail ? 172 : 118, (H - top - 130 - gap * (rows - 1)) / rows);
	items.forEach((item, i) => {
		const x = m + i % cols * (cardW + gap);
		const y = top + Math.floor(i / cols) * (cardH + gap);
		p.card(x, y, cardW, cardH);
		p.rect({
			x: x + 22,
			y: y + 22,
			w: 30,
			h: 4,
			color: pal.accent
		});
		p.text({
			x: x + 22,
			y: y + 42,
			w: cardW - 44,
			text: clamp(item.label, 60),
			size: p.t(19),
			color: pal.ink,
			font: "body",
			bold: true
		});
		if (item.detail) p.text({
			x: x + 22,
			y: y + 84,
			w: cardW - 44,
			text: clamp(item.detail, 120),
			size: p.t(14),
			color: pal.muted,
			font: "body"
		});
	});
}
function drawMetrics(p, slide, top) {
	const { m, content, pal } = p;
	const items = slide.metrics.slice(0, 3);
	if (!items.length) return;
	const gap = 22;
	const cardW = (content - gap * (items.length - 1)) / items.length;
	items.forEach((metric, i) => {
		const x = m + i * (cardW + gap);
		p.card(x, top, cardW, 210, i === 0);
		p.text({
			x: x + 26,
			y: top + 34,
			w: cardW - 52,
			text: clamp(metric.value, 22),
			size: p.t(46),
			color: pal.accent,
			font: "display",
			bold: true
		});
		p.text({
			x: x + 26,
			y: top + 108,
			w: cardW - 52,
			text: clamp(metric.label, 44),
			size: p.t(17),
			color: pal.ink,
			font: "body",
			bold: true
		});
		if (metric.detail) p.text({
			x: x + 26,
			y: top + 140,
			w: cardW - 52,
			text: clamp(metric.detail, 90),
			size: p.t(13),
			color: pal.muted,
			font: "body"
		});
	});
}
function drawMatrix(p, slide, top) {
	const { m, content, pal } = p;
	const cols = slide.columns.slice(0, 3);
	if (!cols.length) return;
	const gap = 20;
	const colW = (content - gap * (cols.length - 1)) / cols.length;
	const rows = Math.max(...cols.map((c) => Math.min(5, c.items.length)), 1);
	const colH = Math.min(H - top - 130, 96 + rows * 52);
	cols.forEach((col, i) => {
		const x = m + i * (colW + gap);
		p.card(x, top, colW, colH, col.highlight);
		p.rect({
			x,
			y: top,
			w: colW,
			h: 4,
			color: col.highlight ? pal.accent : pal.rule
		});
		p.text({
			x: x + 24,
			y: top + 26,
			w: colW - 48,
			text: clamp(col.title, 40),
			size: p.t(19),
			color: col.highlight ? pal.accent : pal.ink,
			font: "body",
			bold: true
		});
		col.items.slice(0, 5).forEach((item, j) => {
			const iy = top + 76 + j * 52;
			p.rect({
				x: x + 24,
				y: iy + 8,
				w: 6,
				h: 6,
				color: pal.accent,
				radius: 3
			});
			p.text({
				x: x + 42,
				y: iy,
				w: colW - 66,
				text: clamp(item, 76),
				size: p.t(15),
				color: pal.muted,
				font: "body"
			});
		});
	});
}
function drawTimeline(p, slide, top) {
	const { m, content, pal } = p;
	const phases = slide.phases.slice(0, 4);
	if (!phases.length) return drawFlow(p, {
		...slide,
		steps: slide.steps
	}, top);
	const gap = 18;
	const colW = (content - gap * (phases.length - 1)) / phases.length;
	const lineY = top + 22;
	p.rect({
		x: m,
		y: lineY,
		w: content,
		h: 2,
		color: pal.rule
	});
	phases.forEach((phase, i) => {
		const x = m + i * (colW + gap);
		p.rect({
			x,
			y: lineY - 7,
			w: 16,
			h: 16,
			color: pal.accent,
			radius: 8
		});
		p.text({
			x,
			y: lineY + 28,
			w: colW,
			text: clamp(phase.phase, 26),
			size: p.t(14),
			color: pal.accent,
			font: "mono",
			bold: true,
			caps: true
		});
		p.text({
			x,
			y: lineY + 58,
			w: colW - 12,
			text: clamp(phase.label, 90),
			size: p.t(19),
			color: pal.ink,
			font: "body",
			bold: true
		});
		if (phase.detail) p.text({
			x,
			y: lineY + 116,
			w: colW - 12,
			text: clamp(phase.detail, 120),
			size: p.t(14),
			color: pal.muted,
			font: "body"
		});
	});
}
function drawArchitecture(p, slide, top) {
	const { m, content, pal } = p;
	const layers = slide.columns.length ? slide.columns.slice(0, 3) : [{
		title: "Stack",
		items: slide.tags.slice(0, 9),
		highlight: false
	}];
	const rowH = 108;
	layers.forEach((layer, i) => {
		const y = top + i * 124;
		p.card(m, y, content, rowH, i === 0);
		p.text({
			x: m + 24,
			y: y + 20,
			w: 200,
			text: clamp(layer.title, 26),
			size: p.t(15),
			color: pal.accent,
			font: "mono",
			bold: true,
			caps: true
		});
		let tx = m + 24;
		layer.items.slice(0, 6).forEach((item) => {
			const tw = Math.max(96, item.length * 9 + 32);
			if (tx + tw > m + content - 24) return;
			p.rect({
				x: tx,
				y: y + 54,
				w: tw,
				h: 36,
				color: pal.bg,
				radius: 18,
				borderColor: pal.rule,
				borderWidth: 1
			});
			p.text({
				x: tx + 16,
				y: y + 64,
				w: tw - 32,
				text: clamp(item, 22),
				size: p.t(13),
				color: pal.ink,
				font: "mono"
			});
			tx += tw + 12;
		});
	});
	if (slide.body) p.text({
		x: m,
		y: H - 156,
		w: content - 60,
		text: clamp(slide.body, 180),
		size: p.t(16),
		color: pal.muted,
		font: "body"
	});
}
function drawQuote(p, slide) {
	const { pal } = p;
	p.rect({
		x: 0,
		y: 0,
		w: W,
		h: H,
		color: pal.panelAlt
	});
	p.rect({
		x: 0,
		y: 0,
		w: W,
		h: 6,
		color: pal.accent
	});
	p.text({
		x: 0,
		y: 190,
		w: W,
		text: slide.eyebrow,
		size: p.t(14),
		color: pal.accent,
		font: "mono",
		bold: true,
		caps: true,
		align: "center"
	});
	p.text({
		x: 140,
		y: 244,
		w: W - 280,
		text: clamp(slide.body || slide.title, 220),
		size: p.t(40),
		color: pal.ink,
		font: "display",
		italic: p.style.fonts.display.pdf === "times",
		align: "center"
	});
	if (slide.closing) p.text({
		x: 200,
		y: 486,
		w: W - 400,
		text: clamp(slide.closing, 140),
		size: p.t(18),
		color: pal.muted,
		font: "body",
		align: "center"
	});
}
function drawQuestions(p, slide, top) {
	const { m, content, pal } = p;
	const items = slide.steps.slice(0, 3);
	const gap = 20;
	const cardW = (content - gap * (items.length - 1)) / Math.max(1, items.length);
	items.forEach((question, i) => {
		const x = m + i * (cardW + gap);
		p.card(x, top, cardW, 196);
		p.text({
			x: x + 24,
			y: top + 24,
			w: cardW - 48,
			text: `Q${i + 1}`,
			size: p.t(15),
			color: pal.accent,
			font: "mono",
			bold: true
		});
		p.text({
			x: x + 24,
			y: top + 62,
			w: cardW - 48,
			text: clamp(question, 180),
			size: p.t(18),
			color: pal.ink,
			font: "body"
		});
	});
	if (slide.body) p.text({
		x: m,
		y: top + 226,
		w: content - 60,
		text: clamp(slide.body, 200),
		size: p.t(15),
		color: pal.muted,
		font: "body"
	});
}
function drawGap(p, slide, top) {
	const { m, content, pal } = p;
	p.card(m, top, content, 210, true);
	p.text({
		x: m + 32,
		y: top + 32,
		w: content - 64,
		text: "Evidence not present in the source documentation",
		size: p.t(15),
		color: pal.accent,
		font: "mono",
		bold: true,
		caps: true
	});
	p.text({
		x: m + 32,
		y: top + 72,
		w: content - 64,
		text: slide.body || "This section is intentionally left unclaimed.",
		size: p.t(22),
		color: pal.ink,
		font: "body"
	});
	if (slide.subtitle) p.text({
		x: m + 32,
		y: top + 150,
		w: content - 64,
		text: slide.subtitle,
		size: p.t(15),
		color: pal.muted,
		font: "body",
		italic: true
	});
	bulletList(p, slide, m, top + 250, content, 2);
}
function drawClosing(p, slide) {
	const { m, content, pal } = p;
	const inv = inverse(p);
	p.rect({
		x: 0,
		y: 0,
		w: W,
		h: H,
		color: inv.bg
	});
	p.rect({
		x: 0,
		y: 0,
		w: 200,
		h: 8,
		color: pal.accent
	});
	p.text({
		x: m,
		y: 200,
		w: content,
		text: slide.eyebrow,
		size: p.t(14),
		color: pal.accent,
		font: "mono",
		bold: true,
		caps: true
	});
	p.text({
		x: m,
		y: 244,
		w: content - 160,
		text: clamp(slide.title, 46),
		size: p.t(62),
		color: inv.fg,
		font: "display",
		bold: true
	});
	if (slide.body) p.text({
		x: m,
		y: 388,
		w: content - 300,
		text: clamp(slide.body, 200),
		size: p.t(21),
		color: inv.sub,
		font: "body"
	});
	if (slide.closing) {
		p.rect({
			x: m,
			y: 500,
			w: 6,
			h: 56,
			color: pal.accent
		});
		p.text({
			x: m + 24,
			y: 512,
			w: content - 100,
			text: clamp(slide.closing, 120),
			size: p.t(26),
			color: inv.fg,
			font: "display",
			bold: true
		});
	}
}
var FULL_BLEED = /* @__PURE__ */ new Set([
	"cover",
	"divider",
	"quote",
	"closing"
]);
/**
* Converts one slide into resolution-independent draw operations, themed by
* the deck's chosen style. Preview, PPTX and PDF all consume this same output.
*
* @param slide - The slide to render.
* @param styleId - Deck style identifier.
* @returns Ordered draw operations in 1280×720 space.
*/
function slideToOps(slide, styleId) {
	const style = getDeckStyle(styleId);
	const p = new Painter(style);
	p.rect({
		x: 0,
		y: 0,
		w: W,
		h: H,
		color: style.palette.bg
	});
	if (slide.layout === "cover") {
		drawCover(p, slide);
		footer(p, slide);
		return p.ops;
	}
	if (slide.layout === "divider") {
		drawDivider(p, slide);
		return p.ops;
	}
	if (slide.layout === "quote") {
		drawQuote(p, slide);
		footer(p, slide);
		return p.ops;
	}
	if (slide.layout === "closing") {
		drawClosing(p, slide);
		return p.ops;
	}
	const top = header(p, slide);
	switch (slide.layout) {
		case "split":
		case "market":
		case "model":
			drawSplit(p, slide, top);
			break;
		case "flow":
			drawFlow(p, slide, top);
			break;
		case "process":
			drawProcess(p, slide, top);
			break;
		case "features":
		case "advantage":
			drawFeatures(p, slide, top);
			break;
		case "metrics":
			drawMetrics(p, slide, top);
			break;
		case "matrix":
		case "comparison":
			drawMatrix(p, slide, top);
			break;
		case "architecture":
		case "technology":
			drawArchitecture(p, slide, top);
			break;
		case "timeline":
		case "roadmap":
			drawTimeline(p, slide, top);
			break;
		case "questions":
			drawQuestions(p, slide, top);
			break;
		case "gap":
			drawGap(p, slide, top);
			break;
		default: drawStatement(p, slide, top);
	}
	if (!FULL_BLEED.has(slide.layout)) {
		note(p, slide);
		footer(p, slide);
	}
	return p.ops;
}
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var SOURCE_LIMITS = {
	maxChars: 6e4,
	minChars: 200,
	acceptedExtensions: [
		".md",
		".markdown",
		".txt",
		".mdx",
		".rst"
	]
};
function countWords(text) {
	const trimmed = text.trim();
	return trimmed ? trimmed.split(/\s+/).length : 0;
}
function SourceComposer({ onGenerate, pending = false }) {
	const [text, setText] = (0, import_react.useState)("");
	const [fileName, setFileName] = (0, import_react.useState)(null);
	const [sizeBytes, setSizeBytes] = (0, import_react.useState)(void 0);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const chars = text.length;
	const words = (0, import_react.useMemo)(() => countWords(text), [text]);
	const ready = chars >= SOURCE_LIMITS.minChars && chars <= SOURCE_LIMITS.maxChars;
	const readFile = (0, import_react.useCallback)((file) => {
		const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
		if (!SOURCE_LIMITS.acceptedExtensions.includes(ext)) {
			setError(`Unsupported file. Use ${SOURCE_LIMITS.acceptedExtensions.join(", ")}`);
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setText(String(reader.result ?? "").slice(0, SOURCE_LIMITS.maxChars));
			setFileName(file.name);
			setSizeBytes(file.size);
			setError(null);
		};
		reader.readAsText(file);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/60 px-5 py-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 text-ember" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "README — Evidence source" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: chars === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Awaiting source" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: ready ? "positive" : "warning",
					dot: true,
					children: ready ? "Evidence detected" : "Too short"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-px bg-border lg:grid-cols-[0.85fr_1.15fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragging(false);
					const file = e.dataTransfer.files?.[0];
					if (file) readFile(file);
				},
				className: cn("flex min-h-64 flex-col items-center justify-center bg-card p-7 text-center transition-colors duration-300", dragging && "bg-surface"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						className: "sr-only",
						"aria-label": "Upload a README file",
						accept: SOURCE_LIMITS.acceptedExtensions.join(","),
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (file) readFile(file);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("grid size-14 place-items-center rounded-2xl border border-dashed border-border bg-surface transition-transform duration-300", dragging && "scale-110 border-ember"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-5 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base font-medium",
						children: "Drop your README here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-xs text-muted-foreground",
						children: SOURCE_LIMITS.acceptedExtensions.join(" · ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						className: "mt-5 min-h-11",
						onClick: () => inputRef.current?.click(),
						type: "button",
						children: "Browse files"
					}),
					fileName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex w-full items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 text-left animate-rise",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 shrink-0 text-ember" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: fileName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rule-label",
									children: sizeBytes ? `${(sizeBytes / 1024).toFixed(1)} KB` : "loaded"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Remove file",
								className: "grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
								onClick: () => {
									setFileName(null);
									setSizeBytes(void 0);
									setText("");
									if (inputRef.current) inputRef.current.value = "";
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "Paste documentation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rule-label",
							children: [
								words.toLocaleString(),
								" w · ",
								chars.toLocaleString(),
								" c"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: text,
						"aria-label": "Paste your README or documentation",
						onChange: (e) => {
							setText(e.target.value.slice(0, SOURCE_LIMITS.maxChars));
							setError(null);
							if (fileName) setFileName(null);
						},
						spellCheck: false,
						placeholder: "# Project\n\nWhat it does, who it's for, how it works…",
						className: "min-h-64 flex-1 resize-none bg-transparent p-4 font-mono text-[0.8rem] leading-relaxed outline-none placeholder:text-muted-foreground/70"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 border-t border-border px-4 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex min-w-0 items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { tone: error ? "danger" : ready ? "positive" : "neutral" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: error ?? (chars === 0 ? "Upload or paste your README to begin forging your pitch." : ready ? "Ready to forge." : `At least ${SOURCE_LIMITS.minChars} characters needed.`)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ink",
							size: "lg",
							className: "min-h-11 w-full sm:w-auto",
							disabled: !ready || pending,
							onClick: () => onGenerate({
								kind: fileName ? "file" : "paste",
								content: text,
								...fileName ? { fileName } : {},
								...sizeBytes !== void 0 ? { sizeBytes } : {}
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), pending ? "Analysing…" : "Analyse documentation"]
						})]
					})
				]
			})]
		})]
	});
}
var DECK_STAGES = [
	"Understanding your project",
	"Building the investor narrative",
	"Designing the slides",
	"Preparing your deck",
	"Ready to present"
];
function AnalysisProgress({ stage, stages = DECK_STAGES, label = "Generating" }) {
	const pct = Math.round((stage + 1) / stages.length * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "overflow-hidden animate-rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4",
				role: "status",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 shrink-0 text-ember motion-safe:animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-display text-lg",
						children: label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: [pct, "%"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-0.5 w-full bg-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-ember transition-[width] duration-700 ease-out",
					style: { width: `${pct}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-1 p-5 sm:p-6",
				children: stages.map((item, i) => {
					const done = i < stage;
					const active = i === stage;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-500", active && "bg-surface"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid size-5 shrink-0 place-items-center rounded-full border text-[0.6rem]", done && "border-chart-3/50 bg-chart-3/15 text-chart-3", active && "border-ember bg-ember/10 text-ember", !done && !active && "border-border text-muted-foreground"),
							"aria-hidden": "true",
							children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-ember motion-safe:animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-border" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-sm sm:text-base", done && "text-muted-foreground", active && "font-medium text-foreground", !done && !active && "text-muted-foreground/60"),
							children: item
						})]
					}, item);
				})
			})
		]
	});
}
function hasText(value) {
	return value.trim().length > 0;
}
function sectionsOf(pitch) {
	return [
		{
			label: "Problem",
			kind: "text",
			value: pitch.problem
		},
		{
			label: "Solution",
			kind: "text",
			value: pitch.solution
		},
		{
			label: "Target users",
			kind: "list",
			items: pitch.target_users
		},
		{
			label: "Key features",
			kind: "list",
			items: pitch.key_features
		},
		{
			label: "Market opportunity",
			kind: "text",
			value: pitch.market_opportunity
		},
		{
			label: "Business model",
			kind: "text",
			value: pitch.business_model
		},
		{
			label: "Competitive advantage",
			kind: "list",
			items: pitch.competitive_advantage
		},
		{
			label: "Technology",
			kind: "tags",
			items: pitch.technology
		},
		{
			label: "Traction",
			kind: "text",
			value: pitch.traction
		},
		{
			label: "Roadmap",
			kind: "list",
			items: pitch.roadmap
		}
	];
}
function isBacked(section) {
	return section.kind === "text" ? hasText(section.value) : section.items.length > 0;
}
function EvidenceCard({ section }) {
	const backed = isBacked(section);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		interactive: backed,
		className: backed ? "flex flex-col p-5" : "flex flex-col border-dashed bg-surface/50 p-5 shadow-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: section.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex shrink-0 items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground",
				title: backed ? "Backed by your documentation" : "No supporting evidence detected",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { tone: backed ? "positive" : "neutral" }), backed ? "Evidence" : "None"]
			})]
		}), !backed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted-foreground",
			children: "Not enough evidence in your documentation for this section."
		}) : section.kind === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-foreground",
			children: section.value
		}) : section.kind === "tags" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: item }, item))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3 text-sm leading-relaxed",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-ember" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
			}, item))
		})]
	});
}
function ReadinessPanel({ pitch, sections }) {
	const backed = sections.filter(isBacked);
	const missing = sections.filter((s) => !isBacked(s));
	const pct = Math.round(backed.length / sections.length * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Pitch readiness" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Derived from your documentation"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rule-label",
							children: "Evidence coverage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-3xl",
							children: [backed.length, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: ["/", sections.length]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-1 w-full overflow-hidden rounded-full bg-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-ember transition-[width] duration-700 ease-out",
								style: { width: `${pct}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "Sections backed by your source."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rule-label",
							children: "Narrative"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl",
							children: "Ready"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "Evidence analysis complete — no scores invented."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rule-label",
							children: "Investor questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl",
							children: pitch.investor_questions.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "Diligence prompts anticipated."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rule-label",
							children: "Market data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl",
							children: pitch.market_data_available ? "Found" : "None"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: pitch.market_data_available ? "Quantitative data present in your source." : "No quantitative figures — nothing estimated."
						})
					] })
				]
			}),
			missing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border-t border-border pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rule-label",
						children: "Missing evidence"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: missing.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "warning",
						children: section.label
					}, section.label))
				})]
			}),
			pitch.confidence_notes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border-t border-border pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Confidence notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: pitch.confidence_notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 text-sm leading-relaxed text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note })]
					}, note))
				})]
			})
		]
	});
}
function PitchIntelligence({ pitch }) {
	const sections = sectionsOf(pitch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				step: "Step 02 — Pitch Intelligence",
				note: "Grounded in your documentation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mt-8 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative border-b border-border p-7 sm:p-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 micro-grid [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: "positive",
									dot: true,
									children: "Source-backed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Evidence model" })]
							}),
							hasText(pitch.project_name) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-4xl sm:text-5xl",
								children: pitch.project_name
							}),
							hasText(pitch.tagline) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl font-display text-xl italic text-ember",
								children: pitch.tagline
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface/40 p-5 sm:p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-chart-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "README — Evidence source"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
						children: sections.filter(isBacked).map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceCard, { section }, section.label))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadinessPanel, {
					pitch,
					sections
				})
			}),
			pitch.investor_questions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-3.5 text-ember" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rule-label",
						children: "Investor insights — likely diligence"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 md:grid-cols-3",
					children: pitch.investor_questions.map((question, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						interactive: true,
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-2xl text-ember/70",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-foreground",
							children: question
						})]
					}, question))
				})]
			}),
			hasText(pitch.call_to_action) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mt-6 border-ember/30 bg-ember/5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Call to action"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-xl leading-snug",
					children: pitch.call_to_action
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-xs text-muted-foreground",
				children: "Sections are displayed only when supported by evidence in your documentation — nothing is invented."
			})
		]
	});
}
/**
* Renders one slide at native 1280×720 from the very same draw operations the
* PPTX and PDF exporters consume, so the preview is a true proof of the file.
*/
function SlideCanvas({ slide, styleId, className }) {
	const style = getDeckStyle(styleId);
	const ops = slideToOps(slide, styleId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden", className),
		style: {
			width: DECK_SIZE.width,
			height: DECK_SIZE.height,
			backgroundColor: `#${style.palette.bg}`
		},
		"aria-label": `Slide ${slide.number}: ${slide.title}`,
		children: ops.map((op, i) => op.kind === "rect" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
			position: "absolute",
			left: op.x,
			top: op.y,
			width: op.w,
			height: op.h,
			backgroundColor: `#${op.color}`,
			borderRadius: op.radius ?? 0,
			border: op.borderColor ? `${op.borderWidth ?? 1}px solid #${op.borderColor}` : void 0,
			boxSizing: "border-box"
		} }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "absolute",
				left: op.x,
				top: op.y,
				width: op.w,
				color: `#${op.color}`,
				fontFamily: style.fonts[op.font].css,
				fontSize: op.size,
				fontWeight: op.bold ? 700 : 400,
				fontStyle: op.italic ? "italic" : "normal",
				lineHeight: op.lineHeight ?? 1.32,
				letterSpacing: op.caps ? "0.12em" : "-0.01em",
				textTransform: op.caps ? "uppercase" : "none",
				textAlign: op.align ?? "left",
				whiteSpace: "pre-wrap",
				overflowWrap: "break-word"
			},
			children: op.text
		}, i))
	});
}
function ScaledSlide({ children }) {
	const ref = (0, import_react.useRef)(null);
	const [scale, setScale] = (0, import_react.useState)(.2);
	(0, import_react.useLayoutEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const update = () => setScale(el.clientWidth / DECK_SIZE.width);
		update();
		const observer = new ResizeObserver(update);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "relative w-full overflow-hidden",
		style: { aspectRatio: "16 / 9" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-0 top-0 origin-top-left",
			style: {
				width: DECK_SIZE.width,
				height: DECK_SIZE.height,
				transform: `scale(${scale})`
			},
			children
		})
	});
}
function DeckPreview({ deck, onRestyle }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const total = deck.slides.length;
	const current = deck.slides[index];
	const style = getDeckStyle(deck.style);
	const length = getDeckLength(deck.length);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, total - 1));
			if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [total]);
	const handleExport = async (format) => {
		setBusy(format);
		try {
			const mod = await import("./export-BQoDBLTE.mjs");
			if (format === "pptx") await mod.exportPptx(deck);
			else await mod.exportPdf(deck);
			toast.success(`${format.toUpperCase()} downloaded.`);
		} catch {
			toast.error(`Could not build the ${format.toUpperCase()} file.`);
		} finally {
			setBusy(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				step: "Step 04 — Deck Preview",
				note: "Generated from your project documentation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "ember",
						children: style.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: length.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [total, " slides"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						tone: deck.quality.gaps.length ? "warning" : "positive",
						children: [deck.quality.score, "% evidence-backed"]
					}),
					onRestyle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "quiet",
						size: "sm",
						className: "ml-auto min-h-9",
						onClick: onRestyle,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4" }), "Try another style"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-[190px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex gap-3 overflow-x-auto pb-2 lg:max-h-[640px] lg:flex-col lg:overflow-y-auto lg:pr-2",
					children: deck.slides.map((slide, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "shrink-0 lg:shrink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setIndex(i),
							"aria-current": i === index,
							className: cn("w-40 overflow-hidden rounded-xl border bg-card text-left transition-all duration-300 hover:-translate-y-0.5 lg:w-full", i === index ? "border-ember shadow-lift" : "border-border opacity-70 hover:opacity-100"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaledSlide, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideCanvas, {
								slide,
								styleId: deck.style
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block border-t border-border px-2 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground",
								children: [
									String(slide.number).padStart(2, "0"),
									" · ",
									slide.title
								]
							})]
						})
					}, slide.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl border border-border shadow-lift",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaledSlide, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlideCanvas, {
							slide: current,
							styleId: deck.style
						}) }, current.id)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "quiet",
									size: "sm",
									"aria-label": "Previous slide",
									className: "min-h-11 min-w-11",
									disabled: index === 0,
									onClick: () => setIndex((i) => Math.max(i - 1, 0)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-sm text-muted-foreground",
									children: [
										String(index + 1).padStart(2, "0"),
										" / ",
										String(total).padStart(2, "0")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "quiet",
									size: "sm",
									"aria-label": "Next slide",
									className: "min-h-11 min-w-11",
									disabled: index === total - 1,
									onClick: () => setIndex((i) => Math.min(i + 1, total - 1)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ink",
								size: "lg",
								className: "min-h-11",
								disabled: busy !== null,
								onClick: () => handleExport("pptx"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), busy === "pptx" ? "Building…" : "Download Pitch Deck (PPTX)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "quiet",
								size: "lg",
								className: "min-h-11",
								disabled: busy !== null,
								onClick: () => handleExport("pdf"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), busy === "pdf" ? "Building…" : "Download PDF"]
							})]
						})]
					}),
					deck.quality.gaps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs leading-relaxed text-muted-foreground",
						children: [
							"Slides marked as gaps (",
							deck.quality.gaps.join(", "),
							") disclose missing evidence rather than inventing figures."
						]
					})
				] })]
			})
		]
	});
}
function Swatch({ styleId }) {
	const { palette } = getDeckStyle(styleId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-16 w-full overflow-hidden rounded-md border border-border",
		style: { backgroundColor: `#${palette.bg}` },
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-3 top-3 h-1.5 w-8",
				style: { backgroundColor: `#${palette.accent}` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-3 top-7 h-2 w-24 rounded-sm",
				style: { backgroundColor: `#${palette.ink}` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-3 top-11 h-1.5 w-16 rounded-sm",
				style: { backgroundColor: `#${palette.muted}` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-2 right-2 h-8 w-16 rounded",
				style: {
					backgroundColor: `#${palette.panelAlt}`,
					border: `1px solid #${palette.rule}`
				}
			})
		]
	});
}
/** Style and narrative-length picker shown before the deck is generated. */
function DeckConfig({ style, length, recommended, recommendationReason, disabled, onStyleChange, onLengthChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "animate-rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				step: "Step 03 — Deck Format",
				note: recommendationReason
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: DECK_STYLE_LIST.map((option) => {
					const active = option.id === style;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled,
						"aria-pressed": active,
						onClick: () => onStyleChange(option.id),
						className: cn("group rounded-xl border bg-card p-4 text-left transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60", active ? "border-ember shadow-lift" : "border-border hover:border-foreground/25"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, { styleId: option.id }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg leading-tight",
									children: option.name
								}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-4 shrink-0 text-ember",
									"aria-hidden": "true"
								}) : option.id === recommended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: "ember",
									children: "Suggested"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
								children: option.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground",
								children: option.bestFor
							})
						]
					}, option.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "mt-4 p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rule-label",
					children: "Deck length"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-3",
					children: DECK_LENGTH_LIST.map((option) => {
						const active = option.id === length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled,
							"aria-pressed": active,
							onClick: () => onLengthChange(option.id),
							className: cn("rounded-lg border px-4 py-3 text-left transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60", active ? "border-ember bg-surface" : "border-border hover:border-foreground/25"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium",
									children: option.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground",
									children: option.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted-foreground",
								children: option.summary
							})]
						}, option.id);
					})
				})]
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var analyzeReadmeFn = createServerFn({ method: "POST" }).validator((input) => analyzeInputSchema.parse(input)).handler(createSsrRpc("8aa51df83cf50803dc7e9a862f5da8173ccd2f7ace2337161069f98d21229019"));
var PAYMENT_PHASE_LABEL = {
	IDLE: "Generate Pitch Deck",
	PAYMENT_REQUIRED: "Payment required",
	WALLET_CONNECTING: "Connecting wallet…",
	WALLET_PENDING: "Waiting for wallet approval…",
	SUBMITTING_PAYMENT: "Submitting payment…",
	VERIFYING_PAYMENT: "Verifying payment on Algorand…",
	PAYMENT_SUCCESS: "Payment verified",
	GENERATING_DECK: "Payment confirmed. Building your investor deck…",
	COMPLETE: "Your investor deck is ready.",
	ERROR: "Payment could not be verified."
};
var GENERATE_DECK_PATH = "/api/public/generate-deck";
function explorerTxUrl(txId, networkLabel) {
	return `${networkLabel.toLowerCase().includes("mainnet") ? "https://lora.algokit.io/mainnet/transaction" : "https://lora.algokit.io/testnet/transaction"}/${txId}`;
}
/** Full-genesis-hash network ids, matching what the facilitator advertises. */
var ALGORAND_MAINNET_NETWORK = `algorand:${ALGORAND_MAINNET_GENESIS_HASH}`;
var ALGORAND_TESTNET_NETWORK = `algorand:${ALGORAND_TESTNET_GENESIS_HASH}`;
var ATOMIC_UNITS = 1e6;
function networkLabel(network) {
	if (network === "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe" || network === ALGORAND_TESTNET_NETWORK) return "Algorand TestNet";
	if (network === "algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73k" || network === ALGORAND_MAINNET_NETWORK) return "Algorand MainNet";
	return network;
}
function toQuote(raw) {
	const requirements = raw.accepts[0];
	const amount = Number(requirements.amount ?? "0") / ATOMIC_UNITS;
	const isAlgo = requirements.asset === "0" || !requirements.asset;
	return {
		raw,
		requirements,
		amountLabel: `${amount.toFixed(2)} ${isAlgo ? "ALGO" : "USDC"}`,
		networkLabel: networkLabel(requirements.network),
		payTo: requirements.payTo
	};
}
/**
* Requests the deck without payment. A correctly configured server answers
* HTTP 402 with the x402 payment requirements, which drives the payment UI.
*
* @param pitch - Structured pitch payload.
* @param idempotencyKey - Stable key so a paid retry is never charged twice.
* @returns The payment quote, a replayed deck, or an error message.
*/
async function requestDeckQuote(pitch, idempotencyKey, options) {
	const response = await fetch(GENERATE_DECK_PATH, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			"Idempotency-Key": idempotencyKey
		},
		body: JSON.stringify({
			pitch,
			options
		})
	});
	if (response.status === 402) {
		const header = response.headers.get("PAYMENT-REQUIRED");
		if (header) try {
			return {
				type: "payment_required",
				quote: toQuote(decodePaymentRequiredHeader(header))
			};
		} catch {}
		const body = await response.json().catch(() => null);
		if (body && Array.isArray(body.accepts) && body.accepts.length > 0) return {
			type: "payment_required",
			quote: toQuote(body)
		};
		return {
			type: "error",
			message: "The server requested payment but sent no payment terms."
		};
	}
	const body = await response.json().catch(() => null);
	if (response.ok && body?.success && body.deck) return {
		type: "deck",
		deck: body.deck
	};
	return {
		type: "error",
		message: body?.message ?? "The deck service is unavailable. Please try again."
	};
}
var workspace_exports = /* @__PURE__ */ __exportAll({ component: () => WorkspacePage });
var ANALYZE_STAGES = [
	"Reading your project…",
	"Finding the problem…",
	"Extracting the evidence…",
	"Structuring your pitch…"
];
var PAYMENT_STAGES = [
	"Requesting the deck",
	"Awaiting wallet approval",
	"Settling payment on Algorand",
	"Building your investor deck",
	"Ready to present"
];
var PHASE_STAGE = {
	PAYMENT_REQUIRED: 0,
	WALLET_CONNECTING: 0,
	WALLET_PENDING: 1,
	SUBMITTING_PAYMENT: 2,
	VERIFYING_PAYMENT: 2,
	PAYMENT_SUCCESS: 3,
	GENERATING_DECK: 3,
	COMPLETE: 4
};
function WorkspacePage() {
	const analyze = useServerFn(analyzeReadmeFn);
	const [analyzeStage, setAnalyzeStage] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)("IDLE");
	const [quote, setQuote] = (0, import_react.useState)(null);
	const [settlement, setSettlement] = (0, import_react.useState)(null);
	const [payError, setPayError] = (0, import_react.useState)(null);
	const [deck, setDeck] = (0, import_react.useState)(null);
	const [requesting, setRequesting] = (0, import_react.useState)(false);
	const [deckStyle, setDeckStyle] = (0, import_react.useState)("modern-startup");
	const [deckLength, setDeckLength] = (0, import_react.useState)("standard");
	const [styleTouched, setStyleTouched] = (0, import_react.useState)(false);
	const idempotencyKey = (0, import_react.useRef)("");
	const resetPayment = (0, import_react.useCallback)(() => {
		setPhase("IDLE");
		setQuote(null);
		setSettlement(null);
		setPayError(null);
		setDeck(null);
	}, []);
	const analysis = useMutation({
		mutationFn: async (source) => {
			setAnalyzeStage(0);
			const tick = setInterval(() => setAnalyzeStage((s) => Math.min(s + 1, ANALYZE_STAGES.length - 2)), 2400);
			try {
				const result = await analyze({ data: { content: source.content } });
				if (!result.success) throw new Error(result.error);
				setAnalyzeStage(ANALYZE_STAGES.length - 1);
				if (!styleTouched) setDeckStyle(recommendStyle(result.pitch).style);
				return result.pitch;
			} finally {
				clearInterval(tick);
			}
		},
		onError: (error) => toast.error(error.message || "Analysis failed.")
	});
	const deckOptions = {
		style: deckStyle,
		length: deckLength
	};
	const recommendation = analysis.data ? recommendStyle(analysis.data) : {
		style: "modern-startup",
		reason: "Choose the presentation format for your deck."
	};
	/** Step 1 of the paid flow: ask the server for the deck and expect HTTP 402. */
	const startGeneration = async (pitch) => {
		setRequesting(true);
		setPayError(null);
		idempotencyKey.current = crypto.randomUUID();
		try {
			const result = await requestDeckQuote(pitch, idempotencyKey.current, deckOptions);
			if (result.type === "payment_required") {
				setQuote(result.quote);
				setPhase("PAYMENT_REQUIRED");
			} else if (result.type === "deck") {
				setDeck(result.deck);
				setPhase("COMPLETE");
			} else {
				setPhase("ERROR");
				setPayError(result.message);
				toast.error(result.message);
			}
		} catch {
			setPhase("ERROR");
			setPayError("Could not reach the deck service. Please try again.");
		} finally {
			setRequesting(false);
		}
	};
	/** Step 2: sign and settle the x402 invoice, then receive the deck. */
	const showDeck = deck !== null;
	const paying = [
		"WALLET_PENDING",
		"SUBMITTING_PAYMENT",
		"VERIFYING_PAYMENT"
	].includes(phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-6 sm:py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "animate-rise",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: "ember",
								dot: true,
								children: "Step 01 — Source"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 max-w-3xl text-4xl leading-[1.08] sm:text-5xl",
								children: "Turn your README into an investor-ready pitch."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
								children: "NarrativeX analyzes your existing product evidence and transforms it into a structured investor narrative — without inventing traction or claims."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4",
								children: TRUST_ROW.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 bg-card px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
										className: "size-3.5 shrink-0 text-ember",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground",
										children: item.label
									})]
								}, item.label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 animate-rise",
						style: { animationDelay: "80ms" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceComposer, {
							onGenerate: (source) => {
								resetPayment();
								analysis.mutate(source);
							},
							pending: analysis.isPending
						})
					}),
					analysis.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisProgress, {
							stage: analyzeStage,
							stages: ANALYZE_STAGES,
							label: "Analysing"
						})
					}),
					analysis.isError && !analysis.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateCard, {
							kind: "error",
							title: "Analysis failed",
							what: analysis.error?.message || "Your documentation could not be analysed.",
							next: "Check the content length and try again, or paste a more complete README."
						})
					}),
					(requesting || paying) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisProgress, {
							stage: PHASE_STAGE[phase] ?? 0,
							stages: PAYMENT_STAGES,
							label: PAYMENT_PHASE_LABEL[phase]
						})
					}),
					showDeck && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "overflow-hidden border-chart-3/30 animate-rise",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/60 px-6 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { tone: "positive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rule-label",
											children: "Deck ready"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										tone: "positive",
										children: "Generated"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-5 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-3xl",
											children: "Your investor-ready pitch has been forged."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: "Download it below, or start a new generation from the same documentation."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "quiet",
										className: "min-h-11 w-full lg:w-auto",
										onClick: resetPayment,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Generate another deck"]
									})]
								}),
								settlement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 border-t border-border px-6 py-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rule-label",
											children: ["Payment settled — ", settlement.network]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 truncate font-mono text-xs text-muted-foreground",
											children: settlement.transactionId
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										className: "flex items-center gap-2 font-mono text-xs text-ember underline underline-offset-4",
										href: explorerTxUrl(settlement.transactionId, settlement.network),
										target: "_blank",
										rel: "noreferrer",
										children: ["View on Algorand Explorer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckPreview, {
							deck,
							onRestyle: resetPayment
						})]
					}),
					analysis.isSuccess && !analysis.isPending && !showDeck && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchIntelligence, { pitch: analysis.data })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckConfig, {
								style: deckStyle,
								length: deckLength,
								recommended: recommendation.style,
								recommendationReason: recommendation.reason,
								disabled: requesting || quote !== null,
								onStyleChange: (next) => {
									setStyleTouched(true);
									setDeckStyle(next);
								},
								onLengthChange: setDeckLength
							})
						}),
						quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: null })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "mt-8 grid gap-5 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rule-label",
											children: "Step 03 — Generate"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-display text-2xl sm:text-3xl",
											children: "Ready to forge the deck."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground",
											children: [
												getDeckLength(deckLength).label,
												" in the ",
												getDeckStyle(deckStyle).name,
												" style, built from the evidence above — nothing invented. Payment is requested by the server before anything is generated."
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ink",
									size: "xl",
									className: "min-h-12 w-full lg:w-auto",
									disabled: requesting,
									onClick: () => void startGeneration(analysis.data),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), requesting ? "Preparing…" : "Generate Pitch Deck"]
								}),
								payError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateCard, {
										kind: "error",
										title: "Request failed",
										what: payError,
										next: "Retry the request. If it persists, the payment service may be temporarily unavailable."
									})
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rule-label",
							children: "Pay-per-generation • x402 • Algorand TestNet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "No account required. You pay only when a deck is produced."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
var TRUST_ROW = [
	{
		label: "README evidence",
		icon: FileCodeCorner
	},
	{
		label: "AI analysis",
		icon: Sparkles
	},
	{
		label: "Investor narrative",
		icon: Presentation
	},
	{
		label: "x402 payment",
		icon: ShieldCheck
	}
];
//#endregion
export { slideToOps as n, workspace_exports as t };
