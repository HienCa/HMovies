import React, { useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const BannerHome = () => {
    const bannerData = useSelector(state => state.movieData.bannerData)
    const imageURL = useSelector(state => state.movieData.imageURL)
    const [currentImage, setCurrentImage] = useState(0)

    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(pre => pre + 1)
        }
    }

    const handlePrevious = () => {
        if (currentImage > 0) {
            setCurrentImage(pre => pre - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentImage < bannerData.length - 1) {
                handleNext()
            } else {
                setCurrentImage(0)
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [bannerData, imageURL, currentImage])

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
                {
                    bannerData.map((banner, index) => {
                        return (
                            <div key={index}
                                className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all'
                                style={{ transform: `translateX(-${currentImage * 100}%)` }}
                            >
                                <div className='w-full h-full'>
                                    <img
                                        src={`${imageURL}/${banner.backdrop_path}`} alt="banner"
                                        className='h-full object-cover'
                                    />
                                </div>

                                {/* button next and previous image */}

                                <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:flex'>
                                    <button
                                        onClick={handlePrevious}
                                        className='bg-white z-10 p-1 rounded-full text-xl text-black'
                                    >
                                        <FaAngleLeft />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className='bg-white z-10 p-1 rounded-full text-xl text-black'
                                    >
                                        <FaAngleRight />
                                    </button>
                                </div>

                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                                <div className='container mx-auto '>
                                    <div className='w-full absolute bottom-0 max-w-md px-3'>
                                        <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{banner?.title || banner?.name}</h2>
                                        <p className='text-ellipsis line-clamp-3 my-2'>{banner.overview}</p>
                                        <div className='flex items-center gap-4'>
                                            <p>Rating: {Number(banner.vote_average).toFixed(1)}+</p>
                                            <span> | </span>
                                            <p>View: {Number(banner.popularity).toFixed(0)}+</p>
                                        </div>
                                        <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                            Play now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default BannerHome