import { base } from "./base.js";

/**
 * The @connorjs ESLint config.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
	...base, // Last to apply to all file types
];
