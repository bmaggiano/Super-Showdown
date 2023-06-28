"use client"
import { useState } from 'react'
import Nav from '../navbar/page'
import Head from 'next/head'




export default function LandingPage() {

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
    <Nav/>


      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-62 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Click here to check out some of my other projects{' '}
                    <a href="https://github.com/bmaggiano" target="_blank" className="whitespace-nowrap font-semibold text-slate-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      GitHub <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="text-5xl font-bold tracking-wide text-gray-900 sm:text-6xl">
                  Super Showdown
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  A card battle game that relies on AI, instinct, and individual intuition to beat your opponent
                  and claim the number one spot on the leaderboard!
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="/playNow"
                    className="rounded-md bg-slate-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Play Now
                  </a>
                  <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="aspect-[3/2] lg:aspect-auto lg:h-full lg:w-full"
            src="./vs.jpg"
            alt=""
          />
        </div>
      </div>
            </>
  )
}
