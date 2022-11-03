import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fsPromises from 'fs/promises'
import { Product, Products } from '../../src/types/general'

type Error = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{products: Products; pages: number} | Error>,
) {
  try {
    const {
      query: { colors, tags, minPrice, maxPrice, page },
      method,
    } = req

    if (method !== 'GET') {
      res.status(400).json({error: 'Only GET method allowed'})
    }

    const colorsArr = colors && typeof colors === 'string' && colors.replace(/\s/g, '').length ? colors.split(',') : []
    const tagsArr = tags && typeof tags === 'string' && tags.replace(/\s/g, '').length ? tags.split(',') : []
    const minPriceNum = minPrice && Number(minPrice)
    const maxPriceNum = maxPrice && Number(maxPrice)
    const pageNum = page && Number(page)

    const filePath = path.join(process.cwd(), '/miista-export.json')
    const jsonData = await fsPromises.readFile(filePath)
    const productsRaw = JSON.parse(jsonData.toString())

    const allProducts = productsRaw?.data?.allContentfulProductPage?.edges || []
    const products = allProducts.filter((product: Product) => {
      const productColors = (product?.node?.colorFamily || []).map((colorFamily) => colorFamily.name)
      const productTags = (product?.node?.categoryTags || [])
      const productPrice = Number((product?.node?.shopifyProductEu?.variants?.edges || [])[0]?.node?.price)

      if (colorsArr.length && !productColors.filter((el) => colorsArr.includes(el)).length) {
        return false
      }

      if (tagsArr.length && !productTags.filter((el) => tagsArr.includes(el)).length) {
        return false
      }

      if (minPriceNum && productPrice < minPriceNum) {
        return false
      }

      if (maxPriceNum && productPrice > maxPriceNum) {
        return false
      }

      return true
    })

    const productsPaginated = (() => {
      if(products.length <= 15) {
        return products
      }
      if (pageNum && Number.isInteger(pageNum) && pageNum > 0) {
        return products.slice((pageNum - 1) * 15, pageNum * 15)
      }
      return products
    })()

    res.status(200).json({
      products: productsPaginated,
      pages: Math.trunc(products.length / 15) + (Number.isInteger(products.length / 15) ? 0 : 1),
    })
  } catch (error) {
    res.status(500).json({ error: 'Unexpected error occured' })
  }
}
