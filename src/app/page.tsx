"use client";

import React, { useState } from 'react';
import styles from './page.module.css'

export default function Home() {

const [responseText, setResponseText] = useState("")
const [firstHero, setFirstHero] = useState<any>([])
const [userChoice, setUserChoice] = useState<any>("")
const [secondHero, setSecondHero] = useState<any>(null)

// define the type of data that gets brought in to prevent future errors
interface Hero {
  id: number;
  name: string;
  image: {
    url: string;
  };
}

const handleFirstHero = async (e: any) => {
  e.preventDefault();

  const response = await fetch("/api/threeCharacters", {
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

  const response = await fetch("/api/oponent", {
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

  const prompt = `Who would win between ${userChoice} vs. ${secondHero?.name}? Please give this response using a max number of 150 tokens.`;

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

      {firstHero && firstHero.map((hero: Hero) => (
        <div key={hero?.id}>
          <div className={styles.characterCard}>

          <div className={styles.characterPic}>
            <img className={styles.heroPic} src={hero?.image.url} alt={hero?.name} />
            </div>

<div className={styles.characterData}>
          <p>
            {hero?.name}
            </p>
            <button
            onClick={() => setUserChoice(hero?.name)}>Choose {hero?.name}</button>
            </div>
            </div>
          </div>
        ))}


      </div>
      </div>

    <div>
      <button
      onClick={(e) => handleSecondHero(e)}
      >Superhero 2</button>
      {secondHero && (

        <div className={styles.characterCard}>
        <div className={styles.characterPic}>
          <img className={styles.heroPic} src={secondHero?.image.url} alt={secondHero?.name} />
        </div>
        <div className={styles.characterData}>

        <p>
          {secondHero?.name}
          </p>
        </div>
      </div>
        )}
      </div>


        </section>


{userChoice && secondHero && (
    <section className={styles.whoWins}>
      <div>
      <button
      onClick={(e) => handleClick(e)}>
        Who would win between {userChoice} vs. {secondHero?.name}?
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
