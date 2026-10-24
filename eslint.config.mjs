import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "script" },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "warn",
      eqeqeq: "warn",
    },
  },
  eslintConfigPrettier,
];
