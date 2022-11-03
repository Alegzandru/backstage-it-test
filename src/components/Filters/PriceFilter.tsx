import { Dispatch, SetStateAction } from 'react'
import { Filters } from '../../types/general'

type PriceFilterProps = {
  maxPrice: number | string
  minPrice: number | string
  activeFilters: Filters
  setActiveFilters: Dispatch<SetStateAction<Filters>>
}

export const PriceFilter = ({maxPrice, minPrice, activeFilters, setActiveFilters}: PriceFilterProps) => (
  <div className="mb-8">
    <div className="flex justify-start items-center">
      <div className="mr-4">Price:</div>
      <div className="mr-2">From</div>
      <input
        type="number"
        id="min"
        name="min"
        min={minPrice}
        max={maxPrice}
        className="rounded outline outline-gray-300 mr-2 pl-1"
        onChange={(e) => {
          if (Number(e.target.value) > minPrice) {
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
        min={minPrice}
        max={maxPrice}
        className="rounded outline outline-gray-300 mr-2 pl-1"
        onChange={(e) => {
          if (Number(e.target.value) < maxPrice) {
            setActiveFilters({...activeFilters, maxPrice: Number(e.target.value), page: 1})
          }
        }}
        placeholder={`${activeFilters.maxPrice}`}
      />
    </div>
    <div className="mt-1">Prices should be between €{minPrice} and €{maxPrice}</div>
  </div>
)
