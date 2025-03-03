import React, { useState } from 'react'
import { MdCurrencyExchange, MdLeaderboard, MdDashboard } from "react-icons/md";
import { HiGift } from "react-icons/hi2";
import { CgToolbox } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaBloggerB } from "react-icons/fa";
import { RiUser3Fill } from 'react-icons/ri'
import { BiMoneyWithdraw } from "react-icons/bi";
import { MoveToTop } from '../utils/pageUtils';
import { IoNotificationsSharp } from 'react-icons/io5';
import { CiMenuKebab } from 'react-icons/ci';
import { AiFillDollarCircle } from "react-icons/ai";
import { GoHistory } from 'react-icons/go';
import { MdReviews } from "react-icons/md";

const mainIcons = [
    {
        name: 'dashboard',
        symbol: MdDashboard,
        url: '/admin/dashboard',
        main: '/dashboard'
    },
    {
        name: 'users',
        symbol: FaUsers,
        url: '/admin/all_users',
        main: '/all_users'
    },
    {
        name: 'crypto exchange',
        symbol: MdCurrencyExchange,
        url: '/admin/exchange/buy_orders',
        main: '/exchange'
    },
    {
        name: 'gift cards',
        symbol: HiGift,
        url: '/admin/giftcards/orders',
        main: '/giftcards'
    },
    {
        name: 'profit tools',
        symbol: CgToolbox,
        url: '/admin/products/orders',
        main: '/products'
    },
]

const extraIcons = [
    {
        name: 'airdrops',
        symbol: AiFillDollarCircle,
        url: '/admin/airdrops/create',
        main: '/airdrops'
    },
    {
        name: 'blogs',
        symbol: FaBloggerB,
        url: '/admin/blogs/create',
        main: '/blogs'
    },
    {
        name: 'bank withdrawals',
        symbol: BiMoneyWithdraw,
        url: '/admin/bank_withdrawals',
        main: '/bank_withdrawals'
    },
    {
        name: 'transaction history',
        symbol: GoHistory,
        url: '/admin/transactions_history'
    },
    {
        name: 'utilities',
        symbol: MdReviews,
        url: '/admin/utilities',
        main: '/utilities'
    },
    {
        name: 'profile',
        symbol: RiUser3Fill,
        url: '/admin/profile',
        main: '/profile'
    },
    {
        name: 'notifications',
        symbol: IoNotificationsSharp,
        url: '/admin/notifications',
    },
    {
        name: 'leaderboard',
        symbol: MdLeaderboard,
        url: '/admin/leaderboard',
    },
]

const AdminFooter = () => {
    const [view, setView] = useState(false)
    const location = useLocation()
    const pathName = location.pathname
    const active = 'text-lightgreen'
    const nonactive = 'text-white/60 hover:text-lightgreen'
    const mainLinks = mainIcons.some(ele => pathName.includes(ele.main))


    return (
        <div className='w-full fixed bottom-1 z-30'>
            <div className='w-11/12 mx-auto relative'>
                <div className="w-full px-5 relative bg-[#212134] border border-secondary rounded-full flex items-center justify-around gap-2">
                    {mainIcons.map((item, i) => {
                        return (
                            <div key={i} className="flex items-center py-4 relative">
                                {pathName === item.url || pathName.includes(item.main) ?
                                    <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full "></div>
                                    :
                                    <></>
                                }
                                <Link to={item.url} onClick={MoveToTop}
                                    className={` group-hover:text-lightgreen px-2  ${pathName === item.url || pathName.includes(item.main) ? active : nonactive} cursor-pointer flex flex-col gap-1 items-center`}>
                                    <div className="text-[1.5rem]">{<item.symbol />}</div>
                                </Link>
                            </div>
                        )
                    })}
                    <div className='flex items-center py-4 relative'>
                        {!mainLinks &&
                            <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full"></div>
                        }
                        <div className={`group-hover:text-lightgreen px-2 cursor-pointer text-[1.5rem] ${!mainLinks ? active : nonactive}`} onClick={() => setView(!view)}>
                            <CiMenuKebab />
                        </div>
                    </div>
                </div>
                {view &&
                    <div className='absolute overflow-x-auto w-full -top-12 right-0 bg-secondary border border-primary px-4 flex items-center justify-around gap-2 rounded-full scrollsdown'>
                        {extraIcons.map((item, i) => (
                            <div key={i} className='flex items-center py-4 relative'>
                                {pathName === item.url || pathName.includes(item.main) ?
                                    <div className="bg-lightgreen absolute top-0 w-full h-1 rounded-b-full"></div>
                                    : <></>
                                }
                                <Link to={item.url} onClick={MoveToTop}
                                    className={` group-hover:text-lightgreen px-2  ${pathName === item.url || pathName.includes(item.main) ? active : nonactive} cursor-pointer flex flex-col gap-1 items-center`}>
                                    <div className='relative'>
                                        {item.name === 'notifications' && <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-red-600 z-40"></div>}
                                        <div className="text-[1.5rem]">{<item.symbol />}</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default AdminFooter