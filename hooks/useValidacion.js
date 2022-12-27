import React, {useState, useEffect} from 'react'

const useValidacion = (stateInicial, validar, fn) => {

    const [valores,setValores] = useState(stateInicial);
    const [errores,setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
            if(submitForm) {
                const noErrores = Object.keys(errores).length === 0;

                if(noErrores) {
                    fn(); //fn que se ejecuta en el componente
                }

                setSubmitForm(false);
            }
    }, [errores])


    // funcion que se ejecuta conforme el usuario escribe algo

    const handleChange = e => {
        setValores({
            ...valores, [e.target.name] : e.target.value
        })
    }

    // funcion que se ejecuta cuando el usuario hace submit

    const handleSubmit = e => {
        e.preventDefault();

        const erroresValidacion = validar(valores)

        setErrores(erroresValidacion);
        setSubmitForm(true)
    }

    // cuando se realiza el evento blur

   const handleBlur = () => {
    const erroresValidacion = validar(valores)

    setErrores(erroresValidacion);
   }

  return {
    valores,
    errores,
    submitForm,
    handleChange,
    handleBlur,
    handleSubmit
  }
}

export default useValidacion


//rqza5tna6vw43m3jkmzcujvxa5k3xqeo