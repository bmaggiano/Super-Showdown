"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Nav from "../../components/navbar";
import LeaderboardHead from "../../components/leaderboardHead";
import LoadingSpinner from "../../components/loadingSpinner";
import Footer from "../../components/footer";

// in typescript, this defines the shape/structure and types of data that we expect to recieve
interface User {
  id: number;
  name: string;
  email: string;
  primaryEmailAddress?: {
    emailAddress: string;
  };
  score?: number;
  image: string;
}

export default function UsersPage() {
  // Expects users array to be initally empty, but will eventually conform to our User interface
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  // Will initiate fetchUsers function on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // function to get all prisma users
  const fetchUsers = async () => {
    try {
      // Will attempt to make fetch call to /api/userRoutes/users
      const response = await fetch("/api/userRoutes/users");
      const allUsers = await response.json();
      // will set users array to data from api call to prisma
      setUsers(allUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving users:", error);
    }
  };

  // function to delete account
  const handleDeleteAccount = async () => {
    try {
      // Will attempt to make fetch call to /api/userRoutes/deleteAccount
      const response = await fetch("/api/userRoutes/deleteAccount", {
        method: "POST",
        // send the email object to our controller
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Account successfully deleted");
        // Will update the users array to remove the current signed in user
        setUsers(users.filter((user) => user.email !== email));
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <Nav />
      <LeaderboardHead />
      <div className="mx-auto max-w-7xl">
        {/* If data is loading, tell user with loading Spinner */}
        {loading ? (
          <div className="flex justify-center mt-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Map through users in our prisma db */}
            {users.map((user) => (
              <div
                key={user.id}
                className="relative md:flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.image}
                    alt={user.name}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Score: {user.score}
                  </p>
                </div>
                {isSignedIn && user.email === email && (
                  <div>
                    <button
                      onClick={() => handleDeleteAccount()}
                      className="p-1 rounded-lg border border-black bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
