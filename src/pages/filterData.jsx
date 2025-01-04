import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/productCard'
import emptyCart from '../assets/images/empty-cart.png'

const FilterData = () => {
    const filterProducts = useSelector(state => state.product.filteredData)
    return (
        <div className="font-bahnschrift md:px-16 lg:px-16 bg-gray-900 text-gray-100 py-8">
            {filterProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filterProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                // Centering the image and text if no products are found
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <img src={emptyCart} alt="No Products Found" className="w-40 mb-4" />
                    <p className="text-gray-400 text-lg text-center pl-8">Product Not Found</p>
                </div>
            )}
        </div>
    )
}

export default FilterData