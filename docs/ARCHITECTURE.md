# Arquitetura

## 1. Visão Geral

Aplicação **Ionic React + Vite + TypeScript** para consumir a **API TMDB**.
Requisitos cobertos: Home (populares), Detalhe, Favoritos, Busca; estado global; loading/erro; grid responsivo; paginação/scroll infinito; testes; deploy Web/PWA e build mobile (Capacitor).

---

## 2. Princípios

- Separação entre **UI (Ionic)**, **Domínio** e **Infraestrutura**.
- Regras de negócio puras no domínio.
- Repositórios isolam acesso à API e storage.
- Estado global previsível com cache de requisições.

---

## 3. Estrutura de Pastas

```
src/
  app/
    routes/              # IonReactRouter + IonRouterOutlet
    store/               # Redux Toolkit + RTK Query (moviesApi, favoritesSlice)
  components/            # UI reutilizável (Card, Grid, Header)
  pages/                 # Home, MovieDetails, Favorites, Search
  domain/                # Entidades e serviços (regras)
  infra/                 # API TMDB e storage local
  lib/                   # Utils (debounce, highlight)
  styles/                # Tema Ionic, CSS global
  tests/                 # Testes por camada e domínio
  main.tsx
  App.tsx
```

**Dependências**

- `pages/components` → podem importar de `app`, `domain`, `infra`, `lib`.
- `domain` → não depende de `app/pages/components/infra`.
- `infra` → pode importar tipos do `domain`.
- `tests` → pode acessar todas as camadas.

---

## 4. Fluxo de Dados

```mermaid
flowchart LR
  UI[Pages/Components (Ionic)] --> Store[RTK Query / Slices]
  Store --> Repo[Infra (TMDB, Storage)]
  Repo --> Domain[Regras de Negócio]
  Domain --> Store
  Store --> UI
```

---

## 5. Domínio

```
domain/
  movie/
    movie.types.ts       # Movie, Genre, Rating
    movie.service.ts     # toggleFavorite, sortByTitle, sortByRating
```

---

## 6. Infraestrutura

```
infra/
  tmdb/
    tmdb.client.ts       # baseUrl, headers, timeout, /api no DEV
    tmdb.movie.repo.ts   # getPopular, search, getDetails (mapeia DTO -> Movie)
  storage/
    favorites.repo.ts    # localStorage (web) / Capacitor Preferences (mobile)
```

**Integração**

- DEV: proxy do Vite em `/api` para evitar CORS.
- PROD: chamada direta `https://api.themoviedb.org/3` com `api_key` (ou Bearer, ciente do trade-off).

---

## 7. Aplicação (rotas, estado, UI)

- **Rotas**: `IonReactRouter` + `IonRouterOutlet`.
- **Estado**:

  - `moviesApi` (RTK Query) para populares, busca, detalhes.
  - `favoritesSlice` com IDs e mapa (persistência via storage).

- **UI Ionic**:

  - Home/Search: grid responsivo (IonGrid/IonCol) + `IonInfiniteScroll`.
  - Detalhes: poster, metadados, ação de favoritar.
  - Favoritos: listar, remover, ordenar (título/nota).
  - Feedback: `IonSkeletonText`, `IonSpinner`, `IonToast`.
  - Refresh: `IonRefresher` chamando `refetch()`.

---

## 8. Testes

```
tests/
  domain/
    movie.service.test.ts            # unit (regras puras)
  infra/
    tmdb.movie.repo.test.ts          # integração com MSW
  app/
    store.test.ts                    # queries/slices
  ui/
    HomePage.test.tsx                # render, infinito, loading/erro
    FavoritesPage.test.tsx           # ordenar/remover
```

Padrões: Jest + React Testing Library (+ MSW para API).

---

## 9. Variáveis de Ambiente

```
# .env.example
VITE_TMDB_API_V3_KEY=
VITE_TMDB_API_V4_READ_TOKEN=
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMG_BASE=https://image.tmdb.org/t/p
```

---

## 10. CI/CD e Build

- **CI (GitHub Actions)**: `typecheck`, `lint`, `test`, `build`.
- **Web/PWA**: deploy em Vercel/Netlify (publica `dist/`).
- **Mobile (Capacitor)**: `npx cap copy && npx cap open android/ios` para gerar build nativo.

---

## 11. Critérios do Teste atendidos

- Home (populares), Detalhe, Favoritos, Busca.
- Estado global (Redux Toolkit + RTK Query), loading/erro.
- Grid responsivo, paginação/infinite scroll.
- Testes por camada.
- Deploy pronto e variáveis documentadas.
