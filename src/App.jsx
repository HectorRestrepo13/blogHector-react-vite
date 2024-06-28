import { useState } from 'react';
import DisenoLogin from './components/login';
import DueñoBlog from './components/dueñoBlog/indexDueñoBlog';
import Swal from 'sweetalert2';

function App() {

  // eventos
  const [redirigirPagina, setRedirigirPagina] = useState("login"); // este es para saber que pagina va llamar
  const [datosUsuario, setDatosUsuario] = useState({});
  let componenteARenderizar;



  // FUNCION PARA RECIBIR DATOS DEL "Login.jsx" Y SABER A QUE PAGINA MANDARLO 
  const func_recibirDatos = (datos) => {

    // aca voy a verificar si el objeto que retonor en blog en "true" es porque es el dueño del blog
    if (datos.blogs == true) {
      setRedirigirPagina("dueñoBlog");
    }
    else {
      setRedirigirPagina("visitanteBlog");
    }
  }
  // -- FIN FUNCION --




  return (
    <>

      {
        redirigirPagina === "login" ? (<DisenoLogin func_recibirDatos={func_recibirDatos} setDatosUsuario={setDatosUsuario} />) :
          redirigirPagina === "dueñoBlog" ? (<DueñoBlog datosUsuario={datosUsuario} />) : redirigirPagina === "visitanteBlog" ? "" : (<h1>No tiene Paginas por mostrar</h1>)
      }


    </>
  )
}

export default App
