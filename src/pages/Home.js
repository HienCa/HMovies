import React from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const trendingMovies = useSelector(state => state.movieData.bannerData)

  const { data: nowPLayingData } = useFetch('/movie/now_playing')
  const { data: topRatedData } = useFetch('/movie/top_rated')
  const { data: popularTvShowData } = useFetch('/tv/popular')
  const { data: onTheAirShowData } = useFetch('/tv/on_the_air')


  return (
    <div>
      <BannerHome />

      <HorizontalScrollCard
        data={trendingMovies}
        heading="Trending"
        trending={true}
      />

      <HorizontalScrollCard
        data={nowPLayingData}
        heading="Now Playing"
        trending={false}
        media_type={"movie"}
      />

      <HorizontalScrollCard
        data={topRatedData}
        heading="Top Rated Movies"
        trending={false}
        media_type={"movie"}
      />

      <HorizontalScrollCard
        data={popularTvShowData}
        heading="Popular TV Shows"
        trending={false}
        media_type={"tv"}
      />

      <HorizontalScrollCard
        data={onTheAirShowData}
        heading="On The Air"
        trending={false}
        media_type={"tv"}
      />

    </div>
  )
}

export default Home