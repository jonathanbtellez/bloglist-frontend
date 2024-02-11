import React from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";

import userServices from "../services/users";
import { useUsersDispatch } from "../context/UsersContext";
import User from "./User";

const Users = () => {
  const usersDispatch = useUsersDispatch();

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
  
  usersDispatch({
    type: "SET",
    payload: users,
  });

  return (
    <div className="users-container">
      <h2>Users</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th className="table-head">Position</th>
            <th className="table-head">Name</th>
            <th className="table-head">Blogs</th>
            <th className="table-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <User key={user.id} user={user} position={index + 1} />
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
};

export default Users;
