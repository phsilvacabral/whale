# 📐 Arc42 - Whale Architecture Documentation

## 1. Introdução e Objetivos

### 1.1 Requisitos de Qualidade
- **Performance**: Interface responsiva com tempo de carregamento < 2s
- **Usabilidade**: Interface intuitiva com glassmorphism e animações fluidas
- **Disponibilidade**: 99.9% uptime com health checks
- **Segurança**: Autenticação JWT e validação de dados
- **Escalabilidade**: Arquitetura de microserviços preparada para crescimento
- **Manutenibilidade**: Código limpo e documentado

### 1.2 Restrições
- **Tecnologia**: Node.js, React, SQL Server, MongoDB
- **Deploy**: Docker containers
- **Orçamento**: Open source, sem custos de licença
- **Time**: Desenvolvimento ágil com entregas incrementais

## 2. Restrições de Arquitetura

### 2.1 Restrições Técnicas
- **Frontend**: React 18+ com Vite
- **Backend**: Node.js com Express
- **Bancos**: SQL Server para usuários, MongoDB para portfolios
- **Containerização**: Docker obrigatório
- **Protocolo**: HTTPS em produção

### 2.2 Restrições de Conformidade
- **LGPD**: Proteção de dados pessoais
- **Acessibilidade**: WCAG 2.1 AA
- **Segurança**: OWASP Top 10

## 3. Contexto e Escopo

### 3.1 Contexto do Sistema
```
┌─────────────────────────────────────────────────────────────┐
│                    Stakeholders                             │
├─────────────────────────────────────────────────────────────┤
│  Usuários Finais  │  Desenvolvedores  │  Administradores   │
│  - Investidores   │  - Frontend       │  - DevOps          │
│  - Traders        │  - Backend        │  - DBA             │
│  - Iniciantes     │  - Full-stack     │  - Security        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Sistema Whale                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Frontend  │  │     BFF     │  │Microservices│        │
│  │   React     │  │   Express   │  │   Node.js   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Sistemas Externos                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   SQL       │  │   MongoDB   │  │   APIs      │        │
│  │   Server    │  │   Atlas     │  │  Crypto     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Responsabilidades do Sistema
- **Gestão de Usuários**: Registro, login, perfil
- **Gestão de Portfolio**: Criação, edição, exclusão
- **Gestão de Transações**: CRUD completo
- **Dashboard**: Visualização de criptomoedas
- **Export/Import**: Portabilidade de dados
- **Modo Anônimo**: Uso sem cadastro

## 4. Decisões de Arquitetura

### 4.1 Decisões Fundamentais
1. **Microserviços**: Separação por domínio (users, portfolio)
2. **BFF Pattern**: Agregação de dados para frontend
3. **Polyglot Persistence**: SQL Server + MongoDB
4. **Containerização**: Docker para todos os serviços
5. **JWT Authentication**: Stateless authentication

### 4.2 Decisões de Tecnologia
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Joi
- **Databases**: SQL Server + MongoDB
- **Container**: Docker + Docker Compose
- **Documentation**: Swagger/OpenAPI

## 5. Building Block View

### 5.1 Nível 1 - Visão Geral
```
┌─────────────────────────────────────────────────────────────┐
│                    Whale System                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Frontend  │  │     BFF     │  │Microservices│        │
│  │             │  │             │  │             │        │
│  │ Shell App   │  │ Aggregation │  │ Users Svc   │        │
│  │ Dashboard   │  │ Auth        │  │ Portfolio   │        │
│  │             │  │ Validation  │  │ Svc         │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Nível 2 - Frontend
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Shell App   │  │ Dashboard   │  │ Components  │        │
│  │             │  │ MFE         │  │             │        │
│  │ - Navigation│  │ - Crypto    │  │ - GlassCard │        │
│  │ - Auth      │  │ - Charts    │  │ - Theme     │        │
│  │ - Portfolio │  │ - Real-time │  │ - Loading   │        │
│  │ - Profile   │  │ - Updates   │  │ - Forms     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Nível 2 - Backend
```
┌─────────────────────────────────────────────────────────────┐
│                    Backend Layer                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │     BFF     │  │ Users       │  │ Portfolio   │        │
│  │             │  │ Service     │  │ Service     │        │
│  │ - Auth      │  │ - CRUD      │  │ - CRUD      │        │
│  │ - Aggregation│  │ - Validation│  │ - Validation│        │
│  │ - Validation│  │ - Security  │  │ - Analytics │        │
│  │ - Security  │  │ - Database  │  │ - Database  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 6. Runtime View

### 6.1 Fluxo de Autenticação
```
User → Shell App → BFF → Users Service → SQL Server
                    ↓
                 JWT Token → Shell App → Local Storage
```

### 6.2 Fluxo de Portfolio
```
User → Shell App → BFF → Portfolio Service → MongoDB
                    ↓
              Aggregation → Dashboard Data → Shell App
```

### 6.3 Fluxo de Modo Anônimo
```
User → Shell App → LocalStorage → Anonymous Service
                    ↓
              Portfolio Data → Shell App
```

## 7. Deployment View

### 7.1 Arquitetura de Deploy
```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Environment                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Frontend  │  │   Backend   │  │  Databases  │        │
│  │             │  │             │  │             │        │
│  │ Shell App   │  │     BFF     │  │ SQL Server  │        │
│  │ Dashboard   │  │ Users Svc   │  │ MongoDB     │        │
│  │ (Nginx)     │  │ Portfolio   │  │ (Volumes)   │        │
│  │             │  │ Svc         │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Portas e Serviços
| Serviço | Porta | Container | Descrição |
|---------|-------|-----------|-----------|
| Shell App | 5173 | whale-shell-app | Frontend principal |
| Dashboard | 5174 | whale-dashboard-mfe | Micro frontend |
| BFF | 3000 | whale-bff | Backend for Frontend |
| Users Service | 3001 | whale-users-service | Microserviço usuários |
| Portfolio Service | 3002 | whale-portfolio-service | Microserviço portfolio |
| SQL Server | 1433 | whale-sqlserver | Banco de usuários |
| MongoDB | 27017 | whale-mongodb | Banco de portfolios |

## 8. Cross-Cutting Concepts

### 8.1 Segurança
- **Authentication**: JWT tokens
- **Authorization**: Role-based access
- **Data Protection**: Encryption at rest
- **Input Validation**: Joi schemas
- **CORS**: Configuração restritiva

### 8.2 Logging
- **Structured Logging**: JSON format
- **Log Levels**: Error, Warn, Info, Debug
- **Correlation IDs**: Request tracking
- **Centralized**: ELK Stack (futuro)

### 8.3 Error Handling
- **Global Handler**: Express middleware
- **Error Types**: Validation, Authentication, Database
- **User Messages**: Friendly error messages
- **Monitoring**: Error tracking (futuro)

### 8.4 Performance
- **Caching**: Redis (futuro)
- **Connection Pooling**: Database connections
- **Lazy Loading**: Frontend components
- **CDN**: Static assets (futuro)

## 9. Design Decisions

### 9.1 Decisões de Arquitetura
| Decisão | Alternativas | Justificativa |
|---------|--------------|---------------|
| Microserviços | Monolito | Escalabilidade e manutenibilidade |
| BFF Pattern | API Gateway | Simplicidade e agregação |
| Polyglot DB | Single DB | Otimização por domínio |
| JWT Auth | Session-based | Stateless e escalável |
| Docker | VM/Cloud | Portabilidade e consistência |

### 9.2 Decisões de Tecnologia
| Tecnologia | Alternativa | Justificativa |
|------------|-------------|---------------|
| React | Vue/Angular | Ecosystem e performance |
| Node.js | Java/Python | JavaScript full-stack |
| SQL Server | PostgreSQL | Enterprise features |
| MongoDB | PostgreSQL | Flexibilidade de schema |
| Tailwind | Bootstrap | Customização e performance |

## 10. Quality Requirements

### 10.1 Performance
- **Response Time**: < 200ms para APIs
- **Load Time**: < 2s para frontend
- **Throughput**: 1000 req/s por serviço
- **Scalability**: Horizontal scaling

### 10.2 Reliability
- **Availability**: 99.9% uptime
- **Fault Tolerance**: Circuit breakers
- **Recovery**: Auto-restart containers
- **Backup**: Daily database backups

### 10.3 Security
- **Authentication**: JWT with 7-day expiry
- **Authorization**: Resource-based access
- **Data Protection**: Encryption in transit
- **Input Validation**: All inputs validated

### 10.4 Usability
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG 2.1 AA
- **Performance**: Smooth animations
- **Error Handling**: User-friendly messages

## 11. Risks and Technical Debt

### 11.1 Riscos Identificados
| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Database failure | Baixa | Alto | Backup e replicação |
| Security breach | Média | Alto | Security audit |
| Performance issues | Média | Médio | Monitoring e caching |
| Team knowledge | Alta | Médio | Documentação |

### 11.2 Technical Debt
- **Testes**: Cobertura de testes baixa
- **Monitoring**: Falta de observabilidade
- **Documentation**: API docs incompletas
- **Security**: Penetration testing pendente

## 12. Glossary

### 12.1 Termos Técnicos
- **BFF**: Backend for Frontend - camada de agregação
- **JWT**: JSON Web Token - padrão de autenticação
- **MFE**: Micro Frontend - frontend modular
- **CQRS**: Command Query Responsibility Segregation
- **Polyglot Persistence**: Múltiplos tipos de banco

### 12.2 Termos de Negócio
- **Portfolio**: Carteira de investimentos
- **Transaction**: Operação de compra/venda
- **Symbol**: Símbolo da criptomoeda (BTC, ETH)
- **Anonymous Mode**: Uso sem cadastro
- **Glassmorphism**: Efeito visual de vidro
