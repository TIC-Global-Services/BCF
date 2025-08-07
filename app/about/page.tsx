'use client'
import HomePage from '@/components/About/Hero'
import Infrastructure from '@/components/About/Infrastructure'
import ScrollContent from '@/components/About/ScrollContent'
import StatsCardsComponent from '@/components/About/StatsCard/StatsCard'
import TeamCarousel from '@/components/About/TeamCarousel'
import Appointment from '@/components/Reusable/Appointment'
import React from 'react'

const page = () => {
  return (
  <div>
    <HomePage/>
    <TeamCarousel/>
    <StatsCardsComponent/>
    <ScrollContent/>
    <Infrastructure />
    <Appointment />
  </div>

  )
}

export default page