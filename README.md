# Instructor Dash App

Dashboard para instrutores do Habilita ai.

## 📋 Portas do Sistema

```
┌─────────────────────────────────────────────────────┐
│  Porta  │  Serviço                    │  URL              │
├─────────────────────────────────────────────────────┤
│  3000   │  faf-api                    │ localhost:3000    │
│  3001   │  instructor-dash-gateway    │ localhost:3001    │
│  3002   │  instructor-dash-app ✅     │ localhost:3002    │
└─────────────────────────────────────────────────────┘
```

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Keycloak (autenticação via OAuth 2.0)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Create `.env.local` file:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=habilitaai
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=instructor-dash-app
EOF
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser.

## Environment Variables

- `NEXT_PUBLIC_API_URL` - URL base da API (instructor-dash-gateway)
- `NEXT_PUBLIC_KEYCLOAK_URL` - URL do Keycloak
- `NEXT_PUBLIC_KEYCLOAK_REALM` - Realm do Keycloak
- `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` - Client ID no Keycloak

## Features

- Autenticação via Keycloak (OAuth 2.0)
- Cadastro de instrutores em múltiplas etapas
- Validação de formulário em tempo real
- Design moderno com paleta de cores consistente
- Responsive design
- Rotas protegidas com middleware

## Routes

- `/` - Dashboard (protegido - requer autenticação)
- `/login` - Página de login (pública)
- `/cadastro` - Formulário de cadastro de instrutor (público)
- `/callback` - Callback de autenticação OAuth (público)

## Autenticação

O projeto utiliza Keycloak para autenticação via OAuth 2.0:

1. Middleware verifica token em cookies
2. Rotas protegidas redirecionam para login do Keycloak
3. Callback processa o código de autorização e salva o token
4. Axios adiciona token automaticamente em requisições autenticadas
