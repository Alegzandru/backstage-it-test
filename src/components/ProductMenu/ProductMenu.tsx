import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { Filters } from '../../types/general'
import { useProducts } from '../../utils/useProducts'
import { ColorsFilter } from '../Filters/ColorsFilter'
import { PriceFilter } from '../Filters/PriceFilter'
import { TagsFilter } from '../Filters/TagsFilter'
import { ProductCard } from '../Product/Product'

export const ProductMenu = ({filters}: {filters: Filters}) => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    colors: [] as string[],
    tags: [] as string[],
    minPrice: 0 as number | string,
    maxPrice: 0 as number | string,
    page: 1,
  })

  const { products, pages, isLoading, error } = useProducts(activeFilters)

  const toggleFilters = useCallback(() => setFiltersOpen(!filtersOpen), [setFiltersOpen, filtersOpen])

  const changeFilters = useCallback((key: string, value: string) => () => {
    if (activeFilters[key].includes(value)) {
      setActiveFilters((prevState) => ({
        ...prevState,
        [key]: prevState[key].filter((el: string) => el !== value),
      }))
    } else {
      setActiveFilters((prevState) => ({
        ...prevState,
        [key]: [...prevState[key], value],
        page: 1,
      }))
    }
  }, [activeFilters, setActiveFilters])

  const incrementPage = useCallback(() => {
    if (activeFilters.page < pages) {
      setActiveFilters((prevState) => ({
        ...prevState,
        page: prevState.page + 1,
      }))
    }
  }, [activeFilters.page, setActiveFilters, pages])

  const decrementPage = useCallback(() => {
    if (activeFilters.page !== 1) {
      setActiveFilters((prevState) => ({
        ...prevState,
        page: prevState.page - 1,
      }))
    }
  }, [activeFilters.page, pages, setActiveFilters])

  const renderProducts = useCallback(() => {
    if (error) {
      return 'Sorry, an unexpected error occured'
    }
    if (isLoading) {
      return 'Loading...'
    }
    if (Array.isArray(products) && !products.length) {
      return 'No products were found'
    }
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-10 px-6 lg:px-0">
        {Array.isArray(products) && products.map(ProductCard)}
      </div>
    )
  }, [error, isLoading, products])

  return(
    <div className="bg-beige min-h-screen">
      {filtersOpen
        ? (
          <div className={classNames('fixed top-36 bg-white p-14 z-10 right-0 mdFilters:right-6 lg:right-spacing-lg w-full',
            'max-w-800px overflow-y-scroll max-h-filters')}>
            <ColorsFilter
              colors={filters.colors}
              activeColors={activeFilters.colors}
              changeFilters={changeFilters}
            />
            <PriceFilter
              maxPrice={filters.maxPrice}
              minPrice={filters.minPrice}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            <TagsFilter
              tags={filters.tags}
              activeTags={activeFilters.tags}
              changeFilters={changeFilters}
            />
          </div>
        )
        : null}
      <div className="mx-auto flex flex-col items-center pb-40 max-w-1200px scrollbar-hide">
        <div className="pt-20 pb-20 flex justify-between w-full relative px-6 lg:px-0">
          <div className="flex justify-start items-center">
            <div
              className={classNames('w-6 h-6 rounded border flex justify-center items-center mr-2',
                `${activeFilters.page !== 1 ? 'cursor-pointer border-gray-700 stroke-gray-700' : 'border-gray-300 stroke-gray-300'}`)}
              onClick={decrementPage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="inherit" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>

            <div className="w-6 h-6 rounded border border-gray-700 flex justify-center items-center mr-2">
              {activeFilters.page}
            </div>

            <div
              className={classNames('w-6 h-6 rounded border flex justify-center items-center',
                `${activeFilters.page < pages ? 'cursor-pointer border-gray-700 stroke-gray-700' : 'border-gray-300 stroke-gray-300'}`)}
              onClick={incrementPage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="inherit" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
          <div
            className="underline tracking-wide cursor-pointer"
            onClick={toggleFilters}
          >
            Filters
          </div>
        </div>
        {renderProducts()}
      </div>
    </div>
  )
}
