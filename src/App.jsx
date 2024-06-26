import { useState } from 'react';
import DisenoLogin from './components/login';
import DueñoBlog from './components/dueñoBlog/indexDueñoBlog';
import Swal from 'sweetalert2';

function App() {

  // eventos
  const [redirigirPagina, setRedirigirPagina] = useState("dueñoBlog"); // este es para saber que pagina va llamar
  const [datosUsuario, setDatosUsuario] = useState({});
  let componenteARenderizar;



  // FUNCION PARA RECIBIR DATOS DE LOS HIJOS Y SABER A QUE PAGINA MANDARLO 
  const func_recibirDatos = (datos) => {
    console.log("datos recibidos ")
    console.log(datos)

    // aca voy a verificar si el objeto que retonor en blog en "true" es porque es el dueño del blog
    if (datos.blogs == true) {
      setDatosUsuario(datos);
      setRedirigirPagina("dueñoBlog");
      componenteARenderizar = <DueñoBlog></DueñoBlog>
    }
    else {
      setDatosUsuario(datos);
      setRedirigirPagina("visitanteBlog");
    }
  }
  // -- FIN FUNCION --


  // determinar qué componente renderizar basado en el valor de redirigirPagina
  if (redirigirPagina === "login") {
    componenteARenderizar = <DisenoLogin func_recibirDatos={func_recibirDatos} />;
  } else if (redirigirPagina === "dueñoBlog") {
    componenteARenderizar = <DueñoBlog />;
  } else if (redirigirPagina === "visitanteBlog") {
  }

  return (
    <>


      {componenteARenderizar}


    </>
  )
}

export default App
