import { useEffect, useState } from "react"
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function Home(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchDatas = async () => {
            const datas = await fetch('https://fakestoreapi.com/products');
            const json = await datas.json()

            setProducts(json);
        }

        fetchDatas();
    }, [])

    return(
        <div className="container mx-auto text-center">
            <header className="mt-10">
                <div className="home-title text-6xl">
                    Welcome to Zbind'Amazon
                </div>
                <div className="home-subtitle text-md text-slate-500 italic">
                    Find here the best products for you, and your family !
                </div>
            </header>
            <main className="container grid grid-cols-2 mt-10 gap-5">
                <div>
                    <div className="text-3xl ring-2 ring-slate-700 p-2">
                        Top trending products
                    </div>
                    <div className="grid grid-cols-2 text-center gap-3 mt-5">
                        {
                            products.map((product) => {
                                if(product.rating.rate >= 4.5) {
                                    return(
                                        <Link to={`/product/${product.id}`} key={product.id} className=" transition-all duration-150 group relative shadow-lg p-2 rounded-sm bg-white text-left">
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
                                } 
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className="text-3xl ring-2 ring-slate-700 p-2">
                        Top trending products
                    </div>
                </div>
            </main>
        </div>
    )
}