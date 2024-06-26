"use client"

import useSearchStore from "@/stores/search"

const useSearch = () => {
  const { displaySearch, setDisplaySearch } = useSearchStore()
  const handleSearch = () => {
    setDisplaySearch(!displaySearch)
  }

  return { displaySearch, handleSearch }
}

export default useSearch
