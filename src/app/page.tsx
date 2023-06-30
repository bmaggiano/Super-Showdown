"use client"

import React from 'react'
import LandingPage from './landingPage/page'
import LandingPageHero from './howToPlay/page'
import Footer from './footer/page'

export default function Home() {
  return (
    <>
      <LandingPage/>

      {/* section id for scroll event when clicking on learn more */}
      <section id="howToPlay">
      <LandingPageHero/>
      </section>

      <Footer/>
    </>
  )
}
