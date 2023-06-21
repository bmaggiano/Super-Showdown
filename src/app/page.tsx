"use client";

import React, { useState } from "react";
import Head from "next/head";
import {
  Heart,
  Brain,
  Barbell,
  BatteryFull,
  HandFist,
  Wind,
} from "phosphor-react";
import styles from "./page.module.css";
import User from "./userButton/page";

export default function Home() {
  const [responseText, setResponseText] = useState("");
  const [firstHero, setFirstHero] = useState<any>([]);
  const [userChoice, setUserChoice] = useState<any>("");
  const [secondHero, setSecondHero] = useState<any>(null);

  // define the type of data that gets brought in to prevent future errors
  interface Hero {
    id: number;
    name: string;
    image: {
      url: string;
    };
    powerstats: {
      intelligence: string;
      strength: string;
      speed: string;
      durability: string;
      power: string;
      combat: string;
    };
    biography: {
      "full-name": string;
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
      setFirstHero(data);
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
      setSecondHero(data);
    } else {
      console.log("Error occurred:", response.status);
    }
    console.log(secondHero);
  };

  const handleClick = async (e: any) => {
    e.preventDefault();

    const prompt = `Without any explanation, who would win between ${userChoice} vs. ${secondHero?.name}? Then give a one sentence explanation of how this character would win.`;

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

    setResponseText(responseText);
  };

  return (
    <>

    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Comic+Neue:ital,wght@0,400;1,400;1,700&display=swap"
          rel="stylesheet"
        />
    </Head>

<User/>
{/* <CurrentUserInfo/> */}

      <main className={styles.main}>
        <h1>
          Super <span>Showdown</span>
        </h1>
        <br />
      </main>

      <div className={styles.firstAction}>
        {firstHero.length === 0 && (
          <button onClick={(e) => handleFirstHero(e)}>Superhero 1</button>
        )}
        {firstHero.length > 0 && (<>
        <h2>Choose your character!</h2>
        <span>you only get one shot at this!</span>
        </>
        )
      }
      </div>
      <section className={styles.randomSelector}>
        {firstHero &&
          firstHero.map((hero: Hero) => (
            <div
              key={hero?.id}
              className={styles.characterCard}
            >
              <div className={styles.cardHeader}>
                <h3>{hero?.name}</h3>
                <span>{hero?.biography["full-name"]}</span>
                </div>
                <br/>
                <img
              className={styles.heroPic}
              src={hero?.image.url}
              alt={hero?.name}
            />
                {hero.powerstats.intelligence !== "null" ? (
                  <>
              <div className={styles.characterData}>
                    <div className={styles.powerStats}>
                      <div className={styles.powerStatsGroup}>
                        <p>
                          <span className={styles.icon}>
                            <Brain color="pink" weight="duotone" size={20} />
                          </span>
                          : {hero?.powerstats?.intelligence}
                        </p>
                        <p>
                          <span className={styles.icon}>
                            <Barbell color="white" weight="duotone" size={20} />
                          </span>
                          : {hero?.powerstats?.strength}
                        </p>
                        <p>
                          <span className={styles.icon}>
                            <Wind color="yellow" weight="fill" size={20} />
                          </span>
                          : {hero?.powerstats?.speed}
                        </p>
                      </div>
                      <div className={styles.powerStatsGroup}>
                        <p>
                          <span className={styles.icon}>
                            <BatteryFull
                              color="green"
                              weight="duotone"
                              size={20}
                            />
                          </span>
                          : {hero?.powerstats.power}
                        </p>
                        <p>
                          <span className={styles.icon}>
                            <Heart color="#AE2983" weight="fill" size={20} />
                          </span>
                          : {hero?.powerstats?.durability}
                        </p>
                        <p>
                          <span className={styles.icon}>
                            <HandFist color="white" weight="fill" size={20} />
                          </span>
                          : {hero?.powerstats?.combat}
                        </p>
                      </div>
                    </div>
              </div>
                  </>
                ) : (
                  <>
                    <p>Powerstats not available</p>
                  </>
                )}
                {!userChoice && 
                <button className="userPick" onClick={() => setUserChoice(hero?.name)}>
                  Choose: {hero?.name}
                </button>
                }
            </div>
          ))}
      </section>

      <div>
        <div className={styles.firstAction}>
          {!secondHero && 
        <button onClick={(e) => handleSecondHero(e)}>Superhero 2</button>
          }
                {userChoice && secondHero && (
        <>
          <div className={styles.whoWins}>
            <button onClick={(e) => handleClick(e)}>
              Who would win between <span>{userChoice}</span> vs. <span>{secondHero?.name}</span>?
            </button>
          </div>
            {responseText && 
          <div className={styles.responseContainer}>
            <h4>{responseText}</h4>
          </div>
            }
        </>
      )}
        </div>
        {secondHero && (
          <div className={styles.characterCard}>
            <div className={styles.cardHeader}>
            <h3>{secondHero?.name}</h3>
            <span>{secondHero?.biography["full-name"]}</span>
            </div>
            <br/>
            <img
              className={styles.heroPic}
              src={secondHero?.image.url}
              alt={secondHero?.name}
            />
            <div className={styles.characterData}>
              <div className={styles.powerStats}>
                      <div className={styles.powerStatsGroup}>
                        <p>
                          <span className={styles.icon}>
                            <Brain color="pink" weight="duotone" size={20} />
                          </span>
                          : {secondHero?.powerstats?.intelligence}
                        </p>
                        <p>
                          {" "}
                          <span className={styles.icon}>
                            <Barbell color="white" weight="duotone" size={20} />
                          </span>
                          : {secondHero?.powerstats?.strength}
                        </p>
                        <p>
                          <span className={styles.icon}>
                            <Wind color="yellow" weight="fill" size={20} />
                          </span>
                          : {secondHero?.powerstats?.speed}
                        </p>
                      </div>
                      <div className={styles.powerStatsGroup}>
                        <p>
                          <span className={styles.icon}>
                            <BatteryFull
                              color="green"
                              weight="duotone"
                              size={20}
                            />
                          </span>
                          : {secondHero?.powerstats.power}
                        </p>
                        <p>
                          <span className={styles.icon}>
                            <Heart color="#AE2983" weight="fill" size={20} />
                          </span>
                          : {secondHero?.powerstats?.durability}
                        </p>
                        <p>
                          <span className={styles.icon}>
                            <HandFist color="white" weight="fill" size={20} />
                          </span>
                          : {secondHero?.powerstats?.combat}
                        </p>
                      </div>
                    </div>
            </div>
          </div>
        )}

      </div>

    </>
  );
}
