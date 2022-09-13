import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { Item } from '../models';
import { DataStore, Storage } from 'aws-amplify';

import Button from './Button';
import IconButton from './IconButton/IconButton';

import Input, { Textarea } from './Input';
import { useAuthContext } from '../contexts/AuthContext';

const AddItem = ({ close }) => {

    const [name, setName] = useState('')
    const [description, setdescription] = useState('')
    const [image, setimage] = useState('')
    const [imagetosend, setimagetosend] = useState('')

    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')

    const { sub } = useAuthContext()

    const re = /^[0-9\b]+$/;
    const changeQty = (e) => {
        if (e.target.value === '' || re.test(e.target.value)) {
            setQty(e.target.value)
        }
    }
    const changePrice = (e) => {
        if (e.target.value === '' || re.test(e.target.value)) {
            setPrice(e.target.value)
        }
    }

    const convert_to_base64 = file => new Promise((response) => {
        const file_reader = new FileReader();
        file_reader.readAsDataURL(file);
        file_reader.onload = () => response(file_reader.result);
    });

    const imageHandler = async (file) => {
        setimagetosend(file.target.files[0])
        const my_image = await convert_to_base64(file.target.files[0]);
        setimage(my_image)
    }

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const handleAddItem = async () => {

        const fileName = makeid(20);
        
        await Storage.put(fileName, imagetosend);

        await DataStore.save(new Item({ name, description, price: parseFloat(price), quantity: parseInt(qty), image: fileName, userID: sub }))
            .then((res) => {
                console.log(res, "resresres")
                close()
            })
            .catch((err) => {
                console.log(err, "errerrerr")
            })
    }

    return (
        <div className="h-screen  bg-half-transparent w-full fixed nav-item top-0 right-0 z-20 flex justify-center align-middle p-4 ">
            <div className="h-auto duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white w-400 p-8">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">Add items</p>
                    <Button
                        onClick={close}
                        icon={<MdOutlineCancel />}
                        color="rgb(153, 171, 180)"
                        bgHoverColor="light-gray"
                        size="2xl"
                        borderRadius="50%"
                    />
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
                            placeholder='Name'
                        />
                        <div className="flex gap-4">
                            <div className='w-1/2'>
                                <input
                                    style={{ display: "none" }}
                                    id="galleries"
                                    name="galleries"
                                    type="file"
                                    accept="image/x-png,image/gif,image/jpeg,image/webp"
                                    onChange={imageHandler}
                                />
                                <label htmlFor="galleries" className="upload">
                                    <div className="galla_card" style={{ backgroundImage: `url(${image})` }}>
                                        <IconButton bg="#c9edf0" width="30px" height="30px" icon={<FiPlus color='var(--main)' size={20} />} />
                                        <span>Upload image</span>
                                    </div>
                                </label>
                            </div>
                            <div className='w-1/2'>
                                <Input
                                    handleChange={changePrice}
                                    value={price}
                                    labelText='Price'
                                    labelFor="price"
                                    id="price"
                                    name="price"
                                    type="text"
                                    isRequired={true}
                                    placeholder='Price in naira'
                                />
                                <Input
                                    handleChange={changeQty}
                                    value={qty}
                                    labelText='Quantity'
                                    labelFor="quantity"
                                    id="quantity"
                                    name="quantity"
                                    type="text"
                                    isRequired={true}
                                    placeholder='Quantity'
                                />
                            </div>
                        </div>
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

                        <Button
                            color="white"
                            bgColor='var(--main)'
                            text="Add item"
                            borderRadius="10px"
                            width="full"
                            onClick={handleAddItem}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItem;