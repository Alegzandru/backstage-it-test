import Image from 'next/image'
import { Product } from '../../types/general'

export const ProductCard = (product: Product, index: number) => (
  <div key={index} className="w-full">
    <div className="w-full pb-image-ratio relative">
      <Image
        src={`https://${product.node.thumbnailImage.file.url.slice(2)}`}
        alt={product.node.name}
        fill={true}
        object-fit="cover"
      />
    </div>
    <div className="pt-3 flex justify-between">
      <div className="mr-2">{product.node.name}</div>
      <div className="whitespace-nowrap">€ {product.node.shopifyProductEu.variants.edges[0].node.price}</div>
    </div>
  </div>
)
