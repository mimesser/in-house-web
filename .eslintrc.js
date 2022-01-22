module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: ['airbnb', 'prettier', 'prettier/react'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['babel', 'react', 'prettier'],
	rules: {
		'consistent-return': 'off',
		'linebreak-style': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'react/sort-comp': 'off',
		'react/jsx-filename-extension': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-indent-props': ['warn', 2],
		'max-len': ['warn', { code: 130 }],
		'react/jsx-indent': ['warn', 2],
		'no-unused-vars': 'off',
		'no-console': 'off',
		'no-shadow': 'off',
		'no-undef': 'off',
		'import/no-cycle': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/prefer-default-export': 'off',
		'import/no-named-as-default': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'no-underscore-dangle': 'off',
		'no-use-before-define': 'off',
		'global-require': 'off',
		'react/button-has-type': 'off',
		'react/destructuring-assignment': 'off',
		'react/prefer-stateless-function': 'off',
		'react/no-array-index-key': 'off',
		'react/no-unescaped-entities': 'off',
		'jsx-a11y/accessible-emoji': 'off',
		'jsx-a11y/label-has-for': 'off',
		'react/forbid-prop-types': 'off',
		'react/no-multi-comp': 'off',
		'react/require-default-props': 'off',
		'jsx-a11y/label-has-associated-control': 'off',
		'no-param-reassign': 'off',
		'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
		'class-methods-use-this': 'off',
		'no-plusplus': 'off',
	},
	settings: {
		'import/resolver': {
			alias: [['@', './']],
		},
	},
};
