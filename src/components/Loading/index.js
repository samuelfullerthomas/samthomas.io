import React from 'react'
import ReactLoading from 'react-loading'

import './Loading.css'

const sizes = {
  small: 75,
  medium: 150,
  large: 300
}

export default function Loading ({ size }) {
  return (
    <div className='Loading'>
      <ReactLoading type='spin' color='blue' height={sizes[size]} width={sizes[size]} />
    </div>
  )
}
