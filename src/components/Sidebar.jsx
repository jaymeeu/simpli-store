import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '../contexts/ContextProvider';

import { AiFillHome, AiOutlineHome, AiOutlineShoppingCart} from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { RiContactsLine } from 'react-icons/ri';


const Sidebar = () => {

  const { activeMenu, setActiveMenu } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined) {
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-gray-200  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const links =  [
        {
          name: 'home',
          icon: <AiOutlineHome />,
        },
        {
          name: 'my-store',
          icon: <FiShoppingBag />,
        },
        {
            name: 'orders',
            icon: <AiOutlineShoppingCart />,
          },
        {
          name: 'account-profile',
          icon: <RiContactsLine />,
        },
      ];

  return (
    // <div className='block sm:hidden'>
    <div className=" ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              {/* <SiShopware /> <span>Shoppy</span> */}
            </Link>
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: "var(--main)" }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
          </div>
          <div className="mt-10 ">
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  Logo here
                </p>

              <div>
                
                {links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "var(--main)" : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
          </div>
        </>
      )}
    </div>
    // </div> 
  )
}

export default Sidebar
