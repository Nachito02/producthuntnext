import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import validarCrearProducto from "../validacion/validarCrearProducto";

import { FirebaseContext } from "../firebase";

import { collection, addDoc } from "firebase/firestore";
//validaciones
import useValidacion from "../hooks/useValidacion";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  imagen: "",
  url: "",
  descripcion: ""
};
import { ClipLoader } from 'react-spinners';

import Error404 from "../components/layout/404";

const NuevoProducto = () => {
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);

  //state de las imagenes
  


  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  //hook de Use router para direccionar

  const router = useRouter();
  //context con las operaciones crud de firebase
  const  { usuario, firebase } = useContext(FirebaseContext);

  const [urlImage, setUrlImage] = useState("")

  const { db,storage } = firebase

  async function crearProducto() {


    //si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push("/login")
    }

    //crear el objeto nuevo producto

    const  producto = await {
      nombre,
      empresa,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
       creador: {
        id: usuario.uid,
        nombre: usuario.displayName
       },
       haVotado: []


    }


    const fileInput = document.getElementById('imagen')

    const file = fileInput.files[0]


  const storageRef = ref(storage, `images/${file.name + Math.random(2).toString().split('.')[1]}`)

   
  await  uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    const urlImage = await getDownloadURL(storageRef).then((downloadURL) => {
    producto.imageUrl = downloadURL;
    
  })

    //insertarlo a la base de datos

     await addDoc(collection(db, "productos"), (producto));  
    
    router.push('/')

  }


  useEffect(() => {
   setCargando(false)
  },[])


  return (
    <>
        {cargando ? (<div css={css`background-color:gray; display:flex; height:100vh; align-items:center; justify-content:center; `}> <ClipLoader  /></div>) : ( <Layout>
        {!usuario ? <Error404 /> : (
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

    <fieldset>
      <legend>Informacion general</legend>
      {errores.nombre && <Error>{errores.nombre}</Error>}

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
      {errores.empresa && <Error>{errores.empresa}</Error>}

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


      <Campo>
        <label htmlFor="imagen">Products imagen</label>
        <input
          accept="imagen/*"
          onChange={handleChange}
          type="file"
          id="imagen"
          name="imagen"
        />

      </Campo>
      {errores.url && <Error>{errores.url}</Error>}

      <Campo>
        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          placeholder="Url producto"
          name="url"
          value={url}
          onChange={handleChange}
          onBlur={handleBlur}
        />

      </Campo>
    </fieldset>



    <fieldset>
      <legend>Sobre tu producto</legend>
      {errores.descripcion && <Error>{errores.descripcion}</Error>}

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

    </fieldset>

    {error && <Error>{error}</Error>}
    <InputSubmit type="submit" value="Crear Producto" />
  </Formulario>
</>
        )}
      
      </Layout>) }
    </>
  );
};

export default NuevoProducto