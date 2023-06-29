"use client"

import React from 'react'
import LandingPage from './landingPage/page'
import LandingPageHero from './howToPlay/page'
import Footer from './footer/page'

export default function Home() {
  return (
    <>
      <LandingPage/>
      <LandingPageHero/>
      <Footer/>
    </>
  )
}
