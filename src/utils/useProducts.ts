import useSWR from 'swr'
import { Filters } from '../types/general'

const fetcher = (route: string) => fetch(route).then((res) => res.json())

export const useProducts = (activeFilters: Filters) => {
  const { data, error } = useSWR(
    // eslint-disable-next-line max-len
    `/api/filter?colors=${activeFilters.colors.join(',')}&tags=${activeFilters.tags.join(',')}&minPrice=${activeFilters.minPrice}&maxPrice=${activeFilters.maxPrice}&page=${activeFilters.page}`
    , fetcher)

  return {
    products: data && data.products,
    pages: data && data.pages,
    isLoading: !error && !data,
    error,
  }
}
