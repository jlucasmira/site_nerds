# ARCHITECTURE.md

## 1) Visao Geral e Objetivos

O `site_nerds` e o portal institucional do **UFC Neural Portal / Research Hub**, concebido como um Hub de Inteligencia Computacional para:

- consolidar projetos de pesquisa, publicacoes e perfis de membros em uma unica superficie digital;
- expor metricas tecnicas e academicas com leitura rapida e visual consistente;
- criar uma base escalavel para evolucao futura (integracao de backend real, analytics e modulos adicionais).

Este documento e normativo. Toda evolucao de arquitetura, UI, deploy e manutencao deve respeitar os principios aqui definidos.

---

## 2) Stack Tecnologica

### 2.1 Runtime e Framework

- **Next.js 16.2.4** com **App Router** (`src/app`).
- **React 19.2.4** para composicao de UI e fronteira Server/Client Components.
- **TypeScript 5** para tipagem de dominio e contratos internos.

### 2.2 Estilizacao e UI

- **Tailwind CSS 4** como camada principal de design tokens e utilitarios.
- Tokens e estilos globais definidos em `src/app/globals.css`.
- Comportamentos de animacao e microinteracoes via **Framer Motion**.

### 2.3 Estado, Validacao e Dados

- **Zustand** para estado global de UI (`src/store/portal-store.ts`): tema, busca, drawer e modal.
- **Zod** para validacao/sanitizacao de entrada (`src/lib/validation.ts`).
- Dados mock versionados em JSON (`src/data/*.json`) com contratos em `src/types/domain.ts`.

### 2.4 Integração GitHub e Vercel

- Pipeline de qualidade e deploy via **GitHub Actions**:
  - `.github/workflows/ci.yml`
  - `.github/workflows/deploy-vercel.yml`
- Deploy automatizado para **Vercel** em push para `main`, com segredos:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`

---

## 3) Padroes de Design (UI/UX)

### 3.1 Diretriz Visual Oficial

O produto adota um estilo **Dark-First High-Tech** com **Glassmorphism** como linguagem principal. A interface deve comunicar sofisticação tecnologica e leitura objetiva.

### 3.2 Paleta Neon (Normativa)

- **Primary Neon Cyan:** `#00F1FE` (realce, foco, energia, links de acao).
- **Success Neon Green:** `#10B981` (status positivo, confirmacoes, sucesso operacional).
- Tons de suporte dark e superficies sao permitidos, desde que preservem contraste AA e protagonismo das cores neon.

### 3.3 Especificacao de Glassmorphism

Aplicacao mandataria para paineis e cards de dados:

- fundo semitransparente (alpha baixo);
- `backdrop-filter: blur(...)`;
- borda fina com baixa opacidade em tonalidade ciano;
- gradiente sutil para profundidade;
- glow controlado em componentes de alta prioridade.

### 3.4 Tipografia

- Familia oficial: **Manrope**.
- Hierarquia recomendada:
  - Display: titulos hero e chamadas de modulo;
  - Headline: secoes e subtitulos;
  - Body: descricao funcional e conteudo informativo;
  - Label: metadados, tags, status e controles compactos.
- Proibido misturar familias tipograficas sem aprovacao arquitetural.

### 3.5 UX e Acessibilidade

- Navegacao mobile em drawer com controle de foco e sem bloqueio de leitura.
- Componentes interativos devem possuir `aria-label` quando necessario.
- Busca e filtros devem responder em tempo real sem degradar legibilidade.

---

## 4) Estrutura de Pastas (Next.js App Router)

Estrutura-base atual:

- `src/app`
  - Rotas e segmentos App Router (`/research`, `/publications`, `/code`, `/members`).
  - API Route para submissao: `src/app/api/submissions/route.ts`.
  - Arquivos de SEO tecnico: `src/app/robots.ts`, `src/app/sitemap.ts`.
- `src/components/portal`
  - Shell de layout (`portal-shell.tsx`) e componentes de dominio visual (TopBar, SideNav, cards, modal).
- `src/data`
  - Fonte de dados mock em JSON (projects, members, metrics, publications).
- `src/lib`
  - Camada utilitaria de conteudo/filtro (`content.ts`) e validacao (`validation.ts`).
- `src/store`
  - Estado global com Zustand.
- `src/types`
  - Tipos de dominio compartilhados.
- `docs`
  - Documentacao normativa (produto, design e arquitetura).

Regra arquitetural: novas features devem preservar separacao entre **rotas**, **componentes de UI**, **dados**, **estado** e **validacao**.

---

## 5) Fluxos de CI/CD (GitHub Actions -> Vercel)

### 5.1 Pipeline de Qualidade

Arquivo: `.github/workflows/ci.yml`

Execucao em `pull_request` e `push` na `main`:

1. checkout do codigo;
2. setup Node 20 com cache npm;
3. `npm ci`;
4. `npm run lint`;
5. `npm run build`.

Objetivo: impedir regressao sintatica, tipagem invalida e build quebrado antes de release.

### 5.2 Pipeline de Deploy

Arquivo: `.github/workflows/deploy-vercel.yml`

Execucao em `push` na `main`:

1. checkout do codigo;
2. deploy de producao via `amondnet/vercel-action@v25`;
3. autenticacao com segredos do repositorio (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).

Objetivo: publicacao continua e rastreavel em ambiente Vercel.

---

## 6) Guia de Manutencao

### 6.1 Execucao Local

Pre-requisitos:

- Node.js 20+
- npm 10+

Comandos:

1. `npm install`
2. `npm run dev`
3. acessar `http://localhost:3000` (redirecionamento para `/research`)

Qualidade local antes de subir alteracoes:

- `npm run lint`
- `npm run build`

### 6.2 Gestao de Chaves e Tokens

- Nunca commitar credenciais no repositorio (`.env`, tokens, chaves privadas).
- Tokens de acesso pessoal (PAT) do GitHub devem ser armazenados apenas em:
  - gerenciador seguro local, ou
  - GitHub Secrets do repositorio.
- PAT recomendado com escopo minimo necessario (principio do menor privilegio).
- Para CI/CD com Vercel, usar exclusivamente `Repository Secrets`.

### 6.3 Politicas de Branch

- `main` deve ser protegida com merge via PR.
- Toda entrega deve passar por CI verde.
- Mudancas em `next.config.ts`, API routes e workflows exigem revisao cuidadosa.

---

## 7) Regras Arquiteturais Mandatorias

1. Nao introduzir nova dependencia sem justificativa tecnica e impacto conhecido.
2. Nao mover logica de validacao para UI quando ela puder existir em camada dedicada (`src/lib`).
3. Nao acoplar componentes de pagina diretamente a formatos externos sem tipagem de dominio.
4. Nao quebrar a identidade visual neon/glassmorphism sem aprovacao de arquitetura.
5. Nao liberar deploy sem `lint` e `build` validos.
