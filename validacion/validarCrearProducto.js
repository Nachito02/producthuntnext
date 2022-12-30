export default function validarCreaProducto(valores) {
    let errores = {};


    //Validar el nombre de usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio"
    }
    
    // validar el empresa

        if(!valores.empresa) {
            errores.empresa = "La Empresa es obligatorio"
        }
 
    
        //validar la url

        if(!valores.url) {
        errores.url = 'la url del producto es oligatorio'
        } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
                errores.url = "Url no valida"
        }

        //validar descripcion

        if(!valores.descripcion) {
            errores.descripcion = "Agrega una descripcion de tu producto"
        }

        return errores;
}