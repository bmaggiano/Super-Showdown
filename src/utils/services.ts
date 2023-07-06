const serviceFunctions = {
    getUserScore: async function (email: string) {
        const response = await fetch("/api/userRoutes/currentUser", {
            method: "POST",
            // pass email as the argument
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const user = await response.json()
          return user;
    },
    getUserOptions: async function () {
          const response = await fetch("/api/superheroRoutes/threeCharacters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    return data;
    },
    getOpponent: async function () {
      const response = await fetch("/api/superheroRoutes/oponent", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json()
      return data;
    },
    getAiResponse: async function (prompt: string) {
      const response = await fetch("/api/chatGPTRoutes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json();
      return data;
    },
    getUpdateUserScore: async function (score: number, email: string) {
      const response = await fetch("/api/userRoutes/saveScore", {
        method: "POST",
        body: JSON.stringify({ email, score }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json()
      return data;
    }
}

export default serviceFunctions