import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ConnectionDocument } from "../../gql/graphql";
import { useNavigate } from "react-router-dom";
import UniversalErrorAlert from "../UniversalErrorAlert";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connect, { loading, error }] = useMutation(ConnectionDocument);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Both username and password are required.");
      return;
    }

    try {
      const { data } = await connect({ variables: { username, password } });
      if (data && data.connection && data.connection.token) {
        localStorage.setItem("token", data.connection.token);
        navigate("/dashboard");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error: ", err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <UniversalErrorAlert message={error.message} />}
    </div>
  );
};

export default LoginPage;
