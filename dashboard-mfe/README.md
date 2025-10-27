# 🐋 Whale Dashboard MFE

Micro frontend para exibição de dados de criptomoedas em tempo real.

## 🚀 Deploy Automático

Este projeto é configurado para deploy automático na Azure Static Web Apps via GitHub Actions.

### 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Azure
- Repositório GitHub

### 🔧 Configuração

1. **Variáveis de Ambiente** (GitHub Secrets):
   - `VITE_BFF_URL`: URL do BFF (ex: `https://whale-bff.azurewebsites.net`)

2. **Workflow** (`.github/workflows/azure-static-web-apps-*.yml`):
   - Configurado para gerar pasta `dist`
   - Deploy automático no push para `main`

### 🏗️ Build Local

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build
```

### 📁 Estrutura

```
dashboard-mfe/
├── .github/workflows/     # GitHub Actions
├── src/
│   ├── components/        # Componentes React
│   ├── services/         # Serviços de API
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Entry point
├── package.json          # Dependências
├── vite.config.js        # Configuração Vite
└── tailwind.config.js    # Configuração Tailwind
```

### 🌐 Funcionalidades

- ✅ **Dados em Tempo Real**: Conecta com Azure Function via BFF
- ✅ **Fallback Inteligente**: Dados simulados se BFF não estiver disponível
- ✅ **Design Responsivo**: Tailwind CSS + Glassmorphism
- ✅ **Deploy Automático**: GitHub Actions + Azure Static Web Apps

### 🔄 Fluxo de Dados

```
Dashboard MFE → BFF → Azure Function → Dados Reais
     ↓              ↓
  Fallback    ←  Se BFF falhar
```

### 🚀 Deploy

1. **Push para main** → GitHub Actions executa
2. **Build automático** → `npm run build`
3. **Deploy automático** → Azure Static Web Apps
4. **URL disponível** → `https://whale-dashboard-mfe.azurestaticapps.net`

### 🧪 Testes

- **Local**: `npm run dev` → http://localhost:5174
- **Produção**: URL do Azure Static Web Apps
- **Fallback**: Funciona mesmo sem BFF (dados simulados)

### 📊 Dados

- **Fonte**: Azure Function (dados reais)
- **Processamento**: BFF (agregação)
- **Fallback**: Dados simulados (12 criptomoedas)
- **Atualização**: Tempo real via API

### 🔧 Configuração Azure

- **Tipo**: Azure Static Web Apps
- **Build**: Vite (gera pasta `dist`)
- **Deploy**: GitHub Actions
- **URL**: `https://whale-dashboard-mfe.azurestaticapps.net`

### 📝 Notas

- **package.json** é essencial para o build
- **node_modules** é gerado automaticamente
- **Docker** não é usado no Static Web Apps
- **nginx** não é usado no Static Web Apps
