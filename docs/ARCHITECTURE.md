# ARCHITECTURE

## Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Zustand (estado global)
- Framer Motion (microinteracoes)
- Zod (validacao e sanitizacao de entrada)

## Estrutura
- `src/app`: rotas e endpoints.
- `src/components/portal`: shell e componentes de interface.
- `src/data`: mocks JSON versionados.
- `src/types`: contratos de dominio.
- `src/lib`: funcoes de conteudo e validacao.
- `src/store`: estado global da interface.

## Fluxo de Dados
1. Dados de dominio sao lidos de JSON em `src/data`.
2. `src/lib/content.ts` expoe consultas e filtros.
3. Componentes client usam estado global para busca, tema e drawer.
4. Formulario envia payload para `src/app/api/submissions/route.ts`, com validacao e resposta segura.

## Convensoes de Branch e Review
- `main` protegida (merge apenas via PR).
- Commits pequenos e orientados a feature.
- PR com checklist de: lint, build, acessibilidade basica e regressao visual.
- Revisor obrigatorio para mudancas em `src/app/api` e `next.config.ts`.
