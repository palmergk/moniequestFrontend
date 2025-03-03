import React, { useEffect, useState } from 'react'
import PageLayout from '../../GeneralComponents/PageLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaXTwitter } from 'react-icons/fa6'
import { SiTelegram } from 'react-icons/si'
import { LuArrowRightLeft } from 'react-icons/lu'
import { RxExternalLink } from "react-icons/rx";
import { Apis, GetApi, imageurl } from '../../services/API'
import YouTubeComp from '../../GeneralComponents/YouTubeComp'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MoveToTop } from '../../utils/pageUtils'


const SingleAirdropPage = () => {
  const { id, category } = useParams()
  const [categoryAirdrops, setCategoryAirdrops] = useState([])
  const [singleAirdrop, setSingleAirdrop] = useState({})
  const [dataLoading, setDataLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const FetchCategoryAirdrops = async () => {
      setDataLoading(true)
      try {
        const response = await GetApi(`${Apis.admin.category_airdrops}/${category}`)
        if (response.status === 200) {
          const data = response.msg
          setCategoryAirdrops(data)
          const currentAirdrop = data.find((item) => item.id === parseInt(id))
          setSingleAirdrop(currentAirdrop)
        }
      } catch (error) {
        //
      } finally {
        setDataLoading(false)
      }
    }
    FetchCategoryAirdrops()
  }, [id])

  const sortedAirdrops = [...categoryAirdrops].sort((a, b) => b.id - a.id)
  const currentIndex = sortedAirdrops.findIndex((item) => item.id === parseInt(id))
  const prevAirdrop = currentIndex > 0 ? sortedAirdrops[currentIndex - 1] : null
  const nextAirdrop = currentIndex < sortedAirdrops.length - 1 ? sortedAirdrops[currentIndex + 1] : null

  
  return (
    <PageLayout>
      <div className='w-full bg-dark md:py-20 py-10'>
        <div className='md:w-5/6 w-11/12 mx-auto text-gray-200'>

          {dataLoading || Object.values(singleAirdrop).length === 0 ?
            <div className='flex flex-col gap-14'>
              <div className='flex lg:flex-row lg:justify-between flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='w-12 h-12 rounded-full bg-slate-400 animate-pulse'></div>
                  <div className='w-56 h-5 rounded-full bg-slate-400 animate-pulse'></div>
                </div>
                <div className='flex lg:flex-row lg:gap-40 flex-col gap-8 ml-auto'>
                  <div className='flex items-center gap-2 justify-end'>
                    {new Array(3).fill(0).map((_, i) => (
                      <div key={i} className='w-7 h-7 rounded-full bg-slate-400 animate-pulse'></div>
                    ))}
                  </div>
                  <div className='flex gap-3 items-center'>
                    {new Array(2).fill(0).map((_, i) => (
                      <div key={i} className='w-24 h-9 rounded-[4px] bg-slate-400 animate-pulse'></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='grid lg:grid-cols-5 grid-cols-1 gap-8'>
                <div className='lg:col-span-3 col-span-1 flex flex-col gap-2'>
                  <div>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-full h-1 rounded-full bg-slate-400 animate-pulse mt-2'></div>
                    ))}
                  </div>
                  <div>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-full h-1 rounded-full bg-slate-400 animate-pulse mt-2'></div>
                    ))}
                  </div>
                </div>
                <div className='lg:col-span-2 col-span-1 w-full h-64 bg-slate-400 animate-pulse'></div>
              </div>
              <div className='grid lg:grid-cols-6 grid-cols-1 gap-8'>
                <div className='lg:col-span-2 col-span-1'>
                  <div className='grid grid-cols-2 gap-4'>
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className='w-full h-24 rounded-md bg-slate-400 animate-pulse'></div>
                    ))}
                  </div>
                </div>
                <div className='lg:col-span-4 col-span-1 w-full h-96 bg-slate-400 animate-pulse rounded-md'></div>
              </div>
              <div className='w-full h-36 bg-slate-400 animate-pulse rounded-md'></div>
            </div>
            :
            <>
              <Link to={'/airdrops'} className="text-white px-4 py-1.5 rounded-full bg-ash w-fit">back to airdrops</Link>
              <div className='flex flex-col gap-14 md:mt-10 mt-5'>
                <div className='flex lg:flex-row lg:justify-between flex-col gap-4'>
                  <div className='flex items-center gap-2'>
                    <div>
                      <img alt='airdrop logo image' src={`${imageurl}/airdrops/${singleAirdrop?.gen_id}/${singleAirdrop?.logo_image}`} className='size-14 rounded-full object-cover'></img>
                    </div>
                    <div className='capitalize md:text-4xl text-3xl font-bold'>{singleAirdrop?.title}</div>
                  </div>
                  <div className='flex lg:flex-row lg:gap-40 flex-col gap-8 ml-auto'>
                    <div className='flex items-center gap-2 justify-end'>
                      {singleAirdrop.twitter_link &&
                        <a target="_blank" rel="noopener noreferrer" href={singleAirdrop.twitter_link} className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-sm hover:border-lightgreen hover:bg-lightgreen hover:text-black flex items-center justify-center'>
                          <FaXTwitter />
                        </a>
                      }
                      {singleAirdrop.telegram_link &&
                        <a target="_blank" rel="noopener noreferrer" href={singleAirdrop.telegram_link} className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-sm hover:border-lightgreen hover:bg-lightgreen hover:text-black flex items-center justify-center'>
                          <SiTelegram />
                        </a>
                      }
                      {singleAirdrop.website_link &&
                        <a target="_blank" rel="noopener noreferrer" href={singleAirdrop.website_link} className='w-fit h-fit p-1.5 rounded-full border border-gray-600 text-sm hover:border-lightgreen hover:bg-lightgreen hover:text-black flex items-center justify-center'>
                          <LuArrowRightLeft />
                        </a>
                      }
                    </div>
                    <div className='flex gap-3 items-center'>
                      <button className='outline-none bg-primary rounded-[4px] py-2 px-6 text-sm text-lightgreen font-semibold capitalize cursor-default'>{singleAirdrop?.category === 'earn_crypto' ? 'earn crypto' : singleAirdrop?.category}</button>
                      <button className='outline-none bg-lightgreen rounded-[4px] py-2 px-6 text-sm text-primary font-bold capitalize cursor-default'>{singleAirdrop?.status}</button>
                    </div>
                  </div>
                </div>
                <div className='grid lg:grid-cols-5 grid-cols-1 gap-8'>
                  <div className='lg:col-span-3 col-span-1'>
                    <p>{singleAirdrop?.about}</p>
                  </div>
                  <div className='lg:col-span-2 col-span-1'>
                    <img alt='airdrop banner image' src={`${imageurl}/airdrops/${singleAirdrop?.gen_id}/${singleAirdrop?.banner_image}`} className='w-full h-auto'></img>
                  </div>
                </div>
                <div className='grid lg:grid-cols-6 grid-cols-1 gap-8'>
                  <div className='lg:col-span-2 col-span-1'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                        <span className='md:text-lg text-sm font-bold text-center capitalize'>{singleAirdrop?.blockchain}</span>
                        <span className='text-gray-400 md:text-base text-xs text-center'>Blockchain</span>
                      </div>
                      <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                        <span className='md:text-lg text-sm font-bold text-center capitalize'>{singleAirdrop?.category === 'earn_crypto' ? 'earn crypto' : singleAirdrop?.category}</span>
                        <span className='text-gray-400 md:text-base text-xs text-center'>Category</span>
                      </div>
                      <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                        <span className='md:text-lg text-sm font-bold text-center capitalize'>{singleAirdrop?.status}</span>
                        <span className='text-gray-400 md:text-base text-xs text-center'>Mining</span>
                      </div>
                      <div className='border border-ash bg-secondary w-full h-24 rounded-md flex flex-col gap-2 justify-center items-center overflow-hidden p-4'>
                        <span className='md:text-lg text-sm font-bold text-center capitalize'>{singleAirdrop?.kyc}</span>
                        <span className='text-gray-400 md:text-base text-xs text-center'>KYC</span>
                      </div>
                    </div>
                  </div>
                  <div className='lg:col-span-4 col-span-1'>
                    <div className='w-full h-fit border border-ash bg-secondary rounded-md py-8'>
                      <div className='flex flex-col gap-4'>
                        <div className='text-xl font-bold px-4'>Step by step video guide on <span className='capitalize'>{singleAirdrop?.title}</span></div>
                        {singleAirdrop?.video_guide_link.includes(`https://www.youtube.com`) ? <YouTubeComp videoId={singleAirdrop?.video_guide_link} title={singleAirdrop?.title} />
                          :
                          <div className="capitalize w-11/12 mx-auto">No steps video provided for this airdrop!</div>
                        }
                      </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-8'>
                      <div className='text-xl font-bold'>Code/Website</div>
                      <a target="_blank" rel="noopener noreferrer" href={singleAirdrop?.referral_link} className='w-full bg-primary py-2 px-4 flex items-center justify-between'>
                        <div className='text-lightgreen underline'>{singleAirdrop?.referral_link}</div>
                        <RxExternalLink className='text-lg' />
                      </a>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-8'>
                  <div className='bg-secondary border border-ash rounded-md w-full h-fit p-4 text-sm italic'>
                    <p><span className='font-bold'>Disclaimer:</span> All content & airdrop guides are for educational and informational purposes only. It is not financial advice or endorsement for the projects and airdrops. Conduct thorough research before making any deposits or investment decisions (Do Your Own Research). Farming airdrops comes with a set of risks, so make sure your knowledge about online security is up to date.</p>
                    <p className='pt-4'>At MonieQuest we vet the projects with all the public available information, to make sure all our published crypto airdrops display the correct details.</p>
                  </div>
                  <div className='flex justify-between gap-4'>
                    {prevAirdrop !== null && <div
                      onClick={() => { navigate(`/airdrops/${prevAirdrop?.category}/${prevAirdrop?.id}/${prevAirdrop?.slug}`); MoveToTop() }}
                      className='flex cursor-pointer gap-2 items-center text-gray-300'>
                      <button
                        disabled={!prevAirdrop}
                        className='w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:text-lightgreen hover:border-lightgreen'
                      >
                        <IoIosArrowBack />
                      </button>
                      <div className='text-sm capitalize '>previous airdrop</div>
                    </div>}
                    {nextAirdrop !== null && <div
                      onClick={() => { navigate(`/airdrops/${nextAirdrop?.category}/${nextAirdrop?.id}/${nextAirdrop?.slug}`); MoveToTop() }}
                      className='flex gap-2 cursor-pointer items-center text-gray-300 ml-auto'>
                      <button
                        disabled={!nextAirdrop}
                        className='w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:text-lightgreen hover:border-lightgreen'
                      >
                        <IoIosArrowForward />
                      </button>
                      <div className='text-sm capitalize'>next airdrop</div>
                    </div>}
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </PageLayout>
  )
}

export default SingleAirdropPage