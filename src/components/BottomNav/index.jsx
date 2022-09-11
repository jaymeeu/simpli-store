import React, { useState } from 'react'
import './style.css'
import {IoHomeOutline} from 'react-icons/io5'
import { NavLink } from 'react-router-dom';
import {AiOutlineHome, AiOutlineShoppingCart} from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { RiContactsLine } from 'react-icons/ri';



const BottomNav = () => {

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
        <div>
            <div className="mobile_view">
                <div className='bottom_navs'>
                    {links.map((link) => (
                        <NavLink
                            to={`/${link.name}`}
                            key={link.name}
                            className={({ isActive }) => (isActive ? "active_bottom_nav" : "bottom_nav")}
                            >
                            {link.icon}
                            <span className="capitalize">{link.name}</span>
                        </NavLink>))
                    }
                </div>
            </div>
        </div>
    )
}

export default BottomNav
