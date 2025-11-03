# 🎓 Instructor Dash App - Dashboard para Instrutores

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MobX](https://img.shields.io/badge/MobX-6.15-FF9955?style=for-the-badge&logo=mobx&logoColor=white)](https://mobx.js.org/)

Dashboard moderno e mobile-first para instrutores do Habilita Aí, desenvolvido com Next.js 14 e React 18.

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

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS 3.4
- **State Management**: MobX 6.15
- **HTTP Client**: Axios
- **Autenticação**: Keycloak (OAuth 2.0)
- **Ícones**: Heroicons
- **Notificações**: React Hot Toast
- **Dark Mode**: Suporte nativo

## ✨ Funcionalidades

### 🏠 Dashboard Principal
- **Visualização de Perfil**: Foto, nome, email e descrição profissional
- **Informações Pessoais**: CPF, data de nascimento, telefone
- **Endereço**: Dados completos de endereço do instrutor
- **CNH**: Número, categoria, datas de emissão e vencimento
- **Certificado Profissional**: Número e datas de validade
- **Status de Aprovação**: Alerta visual para perfis pendentes

### 📱 Design Responsivo
- **Mobile-First**: Otimizado para dispositivos móveis
- **Sidebar Adaptativa**: Drawer no mobile, sidebar fixa no desktop
- **Sem Scroll Horizontal**: Layout totalmente responsivo
- **Breakpoints**: sm, md, lg, xl

### 🔐 Autenticação e Segurança
- **OAuth 2.0**: Integração completa com Keycloak
- **Middleware**: Proteção de rotas automática
- **Token Management**: Gerenciamento automático de tokens
- **Role-Based Access**: Controle de acesso baseado em roles

### 📝 Cadastro de Instrutor
- **Formulário Multi-etapas**: Interface intuitiva com indicadores de progresso
- **Validação em Tempo Real**: Feedback imediato de erros
- **Integração com API**: Envio seguro de dados

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Keycloak rodando (localhost:8080)
- instructor-dash-gateway rodando (localhost:3001)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/instructor-dash-app.git
cd instructor-dash-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie o arquivo `.env.local`:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=habilitaai
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=instructor-dash-app
EOF
```

### 4. Execute o servidor de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3002](http://localhost:3002) no seu navegador.

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL base da API (gateway) | `http://localhost:3001` |
| `NEXT_PUBLIC_KEYCLOAK_URL` | URL do servidor Keycloak | `http://localhost:8080` |
| `NEXT_PUBLIC_KEYCLOAK_REALM` | Realm do Keycloak | `habilitaai` |
| `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` | Client ID no Keycloak | `instructor-dash-app` |

## 🛣️ Rotas

| Rota | Descrição | Proteção |
|------|-----------|----------|
| `/` | Dashboard principal | 🔒 Protegida |
| `/cadastro-instrutor` | Formulário de cadastro | 🔒 Protegida (sem role) |
| `/callback` | Callback OAuth | 🌐 Pública |

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── (protected)/          # Rotas protegidas
│   │   ├── (home)/           # Dashboard principal
│   │   │   ├── components/   # Componentes específicos do dashboard
│   │   │   │   ├── profile-header.tsx
│   │   │   │   ├── pending-approval-alert.tsx
│   │   │   │   ├── personal-info-card.tsx
│   │   │   │   ├── address-card.tsx
│   │   │   │   ├── driver-license-card.tsx
│   │   │   │   ├── professional-certificate-card.tsx
│   │   │   │   ├── instructor-description-card.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   └── sidebar-items.tsx
│   │   │   ├── layout.tsx     # Layout com sidebar
│   │   │   └── page.tsx      # Página do dashboard
│   │   └── cadastro-instrutor/ # Cadastro de instrutor
│   ├── cadastro/             # Rotas públicas de cadastro
│   ├── callback/             # Callback OAuth
│   └── layout.tsx            # Layout raiz
├── components/               # Componentes reutilizáveis
│   ├── Alert.tsx
│   ├── Button.tsx
│   ├── DarkModeToggle.tsx
│   ├── FormContainer.tsx
│   ├── InfoCard.tsx
│   ├── InfoRow.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   └── StepIndicator.tsx
├── lib/                      # Utilitários e configurações
│   └── axios.ts             # Configuração do Axios
├── providers/                # Providers React
│   ├── instructor-store-initializer.tsx
│   └── person-store-initializer.tsx
├── services/                 # Serviços de API
│   ├── api/
│   ├── instructor/
│   └── person/
├── stores/                   # Stores MobX
│   ├── instructor.store.ts
│   └── person.store.ts
├── utils/                    # Funções utilitárias
│   ├── birth-handlers.ts
│   ├── date-handlers.ts
│   ├── keycloak.ts
│   ├── phone-handlers.ts
│   └── validation.ts
└── middleware.ts             # Middleware Next.js
```

## 🔄 Gerenciamento de Estado

O projeto utiliza **MobX** para gerenciamento de estado:

- **InstructorStore**: Gerencia dados do instrutor
- **PersonStore**: Gerencia dados da pessoa
- **Server-Side Initialization**: Dados são carregados no servidor e inicializados nos stores

## 🎨 Componentes

### Componentes Gerais
- `InfoCard`: Card genérico para exibição de informações
- `InfoRow`: Linha de informação (label + valor)
- `Alert`: Componente de alerta com variantes
- `Button`: Botão reutilizável
- `Input`: Input com validação
- `Select`: Select customizado

### Componentes do Dashboard
- `ProfileHeader`: Cabeçalho com foto e informações básicas
- `PendingApprovalAlert`: Alerta para perfis pendentes de aprovação
- `Sidebar`: Navegação lateral responsiva
- Cards específicos para cada tipo de informação

## 🔐 Autenticação

### Fluxo de Autenticação
1. **Middleware** verifica token em cookies
2. **Rotas protegidas** redirecionam para login do Keycloak se não autenticado
3. **Callback** processa o código de autorização e salva o token
4. **Axios Interceptor** adiciona token automaticamente em requisições

### Proteção de Rotas
- Middleware Next.js valida tokens em todas as rotas protegidas
- Verificação de roles para acesso ao dashboard
- Redirecionamento automático para cadastro se não tiver role de instrutor

## 📱 Responsividade

### Breakpoints Tailwind
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Comportamentos
- **Mobile**: Sidebar como drawer (overlay)
- **Desktop**: Sidebar fixa que expande no hover
- **Grid**: Adapta de 1 coluna (mobile) para 2 colunas (desktop)

## 🧪 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento (porta 3002)
npm run build    # Gera build de produção
npm run start    # Inicia servidor de produção (porta 3002)
npm run lint     # Executa ESLint e corrige problemas
```

## 🐛 Troubleshooting

### Problema: Redirecionamento infinito
**Solução**: Verifique se o Keycloak está rodando e se as variáveis de ambiente estão corretas.

### Problema: Erro 401 Unauthorized
**Solução**: Verifique se o token está sendo salvo corretamente nos cookies após o login.

### Problema: Sidebar não aparece no mobile
**Solução**: Verifique se o CSS está sendo carregado corretamente e se há conflitos de z-index.

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">
  <h3>🎓 Instructor Dash App - Dashboard para Instrutores 🎓</h3>
  <p>Desenvolvido com ❤️ para o Habilita Aí</p>
</div>
