import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useStateContext } from './contexts/ContextProvider'
import BuyerCart from './pages/BuyerCart'
import BuyerOrder from './pages/BuyerOrder'
import Dashboard from './pages/Dashboard'
import Edit_item from './pages/Edit_item'
import Order from './pages/Order'
import Profile from './pages/Profile'
import Shop from './pages/Shop'
import ViewItem from './pages/ViewItem'

const Routing = () => {
  const { activeMenu, currentMode } = useStateContext();

  return (
    <div>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <BrowserRouter>
          <div className='flex relative dark:bg-main-dark-bg'>
            <div className='hidden md:block' >
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
            </div>

            <div className='block md:hidden' >
             <BottomNav/>
            </div>

            <div
              className={
                `dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
              }
            >
              <div className="fixed md:static z-20 bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div>
                {/* Routes here */}
                <Routes>
                  <Route path="/" element={(<Dashboard />)} />
                  <Route path="/home" element={(<Dashboard />)} />
                  <Route path="/my-store" element={(<Shop />)} />
                  <Route path="/my-orders" element={(<BuyerOrder />)} />
                  <Route path="/cart" element={(<BuyerCart/>)} />
                  <Route path="/orders" element={(<Order />)} />
                  <Route path="/profile" element={(<Profile />)} />
                  <Route path="/item/:id" element={(<ViewItem />)} />
                  <Route path="/edit/:id" element={(<Edit_item />)} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default Routing