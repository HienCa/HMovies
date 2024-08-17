import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from '../components/Card'

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)
  console.log({ params })
  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`,
        {
          params: {
            page: pageNo
          }
        }
      )
      setData(pre => [...pre, ...response.data.results])
      setTotalPageNo(response.data.total_pages)
    } catch (error) {

    }
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo(pre => pre + 1)
    }
  }

  return (
    <div className='py-16'>
      <div className='container max-w-screen-lg mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Popular {params.explore} show
        </h3>
        <div className='grid grid-cols-[repeat(auto-fit, 230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((item, index) => { 
              return (
                <Card
                  key={index}
                  data={item}
                  media_type={params.explore}
                />
              )
            })
          }
        </div>
      </div>

    </div>
  )
}

export default ExplorePage