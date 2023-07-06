"use client";

// Rules array of objects to be mapped through in the code

const rules = [
  {
    description:
      "You will be prompted to select an opponent to face off against. You have one shot at this and whoever is presented to you, you MUST battle.",
    image: "./opponent.jpg",
    alt: "heroes standing in front of a giant villain among ruins of a city",
  },
  {
    description:
      "You will then be prompted to select your character. Three random characters will be chosen from a database of over 600 heroes/villains, and you must choose the best option to face your opponent!",
    image: "./choose.png",
    alt: "three character cards with the option to choose a single one for battle",
  },
  {
    description:
      "With the power of AI, our system will make the most educated guess of who would win, and present you 1 point for every victory. But if you lose, your score will be reset to 0!",
    image: "./ai.jpg",
    alt: "OpenAI in the background and ChatGPT in the foreground",
  },
];

export default function LandingPageHero() {
  return (
    <div className="bg-gray-300">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        {/* Details section */}
        <section aria-labelledby="details-heading">
          <div className="flex flex-col items-center text-center">
            <h2
              id="details-heading"
              className="text-4xl font-bold tracking-wide text-gray-900 sm:text-4xl"
            >
              How it works
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-600">
              Before you play any game, we think it&apos;s important that you
              understand how the game works!
            </p>
          </div>

          {/* map through rules array */}
          <div className="mt-16 grid grid-cols- gap-y-16 lg:grid-cols-3 lg:gap-x-12">
            {rules.map((rule) => {
              return (
                <div key={rule.description}>
                  <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                    <img
                      src={rule.image}
                      alt={rule.alt}
                      className="h-48 w-full object-cover object-center"
                    />
                  </div>
                  <p className="text-center mt-8 text-base text-gray-700">
                    {rule.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
