import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { PriceFormatter } from "../utils/PriceFormatter";
import Button from "../components/Button";
import { Cart, Item, Order } from '../models';
import { useAuthContext } from '../contexts/AuthContext';
import { DataStore } from 'aws-amplify';
const CartItem = ({ item, onsuccess }) => {

    // const [qty_available, setqty_available] = useState(parseInt(item.quantity))
    const [qty, setqty] = useState(1)
    const [total, settotal] = useState(parseFloat(item.price))
    const { sub } = useAuthContext()

    const price = parseFloat(item.price);
    const qty_available = parseInt(item.quantity)

    const increase = () => {
        if (qty !== qty_available) {
            settotal(price * (qty + 1))
            setqty((prev => prev + 1))
        }
    }

    const decrease = () => {
        if (qty !== 1) {
            settotal(price * (qty - 1))
            setqty((prev => prev - 1))
        }
    }

    const handleOrderNow = async () => {
        // add item to order table 
        // on order add, delete item from cart
        // on delete from cart successfull reduce the quantity of item in Item table

        await DataStore.save(new Order({
            buyer_id: sub,
            seller_id: item.userID,
            price: parseFloat(price),
            quantity : parseInt(qty),
            total: parseFloat(total),
            name: item.name,
            image: item.image,
            item_id: item.id
        }))
            .then(async (res) => {
                const todelete = await DataStore.query(Cart, item.cartID);
                DataStore.delete(todelete)
                    .then(async (res) => {
                        // console.log(res, "delete response")

                        const itemToUpdate = await DataStore.query(Item, item.id);
                        DataStore.save(
                            Item.copyOf(itemToUpdate, (update) => {
                                update.quantity = parseInt(qty_available) - parseInt(qty)
                            }))
                            .then(async (res) => { 
                                // console.log(res, "update response")
                                onsuccess()
                            })
                            .catch((err) => {
                                console.log(err, "update errerrerr")
                            })

                    })
                    .catch((err) => {
                        console.log(err, "delete err")
                    })
            })
            .catch((err) => {
                console.log(err, "add errerrerr")
            })

    }

    return (
        <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 py-4">
            <img className="rounded-lg h-24 w-24" src={item.S3image} alt="" />
            <div className='sm:w-96 w-full'>
               
                <div className="flex space-x-2 justify-between items-center">
                    <p className="font-semibold ">{item.name}</p>
                    <p className="font-semibold text-sm">{qty_available}</p>
                </div>
                <div className="flex gap-4 mt-2 items-center">
                    <p className="font-semibold text-lg">&#8358;{PriceFormatter(item.price)}</p>
                    <div className="flex items-center border-1 border-color rounded">
                        <p className="p-2  border-color text-red-600  cursor-pointer" onClick={decrease}><AiOutlineMinus /></p>
                        <p className="p-2 border-r-1 border-l-1 text-green-600">{qty}</p>
                        <p className="p-2  border-color text-green-600 cursor-pointer" onClick={increase}><AiOutlinePlus /></p>
                    </div>
                </div>
                <div className="mt-3">
                    <Button
                        onClick={handleOrderNow}
                        color="white"
                        bgColor='var(--main)'
                        text={`N${PriceFormatter(total)}, Order now`}
                        borderRadius="13px"
                        padding="0"
                        width="full"
                    />
                </div>
            </div>
        </div>
    )
}

export default CartItem