import React, { useEffect, useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import FormInput from '../../utils/FormInput';
import AirdropsLayout from '../../AdminComponents/AirdropsLayout';
import AdminAirdropComp from '../../AdminComponents/AdminAirdropComp';
import { Apis, AuthGetApi } from '../../services/API';


const AdminAllAirdrops = () => {
    const tags = ['all', 'deFi', 'featured', 'new', 'NFT', 'potential', 'earn crypto']
    const [active, setActive] = useState(tags[0])
    const [search, setSearch] = useState('')
    const [dataLoading, setDataLoading] = useState(true)
    const [staticData, setStaticData] = useState([])
    const [airdrops, setAirdrops] = useState([])

    useEffect(() => {
        const FetchAllAirdrops = async () => {
            try {
                const response = await AuthGetApi(Apis.admin.all_airdrops)
                if (response.status === 200) {
                    setStaticData(response.msg)
                    setAirdrops(response.msg)
                }

            } catch (error) {
                //
            } finally {
                setDataLoading(false)
            }
        }
        FetchAllAirdrops()
    }, [])

   
    const featuredAirdrops = useMemo(() => {
        return airdrops.filter((ele) => ele.category === 'featured');
    }, [airdrops])
    const newAirdrops = useMemo(() => {
        return airdrops.filter((ele) => ele.category === 'new');
    }, [airdrops])
    const NFTAirdrops = useMemo(() => {
        return airdrops.filter((ele) => ele.category === 'NFT');
    }, [airdrops])
    const deFiAirdrops = useMemo(() => {
        return airdrops.filter((ele) => ele.category === 'deFi');
    }, [airdrops])
    const potentialAirdrops = useMemo(() => {
        return airdrops.filter((ele) => ele.category === 'potential');
    }, [airdrops])
    const earnCryptoAirdrops = useMemo(() => {
        return airdrops.filter((ele) => ele.category === 'earn_crypto');
    }, [airdrops])

    const filterAirdrop = () => {
        const mainData = staticData
        if (search.length > 1) {
            const filtered = mainData.filter(item => item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || item.gen_id.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            setAirdrops(filtered)
        } else {
            setAirdrops(mainData)
        }
    }

    return (
        <AirdropsLayout>
            <div className='w-11/12 mx-auto'>
                <div className="w-full lg:w-2/3 mx-auto relative">
                    <FormInput placeholder='Search by Title and ID' value={search} onChange={(e) => setSearch(e.target.value)} className="!rounded-lg" onKeyUp={filterAirdrop} />
                    <div className="absolute top-3 right-3">
                        <CiSearch className='text-xl cursor-pointer text-white' />
                    </div>
                </div>
                <div className="grid md:grid-cols-6 grid-cols-1 gap-2 items-center mt-4">
                    <div className="text-zinc-300 font-semibold capitalize text-sm lg:text-base col-span-1">Sort airdrops by:</div>
                    <div className='md:col-span-5 col-span-1'>
                        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 items-center lg:w-11/12 w-full mx-auto">
                            {tags.map((tag, i) => {
                                return (
                                    <div key={i} onClick={() => setActive(tag)}
                                        className={`w-full h-fit py-1 text-sm md:text-base flex items-center justify-center text-center rounded-md capitalize ${active === tag ? 'bg-ash' : 'bg-primary hover:bg-primary/50'} cursor-pointer`}>{tag}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    {dataLoading ?
                        <div className='w-full h-fit'>
                            <div className='h-11 bg-slate-600 animate-pulse rounded-t-lg'></div>
                            <div className='md:h-24 h-40 bg-slate-500 animate-pulse rounded-b-lg'></div>
                        </div>
                        :
                        <>
                            {airdrops.length > 0 ?
                                <>
                                    <div className='flex flex-col gap-4'>
                                        {active === 'all' &&
                                            <>
                                                {airdrops.map((item, i) => (
                                                    <AdminAirdropComp key={i} item={item} />
                                                ))}
                                            </>
                                        }
                                        {active === 'featured' &&
                                            <>
                                                {featuredAirdrops.length > 0 ?
                                                    <>
                                                        {featuredAirdrops.map((item, i) => (
                                                            <AdminAirdropComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                        {active === 'deFi' &&
                                            <>
                                                {deFiAirdrops.length > 0 ?
                                                    <>
                                                        {deFiAirdrops.map((item, i) => (
                                                            <AdminAirdropComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                        {active === 'new' &&
                                            <>
                                                {newAirdrops.length > 0 ?
                                                    <>
                                                        {newAirdrops.map((item, i) => (
                                                            <AdminAirdropComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                        {active === 'NFT' &&
                                            <>
                                                {NFTAirdrops.length > 0 ?
                                                    <>
                                                        {NFTAirdrops.map((item, i) => (
                                                            <AdminAirdropComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                        {active === 'potential' &&
                                            <>
                                                {potentialAirdrops.length > 0 ?
                                                    <>
                                                        {potentialAirdrops.map((item, i) => (
                                                            <AdminAirdropComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                        {active === 'earn crypto' &&
                                            <>
                                                {earnCryptoAirdrops.length > 0 ?
                                                    <>
                                                        {earnCryptoAirdrops.map((item, i) => (
                                                            <AdminAirdropComp key={i} item={item} />
                                                        ))}
                                                    </>
                                                    :
                                                    <div className="text-gray-400 text-center">No record found...</div>
                                                }
                                            </>
                                        }
                                    </div>
                                </>
                                :
                                <div className="text-gray-400 text-center">No record found...</div>
                            }
                        </>
                    }
                </div>
            </div>
        </AirdropsLayout>
    )
}

export default AdminAllAirdrops