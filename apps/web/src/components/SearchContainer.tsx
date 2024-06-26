"use client"

import SearchForm from "@/components/forms/SearchForm"
import useSearch from "@/hooks/useSearch"

const SearchContainer = () => {
  const { displaySearch } = useSearch()

  if (!displaySearch) {
    return null
  }

  return (
    <div className="w-full flex items-center h-full justify-center bg-foreground/80 p-4 absolute">
      <SearchForm />
    </div>
  )
}

export default SearchContainer
