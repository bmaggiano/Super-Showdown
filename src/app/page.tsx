"use client"

import React from 'react'
import LandingPage from '../components/landingPage'
import LandingPageHero from '../components/howToPlay'
import Footer from '../components/footer'

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
