import HomePage from '@/components/About/Hero'
import Infrastructure from '@/components/About/Infrastructure'
import ScrollContent from '@/components/About/ScrollContent'
import TeamCarousel from '@/components/About/TeamCarousel'
import Appointment from '@/components/Reusable/Appointment'
import React from 'react'

const page = () => {
  return (
  <div>
    <HomePage/>
    <TeamCarousel/>
    <ScrollContent/>
    <Infrastructure />
    <Appointment />
  </div>

  )
}

export default page