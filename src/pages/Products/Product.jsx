import { RadioGroup } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {

    const [product, setProduct] = useState({})
    const [selectedColor, setSelectedColor] = useState('white')
    const [selectedSize, setSelectedSize] = useState()

    const { id } = useParams();

    useEffect(() => {
      const fetchDatas = async () => {
        const datas = await fetch('https://fakestoreapi.com/products/' + id);
        const json = await datas.json();

        setProduct(json);
      }

      fetchDatas();
    
    }, [id])

    return (
        <div>
            <nav aria-label="Breadcrumb">
                <ol role="list" className="flex max-w-2xl items-center md:space-x-2 md:px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-10 mb-10 text-xs">
                    <li>
                        <div className="flex items-center">
                            <Link to={'/products'} className="mr-2 text-sm font-medium text-gray-900">
                                All products
                            </Link>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="h-5 w-4 text-gray-300"
                            >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Link to={'/category/' + product.category} className="mr-2 text-sm font-medium text-gray-900 capitalize">
                                {product.category}
                            </Link>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="h-5 w-4 text-gray-300"
                            >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>
                    <li className="text-sm">
                        <Link to={'/product/' + product.id} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                            {product.title}
                        </Link>
                    </li>
                </ol>
            </nav>
            <div className='container mx-auto grid grid-cols-1 md:grid md:grid-cols-2'>
                <div className='border-r border-slate-300 center mr-24'>
                    <img 
                        src={product.image}
                        alt={product.description}
                        width='400'
                        className='mx-auto'
                    />
                </div>
                <div className='p-3 text-2xl mx-auto text-center'>
                    <div className="lg:col-span-2 lg:border-gray-200 lg:pr-8 mb-5">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                        <hr className='mt-3 ' />
                        <div className="flex items-center mt-10 float-right">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                    key={rating}
                                    className={classNames(
                                        product?.rating?.rate > rating ? 'text-gray-900' : 'text-gray-200',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                    />
                                ))}
                            </div>
                            {' '}
                            <p className="">{product?.rating?.rate}/5 stars <span className='text-slate-400 text-sm'>{product?.rating?.count} reviews</span></p>
                            <a className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                
                            </a>
                        </div>
                    </div>
                    <div className='text-left text-6xl text-bold mt-5'>
                        ${product.price}
                    </div>
                          
                    <div>
                        <p className='text-left text-lg mt-10'>
                            {product.description}
                        </p>
                    </div>

                    <div className='mt-10 float-left'>
                        <h3 className="text-xl font-medium text-gray-900 text-left">Color</h3>
                        <div className='grid grid-cols-4 gap-5 mt-3'>
                            <div>
                                <button onClick={() => setSelectedColor('white')} className={classNames(selectedColor === 'white' ? 'bg-slate-100 ring-1 scale-105' : 'bg-slate-100' , 'rounded-full w-10 h-10 transition-all duration-150 hover:ring-1 hover:bg-slate-100 ring-slate-700 ring-offset-2')} />
                            </div>
                            <div>
                                <button onClick={() => setSelectedColor('black')} className={classNames(selectedColor === 'black' ? 'bg-black ring-1 scale-105' : 'bg-slate-900' , 'rounded-full w-10 h-10 transition-all duration-150 hover:ring-1 hover:bg-black ring-slate-700 ring-offset-2')} />
                            </div>
                            <div>
                                <button onClick={() => setSelectedColor('grey')} className={classNames(selectedColor === 'grey' ? 'bg-slate-600 ring-1 scale-105' : 'bg-slate-400' , 'rounded-full w-10 h-10 transition-all duration-150 hover:ring-1 hover:bg-slate-600 ring-slate-800 ring-offset-2')} />
                            </div>
                            <div>
                                <button onClick={() => setSelectedColor('red')} className={classNames(selectedColor === 'red' ? 'bg-red-600 ring-1 scale-105' : 'bg-red-200' , 'rounded-full w-10 h-10 transition-all duration-150 hover:ring-1 hover:bg-red-600 ring-slate-700 ring-offset-2')} />
                            </div>
                        </div>
                    </div>

                    <div className='mt-52'>
                    <button
                        type="submit"
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add to cart
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}