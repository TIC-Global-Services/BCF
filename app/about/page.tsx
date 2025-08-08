'use client'
import HomePage from '@/Components/About/Hero'
import Infrastructure from '@/Components/About/Infrastructure'
import ScrollContent from '@/Components/About/ScrollContent'
import StatsCardsComponent from '@/Components/About/StatsCard/StatsCard'
import TeamCarousel from '@/Components/About/TeamCarousel'
import Appointment from '@/Components/Reusable/Appointment'
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