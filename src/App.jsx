import { Suspense } from 'react';
// import DisenoLogin from './components/login';
// import DueñoBlog from './components/dueñoBlog/indexDueñoBlog';
// import Swal from 'sweetalert2';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './Router';
import Spinner from './components/statics/Spinner';
function App() {

  // eventos
  // const [redirigirPagina, setRedirigirPagina] = useState("login"); // este es para saber que pagina va llamar
  // const [datosUsuario, setDatosUsuario] = useState({});
  // let componenteARenderizar;



  // FUNCION PARA RECIBIR DATOS DEL "Login.jsx" Y SABER A QUE PAGINA MANDARLO 
  // const func_recibirDatos = (datos) => {

  //   // aca voy a verificar si el objeto que retonor en blog en "true" es porque es el dueño del blog
  //   if (datos.blogs == true) {
  //     setRedirigirPagina("dueñoBlog");
  //   }
  //   else {
  //     setRedirigirPagina("visitanteBlog");
  //   }
  // }
  // -- FIN FUNCION --




  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <AppRouter />
      </Suspense>
    </Router>
  )
}

export default App
