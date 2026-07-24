import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// typescript-eslint ne supporte pas encore l'API TypeScript 7 (cf. issue #10940).
// Le projet installe donc les deux côte à côte, via des alias npm :
//   · `tsc`               → TypeScript 7 (compilation et vérification de types)
//   · import 'typescript' → @typescript/typescript6, l'API 6.0 que lit cet outil
// Rien à changer ici quand typescript-eslint deviendra compatible : il suffira
// de retirer l'alias `typescript` de package.json.

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'public', 'api', 'plans'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // react-hooks v7 a introduit des règles strictes (compiler) qui signalent
      // du code fonctionnel existant ; on les conserve en avertissements.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  }
)
