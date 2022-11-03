import Head from 'next/head'
import path from 'path'
import fsPromises from 'fs/promises'
import { Filters } from '../src/types/general'
import { ProductMenu } from '../src/components/ProductMenu/ProductMenu'
import { getFilters } from '../src/utils/getFilters'

export default function Home({filters}: {filters: Filters}) {
  return (
    <div>
      <Head>
        <title>Miista</title>
        <meta name="description" content="Apparel for everyone, everywhere" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductMenu
        filters={filters}
      />
    </div>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), '/miista-export.json')
  const jsonData = await fsPromises.readFile(filePath)
  const productsRaw = JSON.parse(jsonData.toString())

  const allProducts = productsRaw?.data?.allContentfulProductPage?.edges || []
  const filters = getFilters(allProducts)

  return {
    props: {
      filters,
    },
  }
}
