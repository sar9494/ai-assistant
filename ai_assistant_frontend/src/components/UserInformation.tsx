import React from 'react';
import { useUser } from '@/lib/userProvider';

const UserInformation = () => {
  const { user, loading, error } = useUser();
  console.log(user)
   console.log(error, "error")

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data!</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div>
      <p>Email: {user.email}</p>
      <h2>Messages</h2>
      <ul>
        {user.messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};
export default UserInformation;
