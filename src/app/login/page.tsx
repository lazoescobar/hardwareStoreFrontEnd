"use client";

import {signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    console.log("OK")
    
    /*
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
    */
  
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
      <div className="col-md-12 padding-top-10">
          <h1 className="text-center bold size-title">Bienvenido a HardwareStore</h1>
      </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 padding-top-5">
          <div className="custom-div padding-login">
            <h3 className="text-center">Inicio de sesión</h3>
            <br></br>
            <form className="center" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="USS"
                name="username"
                className="text-center form-control custom-input"
                value={username}
                onChange={(event) => setUserName(event.target.value)}
              />
              <br></br>
              <input
                type="password"
                placeholder="PASS"
                name="password"
                className="text-center form-control custom-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <br></br>
              <br></br>
              <button
                type="submit"
                className="btn button-login"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container text-center padding-bottom-10">
          <p>Producto de software desarrollado por Agustin Lazo Escobar</p>
        </div>
      </footer>
    </div>
    
      
  );
};
export default LoginPage;
