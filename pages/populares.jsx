import React,{useEffect, useState,useContext} from 'react'
import styled from '@emotion/styled'
import Layout from '../components/layout/Layout'
import DetallesProducto from '../components/layout/DetallesProducto'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/react'
import useProductos from '../hooks/useProductos'
export default function Populares() {

  const {productos, cargando} = useProductos('votos');
 

  if(productos.length === 0 && cargando)  return  <div css={css`background-color:gray; display:flex; height:100vh; align-items:center; justify-content:center; `}> <ClipLoader  /></div>

  const Heading = styled.h1`color:red;`



  return (
      <>
        <Layout>

            <div className='listado-productos'>
              <div className='contenedor'>
                <ul className='bg-white'>
                 
                  {productos.map((producto,i) => (
                      <DetallesProducto  key={i} producto={producto} />

                     
                  ) )}
                
                </ul>
              </div>
            </div>
        </Layout>
    </>
  )
}
