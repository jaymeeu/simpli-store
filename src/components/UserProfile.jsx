import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import  Button  from './Button';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Auth} from 'aws-amplify'
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
  const { handleClick } = useStateContext();

  const  {dbUser} = useAuthContext()

  const navigate = useNavigate();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white p-8 rounded-lg w-96 drop-shadow-2xl z-20">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          onClick={() => handleClick('userProfile')}
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div
        onClick={() => {handleClick('userProfile'); navigate('/profile') }}
        className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6 cursor-pointer"
       >
         <FaUserCircle size={44} color="var(--main)"/>
        
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {dbUser?.name} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {dbUser?.role}   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {dbUser?.email} </p>
        </div>
      </div>
      
      <div className="mt-5">
        <Button
          color="white"
          bgColor='var(--main)'
          text="Logout"
          borderRadius="10px"
          width="full"
          onClick={() => {
            handleClick('userProfile')
            navigate('/');
            Auth.signOut()
          }}
        />
      </div>
    </div>

  );
};

export default UserProfile;