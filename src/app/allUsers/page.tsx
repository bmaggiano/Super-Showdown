"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Nav from "../navbar/page";
import LeaderboardHead from "../leaderboardHead/page";

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

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

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

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("/api/currentUser", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await response.json();
      if (response.ok) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/deleteAccount", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Account successfully deleted");
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div>
      <Nav />
      <LeaderboardHead/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.image}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="absolute" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="truncate text-sm text-gray-500">
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
  );
};

export default UsersPage;
