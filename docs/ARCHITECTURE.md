# Arquitetura do App

App de filmes usando **Ionic React** que consome a **API do TMDB**.

**O que faz:** Lista filmes populares, busca, favorita e mostra detalhes.

---

## O que o app precisa fazer

**4 telas principais:**

- Home com filmes populares
- Tela de detalhes do filme
- Lista de favoritos
- Busca de filmes

**Deve funcionar assim:**

- Grid responsivo (mobile + desktop)
- Scroll infinito (carrega mais conforme rola)
- Favoritar/desfavoritar filmes
- Buscar filme por nome
- Mostrar loading quando carrega
- Mostrar erro se der problema
- Salvar favoritos no celular
- Funcionar offline (dados em cache)

**Parte técnica:**

- Ionic React + TypeScript
- Estado global para dados
- Testes nos componentes
- Rodar na web (PWA)
- Gerar app mobile (Android/iOS)

---

## Stack

- **App**: Ionic React + TypeScript
- **Build**: Vite
- **APIs**: React Query (TanStack Query)
- **Estado Local**: Zustand
- **Mobile**: Capacitor
- **Testes**: Jest + Testing Library

**Por que essa stack?**

- React Query: cache inteligente e sync automático
- Zustand: simples e leve para favoritos
- Ionic: componentes prontos para mobile

---

## Como está organizado

```
src/
  components/     # Peças reutilizáveis (cards, grids, loading)
  pages/          # Telas do app (home, detalhes, favoritos, busca)
  services/       # Chamadas para APIs externas
  stores/         # Estados globais (favoritos, preferências)
  hooks/          # Lógica customizada reutilizável
  types/          # Definições TypeScript
  utils/          # Funções auxiliares
  App.tsx
```

---

## Como funciona

**Fluxo simples:**

```
Tela → Hook → React Query → API TMDB
      ↓
   Zustand (favoritos salvos)
```

**Na prática:**

1. Usuário abre o app
2. React Query busca filmes e guarda em cache
3. Usuário favorita → Zustand salva no celular
4. Próxima vez: dados já estão lá!

---

## Services (APIs)

Funções que conversam com o mundo exterior:

```typescript
// services/tmdb.service.ts
export const tmdbService = {
  getPopular: (page = 1) => fetch(`/api/movie/popular?page=${page}`),
  getDetails: (id) => fetch(`/api/movie/${id}`),
  search: (query, page = 1) => fetch(`/api/search/movie?query=${query}`),
}
```

**O que faz:** Busca filmes na API do TMDB de forma organizada.

---

## Stores (Estados globais)

Coisas que o app precisa lembrar:

```typescript
// stores/favorites.store.ts
export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((fav) => fav !== id)
            : [...state.favoriteIds, id],
        })),
      isFavorite: (id) => get().favoriteIds.includes(id),
    }),
    {
      name: 'favorites', // salva automático no celular
    }
  )
)
```

**O que faz:** Lembra quais filmes você favoritou, mesmo se fechar o app.

---

## Hooks (lógica reutilizável)

Facilitam a vida dos componentes:

```typescript
// hooks/useMovies.ts
export const useMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => tmdbService.getPopular(page),
    staleTime: 5 * 60 * 1000, // cache por 5min
  })
}

// hooks/useFavorites.ts
export const useFavorites = () => {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavoritesStore()
  return { favoriteIds, toggleFavorite, isFavorite }
}
```

**O que fazem:** Encapsulam toda a complexidade. Componente só usa o que precisa.

---

## Componentes principais

**O que cada um faz:**

- `MovieCard`: Mostra poster + info + botão favoritar
- `MovieGrid`: Lista organizada de cards
- `InfiniteScroll`: Carrega mais filmes conforme rola
- `SearchBar`: Campo de busca com delay
- `LoadingSpinner`: Rodinha de carregamento
- `ErrorMessage`: Aviso quando dá erro

**Padrões Ionic que usamos:**

- `IonGrid` → layout responsivo
- `IonRefresher` → puxa pra atualizar
- `IonToast` → notificações
- `IonSkeletonText` → placeholder enquanto carrega

---

## Configuração

**Para development (evita CORS):**

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://api.themoviedb.org/3', // redireciona chamadas
    },
  },
})
```

**Variáveis de ambiente:**

```bash
# .env
VITE_TMDB_API_V3_KEY=sua_chave_aqui
VITE_TMDB_IMG_BASE=https://image.tmdb.org/t/p
```

---

## Como testar

```
src/__tests__/
  components/     # Testa se componentes renderizam direito
  pages/         # Testa fluxos completos das telas
  hooks/         # Testa lógica isolada
  services/      # Testa chamadas de API
```

**Ferramentas:** Jest + Testing Library (simula usuário real)

---

## Como publicar

**Web:**

```bash
npm run build  # gera pasta dist/
# Sobe pro Vercel/Netlify
```

**Mobile:**

```bash
npx cap copy && npx cap open android
# Abre Android Studio pra gerar APK
```

**PWA:** Automático! Vite gera service worker sozinho.
