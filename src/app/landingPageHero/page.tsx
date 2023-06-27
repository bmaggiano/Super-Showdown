/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
export default function Example() {
    return (
      <div className="bg-gray-300">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          {/* Details section */}
          <section aria-labelledby="details-heading">
            <div className="flex flex-col items-center text-center">
              <h2 id="details-heading" className="text-4xl font-bold tracking-wide text-gray-900 sm:text-4xl">
                How it works
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-600">
              Before you play any game, we think it's important that you understand how the game works! 
            </p>
            </div>
  
            <div className="mt-16 grid grid-cols- gap-y-16 lg:grid-cols-3 lg:gap-x-12">
              <div>
                <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                  <img
                    src="./opponent.png"
                    alt="Front zipper pouch with included key ring."
                    className="h-48 w-full object-cover object-center"
                  />
                </div>
                <p className="text-center mt-8 text-base text-gray-700">
                  You will be prompted to select an opponent to face off against. You have one shot at this and whoever is presented to you, you MUST battle.
                </p>
              </div>
              <div>
                <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                  <img
                    src="./choose.png"
                    alt="Drawstring top with elastic loop closure and textured interior padding."
                    className="h-48 w-full object-ontain object-center"
                  />
                </div>
                <p className="text-center mt-8 text-base text-gray-700">
                  You will then be prompted to select your character. Three random characters will be chosen from a database of over 600 heroes/villains, and you must choose the best option to face your opponent!
                </p>
              </div>
              <div>
                <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                  <img
                    src="./ai.jpg"
                    alt="Front zipper pouch with included key ring."
                    className="h-48 w-full object-cover object-center"
                  />
                </div>
                <p className="text-center mt-8 text-base text-gray-700">
                  With the power of AI, our system will make the most educated guess of who would win, and present you 5 points for every victory. But if you lose, your score will be recorded and ultimately reset to 0!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
  