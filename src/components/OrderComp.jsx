import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';
import Button from './Button';

import OrdersItem from './OrdersItem';
import { useAuthContext } from '../contexts/AuthContext';
import { Order } from '../models';
import {DataStore, Storage} from 'aws-amplify'

const OrderComp = () => {
  const { sub } = useAuthContext()

  const [order_list, setorder_list] = useState(null)

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    const myOrders = (await DataStore.query(Order, (item) => item.seller_id('eq', sub))).sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt))

    const fetchOrdersImage = await Promise.all(
      JSON.parse(JSON.stringify(myOrders))
        .map(async order => {
          const image = await Storage.get(order.image)
          order.S3image = image
          return order
        }))

    setorder_list(fetchOrdersImage)

  }


  const { handleClick } = useStateContext();

  if (!order_list) {
    return <>Loading....</>
}
  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 z-20">
      <div className="float-right h-screen  duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Orders</p>
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
            order_list.length === 0 ?
              <div className="font-medium text-xl text-slate-500 w-full h-40 flex justify-center items-center ">
                No order for you 😜🤔😜
              </div>
              :
              order_list?.map((item, index) => (
                <div key={index}>
                  <OrdersItem item={item} />
                </div>
              ))
        }
      </div>
    </div>
  );
};

export default OrderComp;