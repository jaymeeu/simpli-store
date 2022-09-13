import React, { useState } from 'react'
import { useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import IconButton from '../components/IconButton/IconButton'
import Input, { Textarea } from '../components/Input'
import {DataStore, Storage} from 'aws-amplify'
import { Item } from '../models'
import { useAuthContext } from '../contexts/AuthContext'

const Edit_item = () => {

    const {id} = useParams();
    const {sub} = useAuthContext();
const navigate  = useNavigate()
    const [item, setItem] = useState(null)

    const [name, setName] = useState('')
    const [description, setdescription] = useState('')
    const [image, setimage] = useState('')
    const [img_ref, setimg_ref] = useState('')
    const [imagetosend, setimagetosend] = useState('')

    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')


    // useEffect(() => {
    //   DataStore.query(Item, (item)=> item.id('eq', id) && item.userID('eq', sub)).then((res)=>{
       
    //     setItem(res[0])
    //   })
    // }, [])

    useEffect(() => {
        getItem()
      }, [])
    
      const [defaultimage, setdefaultimage] = useState('')
    
      const getItem = async () => {
        const itemInfo = await DataStore.query(Item, (item)=> item.id('eq', id) && item.userID('eq', sub))
        setItem(itemInfo[0])
        // console.log(itemInfo[0])
          const image = await Storage.get(itemInfo[0].image)
          setimage(image)
        setdefaultimage(image)

      }


    useEffect(() => {
        setName(item?.name)
        setdescription(item?.description)
        setPrice(item?.price)
        setQty(item?.quantity)
        setimg_ref(item?.image)
    }, [item])
    
    
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
        setimagetosend(file.target.files)
        const my_image = await convert_to_base64(file.target.files[0]);
        setimage(my_image)
    }

    const handleUpdateItem = async () =>{
        if(defaultimage !== image && imagetosend.length === 1){
            console.log(img_ref,"hghhhh")
            await Storage.put(img_ref, imagetosend[0]);
        }
        DataStore.save(
            Item.copyOf(item, (update) => {
              update.name = name
              update.description = description
              update.price = parseFloat(price)
              update.quantity = parseInt(qty)
            //   update.image = image
            }))
            .then((res) => {
              console.log(res)
              navigate(-1)
            })
            .catch((err) => {
              console.log("error", err)
            })
    }

    if(!item){
        return <>Loading...</>
    }

    return (
        <div className="m-5 md:m-10 mt-24 p-1 md:p-10 bg-white rounded-3xl">

            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 m-auto max-w-xl" >Edit items</h2>
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
                                <div className="galla_card" style={{backgroundImage: `url(${image})`}}>
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

                        {/* </div>
                            <div className="mt-5 w-1/2"> */}
                        <Button
                            color="white"
                            bgColor='var(--main)'
                            text="Update item"
                            borderRadius="10px"
                            width="full"
                            onClick={handleUpdateItem}
                        />
                        {/* </div> */}
                        {/* </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit_item