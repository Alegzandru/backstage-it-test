export type Product = {
  node: {
    categoryTags: string[]
    colorFamily: {
      name: string
    } []
    name: string
    node_locale: string
    shopifyProductEu: {
      variants: {
        edges: {
          node: {
            price: string
          }
        } []
      }
    }
    thumbnailImage: {
      file: {
        url: string
      }
    }
  }
}

export type Products = Product []

export type Filters = {
  colors: string []
  tags: string[]
  minPrice: number | string
  maxPrice: number | string
  page: number
}
