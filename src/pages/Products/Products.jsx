import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Products(){
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
  
        const datas = await fetch('https://fakestoreapi.com/products');
        const json = await datas.json();
  
        setProducts(json);
  
      }
  
      fetchProducts();
    }, [])

    return(
        <div>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                    products.map((product) => {
                        return(
                            <Link to={`/product/${product.id}`} key={product.id} className=" transition-all duration-150 group relative shadow-lg p-2 rounded-sm bg-white hover:scale-110">
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                    <img
                                        src={product.image}
                                        alt={product.description}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <p>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </p>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                                </div>
                            </Link>
                        )
                    })
                }
                </div>
            </div>
    </div>
    )
}