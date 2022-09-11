import React, { useEffect, useState } from 'react'
import UpdateUser from '../components/UpdateUser'
import { useAuthContext } from '../contexts/AuthContext'
import { DataStore, Storage } from 'aws-amplify'
import { Item } from '../models'
import { useNavigate } from 'react-router-dom'
import { PriceFormatter } from '../utils/PriceFormatter'

const Dashboard = () => {

  const { dbUser } = useAuthContext()
  const [items_list, setItems_list] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getAllItems()
  }, [])

  const [images, setimages] = useState([])

  const getAllItems = async () => {
    const allItems = await (await DataStore.query(Item)).sort((x, y) => new Date(y.createdAt - x.createdAt))
    const products = await Promise.all(allItems.map(async product => {
      const image = await Storage.get(product.image)
      // setimages([...images, image])
      // console.log(image, 'fgssssshjkl')
      product.image = image
      return product
    }))
    setItems_list(products)
  }

  if (!items_list) {
    return <>Loading....</>
  }

  return (
    <div>
      {
        dbUser === undefined && <UpdateUser
          showClose={false}
        // close={refreshUserAfterUpdate}
        />
      }
      <div className="m-5 md:m-10 mt-24 p-1 md:p-10 bg-white rounded-3xl">

        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">All items</h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {items_list?.map((product, index) => (
                <div
                  key={product?.id} className="group cursor-pointer shadow-md"
                  onClick={() => navigate(`/item/${product?.id}`)}
                >
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={images[index]}
                      // alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between space-x-2 p-2">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {product?.name}
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                    </div>
                    <p className="text-sm font-medium text-gray-900">&#8358;{PriceFormatter(product?.price)}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard