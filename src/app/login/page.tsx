"use client";

import {signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Footer from "@/components/common/footer";
import InputField from "@/components/common/inputField";
import Spinner from '@/components/common/spinner';

const LoginPage = () => {

  const [errorValidUserName, setErrorValidUserName] = useState<boolean | undefined>(false);
  const [errorValidPass, setErrorValidPass] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginOk, setLoginOk] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChangeUss = (value: string, error: boolean | undefined) => {
    setErrorValidUserName(error);
    setUserName(value);
  };

  const handleInputChangePass = (value: string, error: boolean | undefined) => {
    setErrorValidPass(error);
    setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if(!errorValidUserName && !errorValidPass){
      const responseNextAuth = await signIn("credentials", {
        username: userName,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setError(responseNextAuth?.error);
        return;
      }

      setLoginOk(true);
      setTimeout(() => {
        router.push("/cestaproductos");  
      }, 3000);
    }
  };

  return (
    
    <div className="container">
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
              <InputField 
                className="text-center form-control custom-input" 
                placeholder="USS" 
                type="text" 
                value={userName} 
                expresionRegular={/^@.*/} 
                mensajeValidacion="usuario debe comenzar con @" 
                onChange={handleInputChangeUss} />
              <br></br>
              <br></br>
              <InputField 
                className="text-center form-control custom-input" 
                placeholder="PASS" 
                type="password" 
                value={password} 
                expresionRegular={/^.+$/} 
                mensajeValidacion="Al menos un caracter" 
                onChange={handleInputChangePass} />
              <br></br>
              <br></br>
              <button
                type="submit"
                className="btn button-login">
                Login
              </button>
            </form>
            <br></br>
            { (error?.trim().length > 0 ) &&
              <div className="text-center alert alert-danger" role="alert">
                {error}
              </div>
            }
            {
              (loginOk) && 
              <>
                <br/>
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <Spinner mostrar={loginOk} mensaje={`Autenticación correcta. Dirigiendo a cesta de productos`}></Spinner>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>
      <Footer/>
    </div> 
  );
};
export default LoginPage;
