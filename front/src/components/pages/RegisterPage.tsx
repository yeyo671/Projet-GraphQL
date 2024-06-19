import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ConnectionDocument } from "../../gql/graphql";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connect, { loading, error }] = useMutation(ConnectionDocument);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await connect({ variables: { username, password } });
      console.log(data);
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
