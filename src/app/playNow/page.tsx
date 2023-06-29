"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Heart,
  Brain,
  Barbell,
  BatteryFull,
  HandFist,
  Wind,
} from "phosphor-react";
import styles from "../page.module.css";
import PlayHead from "../playHead/page";
import { useUser } from "@clerk/clerk-react";
import Nav from "../navbar/page";


export default function PlayGame() {
  const [userScore, setUserScore] = useState(0)
  const [responseText, setResponseText] = useState("");
  const [firstHero, setFirstHero] = useState<any>([]);
  const [userChoice, setUserChoice] = useState<any>("");
  const [secondHero, setSecondHero] = useState<any>(null);
  const { isSignedIn, user } = useUser();


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

  const email = user?.primaryEmailAddress?.emailAddress;

  const fetchUserScore = async () => {
    try {
      const response = await fetch("/api/currentUser", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await response.json()
      console.log(user.score)
      if(response.ok){
        setUserScore(user.score)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUserScore()
  })

  const increaseUserScore = async () => {
    const score = userScore + 1;
    const email = user?.primaryEmailAddress?.emailAddress;

    try {
      const response = await fetch("/api/saveScore", {
        method: "POST",
        body: JSON.stringify({ email, score }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Score saved successfully");
      } else {
        console.error("Failed to save score");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  }

  const resetUserScore = async () => {
    const score = 0;
    const email = user?.primaryEmailAddress?.emailAddress;

    try {
      const response = await fetch("/api/saveScore", {
        method: "POST",
        body: JSON.stringify({ email, score }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Score saved successfully");
      } else {
        console.error("Failed to save score");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
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

    const prompt = `Without any explanation, who would win between ${userChoice} vs. ${secondHero?.name}? Then give a one sentence explanation of how this character would win. Please return the data as an object with a format like {"winner": "character", "reason":"reason"}`;

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

    const parsedRes = JSON.parse(responseText)
    console.log(parsedRes)

    // console.log(data.response[1])
    setResponseText(`Winner: ${parsedRes.winner}, ${parsedRes.reason}`);

    if(parsedRes.winner === userChoice){
      increaseUserScore()
    } else {
      resetUserScore()
    }
    fetchUserScore()
  };

  const nextButton = () => {
    setFirstHero([]);
    setUserChoice("");
    setSecondHero(null);
    setResponseText("");
  }

  const navigation = [
    { name: 'Leaderboard', href: '/getPrisma' },
  ]

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
      <PlayHead/>

      <div className="mt-20">
        <div className="flex justify-center">
        <p className="text-xl font-bold">{user?.firstName}'s score: {userScore}</p>
        </div>
        <div className={styles.firstAction}>
          {!secondHero && (
            <button onClick={(e) => handleSecondHero(e)}>Reveal your opponent</button>
          )}
          {userChoice && secondHero && !responseText && (
            <>
              <div className={styles.whoWins}>
                <button onClick={(e) => handleClick(e)}>
                  Who would win between <span>{userChoice}</span> vs.{" "}
                  <span>{secondHero?.name}</span>?
                </button>
              </div>
            </>
          )}
          {responseText && (
            <>
            <button onClick={() => nextButton()}>Next</button>
            <div className={styles.responseContainer}>
              <h4>{responseText}</h4>
            </div>
            </>
          )}

        {firstHero.length === 0 && (
          <button onClick={(e) => handleFirstHero(e)}>Populate your characters</button>
          )}
        {firstHero.length > 0 && !userChoice && (
          <>
            <h2>Choose your character!<span> You only get one shot at this!</span></h2>
            
          </>
        )}
        
        </div>
        
        <div className="flex flex-row">  
        {secondHero && (
          <div className={styles.characterCard}>
            <div className={styles.cardHeader}>
              <h3>{secondHero?.name}</h3>
              <span>{secondHero?.biography["full-name"]}</span>
            </div>
            <br />
            <img
              className={styles.heroPic}
              src={secondHero?.image.url}
              alt={secondHero?.name}
            />
            {secondHero.powerstats.intelligence !== "null" ? (
              <>
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
              </>
            ) : (
              <>
                <p>Powerstats not available</p>
              </>
            )}
          </div>
        )}
                {firstHero &&
          firstHero.map((hero: Hero) => (
            <div key={hero?.id} className={styles.characterCard}>
              <div className={styles.cardHeader}>
                <h3>{hero?.name}</h3>
                <span>{hero?.biography["full-name"]}</span>
              </div>
              <br />
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
                  <p className="text-center py-11 font-medium">Powerstats not available</p>
                </>
              )}
              {!userChoice && (
                <div className="flex justify-center">
                <button
                  className="userPick"
                  onClick={() => setUserChoice(hero?.name)}
                >
                  Choose: {hero?.name}
                </button>
                </div>
              )}
            </div>
          ))}
      </div>
        </div>


    </>
  );
}
