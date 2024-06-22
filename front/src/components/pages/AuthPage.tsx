import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ConnectionDocument, RegistrationDocument } from "../../gql/graphql";
import { useNavigate } from "react-router-dom";
import UniversalErrorAlert from "../UniversalErrorAlert";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connect, { loading: loadingLogin, error: errorLogin }] =
    useMutation(ConnectionDocument);
  const [register, { loading: loadingRegister, error: errorRegister }] =
    useMutation(RegistrationDocument);
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
        localStorage.setItem("username", username);
        navigate("/");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error: ", err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { username, password } });
      if (data && data.registration && data.registration.success) {
        alert("Registration successful. Please log in.");
        setIsLogin(true);
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error: ", err);
    }
  };

  return (
    <div className="bg-base-200 min-h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-primary font-semibold select-none text-xl">
        thefacebook
      </h1>
      <div className="flex flex-col bg-base-100 rounded-btn p-4">
        <form
          className="flex flex-col gap-3"
          onSubmit={isLogin ? handleLogin : handleRegister}
        >
          <label className="form-control">
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered"
            />
          </label>
          <label className="form-control">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLogin ? loadingLogin : loadingRegister}
          >
            {isLogin ? "Se Connecter" : "S'enregistrer"}
          </button>
        </form>
        {isLogin
          ? loadingLogin && <p>Loading...</p>
          : loadingRegister && <p>Loading...</p>}
        {isLogin
          ? errorLogin && <UniversalErrorAlert error={errorLogin} />
          : errorRegister && <UniversalErrorAlert error={errorRegister} />}
        <button onClick={() => setIsLogin(!isLogin)}>
          <span className="text-primary">
            {isLogin
              ? "Vous n'avez pas de compte ? Enregistrez-vous."
              : "Vous avez déjà un compte ? Connectez-vous."}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
