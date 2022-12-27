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
import validarCrearCuenta from "../validacion/validarCrearCuenta";

import firebase from "../firebase";

//validaciones
import useValidacion from "../hooks/useValidacion";
const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  imagen: "",
  url: "",
  descripcion : ""
};
const NuevoProducto = () => {
  const [error, setError] = useState(false);

  

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  async function crearCuenta() {
   
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
            Nuevo Producto
          </h1>

          <Formulario onSubmit={handleSubmit} noValidate>
            {errores.nombre && <Error>{errores.nombre}</Error>}

              <fieldset>
                <legend>Informacion general</legend>
           
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            <Campo>
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                id="empresa"
                placeholder="Tu empresa"
                name="empresa"
                value={empresa}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
           
            {errores.empresa && <Error>{errores.empresa}</Error>}

            <Campo>
              <label htmlFor="imagen">Empresa</label>
              <input
                type="file"
                id="imagen"
       
                name="imagen"
                value={imagen}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.imagen && <Error>{errores.imagen}</Error>}

            <Campo>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
       
                name="url"
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
            </Campo>
            </fieldset>

           
            {errores.url && <Error>{errores.url}</Error>}
          
            <fieldset>
              <legend>Sobre tu producto</legend>

              <Campo>
              <label htmlFor="descripcion">Descripcion</label>
              <textarea
             
                id="descripcion"
       
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
            </Campo>
            {errores.descripcion && <Error>{errores.descripcion}</Error>}

            </fieldset>

            {error && <Error>{error}</Error>}
            <InputSubmit type="submit" value="Crear Producto" />
          </Formulario>
        </>
      </Layout>
    </>
  );
};

export default NuevoProducto