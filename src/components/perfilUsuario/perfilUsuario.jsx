import HeaderBlog from "../dueñoBlog/headerBlog";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/stylePerfilUsuario.css'
import Swal from "sweetalert2";



const PerfilUsuario = () => {

    let [btnActualizando, setBtnActualizando] = useState(false);

    let navigate = useNavigate();

    const inputNombreUsuario = useRef(null)
    const inputApellidoUsuario = useRef(null)
    const inputCedulaUsuario = useRef(null)
    const inputEmailUsuario = useRef(null)
    const inputTelefonoUsuario = useRef(null)
    const inputContraUsuario = useRef(null)
    const imgPerfilUsuario = useRef(null)
    const inputImagenPerfil = useRef(null)


    useEffect(() => {
        let datosLocalStore = window.localStorage;
        let datosUsuario = JSON.parse(datosLocalStore.getItem("usuario"));

        inputNombreUsuario.current.value = datosUsuario.descripcion.NombreUsuario
        inputApellidoUsuario.current.value = datosUsuario.descripcion.ApellidoUsuario
        inputCedulaUsuario.current.value = datosUsuario.descripcion.CedulaUsuario
        inputEmailUsuario.current.value = datosUsuario.descripcion.CorreoUsuario
        inputTelefonoUsuario.current.value = datosUsuario.descripcion.TelefonoUsurio
        inputContraUsuario.current.value = 12345
        imgPerfilUsuario.current.src = datosUsuario.descripcion.ImagenUsuario;
        let cadena = datosUsuario.descripcion.ImagenUsuario;
        let arreglo = cadena.split("/")
        inputImagenPerfil.current.file = arreglo[5];

        // PENDIENTE PARA MAÑANA HACERLO 





        // EVENTO PARA QUE LA IMAGEN QUE SELECIONO SE COLOQUE DE UNA

        const fileInput = document.getElementById('imagenEntrada');
        if (fileInput) {
            fileInput.addEventListener('change', function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        imgPerfilUsuario.current.src = e.target.result;
                        inputImagenPerfil.current.file = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }

        // -- FIN EVENTO --
    }, [])


    // FUNCION PARA EDITAR EL PERFIL CON LA API

    const func_EditarPerfil = async () => {

        try {

            if (inputImagenPerfil.current.files[0] != undefined || inputImagenPerfil.current.files.length != 0) {

                setBtnActualizando(true); // aca le digo que esta en "TRUE" que quiere decir que esta cargando al consumir la API
                // Crear el objeto FormData
                let formData = new FormData();
                formData.append("foto", inputImagenPerfil.current.files[0]);

                let urlEditarPerfil = await fetch(`https://proyectoblog.onrender.com/usuario/editarPerfil/?nombre=${inputNombreUsuario.current.value}&apellido=${inputApellidoUsuario.current.value}&correo=${inputEmailUsuario.current.value}&telefono=${inputTelefonoUsuario.current.value}&id=${inputCedulaUsuario.current.value}&verificacionImagen=true`, {
                    method: "PUT",
                    body: formData
                });

                setBtnActualizando(false);

                if (!urlEditarPerfil.ok) {
                    throw new Error(`Hubo un error al mandar los datos por la URL: ${urlEditarPerfil.status}`)
                }

                let jsonEditarPerfil = await urlEditarPerfil.json();
                console.log(jsonEditarPerfil)


            }
            else {

                setBtnActualizando(true); // aca le digo que esta en "TRUE" que quiere decir que esta cargando al consumir la API

                let urlEditarPerfil = await fetch(`https://proyectoblog.onrender.com/usuario/editarPerfil/?nombre=${inputNombreUsuario.current.value}&apellido=${inputApellidoUsuario.current.value}&correo=${inputEmailUsuario.current.value}&telefono=${inputTelefonoUsuario.current.value}&id=${inputCedulaUsuario.current.value}&verificacionImagen=false`, {
                    method: "PUT"
                });

                setBtnActualizando(false);

                if (!urlEditarPerfil.ok) {
                    throw new Error(`Hubo un error al mandar los datos por la URL: ${urlEditarPerfil.status}`)
                }

                let jsonEditarPerfil = await urlEditarPerfil.json();
                let actualizacionLocal = await func_enviarNuevosDatosLocalStore();
                if (actualizacionLocal) {
                    console.log("bien")

                    setBtnActualizando(false)

                }
                console.log(jsonEditarPerfil)

            }




        } catch (error) {
            console.log(`Hubo un error: ${error}`)
        }
    }

    // -- FIN FUNCION --


    // FUNCION PARA OBTENER LOS DATOS DEL USUARIO Y MANDAR LOS NUEVOS DATOS AL LOCALSTORE

    const func_enviarNuevosDatosLocalStore = async (cedula) => {
        try {
            let respuesta = await fetch(`https://proyectoblog.onrender.com/usuario/selecionarUsuarioCedula/${cedula}`);
            if (!respuesta.ok) {
                throw new Error("Hubo un error al enviar los datos al http Revisar " + respuesta.status)
            }
            respuesta = await respuesta.json();

            if (respuesta.status == true) {

                // ACA VOY A METER LOS DATOS EN EL LOCALSTORE Y DIRIJIRLO A OTRA PAGINA
                let local = window.localStorage;
                local.setItem("usuario", JSON.stringify(respuesta));
                return true;
            }
            else {
                return false;

            }

        } catch (error) {
            console.log(error)
            return false
        }

    }

    // -- FIN FUNCION --

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div style={{ padding: "0px" }} className="col">
                        <HeaderBlog />
                    </div>
                </div>
            </div>
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <div className="contenedorImagen">
                            <div className="file-input-wrapper">
                                <input ref={inputImagenPerfil} name='imagenEntrada' type="file" id="imagenEntrada" />
                                <img ref={imgPerfilUsuario} src="agregacionFoto.jpg" alt="Seleccionar archivo" id="placeholder-image" />
                            </div>                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 columnaDatos">
                        <div className="contenedorDatos">
                            <div className="form-floating mb-3">
                                <input ref={inputNombreUsuario} type="text" className="form-control" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Nombre</label>
                            </div>
                        </div>
                        <div className="contenedorDatos">
                            <div className="form-floating mb-3">
                                <input ref={inputApellidoUsuario} type="text" className="form-control" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Apellidos</label>
                            </div>
                        </div>
                        <div className="contenedorDatos">
                            <div className="form-floating mb-3">
                                <input disabled ref={inputCedulaUsuario} type="number" className="form-control" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Cedula</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 columnaDatos">
                        <div className="contenedorDatos">
                            <div className="form-floating mb-3">
                                <input ref={inputEmailUsuario} type="email" className="form-control" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Correo Usuario</label>
                            </div>
                        </div>
                        <div className="contenedorDatos">
                            <div className="form-floating mb-3">
                                <input ref={inputTelefonoUsuario} type="number" className="form-control" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Telefono</label>
                            </div>
                        </div>
                        <div className="contenedorDatos">
                            <div className="form-floating mb-3">
                                <input disabled ref={inputContraUsuario} type="password" className="form-control" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Contraseña</label>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row">
                    <div className="col">

                        <div className="contenedorBotonGuardar">
                            {
                                btnActualizando == false ? (<>
                                    <div className="iconGuardar">
                                        <svg onClick={() => navigate("/dueñoBlog")} style={{ marginRight: "25px" }} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                                        </svg>
                                    </div>
                                    <div className="iconAtras">
                                        <svg onClick={func_EditarPerfil} xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-floppy-fill" viewBox="0 0 16 16">
                                            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                                            <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                                        </svg>
                                    </div>

                                </>) : (<>

                                    <div className="spinner-grow text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-secondary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-success" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-danger" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-warning" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-info" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className="spinner-grow text-dark" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </>)
                            }

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default PerfilUsuario;