module.exports = {
    plugins: [
        'react'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        "react/prop-types": "off",
        "no-unused-vars": "off",
    }
}