import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "coverage/**"],
  },
  ...nextVitals,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
