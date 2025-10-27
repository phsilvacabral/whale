# 🐋 Whale BFF (Backend for Frontend)

Backend for Frontend que agrega dados dos microserviços e fornece APIs para os frontends.

## 🚀 Deploy Automático

Este projeto é configurado para deploy automático na Azure App Service via GitHub Actions.

### 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Azure
- Repositório GitHub
- Azure App Service criado

### 🔧 Configuração

1. **Azure App Service**:
   - Criar App Service no Azure Portal
   - Configurar variáveis de ambiente
   - Obter Publish Profile

2. **GitHub Secrets**:
   - `AZUREAPPSERVICE_PUBLISHPROFILE_WHALE_BFF`: Publish Profile do Azure

3. **Variáveis de Ambiente** (Azure Portal):
   - `NODE_ENV=production`
   - `JWT_SECRET=your-production-jwt-secret`
   - `USERS_SERVICE_URL=https://whale-users-service.azurewebsites.net`
   - `PORTFOLIO_SERVICE_URL=https://whale-portfolio-service.azurewebsites.net`
   - `FRONTEND_URL=https://whale-shell-app.azurestaticapps.net`
   - `DASHBOARD_URL=https://whale-dashboard-mfe.azurestaticapps.net`

### 🏗️ Build Local

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor
npm start
```

### 📁 Estrutura

```
bff/
├── .github/workflows/     # GitHub Actions
├── src/
│   ├── controllers/       # Controladores da API
│   ├── middleware/        # Middlewares
│   ├── routes/           # Rotas
│   ├── services/         # Serviços
│   ├── utils/            # Utilitários
│   └── server.js         # Entry point
├── package.json          # Dependências
└── README.md
```

### 🌐 Funcionalidades

- ✅ **Agregação de Dados**: Conecta com microserviços
- ✅ **Autenticação JWT**: Gerenciamento de tokens
- ✅ **CORS Configurado**: Para frontends Azure
- ✅ **Rate Limiting**: Proteção contra spam
- ✅ **Health Checks**: Monitoramento de status
- ✅ **Error Handling**: Tratamento de erros

### 🔄 Fluxo de Dados

```
Frontend → BFF → Microserviços → Bancos de Dados
    ↓        ↓
  JWT    ←  Validação
```

### 🚀 Deploy

1. **Push para main** → GitHub Actions executa
2. **Build automático** → `npm install && npm run build`
3. **Deploy automático** → Azure App Service
4. **URL disponível** → `https://whale-bff.azurewebsites.net`

### 🧪 Testes

- **Local**: `npm run dev` → http://localhost:3000
- **Produção**: URL do Azure App Service
- **Health Check**: `/health`

### 📊 APIs Disponíveis

- **Auth**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Portfolio**: `/api/portfolio/*`
- **Transactions**: `/api/transactions/*`
- **Crypto**: `/api/crypto/top`
- **Health**: `/health`

### 🔧 Configuração Azure

- **Tipo**: Azure App Service
- **Runtime**: Node.js 18
- **Deploy**: GitHub Actions
- **URL**: `https://whale-bff.azurewebsites.net`

### 📝 Notas

- **package.json** é essencial para o build
- **node_modules** é gerado automaticamente
- **Docker** não é usado no App Service
- **Variáveis de ambiente** são configuradas no Azure Portal
