import { writeFileSync as w } from 'node:fs'

w('.husky/pre-commit', 'pnpm lint-staged')
