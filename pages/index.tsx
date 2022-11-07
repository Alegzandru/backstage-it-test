import Head from 'next/head'
import path from 'path'
import fsPromises from 'fs/promises'
import { Filters, Products } from '../src/types/general'
import { ProductMenu } from '../src/components/ProductMenu/ProductMenu'
import { getFilters } from '../src/utils/getFilters'
import { SWRConfig } from 'swr'

export default function Home({filters, fallback}: {filters: Filters; fallback: Products}) {
  return (
    <div>
      <Head>
        <title>Miista</title>
        <meta name="description" content="Apparel for everyone, everywhere" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SWRConfig value={{ fallback }}>
        <ProductMenu
          filters={filters}
        />
      </SWRConfig>
    </div>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), '/miista-export.json')
  const jsonData = await fsPromises.readFile(filePath)
  const productsRaw = JSON.parse(jsonData.toString())

  const allProducts = productsRaw?.data?.allContentfulProductPage?.edges || []
  const products = allProducts.slice(0, 15)
  const filters = getFilters(allProducts)

  return {
    props: {
      filters,
      fallback: {
        '/api/filter': products as Products,
      },
    },
  }
}
