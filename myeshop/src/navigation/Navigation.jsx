/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Navigation(){
    
    const [current, setCurrent] = useState('');
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    alert(window.location.pathname.split('/'))

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
      setCurrent(e.target.id);
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
                          <Link to='/' id='home' onClick={(e) => onClickLink(e)}>
                              Zbind'Amazon
                          </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          <Link  
                              to='/'
                              id='home'
                              onClick={(e) => onClickLink(e)}
                              className={classNames(current === 'home' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-150')}
                              aria-current={current === 'home' ? 'page' : undefined}
                          >
                              Home
                          </Link>

                          <Link  
                              to='/products'
                              id='products'
                              onClick={(e) => onClickLink(e)}
                              className={classNames(current === 'products' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium transition-all duration-150')}
                              aria-current={current === 'products' ? 'page' : undefined}
                          >
                              Products
                          </Link>
                          
                          <Menu>
                            <Menu.Button onClick={() => setIsOpen(!isOpen)} className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-150'>
                              Categories
                            </Menu.Button>
                            <Menu.Items className='fixed top-[7%] left-[40%] bg-gray-800 text-gray-300 rounded-lg p-5 grid grid-flow-row row-auto z-20'>
                              {
                                categories.map((category) => (
                                  <Menu.Item>
                                    {
                                      () => (
                                        <Link
                                          className={classNames(window.location.pathname === encodeURI(category) ? 'bg-black text-white' : '', `hover:bg-gray-700 hover:text-white capitalize px-3 py-2 rounded-md text-sm font-medium transition-all duration-150`)}
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
                          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
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
        </div>
    )
}