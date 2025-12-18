import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from "./components/ScrollToTop";
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from './utils/api'

function App() {
  const [data, setData] = useState([])
  const [_, setActiveUser] = useState(localStorage.getItem("activeUser"))

  useEffect(() => {
    const fetchSeriesFromDB = async () => {
      try {
        const response = await API.get('/series')

        if (response.data.status === "Success") {
          setData(response.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch series from database:", error)
      }
    }

    fetchSeriesFromDB()
  }, [])

  return (
    <div className="App">
      <ScrollToTop />
      <Header setActiveUser={setActiveUser} />
      <Outlet context={{ data, setData, setActiveUser }} />
      <Footer />
    </div>
  )
}

export default App