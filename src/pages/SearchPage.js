import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import notFound from '../assets/not_found.png'
import { useNavigate } from 'react-router-dom'
const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const query = location?.search?.slice(3)

  useEffect(() => {
    if (query) {
      setData([])
      setPage(1)
      fetchData()
    }

  }, [location?.search])

  useEffect(() => {
    if (query) {
      fetchData()
    }
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage(pre => pre + 1)
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`search/multi`,
        {
          params: {
            query: location.search.slice(3),
            page: page
          }
        }
      )
      setData(pre => [...pre, ...response.data.results])
    } catch (error) {

    }
  }

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          value={query?.split('%20')?.join(' ')}
          type='text'
          placeholder='Search here'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
        />
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Search Results
        </h3>
        {
          data.length > 0 ?
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center lg:justify-start'>
              {
                data.map((item, index) => {
                  return (
                    <Card
                      key={index}
                      data={item}
                      media_type={data.media_type}
                    />
                  )
                })
              }
            </div> :
            <div className='w-full h-full flex justify-center items-center'>
              <img
                className=' object-cover'
                src={notFound}
                alt={data.title}
              />
            </div>
        }
      </div>

    </div>
  )
}

export default SearchPage