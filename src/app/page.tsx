"use client";

import React, { useState } from 'react';
import styles from './page.module.css'

export default function Home() {

const [responseText, setResponseText] = useState("")

const handleClick = async (e: any) => {
  e.preventDefault();
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
  setResponseText((prev) => prev + responseText);
};


  return (
    <>
    <main className={styles.main}>
      <h1>Super <span>Showdown</span></h1>
      <br/>
    </main>

    <section className={styles.section}>
      <div>

      <button
      onClick={(e) => handleClick(e)}>
        I have a question about your product
      </button>
        </div>
        <div>
      <h6>{responseText}</h6>
        </div>
        </section>
        </>
  )
}
