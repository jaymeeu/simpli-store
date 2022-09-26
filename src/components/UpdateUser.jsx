import React, { useState, useEffect} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useAuthContext } from '../contexts/AuthContext';
import { User } from "./../models";
import {DataStore} from 'aws-amplify'
import Button from './Button';

import Input, { Select, Textarea } from './Input';

const UpdateUser = ({ close, showClose }) => {
    const { dbUser, setDbuser, sub, authUser} = useAuthContext()

    const [name, setName] = useState(dbUser?.name || '')
    const [email, setEmail] = useState(authUser?.attributes?.email)
    const [description, setdescription] = useState(dbUser?.description || '')
    const [storeName, setStoreName] = useState(dbUser?.storeName || '')
    const [role, setRole] = useState(dbUser?.role || '')

    useEffect(() => {
        setEmail(authUser?.attributes?.email)

        console.log(authUser,"authUser")
    }, [authUser])

    // create new user
    const createUser = () => {
        DataStore.save(new User({ 
            name, 
            description, 
            sub, 
            role, 
            storeName, 
            email : authUser?.attributes?.email 
        }))          
.then((res) => {
            setDbuser(res)
            close()
          })
          .catch((err) => {
            console.log("error", err)
          })
      }

      //update user
      const updateUser = () => {
        DataStore.save(
          User.copyOf(dbUser, (updated) => {
            updated.storeName = storeName
            updated.description = description
          }))
          .then((res) => {
            setDbuser(res)
            close()
          })
          .catch((err) => {
            console.log("error", err)
          })
      }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        if(name !== "" & email !== "" & role !== ""){
            if (dbUser) {
                updateUser()
              }
              else {
                createUser()
              }
        }
      
    }

  return (
        <div className="h-screen  bg-half-transparent w-full fixed nav-item top-0 right-0 z-20 flex justify-center align-middle p-4 ">
              <div className="h-auto duration-1000 ease-in-out transition-all bg-white w-400 p-8">
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
                            // disabled={true}
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
)}

export default UpdateUser;
