import { base } from "./base.js";
import { json } from "./json.js";
import { html } from "./html.js";

/**
 * The @connorjs ESLint config.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
	...json,
	...html,
	...base, // Last to apply to all file types
];
