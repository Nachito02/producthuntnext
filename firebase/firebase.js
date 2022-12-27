import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import firebaseConfig from './config'


class Firebase {
        constructor() {
            initializeApp(firebaseConfig)

            this.auth = getAuth();
        }

        //registrar un usuario

        async registrar(nombre,email,password) {
            const nuevoUsuario = await createUserWithEmailAndPassword(this.auth,email,password)

            //actualiza el usuario creado, añadiendo el nombre del usuario

            return await updateProfile(nuevoUsuario.user, {
                displayName: nombre
            })
        }

        // Inicia Sesion

        async login(email,password) {

            return await signInWithEmailAndPassword(this.auth, email,password)
        }

        //cierra la sesion del usuario

        async cerrarSesion() {
            await signOut(this.auth)
        }
        
}


const firebase = new Firebase();

export default firebase;