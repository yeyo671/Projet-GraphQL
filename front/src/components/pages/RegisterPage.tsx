import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ConnectionDocument } from "../../gql/graphql";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connect, { loading, error }] = useMutation(ConnectionDocument);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await connect({ variables: { username, password } });
      console.log(data);
      if (data && data.connection && data.connection.token) {
        localStorage.setItem("token", data.connection.token);
        localStorage.setItem("username", username);

        // Redirect to the home page

        navigate("/d");
      }
    } catch (err) {
      // handle error
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}
    </div>
  );
};

export default RegisterPage;
