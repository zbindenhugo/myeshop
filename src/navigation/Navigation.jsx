/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { CartContext } from '../contexts/Contexts'
import Product from '../pages/Products/Product'

export default function Navigation(){
    
    const [current, setCurrent] = useState('home');
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [cartModal, toggleCartModal] = useState(false);

    const { cart } = useContext(CartContext);

    useEffect(() => {
      const fetchCat = async () => {
        const datas = await fetch('https://fakestoreapi.com/products/categories');
        const json = await datas.json();

        setCategories(json);
      }
      fetchCat()
    }, [])

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    
    function onClickLink (e){
      setCurrent(e.target.name);
      if(e.target.name === 'categories')
        setIsOpen(!isOpen)
    }

    function handleCartClick(e){
      e.preventDefault();
      toggleCartModal(!cartModal);
    }

    return(
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 text-white uppercase text-2xl font-bold">
                          <Link to='/' name='home' onClick={(e) => onClickLink(e)}>
                              Zbind'Amazon
                          </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          <Link  
                              to='/'
                              name='home'
                              onClick={(e) => onClickLink(e)}
                              className={classNames(current === 'home' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-150')}
                              aria-current={current === 'home' ? 'page' : undefined}
                          >
                              Home
                          </Link>

                          <Link  
                              to='/products'
                              name='products'
                              onClick={(e) => onClickLink(e)}
                              className={classNames(current === 'products' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-150')}
                              aria-current={current === 'products' ? 'page' : undefined}
                          >
                              Products
                          </Link>
                          
                          <Menu>
                            <Menu.Button name='categories' onClick={(e) => onClickLink(e)} className={classNames(current === 'categories' ? 'bg-gray-900 text-white' : 'text-gray-300' ,' hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-150')}>
                              Categories
                            </Menu.Button>
                            <Menu.Items className='absolute top-[7%] left-[40%] bg-gray-800 text-gray-300 rounded-lg p-3 grid grid-flow-row row-auto z-20'>
                              {
                                categories.map((category) => (
                                  <Menu.Item>
                                    {
                                      
                                      () => (
                                        <Link
                                          className={classNames(window.location.pathname.toLowerCase().split('/')[2] == encodeURI(category) ? 'bg-black text-white' : '', `hover:bg-gray-700 hover:text-white capitalize px-3 py-2 rounded-md text-sm font-medium transition-all duration-150`)}
                                          to={`/category/${category}`} 
                                          key={category}
                                        >
                                          {category}
                                        </Link>
                                      )
                                    }
                                  </Menu.Item>
                                ))
                                    }
                            </Menu.Items>
                          </Menu>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="rounded-full bg-gray-800 p-1 mr-3 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                          
                        </button>
                        <button
                          type="button"
                          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          onClick={(e) => handleCartClick(e)}
                        >
                          <span className="sr-only">View Cart</span>
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img className="h-8 w-8 rounded-full" src={''} alt="" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                             
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  
                  </div>
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={''} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{'user.name'}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{'user.email'}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Transition appear show={cartModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => toggleCartModal(false)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        My Cart
                      </Dialog.Title>
                      <div className="mt-4">
                        <div className="flow-root">
                          <ul className="-my-4 divide-y divide-gray-200">
                            {
                              cart ? cart.map((item) => {
                                return(
                                  <li key={item.id} className="flex items-center justify-between py-4">
                                    <div className="flex items-start">
                                      <img
                                        alt={item.description}
                                        src={item.image}
                                        className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                                      />

                                      <div className="ml-4">
                                        <p className="text-sm">{item.title}</p>

                                        <dl className="mt-1 space-y-1 text-xs text-gray-500">
                                          <div>
                                            <dt className="inline">Color:</dt>
                                            <dd className="inline">{' ' + item.color}</dd>
                                          </div>
                                        </dl>
                                      </div>
                                    </div>

                                    <div>
                                      <p className="text-sm">
                                        ${item.price}
                                        <small className="text-gray-500">x1</small>
                                      </p>
                                    </div>
                                  </li>
                                )
                              })
                              : 
                              <p>You haven't put any items in cart yet !</p>
                            }
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => toggleCartModal(false)}
                        >
                          Go to payment 
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
    )
}