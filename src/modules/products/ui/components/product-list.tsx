import { getProducts } from '@/actions/getProducts'
import React from 'react'

interface Props {
    category?: string
    minPrice?: string | null
    maxPrice?: string | null
}

const ProductList = async ({category, minPrice, maxPrice}: Props) => {
    const data = await getProducts({category, minPrice, maxPrice})

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {data?.docs.map((product) => (
        <div key={product.id} className='border rounded-md bg-white p-4'>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList

export const ProductListSkeleton = () => {
    return (
        <div>
            Loading.....
            </div>
    )
}