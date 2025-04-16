import './App.css'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function App(): React.ReactElement {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])


  return (
    <>
      <div>
      <Outlet />
      </div>
    </>
  )
}

export default App
