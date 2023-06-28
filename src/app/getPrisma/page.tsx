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

  const people = [
{
name: 'Leslie Alexander',
email: 'leslie.alexander@example.com',
role: 'Co-Founder / CEO',
imageUrl:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
},
// More people...
]
  return (
    <div>



      <h1 className="text-center">Users Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" alt="" />
            </div>
            <div className="min-w-0 flex-1">
              <a href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="truncate text-sm text-gray-500">{user.score}</p>
              </a>
            </div>
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
