import { Filters, Product, Products } from '../types/general'

export const getFilters = (products: Products) => {
  const initialFilters = {
    colors: [],
    tags: [],
    minPrice: 0,
    maxPrice: 0,
    page: 1,
  }

  return products.reduce((filterObj: Filters, product: Product) => {
    const productColors = (product?.node?.colorFamily || []).map((colorFamily) => colorFamily.name)
    const productTags = (product?.node?.categoryTags || [])
    const productPrice = (product?.node?.shopifyProductEu?.variants?.edges || [])[0]?.node?.price

    const newColors = (() => {
      if (productColors.length && !productColors.every((el) => filterObj.colors.includes(el))) {
        return productColors.filter((el) => !filterObj.colors.includes(el))
      } return []
    })()

    const newTags = (() => {
      if (productTags.length && !productTags.every((el) => filterObj.tags.includes(el))) {
        return productTags.filter((el) => !filterObj.tags.includes(el))
      } return []
    })()

    const newMin = (() => {
      if (!filterObj.minPrice) {
        return productPrice || filterObj.minPrice
      }
      if (productPrice && filterObj.minPrice > Number(productPrice)) {
        return productPrice
      }
      return filterObj.minPrice
    })()

    const newMax = (() => {
      if (!filterObj.maxPrice) {
        return productPrice || filterObj.maxPrice
      }
      if (productPrice && filterObj.maxPrice < Number(productPrice)) {
        return productPrice
      }
      return filterObj.maxPrice
    })()

    return ({
      minPrice: newMin,
      maxPrice: newMax,
      colors: [...filterObj.colors, ...newColors],
      tags: [...filterObj.tags, ...newTags],
    } as Filters)
  }, initialFilters)
}
