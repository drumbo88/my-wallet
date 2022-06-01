import React from 'react'
import { useLocation } from 'react-router-dom'

function Error404() {
  const location = useLocation();
  return (
    <div>Error 404: {location.pathname}</div>
  )
}

export default Error404