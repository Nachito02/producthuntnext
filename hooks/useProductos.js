import React, {useState,useEffect,useContext} from 'react'
import { FirebaseContext } from '../firebase';
import { doc, getDocs, query, collection, orderBy } from 'firebase/firestore'


const useProductos = (orden) => {
    const[productos,setProductos] = useState([]);
    const [cargando,setCargando] = useState(true)
  const {firebase} = useContext(FirebaseContext);


  useEffect(() =>{
    const  obtenerProductos = async () => {
     
    // const p= await getDocs(collection(firebase.db, 'productos'))

      const docRef = collection(firebase.db, 'productos')

      const docQ = query(docRef, orderBy(orden, 'desc')) 

     
     manejarSnapshot(docQ)
    
    }
    obtenerProductos()
    setCargando(false)
  }, [])


 async function  manejarSnapshot(snpapchot) {
    let productos = []
    let producto = {}
    const querySnapshot = await getDocs(snpapchot);
    querySnapshot.forEach((doc) => {
      producto = doc.data()
      producto.id = doc.id

      productos.push(producto)
    });


    setProductos(productos)

  }


  return {
    productos,
    cargando
  }
}

export default useProductos