# Setup local, CLIs e MCPs

## 1) Pre-requisitos (Windows PowerShell)

```powershell
node -v
npm -v
Get-NetTCPConnection -LocalPort 3000 -State Listen
```

## 2) Dependencias do projeto

Instalacao recomendada com lockfile:

```powershell
npm ci
```

Fallback para arvore quebrada:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

## 3) Rodar local na porta 3000

```powershell
npm run dev -- --port 3000
```

App esperado em `http://localhost:3000`.

## 4) CLIs (sem install global sempre que possivel)

Vercel CLI via npx:

```powershell
npx vercel@latest --version
npx vercel@latest login
npx vercel@latest whoami
```

GitHub CLI:
- O `gh` nao possui fluxo `npx` oficial equivalente.
- Neste setup, foi instalado via `winget` para habilitar autenticacao e comandos GitHub.

```powershell
winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements
"C:\Program Files\GitHub CLI\gh.exe" --version
"C:\Program Files\GitHub CLI\gh.exe" auth login
```

## 5) MCPs no projeto

Arquivo de configuracao criado em `.cursor/mcp.json` com:
- `vercel` (remote MCP): `https://mcp.vercel.com`
- `github` (stdio): `@modelcontextprotocol/server-github` com `GITHUB_TOKEN`
- `filesystem` (stdio): `@modelcontextprotocol/server-filesystem` apontando para `${workspaceFolder}`

Variaveis necessarias:

```powershell
$env:GITHUB_TOKEN = "seu_token_aqui"
```

Para Vercel MCP remoto, a autenticacao e feita por OAuth pelo cliente quando o servidor for usado.

## 6) Checklist de validacao

- `npm ci` conclui sem erro
- `npm run dev -- --port 3000` sobe sem erro
- `npx vercel@latest --version` responde
- `gh` responde por `C:\Program Files\GitHub CLI\gh.exe --version`
- MCPs aparecem no Cursor e conectam sem erro
