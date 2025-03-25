import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import _import from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
      import: _import,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: ["block-like", "class", "continue", "while", "for", "do", "if"],
          next: "*",
        },
        {
          blankLine: "always",
          prev: ["const", "let"],
          next: ["while", "for", "do", "if", "switch"],
        },
      ],
      "import/order": [
        "error",
        {
          pathGroupsExcludedImportTypes: ["builtin"],

          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
            "unknown",
          ],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: false,
          },
        },
      ],
      "max-len": [
        "error",
        {
          code: 95,
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
