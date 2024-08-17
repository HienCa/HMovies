import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails'
import { useSelector } from 'react-redux'
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';
import VideoPlay from '../components/VideoPlay';
const DetailsPage = () => {
  const params = useParams()
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const imageURL = useSelector(state => state.movieData.imageURL)
  const duration = (data?.runtime / 60).toFixed(1).split('.')
  const writer = castData?.crew?.filter(item => item?.job === 'Writer').map(item => item.name).join(', ')
  const director = castData?.crew?.filter(item => item?.job === 'Director').map(item => item.name).join(', ')
  const [playVideo, setPlayVideo] = React.useState(false)
  const [playVideoId, setPlayVideoId] = React.useState()

  const handlePlayVideo = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img
            src={imageURL + data?.backdrop_path}
            className='w-full h-full object-cover'
          />
        </div>
        <div className='absolute bg-gradient-to-b from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:px-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto lg:-mt-28 lg:ml-0 lg:mx-0 w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            className='w-60 h-80 object-cover rounded'
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className='mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-r from-red-500 to-orange-500'
          >
            Play Now
          </button>
        </div>

        <div >
          <h2 className='text-2xl lg:text-3xl font-bold text-white'>
            {data?.title || data?.name}
          </h2>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center my-1 gap-3'>
            <p>Rating: {Number(data?.vote_average).toFixed(1)}</p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            {/* <p>Duration: {duration[0]}h {duration[1]}m</p> */}
          </div>

          <Divider />

          <div className='flex items-center gap-3 my-3 text-center'>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />

            <div>
              <p>
                Status: {data?.status}
              </p>
              <span>|</span>
              <p>
                Release Date: {moment(data?.release_date).format('MMMM Do YYYY')}
              </p>
              <span>|</span>
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>

            <Divider />

          </div>

          <div>
            <p><span className='text-white'>Director</span>: {director}</p>

            <Divider />

            <p><span>Writer: {writer}</span></p>
          </div>

          <h2 className='font-bold text-lg'>Cast: </h2>

          <div className='grid grid-cols-[repeat(auto-fit, 96px)] gap-3'>
            {
              castData?.cast?.filter(item => item?.profile_path).map((item, index) => {
                return (
                  <div
                    key={index}
                    className='my-3'
                  >
                    <div>
                      <img
                        src={imageURL + item?.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                      />
                    </div>

                    <p className='font-bold text-center text-sm text-neutral-400'>{item?.name}</p>

                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <div className='container mx-auto px-3'>
        <h2 className='text-lg lg:text-2xl font-bold my-3'>Star Cast</h2>
      </div>
      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />

        <HorizontalScrollCard
          data={recommendationData}
          heading={"Recommendation " + params?.explore}
          media_type={params?.explore}
        />
        {
          playVideo && (
            <VideoPlay
              data={playVideoId}
              close={() => setPlayVideo(false)}
              media_type={params?.explore}
            />
          )
        }
      </div>
    </div>
  )
}

export default DetailsPage