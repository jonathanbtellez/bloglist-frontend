import React, { useEffect, useState } from "react";
import LoginServices from "../services/login";
import { useNotifyDispatch } from "../context/NotificationContext";
import blogService from "../services/blogs";
import { useUserDispatch } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const canSubmitForm = username === "" || password === "";

  const notifyDispatch = useNotifyDispatch();
  const userDispatch = useUserDispatch();

  const verifyUserSession = async () => {
    const user = JSON.parse(window.localStorage.getItem("loggedBlogAppUser"));
    if (!user) return;
    blogService.setToken(user.token);
    userDispatch({
      type: "SET",
      payload: { ...user },
    });
    notifyDispatch({
      type: "SET",
      payload: {
        type: "success",
        text: `Welcome ${user.name}`,
      },
    });
    setTimeout(() => {
      notifyDispatch({
        type: "CLEAR",
      });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await LoginServices.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      userDispatch({
        type: "SET",
        payload: { ...user },
      });
      notifyDispatch({
        type: "SET",
        payload: {
          type: "success",
          text: `Welcome ${user.name}`,
        },
      });
      setTimeout(() => {
        notifyDispatch({
          type: "CLEAR",
        });
      }, 5000);
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(e);
      notifyDispatch({
        type: "SET",
        payload: {
          type: "success",
          text: error.response,
        },
      });
      setTimeout(() => {
        notifyDispatch({
          type: "CLEAR",
        });
      }, 5000);
    }
  };

  useEffect(() => {
    verifyUserSession();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="text"
          id="password"
          placeholder="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="input"
        />
      </div>
      <button
        type="submit"
        className="button-info"
        disabled={canSubmitForm}
        id="login"
      >
        Log in
      </button>
    </form>
  );
};

export default Login;
