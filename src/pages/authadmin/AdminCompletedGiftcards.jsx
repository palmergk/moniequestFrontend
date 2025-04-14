import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { currencies } from '../../AuthComponents/AuthUtils'
import { Apis, AuthGetApi } from '../../services/API'
import AdminGiftcardLayout from '../../AdminComponents/AdminGiftcardLayout'

const AdminCompletedGiftcards = () => {
    const Topheaders = ['FullName', 'Gift-Brand', 'Type', 'Pin', `Amount`, 'Details']
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchGiftOrders = async () => {
            setLoading(true)
            try {
                const res = await AuthGetApi(Apis.admin.completed_giftcard_orders)
                if (res.status === 200) {
                    const data = res.data
                    setData(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchGiftOrders()
    }, [])

    return (
        <AdminGiftcardLayout>
            <div className='w-11/12 mx-auto'>
                <div className=" text-lg font-bold w-full text-center my-5 capitalize">See Completed Giftcards Sell Orders below</div>
                {!loading ?
                    <div className='relative overflow-x-auto rounded-md'>
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className=" bg-primary text-sm md:text-base poppins ">
                                <tr>
                                    {Topheaders.map((item, i) => (
                                        <th key={i} scope="col" className="px-3 truncate text-lightgreen py-3">{item}</th>
                                    ))}

                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? data.map((item, i) => (
                                    <tr className=" border-b " key={i}>
                                        <th scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                            {item?.gift_seller?.first_name}  {item?.gift_seller?.surname}
                                        </th>
                                        <td className="px-3 py-3 text-lightgreen">
                                            {item?.brand}
                                        </td>
                                        <td className="px-3 py-3">
                                            {item?.code ? 'Code' : 'Image'}
                                        </td>
                                        <td className="px-3 py-3">
                                            {item?.pin ? item?.pin : 'n/a'}
                                        </td>

                                        <td className="px-3 py-3">
                                            {currencies[0].symbol}{item.amount?.toLocaleString()}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Link to={`/admin/giftcards/orders/${item.id}`}
                                                className="bg-primary to-sec truncate text-white px-5 rounded-lg py-2">view details</Link>
                                        </td>

                                    </tr>
                                )) :
                                    <tr className="w-full truncate text-lg font-semibold">
                                        <td colSpan="6" className='text-center py-2'>No Giftcard Orders</td>
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="w-full ">
                        <div className="mt-5 w-11/12 mx-auto">
                            {new Array(2).fill(0).map((_, i) => {
                                return (
                                    <div key={i} className="flex animate-pulse mb-5 items-start gap-1 flex-col">

                                        <div className="w-full h-16 bg-gray-500 rounded-sm"></div>
                                    </div>
                                )
                            })}
                            <div className="text-center">...loading</div>
                        </div>
                    </div>
                }
            </div>
        </AdminGiftcardLayout>
    )
}

export default AdminCompletedGiftcards