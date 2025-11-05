<div align="center">
  <img src="public/assets/moviee-logo.svg" alt="Moviee Logo" width="120"/>
</div>

# Moviee

[![Test](https://github.com/luismtns/Moviee-app/actions/workflows/test.yml/badge.svg)](https://github.com/luismtns/Moviee-app/actions/workflows/test.yml)
[![Lint](https://github.com/luismtns/Moviee-app/actions/workflows/lint.yml/badge.svg)](https://github.com/luismtns/Moviee-app/actions/workflows/lint.yml)
[![E2E](https://github.com/luismtns/Moviee-app/actions/workflows/e2e.yml/badge.svg)](https://github.com/luismtns/Moviee-app/actions/workflows/e2e.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-success?logo=vercel)](https://moviee-app-rho.vercel.app/)

Aplicação de filmes construída com Ionic React e TypeScript, consumindo a API do TMDB. Desenvolvida como teste técnico demonstrando arquitetura escalável, boas práticas e qualidade de código.

## Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/luismtns/moviee-app
cd moviee-app

# Instale as dependências
pnpm install

# Configure a .env copiando .env.example
cp .env.example .env

# Execute a aplicação
pnpm dev
```

A aplicação estará disponível em http://localhost:5173

**Obtenha API key em:** https://www.themoviedb.org/settings/api

## Funcionalidades Implementadas

**Requisitos do Teste**

- Listagem de filmes populares consumindo TMDB API
- Busca de filmes por nome com debounce
- Tela de detalhes com informações completas do filme
- Sistema de favoritos com persistência local
- Interface responsiva mobile e desktop

**Melhorias Além do Solicitado**

- Autenticação automática via Guest Session da TMDB com renovação
- Virtualização de listas com react-virtuoso para performance em grandes volumes
- Arquitetura modular com componentes atomizados
- Testes unitários com 70%+ de cobertura (Vitest)
- Testes E2E com Cypress seguindo boas práticas Ionic
- CI/CD com GitHub Actions
- Ordenação de favoritos por data ou avaliação
- Highlight do termo de busca nos resultados
- Build mobile Android/iOS via Capacitor

## Tecnologias Utilizadas

**Frontend**

- Ionic React 8.5
- TypeScript
- React Query (TanStack Query) para gerenciamento de estado do servidor
- Zustand para estado local

**Build e Tooling**

- Vite como bundler
- ESLint para linting
- Capacitor para deploy mobile

## Arquitetura do Projeto

```
src/
├── components/     # Componentes reutilizáveis da interface
├── pages/          # Páginas principais da aplicação
├── hooks/          # Hooks customizados para lógica de negócio
├── services/       # Serviços para integração com APIs externas
├── stores/         # Gerenciamento de estado global
├── types/          # Definições de tipos TypeScript
└── utils/          # Funções utilitárias
```

Essa é uma visão macro da arquitetura do projeto, para uma visão mais detalhada, consulte o arquivo [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Decisões Técnicas

**React Query (TanStack)**: Cache inteligente, sincronização automática e otimizações de rede nativas.

**Zustand**: Estado local leve com persistência automática no localStorage/Capacitor Preferences.

**React Virtuoso**: Renderização virtualizada para listas com milhares de itens sem perda de performance.

**Ionic React**: Framework híbrido que garante UI nativa iOS/Android a partir de um único código.

**Arquitetura por features**: Cada componente isolado com seus testes, estilos e subcomponentes.

## Scripts Disponíveis

```bash
pnpm dev          # Desenvolvimento
pnpm build        # Build de produção
pnpm test         # Testes unitários (Vitest - 70%+ cobertura)
pnpm cypress:open # Cypress UI interativo
pnpm cypress:run  # Cypress E2E headless (38 testes - 100% passing)
pnpm lint         # Verifica qualidade do código
```

## Build e Deploy

### Web (PWA)

```bash
pnpm build
# O conteúdo da pasta dist/ pode ser deployado em qualquer servidor web
```

### Mobile

```bash
pnpm build
npx cap copy
npx cap open android    # Para Android
npx cap open ios        # Para iOS
```

## Estrutura de Dados

A aplicação consome os seguintes endpoints da API TMDB:

- `/movie/popular` - Lista de filmes populares
- `/search/movie` - Busca de filmes por termo
- `/movie/{id}` - Detalhes específicos de um filme

## Funcionalidades Técnicas

- Cache inteligente (5min popular, 2min search)
- Debounce na busca (500ms, mínimo 3 chars)
- Persistência cross-platform (localStorage web / Capacitor Preferences mobile)
- Autenticação guest session com renovação automática
- Tratamento de erros com toasts nativos
- Lazy loading de imagens com fallback
- Virtualização de listas para alta performance
- States de loading/empty/error padronizados

## Testes e Qualidade

### Testes Unitários

- **Coverage**: 70%+ (Vitest + Testing Library)
- Componentes, hooks e utilities testados
- Mocks para serviços externos

### Testes E2E (Cypress + Ionic)

38 testes end-to-end seguindo [boas práticas do Cypress para Ionic](https://www.cypress.io/blog/end-to-end-testing-mobile-apps-with-ionic-and-cypress):

```bash
pnpm cypress:open  # Modo interativo
pnpm cypress:run   # CI mode (38 testes em ~47s)
```

**Cobertura E2E**:

- Componentes Ionic nativos (ion-card, ion-searchbar, ion-tab-bar)
- Navegação com Ionic Router
- Testes responsivos (iPhone X, iPad 2, Samsung S10, Desktop)
- Gestures e scroll em ion-content
- Validação de hidratação e loading states
- Fixtures para mock de dados da API
- Custom commands: `cy.waitForIonic()`, `cy.scrollToBottom()`

### CI/CD

- **Lint**: ESLint com regras React Hooks
- **Tests**: Validação automática no GitHub Actions
- **Types**: TypeScript strict mode

---

**Desenvolvido por Luis Bovo** - Teste técnico demonstrando React/TypeScript, gerenciamento de estado, arquitetura escalável e integração com APIs REST.
