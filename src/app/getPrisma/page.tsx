"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

interface User {
  id: number;
  name: string;
  email: string;
  primaryEmailAddress?: {
    emailAddress: string;
  };
  score?: number;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newScore, setNewScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const allUsers = await response.json();
        setUsers(allUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving users:", error);
      }
    };
    fetchUsers();
  });

  const handleSaveName = async () => {
    const name = user?.fullName;
    const email = user?.primaryEmailAddress?.emailAddress;
    const score = 0;

    try {
      const response = await fetch("/api/saveName", {
        method: "POST",
        body: JSON.stringify({ name, email, score }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Name saved successfully");
      } else {
        console.error("Failed to save name");
      }
    } catch (error) {
      console.error("Error saving name:", error);
    }
  };

  const handleSaveScore = async () => {
    const score = newScore;
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
  };

  // Check if user's email matches any email in the existing user list
  const isUserInDatabase = users.some(
    (existingUser) => existingUser.email === user?.primaryEmailAddress?.emailAddress
  );

  return (
    <div>
      <h1>Users Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Score: {user.score}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setNewScore(newScore + 1)}>Increase Score</button>
      <br />
      {newScore}
      <br />
      {isSignedIn && !isUserInDatabase && (
        <button onClick={handleSaveName}>Save Name</button>
      )}
      {isSignedIn && (
        <button onClick={handleSaveScore}>Save Score</button>
      )}
    </div>
  );
};

export default UsersPage;
