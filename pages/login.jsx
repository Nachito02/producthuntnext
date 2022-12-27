import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import Router from "next/router";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

import firebase from "../firebase";

//validaciones
import useValidacion from "../hooks/useValidacion";

const STATE_INICIAL = {
  email: "",
  password: "",
};
const Login = () => {
  const [error, setError] = useState(false);

  

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

 async function iniciarSesion() {
  
      try {
       const usuario = await firebase.login(email,password)
        Router.push('/');
        console.log(usuario)

      } catch (error) {
        console.log("Hubo un error al autenticar el usuario", error);
        setError(error.message);
      }

  }

  return (
    <>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Iniciar Sesion
          </h1>

          <Formulario onSubmit={handleSubmit} noValidate>
            {errores.nombre && <Error>{errores.nombre}</Error>}

           
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}

            <Campo>
              <label htmlFor="password">Pasword</label>
              <input
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Iniciar Sesion" />
          </Formulario>
        </>
      </Layout>
    </>
  );
};

export default Login