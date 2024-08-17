
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieSlice';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchConfiguration()
    fetchTrendingData()
  }, [])

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('trending/all/week')
      dispatch(setBannerData(response.data.results))
      console.log({ response })
    } catch (error) {
      console.log({ error })

    }
  }

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration')
      dispatch(setImageURL(response.data.images.base_url + "original"))
      console.log('configuration', response)
    } catch (error) {

    }
  }
  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh]'>
        <Outlet />
      </div>
      <Footer />

      <MobileNavigation />
    </main>
  );
}

export default App;
