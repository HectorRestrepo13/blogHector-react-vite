import { useNavigate } from 'react-router-dom';
import './css/styleHeaderBlog.css';
import Swal from 'sweetalert2';
import { useRef } from 'react';

const HeaderBlog = ({ setJsonDatosEntradas, setLoading }) => {

    const localStore = window.localStorage;
    let datosUsuario = JSON.parse(localStore.getItem('usuario'));
    let imagenPerfil = datosUsuario.descripcion.ImagenUsuario;
    let nombreUsuario = datosUsuario.descripcion.NombreUsuario;
    let navigate = useNavigate();

    let inputBuscarEntrada = useRef(null)

    // FUNCION PARA ENVIAR AL LOGIN 
    const func_EnviarLogin = () => {
        Swal.fire({
            title: "Estas Seguro de Cerrar Sesion?",
            text: "Tendras que volver a Ingresar los datos para iniciar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/")

            }
        });
    }
    // -- FIN FUNCION --


    // funcion para traer todas las entradas 
    const fetchEntradas = async () => {
        try {
            let response = await fetch("http://localhost:3000/entradas/traerTodasLasEntradas/");
            response = await response.json();
            if (response.status === true) {

                setJsonDatosEntradas(response.descripcion);
            } else {
                console.log(response.error);
            }
        } catch (error) {
            console.log("Hubo un error al traer los datos de las entradas " + error);
        } finally {
            setLoading(false);
        }
    };

    // -- fin funcion --



    //  FUNCION PARA TRAER LA ENTRADA ESPECIFICA POR EL TITULO DE LA ENTRADA 

    const traerEntradaEspecifica = async () => {

        if (inputBuscarEntrada.current.value != "") {


            try {
                let response = await fetch(`http://localhost:3000/entradas/traerEntradaEspecifica/${inputBuscarEntrada.current.value}`);
                response = await response.json();
                if (response.status === true) {

                    setJsonDatosEntradas(response.descripcion);
                } else {
                    console.log(response.error);
                    setJsonDatosEntradas([]);

                }
            } catch (error) {
                console.log("Hubo un error al traer los datos de las entradas " + error);
            } finally {
                setLoading(false);
            }

        }
        else {
            fetchEntradas();
        }




    };

    // -- FIN FUNCION --



    return (
        <>
            <header className="bg-dark text-white py-3">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <a className="navbar-brand d-flex align-items-center" href="#">
                            <img src="/logoBlog.png" alt="Logo" width="50" height="50" className="me-2" />
                            <span className="fs-4">Blogger</span>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <form className="d-flex ms-lg-3">
                                <input ref={inputBuscarEntrada} className="form-control me-2" type="search" placeholder="Buscar Entrada" aria-label="Search" />
                                <button onClick={traerEntradaEspecifica} className="btn btn-outline-light" type="button">Buscar</button>
                            </form>


                            <div className="perfilUsuario">
                                <div className="btn-group">
                                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={imagenPerfil != undefined && imagenPerfil != null ? imagenPerfil : "imagenUsuarioSinPerfil.jpg"} alt="Perfil" width="80" height="60" className="me-2" />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a onClick={() => navigate("/verPerfil")} className="dropdown-item" href="#">Ver Perfil</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a onClick={func_EnviarLogin} className="dropdown-item" href="#">Cerrar Sesión</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="perfilUsuarioNombre">
                                <p style={{ fontFamily: "cursive", fontStyle: "italic", fontSizeAdjust: "inherit", fontSize: "25px" }}>{nombreUsuario}</p>
                            </div>

                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default HeaderBlog;