import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import Button from '../components/Button'
import UpdateUser from '../components/UpdateUser'
import { useAuthContext } from '../contexts/AuthContext'

const Profile = () => {

    const [showEdit, setshowEdit] = useState(false)

    const { dbUser } = useAuthContext()

    return (
        <div className="m-5 md:m-10 mt-24 p-1 md:p-10 bg-white rounded-3xl">
            {
                
                showEdit && <UpdateUser
                    showClose={true}
                    close={() => setshowEdit(false)}
                />
            }
            <div className="bg-white">
                <div className="mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8 lg:w-2/3">
                    <div className="mt-6 flex justify-between space-x-2 align-middle ">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Profile</h2>
                        {dbUser?.role === 'seller' && ( <Button
                            onClick={() => setshowEdit(true)}
                            icon={<FiEdit />}
                            color="rgb(153, 171, 180)"
                            bgHoverColor="light-gray"
                            size="2xl"
                            borderRadius="50%"
                        />)}
                    </div>

                    <div className="mt-6 flex justify-between space-x-2 align-middle ">
                        <p className=' text-left text-l font-semibold text-slate-500' >Fullname</p>
                        <p className=' text-right text-l text-slate-500' >{dbUser?.name}</p>
                    </div>

                    <div className="mt-6 flex justify-between space-x-2 align-middle">
                        <p className=' text-left text-l font-semibold text-slate-500' >Email</p>
                        <p className=' text-right text-l text-slate-500' >{dbUser?.email}</p>
                    </div>
                    {
                        dbUser?.role === 'seller' && (
                            <>
                                <div className="mt-6 flex justify-between space-x-2 align-middle">
                                    <p className=' text-left text-l font-semibold text-slate-500' >Store name</p>
                                    <p className=' text-right text-l text-slate-500' >{dbUser?.storeName}</p>
                                </div>

                                <div className="mt-6 flex justify-between space-x-2 align-middle ">
                                    <p className=' text-left text-l font-semibold text-slate-500' >Description</p>
                                    <p className=' text-right text-l text-slate-500' >{dbUser?.description}</p>
                                </div>

                                <div className="mt-6 flex justify-between space-x-2 align-middle">
                                    <p className=' text-left text-l font-semibold text-slate-500' >Rating</p>
                                    <p className=' text-right text-l text-slate-500' >
                                        <div className="stars">
                                            <AiFillStar size={20} />
                                            <AiFillStar size={20} />
                                            <AiFillStar size={20} />
                                            <AiOutlineStar size={20} />
                                            <AiOutlineStar size={20} />

                                        </div>
                                    </p>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile