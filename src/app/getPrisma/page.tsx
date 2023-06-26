"use client"
import { useEffect, useState } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const allUsers = await response.json();
        setUsers(allUsers);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error retrieving users:', error);
      }
    };

    fetchUsers();
  }, []);

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
    </div>
  );
};

export default UsersPage;
