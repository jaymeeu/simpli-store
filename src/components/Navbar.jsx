import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';

import avatar from '../assets/avatar.webp';
import Cart from '../components/Cart';
import UserProfile from '../components/UserProfile'

import { useStateContext } from '../contexts/ContextProvider';
import { useAuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const  {dbUser} = useAuthContext()


    const NavButton = ({ customFunc, icon, color, dotColor }) => (
        <button
            type="button"
            onClick={() => customFunc()}
            style={{ color }}
            className="relative text-xl rounded-full p-3 hover:bg-light-gray"
        >
            <span
                style={{ background: dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
            />
            {icon}
        </button>
    );

    const { activeMenu, setActiveMenu, handleClick, isClicked } = useStateContext();

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    return (
        <div className="flex justify-between items-center p-2 md:ml-6 md:mr-6 relative">
            <p className='block md:hidden'>
                <span className="font-bold " style={{color:'var(--main)'}}>Simpli</span>
                <span className="font-semibold text-slate-500">Store</span>
            </p>
            <div className='hidden md:block'>
                <NavButton title="Menu" customFunc={handleActiveMenu} color='var(--main)' icon={<AiOutlineMenu />} />
            </div>
            <div className="flex">
                <NavButton title="Cart" dotColor="var(--main)" customFunc={() => handleClick('cart')} color="var(--main)" icon={<FiShoppingCart />} />
                <div
                    className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                    onClick={() => handleClick('userProfile')}
                >
                    <img
                        className="rounded-full w-8 h-8"
                        src={avatar}
                        alt="user-profile"
                    />
                    <p>
                        <span className="text-gray-400 text-14">Hello,</span>{' '}
                        <span className="text-gray-400 font-bold ml-1 text-14">
                            {dbUser?.name.split(" ")[0]}
                        </span>
                    </p>
                    <MdKeyboardArrowDown className="text-gray-400 text-14" />
                </div>

                {isClicked.cart && (<Cart />)}
                {isClicked.userProfile && (<UserProfile />)}
            </div>
        </div>
    );
};


export default Navbar
