import React from 'react'
import Nav from '../components/Nav'
import { Outlet } from 'react-router'

const Root = () => {
  return (
    <div>
      <Nav />
      <div className='p-2 sm:px-20'>
        <Outlet />
      </div>
      {/* <h1>Footer</h1> */}
    </div>
  )
}

export default Root
