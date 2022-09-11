import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useAuthContext } from '../contexts/AuthContext';
import { User } from "./../models";
import {DataStore} from 'aws-amplify'
import Button from './Button';

import Input, { Select, Textarea } from './Input';
import { useEffect } from 'react';

const UpdateUser = ({ close, showClose }) => {
    const { dbUser, setDbuser, sub, authUser} = useAuthContext()

    const [name, setName] = useState(dbUser?.name || '')
    const [email, setEmail] = useState(authUser?.attributes?.email)
    const [description, setdescription] = useState(dbUser?.description || '')
    const [storeName, setStoreName] = useState(dbUser?.storeName || '')
    const [role, setRole] = useState(dbUser?.role || '')

    useEffect(() => {
        setEmail(authUser?.attributes?.email)
    }, [authUser])

    const createUser = () => {
        DataStore.save(new User({ name, description, rating: parseFloat('2.5'), sub, role, storeName, email : authUser?.attributes?.email }))
          .then((res) => {
            // console.log(res)
            // close()
            setDbuser(res)
          })
          .catch((err) => {
            console.log("error", err)
          })
      }
    
      //update user
      const updateUser = () => {
        DataStore.save(
          User.copyOf(dbUser, (updated) => {
            updated.name = name
            updated.description = description
            // updated.rating = parseFloat(rating)
          }))
          .then((res) => {
            // console.log(res)
            setDbuser(res)
          })
          .catch((err) => {
            console.log("error", err)
          })
      }

    const handleUpdateUser = (e) => {
        //call close function on successfull update
        e.preventDefault();

        if (dbUser) {
          updateUser()
        }
        else {
          createUser()
        }
    }

    return (
        <div className="h-screen  bg-half-transparent w-full fixed nav-item top-0 right-0 z-20 flex justify-center align-middle p-4 ">
            {
                console.log(authUser, "authUserauthUser")
            }
            <div className="h-auto duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white w-400 p-8">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">Update profile</p>
                    {
                        showClose &&
                        <Button
                            onClick={close}
                            icon={<MdOutlineCancel />}
                            color="rgb(153, 171, 180)"
                            bgHoverColor="light-gray"
                            size="2xl"
                            borderRadius="50%"
                        />
                    }
                </div>

                <div className="py-4 sm:py-6">
                    <form className="m-auto mt-8 max-w-xl">

                        <Input
                            handleChange={(e) => setName(e.target.value)}
                            value={name}
                            labelText='Name'
                            labelFor="name"
                            id="name"
                            name="name"
                            type="text"
                            isRequired={true}
                            placeholder='Fullname'
                        />
                        <Input
                            handleChange={(e) => setEmail(e.target.value)}
                            value={email}
                            labelText='Email'
                            labelFor="email"
                            id="email"
                            name="email"
                            type="email"
                            disabled={true}
                            isRequired={true}
                            placeholder='Email'
                        />
                        {
                            dbUser?.sub ? 
                            <></>
                            :
                            <Select
                            options={
                                [
                                    { label: "Select how you want to operate", value: '' },
                                    { label: "Buyer", value: 'buyer' },
                                    { label: "Seller", value: 'seller' }
                                ]
                            }
                            handleChange={(e) => setRole(e.target.value)}
                            value={role}
                        />

                        }
                       
                        {
                            role === 'seller' &&
                            <>
                                <Input
                                    handleChange={(e) => setStoreName(e.target.value)}
                                    value={storeName}
                                    labelText='Store name'
                                    labelFor="storeName"
                                    id="storeName"
                                    name="storeName"
                                    type="text"
                                    isRequired={true}
                                    placeholder='Store name'
                                />

                                <Textarea
                                    handleChange={(e) => setdescription(e.target.value)}
                                    value={description}
                                    labelText='Description'
                                    labelFor="description"
                                    id="description"
                                    name="description"
                                    type="textarea"
                                    rol={4}
                                    isRequired={true}
                                    placeholder='Description'
                                />
                            </>
                        }



                        <Button
                            color="white"
                            bgColor='var(--main)'
                            text="Update profile"
                            borderRadius="10px"
                            width="full"
                            onClick={handleUpdateUser}
                        />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateUser;