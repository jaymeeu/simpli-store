import React, { useState, useEffect } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import { Cart } from "../models";
import { DataStore, Storage } from 'aws-amplify'
import { Item } from "../models";

import CartItem from "../components/CartItem";

const BuyerCart = () => {

    const { sub } = useAuthContext()

    const [cart_list, setCart_list] = useState(null)

    const [refresh, setrefresh] = useState(false)

    useEffect(() => {
        getAllItems()
    }, [refresh])

    const getAllItems = async () => {

        //get all my items in cart table
        const myCartItems =  (await DataStore.query(Cart, (item) => item.buyer_id('eq', sub))).sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt))

        //get cart items information from Item table and add cartid to each response
        const fetchItems = await Promise.all(
            JSON.parse(JSON.stringify(myCartItems))
            .map(async cart => {
                const eachQuery = await Promise.all(
                    JSON.parse(JSON.stringify(
                        await DataStore.query(Item, (item) => item.id('eq', cart.item_id))
                    ))
                )
                eachQuery[0].cartID = cart.id;

            return eachQuery[0]
        }))

        //get cart items image from s3 bucket
        const fetchItemsImage = await Promise.all(
            JSON.parse(JSON.stringify(fetchItems))
            .map(async cart => {
                const image = await Storage.get(cart.image)
                cart.S3image = image
            return cart
        }))

        setCart_list(fetchItemsImage)
    }

    if (!cart_list) {
        return <>Loading....</>
    }

    return (
        <div className="m-5 md:m-10 mt-24 p-1 md:p-10 bg-white rounded-3xl">

            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Buyer cart</h2>
                    {
                        cart_list.length === 0 ? 
                        <div className="font-medium text-xl text-slate-500 w-full h-40 flex justify-center items-center ">
                            Cart is empty 😜🤔😜
                        </div>
                        :
                        cart_list?.map((item, index) => (
                            <div key={index}>
                                <CartItem item={item} onsuccess={()=>setrefresh(!refresh)}/>
                            </div>
                        ))

                    }
                       
                       
                </div>
            </div>
        </div>
    )
}

export default BuyerCart