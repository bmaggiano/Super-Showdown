"use client";

import React, { useState } from 'react';
import styles from './page.module.css'

export default function Home() {

const [responseText, setResponseText] = useState("")
const [firstHero, setFirstHero] = useState<any>(null)
const [secondHero, setSecondHero] = useState<any>(null)

const handleFirstHero = async (e: any) => {
  e.preventDefault();

  const response = await fetch("/api/superhero", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    setFirstHero(data)

  } else {
    console.log("Error occurred:", response.status);
  }
};

const handleSecondHero = async (e: any) => {
  e.preventDefault();

  const response = await fetch("/api/superhero", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    setSecondHero(data)

  } else {
    console.log("Error occurred:", response.status);
  }
  console.log(secondHero)
};


const handleClick = async (e: any) => {
  e.preventDefault();

  const prompt = `Who would win between ${firstHero?.name} vs. ${secondHero?.name}?`;

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json(); // Parse the response as JSON

  const responseText = data.response; // Access the response value from the JSON object

  console.log(responseText);
  setResponseText(responseText);
};


  return (
    <>
    <main className={styles.main}>
      <h1>Super <span>Showdown</span></h1>
      <br/>
    </main>

    <section className={styles.randomSelector}>
      <div>
      <button
      onClick={(e) => handleFirstHero(e)}
      >Superhero 1</button>
      <div>
        <p>
          {firstHero?.name}
          </p>
      </div>
      </div>

    <div>
      <button
      onClick={(e) => handleSecondHero(e)}
      >Superhero 2</button>
      <div>
        <p>
          {secondHero?.name}
          </p>
      </div>
      </div>


        </section>


{firstHero && secondHero && (
    <section className={styles.whoWins}>
      <div>
      <button
      onClick={(e) => handleClick(e)}>
        Who would win between {firstHero?.name} vs. {secondHero?.name}?
      </button>
        </div>
        <div>
      <h6>{responseText}</h6>
        </div>
        </section>
        )}


        </>
  )
}
