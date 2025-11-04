import { createUnifiedStorage } from '@/lib/storage.factory'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FavoritesStore {
  favoriteIds: Set<number>
  sync: (ids: number[]) => void
  has: (movieId: number) => boolean
  clear: () => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: new Set<number>(),
      sync: (ids: number[]) => set({ favoriteIds: new Set(ids) }),
      has: (movieId: number) => get().favoriteIds.has(movieId),
      clear: () => set({ favoriteIds: new Set() }),
    }),
    {
      name: 'moviee-favorites',
      storage: createJSONStorage(() => createUnifiedStorage()),
      partialize: (state) => ({ favoriteIds: Array.from(state.favoriteIds) }),
      merge: (persistedState: unknown, currentState) => ({
        ...currentState,
        favoriteIds: new Set((persistedState as { favoriteIds?: number[] })?.favoriteIds || []),
      }),
    }
  )
)
