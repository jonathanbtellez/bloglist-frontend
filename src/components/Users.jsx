import React from "react";
import { useQuery } from "react-query";

import userServices from "../services/users";
import User from "./User";

const Users = () => {
  const result = useQuery("users", userServices.getAll, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Anecdote service not available due problems in the server</div>;
  }

  const users = result.data;
  console.log(users);
  return (
    <div className="users-container">
      <h2>Users</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <User key={user.id} user={user} position={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
