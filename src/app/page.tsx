"use client"

import React from 'react'
import LandingPage from './landingPage/page'
import LandingPageHero from './landingPageHero/page'
import Footer from './footer/page'
import Head from 'next/head'

export default function Home() {
  return (
    <>
        <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
      />
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Comic+Neue:ital,wght@0,400;1,400;1,700&display=swap"
      rel="stylesheet"
      />
  </Head>
      <LandingPage/>
      <LandingPageHero/>
      <Footer/>
    </>
  )
}
