import HeaderBlog from "../dueñoBlog/headerBlog";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/stylePerfilUsuario.css'



const PerfilUsuario = () => {

    let navigate = useNavigate();

    const inputNombreUsuario = useRef(null)
    const inputApellidoUsuario = useRef(null)
    const inputCedulaUsuario = useRef(null)
    const inputEmailUsuario = useRef(null)
    const inputTelefonoUsuario = useRef(null)
    const inputContraUsuario = useRef(null)
    const imgPerfilUsuario = useRef(null)


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








        // EVENTO PARA QUE LA IMAGEN QUE SELECIONO SE COLOQUE DE UNA

        const fileInput = document.getElementById('imagenEntrada');
        if (fileInput) {
            fileInput.addEventListener('change', function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        imgPerfilUsuario.current.src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }

        // -- FIN EVENTO --
    }, [])


    // FUNCION PARA EDITAR EL PERFIL CON LA API

    const func_EditarPerfil = () => {

        try {





        } catch (error) {
            console.log(`Hubo un error: ${error}`)
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
                                <input name='imagenEntrada' type="file" id="imagenEntrada" />
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

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default PerfilUsuario;