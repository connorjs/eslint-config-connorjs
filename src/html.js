import { configs, rules } from "@html-eslint/eslint-plugin";
import { parseForESLint } from "@html-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export const html = [
	{
		files: [`**/*.html`],
		languageOptions: {
			parser: { parseForESLint },
		},
		plugins: {
			"@html-eslint": { rules },
		},
		rules: {
			...configs.recommended.rules,
			"@html-eslint/id-naming-convention": [`error`, `kebab-case`],
			"@html-eslint/indent": `off`, // Formatting
			"@html-eslint/no-abstract-roles": `error`, // Accessibility
			"@html-eslint/no-accesskey-attrs": `error`, // Accessibility
			"@html-eslint/no-aria-hidden-body": `error`, // Please don’t 🙃
			"@html-eslint/no-extra-spacing-attrs": `off`, // Prettier
			"@html-eslint/no-inline-styles": `error`, // CSP (require explanation)
			"@html-eslint/no-non-scalable-viewport": `error`, // Accessibility
			"@html-eslint/no-positive-tabindex": `error`, // Require explanation
			"@html-eslint/no-skip-heading-levels": `error`, // Require explanation
			"@html-eslint/no-target-blank": `error`, // Be safe
			"@html-eslint/require-button-type": `error`, // Be explicit
			"@html-eslint/require-closing-tags": `off`, // Prettier
			"@html-eslint/require-frame-title": `error`, // Best practice?
			"@html-eslint/require-meta-charset": `error`, // Best practice?
			"@html-eslint/require-meta-description": `error`, // Best practice?
			"@html-eslint/require-meta-viewport": `error`, // Best practice
		},
	},
];
