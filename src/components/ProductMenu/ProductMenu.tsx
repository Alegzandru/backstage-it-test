import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { Filters } from '../../types/general'
import { useProducts } from '../../utils/useProducts'
import { ProductCard } from '../Product/Product'

export const ProductMenu = ({filters}: {filters: Filters}) => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    colors: [] as string[],
    tags: [] as string[],
    minPrice: 0,
    maxPrice: 0,
    page: 1,
  })

  const { products, pages, isLoading, error } = useProducts(activeFilters)

  const toggleFilters = () => setFiltersOpen(!filtersOpen)
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
  const incrementPage = () => {
    if (activeFilters.page < pages) {
      setActiveFilters((prevState) => ({
        ...prevState,
        page: prevState.page + 1,
      }))
    }
  }
  const decrementPage = () => {
    if (activeFilters.page !== 1) {
      setActiveFilters((prevState) => ({
        ...prevState,
        page: prevState.page - 1,
      }))
    }
  }

  const renderColors = useCallback(() => (
    <div className="flex justify-start items-center mb-8">
      <div className="mr-4">COLORS:</div>
      {filters.colors.map((color: string) => {
        const newColor = color.toLocaleLowerCase()
        return (
          <div
            key={color}
            className="flex flex-col justify-center items-center"
          >
            <div
              className={`group relative mx-0.5 rounded-full h-5 w-5 bg-ui${newColor} cursor-pointer`}
              onClick={changeFilters('colors', color)}
            >
              <div className={classNames('absolute -top-8 -left-4 opacity-0 group-hover:opacity-100 transition-all',
                '-translate-y-6 group-hover:translate-y-0')}
              >
                {color}
              </div>
            </div>
            <div className={`w-1 p-1 rounded-full ${activeFilters.colors.includes(color) ? 'bg-black' : ''} mt-1`}/>
          </div>
        )
      })}
    </div>
  ), [filters, changeFilters])

  const renderPrice = useCallback(() => (
    <div className="mb-8">
      <div className="flex justify-start items-center">
        <div className="mr-4">Price:</div>
        <div className="mr-2">From</div>
        <input
          type="number"
          id="min"
          name="min"
          min={filters.minPrice as number}
          max={filters.maxPrice as number}
          className="rounded outline outline-gray-300 mr-2 pl-1"
          onChange={(e) => {
            if (Number(e.target.value) > filters.minPrice) {
              setActiveFilters({...activeFilters, minPrice: Number(e.target.value), page: 1})
            }
          }}
          placeholder={`${activeFilters.minPrice}`}
        />
        <div className="mr-2">To</div>
        <input
          type="number"
          id="max"
          name="max"
          min={filters.minPrice as number}
          max={filters.maxPrice as number}
          className="rounded outline outline-gray-300 mr-2 pl-1"
          onChange={(e) => {
            if (Number(e.target.value) < filters.maxPrice) {
              setActiveFilters({...activeFilters, maxPrice: Number(e.target.value), page: 1})
            }
          }}
          placeholder={`${activeFilters.maxPrice}`}
        />
      </div>
      <div className="mt-1">Prices should be between €{filters.minPrice} and €{filters.maxPrice}</div>
    </div>
  ), [filters, activeFilters])

  const renderTags = useCallback(() => (
    <div className="flex justify-start items-center">
      <div className="mr-4">CATEGORIES:</div>
      <div className="w-full grid grid-cols-4 gap-2">
        {filters.tags.map((tag: string) => (
          <div
            key={tag}
            className={classNames(`border-2 ${activeFilters.tags.includes(tag) ?  'border-orange-200' : 'border-gray-300'} rounded text-center`,
              'hover:bg-gray-50 transition-all cursor-pointer')}
            onClick={changeFilters('tags', tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  ), [filters, changeFilters])

  const renderProducts = useCallback(() => {
    if (error) {
      return 'Sorry, an unexpected error occured'
    }
    if (isLoading) {
      return 'Loading...'
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
          <div className="fixed top-36 bg-white p-14 z-10 right-6 lg:right-spacing-lg w-full max-w-800px">
            {renderColors()}
            {renderPrice()}
            {renderTags()}
          </div>
        )
        : null}
      <div className="mx-auto flex flex-col items-center pb-40 max-w-1200px scrollbar-hide">
        <div className="pt-20 pb-20 flex justify-between w-full relative">
          <div className="flex justify-start items-center">
            <div
              className="w-6 h-6 rounded border border-gray-700 flex justify-center items-center mr-2 cursor-pointer"
              onClick={decrementPage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>

            <div
              className="w-6 h-6 rounded border border-gray-700 flex justify-center items-center mr-2 cursor-pointer"
            >
              {activeFilters.page}
            </div>

            <div
              className="w-6 h-6 rounded border border-gray-700 flex justify-center items-center cursor-pointer"
              onClick={incrementPage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
