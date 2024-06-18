import { create } from "zustand"

type SearchStore = {
  displaySearch: boolean
  setDisplaySearch: (displaySearch: boolean) => void
}

const useSearchStore = create<SearchStore>((set) => ({
  displaySearch: false,
  setDisplaySearch: (displaySearch) => set({ displaySearch }),
}))

export default useSearchStore
