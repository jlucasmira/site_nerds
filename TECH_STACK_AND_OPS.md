# TECH_STACK_AND_OPS.md

> Documentação definitiva do projeto NERDS Portal. Leia este arquivo antes de qualquer interação para obter contexto absoluto.

---

## 1. Protocolo de Segurança e Backend

### 1.1 Headers de Segurança (`next.config.ts`)

O projeto implementa headers de segurança em todas as rotas:

```typescript
// next.config.ts - linhas 8-37
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://lh3.googleusercontent.com",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  {
    key: "Cache-Control",
    value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  },
];
```

**Lei**: Qualquer nova rota ou API deve respeitar esses headers. Não adicione inline scripts ou recursos externos sem atualizar o CSP.

### 1.2 Rate Limiting (`src/lib/rate-limit.ts`)

Implementação em memória (in-memory rate limiting):

```typescript
// src/lib/rate-limit.ts
const WINDOW_MS = 60_000; // 1 minuto
const MAX_REQUESTS = 10; // 10 requisições por IP
```

**Lei**: O endpoint `/api/submissions` usa rate limiting. Retorna 429 quando excedido com header `Retry-After`.

### 1.3 Validação de Submissões (`src/lib/validation.ts`)

Schema Zod com sanitização:

```typescript
// src/lib/validation.ts
export const repositorySubmissionSchema = z.object({
  title: z.string().min(4).max(100).transform(stripUnsafe),
  repositoryUrl: z.url().max(240).transform(stripUnsafe),
  summary: z.string().min(15).max(400).transform(stripUnsafe),
  stack: z.string().min(2).max(120).transform(stripUnsafe),
  owner: z.string().min(3).max(80).transform(stripUnsafe),
});

const stripUnsafe = (value: string) =>
  value
    .replace(/[<>`"'\\]/g, "")
    .trim()
    .slice(0, 400);
```

**Lei**: Todo input de formulário deve usar esse schema. Não criar novos schemas sem validação equivalente.

---

## 2. Arquitetura de SEO e Visibilidade

### 2.1 JSON-LD Organization

Definido em `src/app/layout.tsx`:

```typescript
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NERDS UFC",
  url: "https://nerds-portal.vercel.app",
  logo: "https://nerds-portal.vercel.app/next.svg",
  sameAs: ["https://github.com/jlucasmira/site_nerds"],
};
```

**Lei**: Injectado em todas as páginas via `<head>`.

### 2.2 Twitter Cards e OpenGraph

Configurados no metadata raiz:

```typescript
// src/app/layout.tsx
twitter: {
  card: "summary_large_image",
  title: "NERDS Portal",
  description: "Hub acadêmico...",
  creator: "@nerds_ufc",
},
```

### 2.3 Canonical Tags por Rota

Cada página define seu próprio canonical:

```typescript
// src/app/code/page.tsx
export const metadata: Metadata = {
  alternates: { canonical: "/code" },
};

// src/app/research/page.tsx
export const metadata: Metadata = {
  alternates: { canonical: "/research" },
};

// src/app/members/[slug]/page.tsx
export const metadata: Metadata = {
  alternates: { canonical: `/members/${member.slug}` },
};
```

**Lei**: Toda nova página deve ter `alternates.canonical` definido.

---

## 3. Matriz de Performance

### 3.1 Lazy Loading com `next/dynamic`

Componentes pesados são carregados dinamicamente:

```typescript
// src/components/portal/portal-shell.tsx
const SubmitRepositoryModal = dynamic(
  () =>
    import("@/components/portal/submit-modal").then(
      (mod) => mod.SubmitRepositoryModal,
    ),
  { ssr: false },
);

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  {
    ssr: false,
  },
);
```

```typescript
// src/app/research/page.tsx
const ResearchHubView = dynamic(
  () => import("@/components/portal/research-hub-view").then((mod) => mod.ResearchHubView),
  { loading: () => <LoadingSkeleton /> },
);
```

**Lei**: Componentes grandes (modais, views complexas) devem usar `next/dynamic` com `ssr: false` ou loading skeleton.

### 3.2 Optimização de Avatares com blurDataURL

```typescript
// src/lib/avatar-placeholder.ts
export async function getAvatarBlurDataURL(imageUrl: string): Promise<string> {
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
}
```

Uso em `src/app/members/[slug]/page.tsx`:

```typescript
const blurDataURL = await getAvatarBlurDataURL(member.avatar);

<Image
  src={member.avatar}
  placeholder="blur"
  blurDataURL={blurDataURL}
  // ...
/>
```

**Lei**: Todas as imagens de perfil devem ter blur placeholder para evitar layout shift.

---

## 4. Guia de Identidade Visual (Cinematic UI)

### 4.1 Paleta de Cores

```css
/* src/app/globals.css */
:root {
  --primary-container: #4b8eff; /* Azul */
  --secondary-container: #00f1fe; /* Neon Cyan */
  --background: #101415; /* Dark BG */
}

.light {
  --secondary-container: #006a70;
  --background: #f2f7ff;
}
```

Cores neon utilizadas:

- `#00F1FE` - Cyan neon (principal accent)
- `#10B981` - Emerald (sucesso/hover secondary)
- `#4B8EFF` - Azul primário

### 4.2 Glassmorphism

**Lei**: Para painéis e cards com efeito glass:

```css
.glass-panel {
  background: rgb(39 42 44 / 40%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgb(0 241 254 / 10%);
  background-image: linear-gradient(
    135deg,
    rgb(0 241 254 / 5%) 0%,
    rgb(0 241 254 / 0%) 100%
  );
}
```

Especificações obrigatórias:

- **blur**: `16px a 20px`
- **transparência**: `rgb(xxx / 40%)`
- **borda**: `1px solid rgb(0 241 254 / 10%)` - borda sutil neon (#00F1FE com 10% opacidade)

### 4.3 Efeitos Visuais

```css
.text-gradient {
  background: linear-gradient(to right, #4b8eff, #00dbe7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glow-accent {
  box-shadow: 0 0 15px rgb(0 241 254 / 20%);
}

.animated-pulse-line {
  background: linear-gradient(90deg, transparent, #00f1fe, transparent);
  background-size: 200% 100%;
  animation: pulse-line 2s infinite linear;
}
```

---

## 5. Manual de DevOps & Resolução de Crises

### 5.1 GitHub Multi-conta

**Problema**: Conflito entre contas `jlucascode` e `jlucasmira`.

**Solução**: Usar Personal Access Token (PAT) com escopo `workflow`:

```bash
# Configurar remote com token injetado (usar conta jlucasmira, não jlucascode)
git remote set-url origin https://jlucasmira:ghp_TOKEN@github.com/jlucasmira/site_nerds.git
```

> **Lembrete**: Utilizar o remote com PAT injetado: `https://jlucasmira:TOKEN@github.com/...` para evitar conflito com a conta `jlucascode`.

**Lei**: Nunca commitar tokens. Usar variável de ambiente ou token injetado no remote URL.

### 5.2 Vercel Deploy

**Problema**: Erro "dist directory not found".

**Solução**: Forçar Framework Preset para Next.js na Vercel:

1. Ir para **Project Settings** > **General**
2. Definir **Framework Preset** como `Next.js`
3. Build Command: `next build` (não mudar)
4. Output Directory: `.next` (não `dist`)

**Lei**: O Next.js 16 usa `.next` como output directory, não `dist`.

### 5.3 Fluxo de Testes

#### Vitest

```bash
# Rodar testes
npm run test

# Modo watch
npm run test:watch

# Com coverage
npm run test:coverage
```

#### Husky Pre-commits

O projeto usa Husky com hooks em `.husky/`:

```bash
# Install Husky
npm run prepare
# ou
npx husky install
```

O hook `pre-commit` executa:

- ESLint com `--fix` em arquivos staged
- Prettier em arquivos JSON/MD/CSS/YAML

**Lei**: Sempre resolver erros de lint antes de commitar. O Husky bloqueia commits com erros.

#### Testes de Acessibilidade com axe

Os testes usam `jest-axe`:

```bash
# Executar teste de acessibilidade
npm run test

# Verificar violations em testes
import { axe } from "jest-axe";
expect(container).toBeAccessible();
```

Arquivo de teste: `src/components/portal/top-bar.a11y.test.tsx`

---

## 6. Scripts Disponíveis

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "analyze": "ANALYZE=true next build",
  "storybook": "storybook dev -p 6006"
}
```

---

## 7. Estrutura de Diretórios-Chave

```
src/
├── app/
│   ├── api/submissions/route.ts  # Endpoint de submissões
│   ├── code/page.tsx           # Página /code
│   ├── research/page.tsx       # Página /research
│   ├── members/[slug]/page.tsx # Página de membro
│   ├── layout.tsx              # Metadata global + JSON-LD
│   └── globals.css             # CSS + Glassmorphism
├── lib/
│   ├── rate-limit.ts           # Rate limiting
│   ├── validation.ts          # Zod schemas
│   ├── avatar-placeholder.ts   # blurDataURL
│   └── content.ts             # Dados estáticos
└── components/
    └── portal/
        ├── portal-shell.tsx     # Shell com lazy loading
        └── submit-modal.tsx    # Modal (dynamic import)
```

---

## System Prompt de Contexto

> Copie e cole no início de cada nova sessão do chat:

```
Você está trabalhando no projeto NERDS Portal (Next.js 16 + TypeScript + TailwindCSS 4).

Leia o arquivo TECH_STACK_AND_OPS.md para obter contexto completo sobre:
- Headers de segurança (CSP, HSTS)
- Rate limiting (10 req/min/IP)
- Validação Zod com sanitização
- SEO: JSON-LD Organization, Twitter Cards, Canonical tags
- Performance: next/dynamic lazy loading, blurDataURL para avatares
- UI: Glassmorphism (blur 16px-20px, borda 1px #00F1FE), cores neon (#00F1FE, #10B981)
- Testes: Vitest, Husky, jest-axe
- DevOps: Multi-conta GitHub (jlucasmira com PAT), Vercel .next/

Respostas devem seguir as convenções deste projeto.

Sempre que eu iniciar um chat, leia este arquivo para manter a consistência de Engenharia e Design.
```
