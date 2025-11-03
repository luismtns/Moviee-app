import { create } from 'zustand'

interface SearchStore {
  searchTerm: string
  searchResults: any[]
  setSearchTerm: (term: string) => void
  setSearchResults: (results: any[]) => void
  clearSearch: () => void
  isSearching: boolean
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  searchTerm: '',
  searchResults: [],

  get isSearching() {
    return get().searchTerm.length > 0
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term })
  },

  setSearchResults: (results: any[]) => {
    set({ searchResults: results })
  },

  clearSearch: () => {
    set({
      searchTerm: '',
      searchResults: [],
    })
  },
}))
