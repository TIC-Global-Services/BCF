import ComingSoon from '@/components/Product/ComingSoon'
import Products from '@/components/Product/Products'
import Project from '@/components/Product/Project'
import React from 'react'

const page = () => {
  return (
    <div>
      <Products />
      <ComingSoon />
      <Project />
    </div>
  )
}

export default page