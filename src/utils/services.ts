export default {
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
    
}