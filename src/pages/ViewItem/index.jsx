import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { IoArrowBack } from 'react-icons/io5'
import './styles.css'

const ViewItem = () => {
    return (
        <div>
            <div className="card">
                <div className="card__title">
                    <div className="icon">
                        <IoArrowBack size={24}/>
                    </div>
                    <h3>New products</h3>
                </div>
                <div className="card__body">
                    <div className="half">
                        <div className="featured_text">
                            <h1>Nurton</h1>
                            <p className="sub">Office Chair</p>
                            <p className="price">$210.00</p>
                        </div>
                        <div className="image">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg" alt="" />
                        </div>
                    </div>
                    <div className="other_half">
                        <div>
                            <div className="description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem nam pariatur voluptate perferendis, asperiores aspernatur! Porro similique consequatur, nobis soluta minima, quasi laboriosam hic cupiditate perferendis esse numquam magni.</p>
                            </div>
                            <div className="stock"> In stock</div>
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
                                <p>Recommended by</p>
                                <h3>Andrew Palmer</h3>
                            </div>
                            <div className="action">
                                <button type="button">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewItem
