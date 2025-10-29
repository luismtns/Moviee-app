# Moviee App

Aplicação de filmes desenvolvida com Ionic React que consome a API do TMDB.

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

**Obtenha sua API key gratuita em:** https://www.themoviedb.org/settings/api

## Funcionalidades Implementadas

- Listagem de filmes populares com scroll infinito
- Sistema de busca de filmes em tempo real
- Funcionalidade de favoritos com persistência local
- Interface responsiva para mobile e desktop
- Cache offline para melhor experiência do usuário

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

## Decisões Técnicas

**React Query** foi escolhido para gerenciamento de estado do servidor devido ao cache automático, invalidação inteligente e otimizações para mobile.

**Zustand** foi utilizado para estado local simples (favoritos) por ser mais leve que Redux para este caso de uso específico.

## Scripts Disponíveis

```bash
pnpm dev          # Executa em modo desenvolvimento
pnpm build        # Gera build de produção
pnpm preview      # Preview do build de produção
pnpm test         # Executa testes unitários
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

- Cache inteligente com React Query (5 minutos para dados populares)
- Debounce na busca para otimizar requisições (500ms)
- Persistência automática de favoritos via localStorage
- Loading states e tratamento de erros
- Interface adaptativa iOS/Android via Ionic
- Lazy loading de imagens para performance

---

Desenvolvido como teste técnico demonstrando competências em React, TypeScript, gerenciamento de estado e integração com APIs REST.
