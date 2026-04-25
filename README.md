NERDS Portal e um hub institucional para projetos, publicacoes e perfis de pesquisadores.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000). A raiz redireciona para `/research`.

## Main routes
- `/research`
- `/publications`
- `/code`
- `/members`
- `/members/[slug]`

## Scripts
- `npm run dev`: ambiente local
- `npm run lint`: validacao de qualidade
- `npm run build`: build de producao

## Deploy on Vercel

Configure os segredos `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID` para ativar o workflow de deploy continuo.

Documentacao do produto/arquitetura/design em `docs/`.
