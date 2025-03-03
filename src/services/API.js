import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from '../utils/pageUtils'


export let URL;
export let imageurl;

if(window.location.origin.includes('https://moniequest.vercel.app/')) {
    URL = import.meta.env.VITE_LIVE_API_URL
    imageurl = import.meta.env.VITE_LIVE_API_URL
 }

if(window.location.origin.includes('localhost')) {
    URL = import.meta.env.VITE_API_URL
    imageurl = import.meta.env.VITE_API_URL
}



const user = 'api/user/'
const user_urls = {
    signup: user + 'create-account',
    verify_email: user + 'verify-email',
    login: user + 'login-account',
    profile: user + 'profile',
    send_otp: user + 'send-otp',
    verify_otp: user + 'verify-otp',
    change_password: user + 'change-password',
    contact: user + 'contacts',
    update_profile: user + 'update-profile',
    create_update_bank: user + 'create-update-bank',
    wallet_bank_utils: user + 'wallet-bank-utils',
    create_update_kyc: user + 'create-update-kyc',
    user_kyc: user + 'user-kyc',
    get_leaderboard: user + 'get_leader',
    subscribe: user + 'subscribe',
    get_user_charts: user + 'get_user_data',
    add_carousel_image: user + 'add-carousel-image',
    get_carousel_images: user + 'get-carousel-images',
    delete_carousel_image: user + 'delete-carousel-image',
    get_testimonials: user + 'get_testimonials'
}

const notification = 'api/notification/'
const notification_urls = {
    all_notis: notification + 'all-notis',
    update_all_notis: notification + 'update-all-notis',
    update_single_notis: notification + 'update-single-notis',
    delete_notis: notification + 'delete-notis',
}

const transaction = 'api/transactions/'
const trans_url = {
    buy_crypto: transaction + `buy_crypto`,
    sell_crypto: transaction + `sell_crypto`,
    sell_giftcard: transaction + `sell_giftcard`,
    all_user_transactions: transaction + 'get_alltrans',
    crypto_order_history: transaction + 'get_order_history',
    single_history: transaction + 'single_order_history',
    complete_payment: transaction + 'single_paid_order',
    cancel_order: transaction + 'cancel_order',
    giftcard_orders: transaction + 'giftcard_order_history',
    single_giftcard_order: transaction + 'single_giftcard_history',
    request_withdrawal: transaction + 'request_withdrawal',
    latest_withdrawals: transaction + 'latest_withdrawals',
    all_trans: transaction + 'get_alltrans',

}

const admin = 'api/admin/'
const admin_urls = {
    update_utils: admin + 'update-utils',
    get_utils: admin + 'get-utils',
    create_airdrop: admin + 'create-airdrop',
    update_airdrop: admin + 'update-airdrop',
    delete_closed_airdrop: admin + 'delete-closed-airdrop',
    all_airdrops: admin + 'all-airdrops',
    all_open_airdrops: admin + 'all-open-airdrops',
    single_airdrop: admin + 'single-airdrop',
    category_airdrops: admin + 'category-airdrops',
    all_products: admin + 'all-products',
    single_product: admin + 'single-product',
    update_product: admin + 'update-product',
    listed_products: admin + 'listed-products',
    all_products_orders: admin + 'all-products-orders',
    get_dashboard: admin + 'dashboard',
    update_kyc: admin + 'update-kyc',
    user_details: admin + 'get_users_details',
    create_user: admin + 'create_user',
    create_blog: admin + 'create-blog',
    update_blog: admin + 'update-blog',
    delete_blog: admin + 'delete-blog',
    delete_single_blogimg: admin + 'delete_single_blogimg',
    all_blogs: admin + 'all-blogs',
    single_blog: admin + 'single-blog',
    feature_blogs: admin + 'feature-blogs',
    related_blogs: admin + 'related-blogs',
    add_comment: admin + 'add-comment',
    blog_comments: admin + 'blog-comments',
    cryptobuy_orders: admin + 'get_buy_orders',
    cryptosell_orders: admin + 'get_sell_orders',
    single_buy: admin + 'get_single_buy',
    single_sell: admin + 'get_single_sell',
    confirm_buy: admin + 'confirm_buy',
    confirm_sell: admin + 'confirm_sell',
    get_giftcard_orders: admin + 'get_giftcard_orders',
    get_single_giftcard_order: admin + 'get_single_giftcard_order',
    credit_gift_customer: admin + 'credit_gift_customer',
    get_trans_history: admin + 'get_trans_history',
    get_bank_withdrawals: admin + 'get_bank_withdrawals',
    get_single_withdrawal: admin + 'get_single_withdrawal',
    create_testimonial: admin + 'create_testimonial',
    update_testimonial: admin + 'update_testimonial',
    single_testimonial: admin + 'single_testimonial',
    delete_testimonial: admin + 'delete_testimonial',
    crud_crypto: admin + 'create_update_delete_cryptos',
    get_cryptos: admin + "get_cryptos"
}

const products = 'api/product/'
const products_urls = {
    submit_product: products + 'submit-product',
    user_products: products + 'user-products',
    add_rating: products + 'add-rating',
    get_admin_bank: products + 'get-admin-bank',
    place_product_order: products + 'place-product-order'
}

export const Apis = {
    user: user_urls,
    notification: notification_urls,
    transaction: trans_url,
    admin: admin_urls,
    product: products_urls
}


export const GetApi = async (endpoint) => {
    const response = await axios.get(`${URL}/${endpoint}`)
    return response.data
}

export const PostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}

export const PutApi = async (endpoint, data) => {
    const response = await axios.put(`${URL}/${endpoint}`, data)
    return response.data
}

export const AuthGetApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.get(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const AuthPostApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const AuthPutApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.put(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const AuthDeleteApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.delete(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}


