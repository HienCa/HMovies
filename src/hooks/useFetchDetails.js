import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const useFetchDetails = (endpoint) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(endpoint)
            setLoading(false)
            setData(response.data)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        fetchData()
    }, [endpoint])

    return { loading, data }
}

export default useFetchDetails