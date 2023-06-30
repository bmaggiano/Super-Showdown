"use client";

import React, { useEffect, useState } from "react";
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
import LoadingSpinner from "../loadingSpinner/page";


export default function PlayGame() {
  const [userScore, setUserScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [responseText, setResponseText] = useState("");
  const [userOptions, setUserOptions] = useState<any>([]);
  const [userChoice, setUserChoice] = useState<any>("");
  const [opponent, setOpponent] = useState<any>(null);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;


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

// This fetches the current users score
  const fetchUserScore = async () => {
    try {
      // make api call to currentUser
      const response = await fetch("/api/currentUser", {
        method: "POST",
        // pass email as the argument
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await response.json()
      if(response.ok){
        // sets the users score in state with users score in prisma db
        setUserScore(user.score)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // fetches user score on component mount
  useEffect(() => {
    fetchUserScore()
  })

  // function to increase the users score by one
  const increaseUserScore = async () => {
    const score = userScore + 1;
    const email = user?.primaryEmailAddress?.emailAddress;

    try {
      const response = await fetch("/api/saveScore", {
        method: "POST",
        // pass the email and score objects to the controller
        body: JSON.stringify({ email, score }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Increased saved score successfully");
      } else {
        console.error("Failed to increase score");
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  }

  // function to reset users score to 0
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

  // function to present user with 3 character cards to choose from
  const handleUserOptions = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/threeCharacters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // populates userOptions array with data containing 3 characters
      setUserOptions(data);
    } else {
      console.log("Error occurred:", response.status);
    }
  };

  // function to present the opponent you will be facing
  const handleOpponent = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/oponent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // set opponent state variable with data from api call
      setOpponent(data);
    } else {
      console.log("Error occurred:", response.status);
    }
  };

  // function to get AI response from OpenAi using their chat-gpt-3.5 model
  const handleOpenAiCall = async (e: any) => {
    e.preventDefault();
    setLoading(true)

    // This is the data that's getting passed to our controller, think of it as asking ChatGPT a question
    const prompt = `Without any explanation, who would win between ${userChoice} vs. ${opponent?.name}? Then give a one sentence explanation of how this character would win. Please return the data as an object with a format like {"winner": "character", "reason":"reason"}`;

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

    // Parse the response as JSON
    const data = await response.json(); 

    // Access the response value from the JSON object
    const responseText = data.response; 

    // Parse the data back into an object based on prompt to get the values we want
    const parsedRes = JSON.parse(responseText)

    setLoading(false)

    // Use parsed data to set response text as string interpolation
    setResponseText(`Winner: ${parsedRes.winner}, ${parsedRes.reason}`);

    // conditional logic to set result to win or lose based off our response object from chat-gpt
    if(parsedRes.winner === userChoice){
      increaseUserScore()
      setResult("win")
    } else {
      resetUserScore()
      setResult("lose")
    }
    // fetchuser score to reflect an increase or reset based off win/lose value
    fetchUserScore()
  };

  // This button resets all fields so game has continuous flow
  const nextButton = () => {
    setUserOptions([]);
    setUserChoice("");
    setOpponent(null);
    setResponseText("");
  }

  return (
    <>
      <Nav/>
      <PlayHead/>

      <div className="mt-20">
        <div className="flex justify-center">
          {/* This will present the users score */}
        <p className="text-xl font-bold font-mono">{user?.firstName}'s score: {userScore}</p>
        </div>

        <div className={styles.firstAction}>
          {/* if there is no opponent yet, present user button to reveal their opponent */}
          {!opponent && (
            <button className="font-mono drop-shadow-xl text-lg bg-black rounded-xl text-red-500 font-bold p-4 hover:uppercase hover:text-white" onClick={(e) => handleOpponent(e)}>Reveal your opponent</button>
          )}

          {/* if there is a chosen hero, opponent, no response text and no loading, present button of who wins */}
          {userChoice && opponent && !responseText && !loading && (
            <>
              <div className={styles.whoWins}>
                <button className="bg-black border border-gray-200 rounded-xl p-3 text-white" onClick={(e) => handleOpenAiCall(e)}>
                  Who would win between <span className="text-green-500">{userChoice}</span> vs.{" "}
                  <span className="text-red-500">{opponent?.name}</span>?
                </button>
              </div>
            </>
          )}

          {/* if there is loading occuring, present loading spinner */}
          {loading && (
            <div className="flex flex-col items-center justify-center">
              <p className="font-mono font-semibold">A massive battle is taking place!</p>
          <LoadingSpinner/>
            </div>
          )}

          {/* if there is response text, present win/lose buttons and response from openai/chatgpt */}
          {responseText && (
            <>
            <div className="flex-col text-center">
              {result === "win" ? (
                <div>
            <button className="font-mono font-bold border border-black rounded-xl cursor-pointer p-2 bg-green-500 text-white" onClick={() => nextButton()}>You win! Next</button>
              </div>
                ) : (
                  <div>
                  <button className="font-mono font-bold border border-black rounded-xl cursor-pointer p-2 bg-red-500 text-white" onClick={() => nextButton()}>You lose! Next</button>
                    </div>
                )}
            <div className={styles.responseContainer}>
              <h4>{responseText}</h4>
            </div>
            </div>
            </>
          )}

        {/* if there is an opponent, but no userOption present option to reveal user options */}
        {opponent && userOptions.length === 0 && (
          <button className="font-mono drop-shadow-xl text-lg bg-black rounded-xl text-green-500 font-bold p-4 hover:uppercase hover:text-white" onClick={(e) => handleUserOptions(e)}>Populate your characters</button>
          )}

        {/* if a user options are present, but user hasn't picked, tell user they get one shot */}
        {userOptions.length > 0 && !userChoice && (
          <>
            <h2 className="text-xl font-sans font-semibold">Choose your character!<span> You only get one shot at this!</span></h2>
          </>
        )}
        {/* end of div className styles.firstAction */}
        </div>
        
        {/* This  is the div that contains all the character cards*/}
        <div className="flex flex-row max-[700px]:flex-col">  

        {/* If an opponent is present, present their character card with vanilla css based design */}
        {opponent && (
          <div className={styles.characterCard}>
            <div className={styles.cardHeader}>
              <h3 className="text-red-500">{opponent?.name}</h3>
              <span>{opponent?.biography["full-name"]}</span>
            </div>
            <br />
            <img
              className={styles.heroPic}
              src={opponent?.image.url}
              alt={opponent?.name}
            />
            {opponent.powerstats.intelligence !== "null" ? (
              <>
                <div className={styles.characterData}>
                  <div className={styles.powerStats}>
                    <div className={styles.powerStatsGroup}>
                      <p>
                        <span className={styles.icon}>
                          <Brain color="pink" weight="duotone" size={20} />
                        </span>
                        : {opponent?.powerstats?.intelligence}
                      </p>
                      <p>
                        {" "}
                        <span className={styles.icon}>
                          <Barbell color="white" weight="duotone" size={20} />
                        </span>
                        : {opponent?.powerstats?.strength}
                      </p>
                      <p>
                        <span className={styles.icon}>
                          <Wind color="yellow" weight="fill" size={20} />
                        </span>
                        : {opponent?.powerstats?.speed}
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
                        : {opponent?.powerstats.power}
                      </p>
                      <p>
                        <span className={styles.icon}>
                          <Heart color="#AE2983" weight="fill" size={20} />
                        </span>
                        : {opponent?.powerstats?.durability}
                      </p>
                      <p>
                        <span className={styles.icon}>
                          <HandFist color="white" weight="fill" size={20} />
                        </span>
                        : {opponent?.powerstats?.combat}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // If they don't have power stats, say so
              <>
                <p className="text-center py-11 font-medium">Powerstats not available</p>
              </>
            )}
          </div>
        )}

        {/* if there are choices for the user, present those cards, but with a button for user to choose */}
                {userOptions &&
          userOptions.map((hero: Hero) => (
            <div key={hero?.id} className={styles.characterCard}>
              <div className={styles.cardHeader}>
                <h3 className="text-green-500">{hero?.name}</h3>
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
                // if powerstats aren't available, say that
                <>
                  <p className="text-center py-11 font-medium">Powerstats not available</p>
                </>
              )}

              {/* If there is no selected character by the user, present the option to choose */}
              {!userChoice && (
                <div className="flex justify-center">
                <button
                  className="userPick"
                  onClick={() => {
                    setUserChoice(hero?.name);
                    // For mobile users, since we're flex-col, scroll to top once user selects
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
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
