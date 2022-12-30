import React, {useEffect, useState,} from 'react'
import Layout from '../components/layout/Layout'

import { useRouter } from 'next/router'
import useProductos from '../hooks/useProductos'
import DetallesProducto from '../components/layout/DetallesProducto'
const Buscar = () => {

  const router = useRouter();

  const {query: {q}} = router;

  const {productos} = useProductos('creado')

  const [resultado, setResultado] = useState([]);



  //todos los productos

  useEffect(() => {
    const busqueda = q?.toLowerCase();
    const filtro = productos.filter(producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda)
      )
    })

    setResultado(filtro)

  }, [q, productos])

  return (
    <Layout>

    <div className='listado-productos'>
      <div className='contenedor'>
        <ul className='bg-white'>
         
          {resultado.map((producto,i) => (
              <DetallesProducto  key={i} producto={producto} />

             
          ) )}
        
        </ul>
      </div>
    </div>
</Layout>
  )
}

export default Buscar