import React, { useEffect, useState } from 'react'
import AdminPageLayout from '../../AdminComponents/AdminPageLayout'
import { Link } from 'react-router-dom'
import ModalLayout from '../../utils/ModalLayout'
import FormInput from '../../utils/FormInput'
import FormButton from '../../utils/FormButton'
import { Apis, AuthGetApi, AuthPostApi } from '../../services/API'
import { ErrorAlert, SuccessAlert } from '../../utils/pageUtils'
import Loader from '../../GeneralComponents/Loader'

const AdminUpdateCryptos = () => {
    const [loading, setLoading] = useState({ status: false, val: '' })
    const [data, setData] = useState([])

    const fetchCryptos = async () => {
        setLoading({ status: true, val: 'fetch' })
        try {
            const res = await AuthGetApi(Apis.admin.get_cryptos)
            if (res.status !== 200) return;
            const data = res.data
            setData(data)
        } catch (error) {
            console.log(`failed to fetch cryptos data`, error)
        } finally { setLoading({ status: false, val: '' }) }
    }

    useEffect(() => {
        fetchCryptos()
    }, [])

    const Topheaders = [`Name`, 'Network', 'Wallet Address', 'Symbol', 'Update', 'Delete']
    const [forms, setForms] = useState({
        name: '', network: '', wallet_add: '', symbol: ''
    })
    const [add, setAdd] = useState(false)
    const [update, setUpdate] = useState(false)
    const [del, setDel] = useState(false)
    const [selected, setSelected] = useState({})


    useEffect(() => {
        setForms({
            name: selected?.name,
            network: selected?.network,
            wallet_add: selected?.wallet_add,
            symbol: selected?.symbol
        })
    }, [update])

    const addCrypto = () => {
        setForms({ name: '', network: '', wallet_add: '', symbol: '' })
        setAdd(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'name') {
            const firstChar = value.charAt(0).toUpperCase();
            const restOfString = value.slice(1);
            setForms({ ...forms, name: firstChar + restOfString });
        }
        else if (name === 'network') {
            const firstChar = value.charAt(0).toUpperCase();
            const restOfString = value.slice(1);
            setForms({ ...forms, network: firstChar + restOfString });
        }
        else if (name === 'symbol') {
            const formatWords = value.toUpperCase()
            setForms({ ...forms, symbol: formatWords })
        }
        else {
            setForms({ ...forms, [e.target.name]: value })

        }
    }

    const crudCrypto = async (tag) => {
        console.log(selected?.id)
        if (tag === 'create') {
            const reqFields = [forms.name, forms.network, forms.wallet_add, forms.symbol]
            if (reqFields.some((value) => value === '')) return ErrorAlert(`Please fill out all fields`)
            const formdata = {
                tag: tag,
                name: forms.name,
                network: forms.network,
                wallet_add: forms.wallet_add,
                symbol: forms.symbol
            }
            setAdd(false)
            setLoading({ status: true, val: tag })
            try {
                const res = await AuthPostApi(Apis.admin.crud_crypto, formdata)
                if (res.status !== 201) return ErrorAlert(res.msg)
                await new Promise((resolve) => setTimeout(resolve, 2000))
                fetchCryptos()
                SuccessAlert(res.msg)
                setLoading({ status: false, val: '' })
                setForms({ ...forms, name: '', network: '', wallet_add: '', symbol: '' })
            } catch (error) {
                console.log(`Error in creating crypto wallet`, error)
            } finally {
                setLoading({ status: false, val: '' })
            }
        }
        else if (tag === 'update') {
            if (!selected?.id) return ErrorAlert(`ID missing`)
            const formdata = {
                tag: tag,
                id: selected?.id,
                name: forms.name,
                network: forms.network,
                wallet_add: forms.wallet_add,
                symbol: forms.symbol
            }
            setUpdate(false)
            setLoading({ status: true, val: tag })
            try {
                const res = await AuthPostApi(Apis.admin.crud_crypto, formdata)
                if (res.status !== 200) return ErrorAlert(res.msg)
                await new Promise((resolve) => setTimeout(resolve, 2000))
                fetchCryptos()
                SuccessAlert(res.msg)
                setLoading({ status: false, val: '' })
                setForms({ ...forms, name: '', network: '', wallet_add: '', symbol: '' })
            } catch (error) {
                console.log(`Error in updating crypto wallet`, error)
            } finally {
                setLoading({ status: false, val: '' })
            }
        } else {
            if (!selected?.id) return ErrorAlert(`ID missing`)
            const formdata = {
                tag: tag,
                id: selected?.id
            }
            setDel(false)
            setLoading({ status: true, val: tag })
            try {
                const res = await AuthPostApi(Apis.admin.crud_crypto, formdata)
                if (res.status !== 200) return ErrorAlert(res.msg)
                await new Promise((resolve) => setTimeout(resolve, 2000))
                fetchCryptos()
                SuccessAlert(res.msg)
                setLoading({ status: false, val: '' })
            } catch (error) {
                console.log(`Error in updating crypto wallet`, error)
            } finally {
                setLoading({ status: false, val: '' })
            }
        }

    }


    return (
        <AdminPageLayout>

            {loading.status && loading.val === 'create' &&
                <ModalLayout>
                    <Loader title={`creating wallet`} />
                </ModalLayout>
            }
            {loading.status && loading.val === 'update' &&
                <ModalLayout>
                    <Loader title={`updating wallet`} />
                </ModalLayout>
            }
            {loading.status && loading.val === 'delete' &&
                <ModalLayout>
                    <Loader title={`deleting wallet`} />
                </ModalLayout>
            }

            {add &&
                <ModalLayout setModal={setAdd} clas={`w-11/12 mx-auto lg:w-1/2`}>
                    <div className="w-full p-5 bg-white text-dark rounded-md">
                        <div className="w-full flex items-center flex-col gap-5">
                            <div className="capitalize font-semibold">Add below new crypto</div>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormInput label={`Crypto Name`} name={`name`} value={forms.name} onChange={handleChange} />
                                <FormInput label={`Crypto Network`} name={`network`} value={forms.network} onChange={handleChange} />
                                <FormInput label={`Wallet Address`} name={`wallet_add`} value={forms.wallet_add} onChange={handleChange} />
                                <FormInput label={`Symbol`} name={`symbol`} value={forms.symbol} onChange={handleChange} />
                            </div>
                            <div className="w-11/12 mx-auto  ">
                                <FormButton type='button' onClick={() => crudCrypto('create')} title={`Add Crypto Wallet`} />
                            </div>
                        </div>
                    </div>
                </ModalLayout>
            }
            {update &&
                <ModalLayout setModal={setUpdate} clas={`w-11/12 mx-auto lg:w-1/2`}>
                    <div className="w-full p-5 bg-white text-dark rounded-md">
                        <div className="w-full flex items-center flex-col gap-5">
                            <div className="capitalize font-semibold">Update {selected?.name} crypto wallet</div>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormInput label={`Crypto Name`} name={`name`} value={forms.name} onChange={handleChange} />
                                <FormInput label={`Crypto Network`} name={`network`} value={forms.network} onChange={handleChange} />
                                <FormInput label={`Wallet Address`} name={`wallet_add`} value={forms.wallet_add} onChange={handleChange} />
                                <FormInput label={`Symbol`} name={`symbol`} value={forms.symbol} onChange={handleChange} />
                            </div>
                            <div className="w-11/12 mx-auto  ">
                                <FormButton type='button' onClick={() => crudCrypto('update')} title={`Update Crypto`} />
                            </div>
                        </div>
                    </div>
                </ModalLayout>
            }
            {del &&
                <ModalLayout setModal={setDel} clas={`w-11/12 mx-auto lg:w-1/2`}>
                    <div className="w-full p-5 bg-white text-dark rounded-md flex items-center flex-col justify-center">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="text-center">Are you sure you want to delete wallet?</div>
                            <div className="flex w-full items-center justify-between ">
                                <button onClick={() => setDel(false)} className='px-4 py-1.5 rounded-md bg-red-600 text-white'>cancel</button>
                                <button onClick={() => crudCrypto('delete')} type='button' className='px-4 py-1.5 rounded-md bg-green-600 text-white'>confirm delete</button>
                            </div>
                        </div>
                    </div>
                </ModalLayout>
            }



            <div className="w-11/12 mx-auto mb-10 ">
                <div className=" text-center text-3xl mb-5 font-bold text-">Update Crypto Currencies </div>
                <div className="flex items-center justify-between w-full">
                    <Link to={`/admin/utilities`} className='px-4 py-1.5 rounded-md bg-ash'>back to utilities</Link>
                </div>
                <div className="mt-10 text-center text-base md:ttext-lg mb-5 capitalize font-bold">Lists of available cryptos and networks</div>

                <div className="w-fit ml-auto">
                    <button onClick={addCrypto} className='px-3 py-1.5 rounded-sm bg-white text-dark'>Add Crypto</button>
                </div>
                {!loading.status && loading.val === '' &&
                    <div className="relative overflow-x-auto rounded-md mt-10">
                        <table className="w-full text-sm text-center rtl:text-right">
                            <thead className=" bg-primary text-base poppins ">
                                <tr>
                                    {Topheaders.map((item, i) => (
                                        <th key={i} scope="col" className="px-3 text-white font-bold py-3">{item}</th>
                                    ))}

                                </tr>
                            </thead>
                            <tbody className='relative'>
                                {data.length > 0 ? data.map((item, i) => (
                                    <tr className=" border-b relative" key={i}>
                                        <td scope="row" className="px-6 text-white py-4 font-medium  whitespace-nowrap ">
                                            {item?.name}
                                        </td>
                                        <td className="px-3 py-3">
                                            {item?.network}
                                        </td>
                                        <td className="px-3 py-3 truncate">
                                            {item?.wallet_add}
                                        </td>

                                        <td className="px-3 py-3">
                                            {item?.symbol}
                                        </td>
                                        <td onMouseOver={() => setSelected(item)}
                                            onClick={() => setUpdate(true)}
                                            className="px-1 text-dark relative">
                                            <button
                                                className="w-full h-fit bg-white rounded-md py-1.5">update</button>
                                        </td>
                                        <td className="px-1 text-white relative">
                                            <button
                                                onClick={() => setDel(true)} className="w-full h-fit bg-red-600 rounded-md py-1.5">delete</button>
                                        </td>

                                    </tr>
                                )) :
                                    <tr className=" w-full text-lg  font-semibold ">
                                        <td colSpan='5' className='text-center py-2'>No crypto token added  </td>
                                    </tr>
                                }

                            </tbody>
                        </table>


                    </div>
                }
            </div>
        </AdminPageLayout>
    )
}

export default AdminUpdateCryptos