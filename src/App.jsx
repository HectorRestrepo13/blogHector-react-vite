import { useState } from 'react';
import DisenoLogin from './components/login';


function App() {

  // FUNCION PARA RECIBIR DATOS DE LOS HIJOS Y SABER A QUE PAGINA MANDARLO 
  const func_recibirDatos = (
    datos) => {
    console.log("datos recividos ")
    console.log(datos)
  }
  // -- FIN FUNCION --



  return (
    <>
      <DisenoLogin func_recibirDatos={func_recibirDatos}></DisenoLogin>


    </>
  )
}

export default App
