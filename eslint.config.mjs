import nextPlugin from "@next/eslint-plugin-next";
import * as tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks"; // Explicitly include hooks

// No need for path/fileURLToPath/dirname unless you use __dirname for other things

export default [
  // 1) Define ignored files first
  {
    ignores: [
      "components/ui/*.tsx",
    ],
  },
  
  // 2) Next.js Core Config
  // Use the correct export structure: the config is likely under 'configs' 
  // or exported directly, but for now, we'll try the common 'configs' export.
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    // 💥 CORRECTED LINE: Use the 'configs' property.
    ...nextPlugin.configs['core-web-vitals'], 
    // ^ Assuming the plugin still exposes its configs object under the 'configs' property
  },

  // 3) TypeScript Recommended Rules
  ...tseslint.configs.recommended,
  
  // 4) React and React Hooks Plugins (essential for Next.js)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
        react: reactPlugin,
        'react-hooks': reactHooksPlugin, // Add hooks plugin
    },
    settings: {
      react: { version: 'detect' }, // Required for React plugin's rules
      next: { rootDir: true },
    },
    rules: {
      // Add your custom overrides here
      // Ensure this rule is set to use the pattern:
        '@typescript-eslint/no-unused-vars': [
            'error',
            { 
                // Ignore all variables that start with an underscore (e.g., _isServer)
                varsIgnorePattern: '^_', 
                argsIgnorePattern: '^_', 
                // This will prevent the linter from complaining about '_isServer'
            },
        ],
    },
  },
];