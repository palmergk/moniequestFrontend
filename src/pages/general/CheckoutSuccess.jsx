import React from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import Lottie from 'react-lottie'
import { defaultOptions } from '../../utils/pageUtils'
import { Link } from 'react-router-dom'


const CheckoutSuccess = () => {
  return (
    <PageLayout>
      <div className='h-fit py-10 flex flex-col gap-3 items-center justify-center'>
        <Lottie options={defaultOptions} height={250} width={300} />
        <div className="lg:w-1/2 text-center p-3 rounded-md bg-secondary w-11/12 w mx-auto text-white italic"> <span className='text-lightgreen font-bold'>Payment successful!</span> Your products will be delivered — please allow up to 48 hours to receive your order(s). For faster support, you can reply to the payment email or contact us on WhatsApp via our WhatsApp link attached to the email. Thank you for choosing us!. <span className='text-red-600'>Please also check spam folder for confirmation email</span></div>
        <Link
          to={`/products`}
          className='mt-5 bg-white text-dark w-fit px-5 py-1.5 rounded-md'>back</Link>
      </div>
    </PageLayout>
  )
}

export default CheckoutSuccess