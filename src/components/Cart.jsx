import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '../contexts/ContextProvider';
import Button  from './Button';

import CartItem from './CartItem';
import { useAuthContext } from '../contexts/AuthContext';
import {DataStore} from 'aws-amplify'
import { Item } from '../models';

const Cart = () => {
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

    const { handleClick } = useStateContext();


  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 z-20">
      <div className="float-right h-screen  duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Shopping Cart</p>
          <Button
            onClick={() => handleClick('cart')} 
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        {
            !cart_list ?
            <div className="font-medium text-xl text-slate-500 w-full h-40 flex justify-center items-center ">
                Loading... 😜🤔😜
            </div>
            :
            cart_list?.length === 0 ? 
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
  );
};

export default Cart;