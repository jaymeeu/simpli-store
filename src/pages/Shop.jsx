import React, {useState, useEffect} from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import AddItem from '../components/AddItem'
import { Storage, DataStore } from 'aws-amplify';
import {Item} from './../models';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PriceFormatter } from '../utils/PriceFormatter';
import Button from '../components/Button';
import { FiEdit } from 'react-icons/fi';

const Shop = () => {

  const {sub} = useAuthContext()

  const [items_list, setItems_list] = useState(null)

  const [refresh, setrefresh] = useState(false);

  // useEffect(() => {
  //   DataStore.query(Item, (item)=> item.userID('eq', sub)).then((res)=>{
  //     setItems_list(res.sort((a,b)=> new Date(b?.createdAt) - new Date(a?.createdAt)))
  //   })
    
  // }, [refresh])

 

  useEffect(() => {
    getAllItems()
  }, [refresh])


  const [images, setimages] = useState([])

  const getAllItems = async () => {
    const allItems = await (await DataStore.query(Item, (item)=> item.userID('eq', sub))).sort((x, y) => new Date(y.createdAt - x.createdAt))
    const products = await Promise.all(allItems.map(async product => {
      const image = await Storage.get(product.image)
      setimages([...images, image])
      return product
    }))
    setItems_list(products)
  }


  const refetch = () =>{
    setrefresh(!refresh)
  }

  const navigate = useNavigate()
  

  const [showAdd, setshowAdd] = useState(false)

  if(!items_list){
    return <>Loading....</>
  }

  return (
    <div>
      <div className="m-5 md:m-10 mt-24 p-1 md:p-10 bg-white rounded-3xl">
      <div className='fixed right-8 bottom-8' style={{ zIndex: '19' }}>
          <button
            type="button"
            onClick={() => setshowAdd(true)}
            style={{ background: 'var(--main)', borderRadius: '50%' }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <AiOutlinePlus />
          </button>
      </div>
      {
        showAdd && <AddItem close={()=> {setshowAdd(false); refetch()}}/>
      }

        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">My store items</h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {items_list?.map((product, index) => (
                <div 
                  key={product.id} className="group cursor-pointer" 
                >
                  <div 
                    onClick={()=> navigate(`/item/${product.id}`)}
                    className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={images[index]}
                      // alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div 
                    onClick={()=> navigate(`/item/${product.id}`)}
                    className="mt-4 flex justify-between space-x-2">
                    <div>
                      <h3 className="text-sm text-gray-700">
                          {product.name}
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                    </div>
                    <p className="text-sm font-medium text-gray-900">&#8358;{PriceFormatter(product.price)}</p>
                  </div>

                  <Button
                    onClick={()=> navigate(`/edit/${product.id}`)}
                    icon={<FiEdit />}
                    color="rgb(153, 171, 180)"
                    bgHoverColor="light-gray"
                    size="2xl"
                    borderRadius="50%"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Shop