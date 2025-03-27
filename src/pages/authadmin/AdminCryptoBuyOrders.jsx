import React, { useEffect, useState } from 'react'
import { currencies } from '../../AuthComponents/AuthUtils'
import { Link } from 'react-router-dom'
import AdminExchangeLayout from '../../AdminComponents/AdminExchangeLayout'
import { Apis, AuthGetApi } from '../../services/API'

const AdminCryptoBuyOrders = () => {
    const Topheaders = [`ID`, 'FullName', 'Crypto', 'Network', 'Amount', 'Status', 'Details']
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchBuys = async () => {
        setLoading(true)
        try {
            const res = await AuthGetApi(Apis.admin.cryptobuy_orders)
            if (res.status !== 200) return;
            const data = await res.data
            setData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBuys()
    }, [])

    return (
        <AdminExchangeLayout>
            <div className='w-11/12 mx-auto'>
                <div className=" text-lg font-bold w-full text-center capitalize">See Latest Buy Orders below</div>
                {!loading ?
                    <div className="relative overflow-x-auto rounded-md mt-5">
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className=" bg-primary text-base poppins ">
                                <tr>
                                    {Topheaders.map((item, i) => (
                                        <th key={i} scope="col" className="px-3 text-lightgreen py-3">{item}</th>
                                    ))}

                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? data.map((item, i) => (
                                    <tr className=" border-b " key={i}>
                                        <th scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                            {item?.id}
                                        </th>
                                        <td className="px-3 py-3 truncate">
                                            {item?.crypto_buyer?.first_name}  {item?.crypto_buyer?.surname}
                                        </td>
                                        <td className="px-3 py-3 truncate">
                                            {item?.crypto_currency}
                                        </td>
                                        <td className="px-3 py-3">
                                            {item?.network}
                                        </td>

                                        <td className="px-3 py-3">
                                            {currencies[0].symbol}{item?.amount.toLocaleString()}
                                        </td>
                                        <td className={`${item.status === 'paid' ? "text-green-300" : "text-yellow-300"} px-3 py-3 capitalize`}>
                                            {item?.status}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Link to={`${item?.id}`}
                                                className="bg-primary to-sec capitalize truncate text-white px-5 rounded-lg py-2">view details</Link>
                                        </td>

                                    </tr>
                                )) :
                                    <tr className="w-full truncate text-lg font-semibold">
                                        <td colSpan="6" className='text-center py-3'>No Buy Orders</td>
                                    </tr>
                                }

                            </tbody>
                        </table>


                    </div>
                    :
                    <div className="w-full ">
                        <div className="mt-10 w-11/12 mx-auto">
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
        </AdminExchangeLayout>
    )
}

export default AdminCryptoBuyOrders