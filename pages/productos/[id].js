import React, { useEffect, useContext, useState } from "react";

import { useRouter } from "next/router";

import { FirebaseContext } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Boton from "../../components/ui/Boton";
import { ClipLoader } from "react-spinners";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadoProducto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;
const Producto = () => {
  //state del componente

  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);
  const { firebase, usuario } = useContext(FirebaseContext);
  const [cargando, setCargando] = useState(true);
  const [comentario, setComentario] = useState({});
  const [consultarDB, setConsultarDB] = useState(true);

  //routing para obtener el id actual

  const router = useRouter();

  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerProducto = async () => {
        const productoQuery = doc(collection(firebase.db, "productos"), id);

        const producto = await getDoc(productoQuery);

        if (producto.data()) {
          setProducto(producto.data());
          setConsultarDB(false);
        } else {
          setError(true);

          setConsultarDB(false);
        }
      };

      obtenerProducto();

      setCargando(false);
    }
  }, [id]);

  const {
    nombre,
    creado,
    comentarios,
    descripcion,
    empresa,
    url,
    imageUrl,
    votos,
    creador,
    haVotado,
  } = producto;

  if (Object.keys(producto).length === 0 && !error)
    return (
      <div
        css={css`
          background-color: gray;
          display: flex;
          height: 100vh;
          align-items: center;
          justify-content: center;
        `}
      >
        {" "}
        <ClipLoader />
      </div>
    );

  const votarProducto = () => {
    if (!usuario) {
      return router.push("/");
    }

    //obtener y sumar un nuevo voto

    const nuevoTotal = votos + 1;

    // verificar si el usuario ha votado

    if (haVotado.includes(usuario.uid)) return;

    //guardar el id del usuario que a votado

    const nuevoVoto = [...haVotado, usuario.uid];

    //actualizar base de datos

    //Query de tu colección en Firebase
    const docRef = doc(firebase.db, "productos", `${id}`);

    updateDoc(docRef, {
      votos: increment(nuevoTotal),
      haVotado: nuevoVoto,
    });

    //actualizar en el state
    setProducto({
      ...producto,
      votos: nuevoTotal,
    });

    setConsultarDB(true);
  };

  //funciones para crear comentarios

  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  //identificador si el comentario es del creador del producto

  const esCreador = (id) => {
    if (creador.id == id) {
      return true;
    }
  };

  const agregarComentario = (e) => {
    e.preventDefault();
    if (!usuario) {
      return router.push("/login");
    }

    //informacion extra al comentario

    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    //tomar copia de comentarios y agregarlos al arreglo

    const nuevosComentarios = [...comentarios, comentario];

    //actualizar base de datos

    const docRef = doc(firebase.db, "productos", `${id}`);

    updateDoc(docRef, {
      comentarios: nuevosComentarios,
    });

    // actualizar el state

    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });

    setConsultarDB(true);
  };

  //funcion que revisa que el creador del producto sea el mismo que esta autenticado

  const puedeBorrar = () => {
    if (!usuario) return false;
    if (creador.id === usuario.uid) {
      return true;
    }
  };


  const eliminarProducto = async () => {

    if(!usuario) {
        return router.push('/login')
    }

    if (creador.id !== usuario.uid) {
        return router.push('/')

    }
        try {   

          

            await deleteDoc(doc(firebase.db,'productos',id))
            router.push('/')
        } catch (error) {
            console.log('error', error.message)
        }
  }

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {nombre}
            </h1>

            <ContenedorProducto>
              <div>
                <p>
                  Publicado hace:{" "}
                  {formatDistanceToNow(new Date(creado), {
                    locale: es,
                  })}
                </p>

                <p>
                  Por {creador.nombre} de {empresa}
                </p>

                <img src={imageUrl} alt="" />

                <p>{descripcion}</p>

                {usuario && (
                  <>
                    <h2>Agregar tu comentario</h2>

                    <form onSubmit={agregarComentario}>
                      <Campo>
                        <input
                          type="text"
                          name="mensaje"
                          onChange={comentarioChange}
                        />
                      </Campo>

                      <InputSubmit type="submit" value="Agregar comentario" />
                    </form>
                  </>
                )}

                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>

                {comentarios.length === 0 ? (
                  "Aun no hay comentarios"
                ) : (
                  <ul
                    css={css`
                      text-decoration: none;
                    `}
                  >
                    {comentarios.map((comentario, i) => (
                      <li
                        key={i}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{comentario.mensaje}</p>
                        <p>
                          Escrito por{" "}
                          <span
                            css={css`
                              font-weight: bold;
                            `}
                          >
                            {comentario.usuarioNombre}
                          </span>{" "}
                        </p>

                        {esCreador(comentario.usuarioId) && (
                          <CreadoProducto>Es Creador</CreadoProducto>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <aside>
                <Boton target="_blank" bgColor="true" href={url}>
                  Visitar Url
                </Boton>

                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {votos} Votos
                  </p>

                  {usuario && (
                    <Boton
                      onClick={votarProducto}
                      className={
                        haVotado.includes(usuario.uid) ? "disabled" : null
                      }
                    >
                      Votar
                    </Boton>
                  )}
                </div>
              </aside>
            </ContenedorProducto>

            {puedeBorrar() && <Boton onClick={eliminarProducto}>Eliminar Producto</Boton>}
          </div>
        )}
      </>
    </Layout>
  );
};

export default Producto;
