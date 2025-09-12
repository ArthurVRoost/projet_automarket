import Footer from '@/Components/Footer'
import Nav from '@/Components/Nav'
import React from 'react'

export default function Home({auth, user}) {
  return (
    <div>
      <Nav auth={auth} user={user}/>
      <div className='divHome'>
        <h1>page home</h1>
      </div>
      
      <Footer/>
    </div>
  )
}
