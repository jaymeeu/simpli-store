import moment from 'moment/moment';
import React from 'react'
import { PriceFormatter } from "../utils/PriceFormatter";

const OrdersItem = ({ item }) => {

    const price = item.price
    const qty = item.quantity
    const name = item.name
    const image = item.S3image
    const date = item.createdAt



    return (
        <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 py-4">
            <img className="rounded-lg h-24 w-24" src={image} alt="" />
            <div className='sm:w-96 w-full'>
                <div className="flex space-x-2 justify-between items-center">
                    <p className="font-semibold ">{name}</p>
                    <p className="font-medium text-sm">{qty}</p>
                </div>
                <div className="flex mt-2 space-x-2 justify-between items-center">
                    <p className="font-semibold text-md">&#8358;{PriceFormatter(price)}</p>
                    <p className="font-medium text-xs text-slate-500">{moment(date).format('DD/MM/YYYY H:mma')}</p>
                </div>
                
            </div>
        </div>
    )
}

export default OrdersItem