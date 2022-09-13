import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { Item } from '../../models'
import './styles.css'
import {DataStore, Storage} from 'aws-amplify'
import { useState } from 'react'
import { useEffect } from 'react'
import { PriceFormatter } from '../../utils/PriceFormatter'
import { User } from '../../models'
import { useAuthContext } from '../../contexts/AuthContext'
import { Cart } from '../../models'

const ViewItem = () => {

    const {id} = useParams();

    const { sub } = useAuthContext()


    const [item, setItem] = useState(null)
    const [seller, setSeller] = useState(null)

  const navigate = useNavigate()

    // useEffect(() => {
    //   DataStore.query(Item, id).then(setItem)
    // }, [])

    useEffect(() => {
        getItem()
      }, [])
    
      const [images, setimages] = useState('')
    
      const getItem = async () => {
        const itemInfo = await DataStore.query(Item, id)
        setItem(itemInfo)
          const image = await Storage.get(itemInfo.image)
          setimages(image)

          const sellerInfo = await DataStore.query(User, (user)=> user.sub('eq', itemInfo.userID))
          setSeller(sellerInfo[0])
      }

      const addToCart = async () => {
        await DataStore.save(new Cart({ buyer_id : sub, quantity: 1, item_id: item.id }))
            .then((res) => {
                console.log(res, "resresres")
            })
            .catch((err) => {
                console.log(err, "errerrerr")
            })
    }

    if(!item){
        return <>Loading...</>
    }
    
    return (
        <div>
            <div className="card">
                <div className="card__title">
                    <div className="icon" 
                        onClick={()=>navigate(-1)}
                    >
                        <IoArrowBack size={24}/>
                    </div>
                    <h3>Products</h3>
                </div>
                <div className="card__body">
                    <div className="half">
                        <div className="featured_text">
                            <h1 style={{fontSize:'32px'}}>{item?.name}</h1>
                            {/* <p className="sub">Office Chair</p> */}
                            <p className="price">&#8358;{PriceFormatter(item?.price)}</p>
                        </div>
                        <div className="image">
                            <img src={images} style={{maxWidth:'250px'}} alt="" />
                        </div>
                    </div>
                    <div className="other_half">
                        <div>
                            <div className="description">
                                <p>{item?.description}</p>
                            </div>
                            <div className="stock">{item?.quantity} In stock</div>
                            <div className="reviews">
                                <div className="stars">
                                    <AiFillStar size={20} />
                                    <AiFillStar size={20} />
                                    <AiFillStar size={20} />
                                    <AiOutlineStar size={20} />
                                    <AiOutlineStar size={20} />
                                    <span>(64 reviews)</span>

                                </div>
                            </div>
                        </div>
                        <div className="card__footer">
                            <div className="recommend">
                                <p>Added by</p>
                                <h3>{seller?.storeName}</h3>
                            </div>
                            <div className="action">
                                <button type="button" onClick={addToCart}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewItem
