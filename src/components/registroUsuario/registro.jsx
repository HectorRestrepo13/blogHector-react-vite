import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import '../dueñoBlog/css/styleModalInsertar.css'
const Registro = () => {

    const [barraCarga, setBarraCarga] = useState(false);
    let navigate = useNavigate();

    // FUNCION PARA CONSUMIR LA API Y REGISTRAR EL USUARIO
    const func_RegistrarUsuario = async (e) => {
        e.preventDefault();
        let nombreUsuario = e.target.nombreUsuario.value;
        let apellidoUsuario = e.target.apellidoUsuario.value;
        let cedulaUsuario = e.target.cedulaUsuario.value;
        let correoUsuario = e.target.correoUsuario.value;
        let contraUsuario = e.target.contraUsuario.value;
        let telefonoUsuario = e.target.telefonoUsuario.value;
        let imagenUsuario = e.target.imagenUsuario.files[0];
        console.log(imagenUsuario)

        try {

            if (nombreUsuario != "" && apellidoUsuario != "" && cedulaUsuario != "" && correoUsuario != "" && contraUsuario != "" && telefonoUsuario != "") {

                if (imagenUsuario != undefined) {

                    let file = new FormData;
                    file.append("foto", imagenUsuario)
                    setBarraCarga(true)
                    let insertarRegistroUsuario = await fetch(`https://proyectoblog.onrender.com/usuario/registrarUsuario/?cedulaUsuario=${cedulaUsuario}&nombreUsuario=${nombreUsuario}&apellidoUsuario=${apellidoUsuario}&telefonoUsuario=${telefonoUsuario}&correoUsuario=${correoUsuario}&paswordUsuario=${contraUsuario}`, {
                        method: "POST",
                        body: file

                    })

                    setBarraCarga(false)

                    if (!insertarRegistroUsuario.ok) {
                        throw new Error(`Hubo un eror al Insertar el registro Del Usuario: ${insertarRegistroUsuario.status}`)
                    }

                    let jsonInsertacion = await insertarRegistroUsuario.json();
                    console.log(jsonInsertacion)
                    if (jsonInsertacion.status == true) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Usuario Registrado con Exito",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            navigate(`/`)
                        })
                    }
                    else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "error",
                            title: jsonInsertacion.descripcion
                        });
                    }

                }
                else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "info",
                        title: "Selecione Una Foto de Perfil"
                    });
                }


            }
            else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "info",
                    title: "Faltan Casillas por llenar"
                });
            }




        } catch (error) {
            console.log(`Hubo un error Verificar: ${error}`)
        }


    }

    // -- FIN FUNCION --

    // FUNCION PARA RETROCEDER Y ENVIARLO A LA PAGINA DEL LOGIN
    const func_retroceder = () => {
        navigate(`/`)
    }
    // -- FIN FUNCION --

    // EVENTO PARA QUE LA IMAGEN QUE SELECIONO SE COLOQUE DE UNA
    useEffect(() => {
        const fileInput = document.getElementById('imagenUsuario');
        if (fileInput) {
            fileInput.addEventListener('change', function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        document.getElementById('placeholder-image').src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }, []);
    // -- FIN EVENTO --



    return (
        <>
            <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img

                                            src="fotoRegistro.jpg"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: '1rem 0 0 1rem', height: "100%" }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={func_RegistrarUsuario}>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="d-flex align-items-center mb-3 pb-1">
                                                            <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                            <span className="h1 fw-bold mb-0">Registro Blog</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Bienvenido a mi Blog, Para poder Ingresar a mi Blog nesecitas primero tener Una cuenta</h5>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="form-outline mb-4">

                                                            <div className="file-input-wrapper">
                                                                <input name='imagenUsuario' type="file" id="imagenUsuario" />
                                                                <img style={{ width: "100%", borderRadius: "100px" }} src="./sinFoto.jpg" alt="Seleccionar archivo" id="placeholder-image" />
                                                            </div>
                                                        </div>

                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" id="nombreUsuario" placeholder="name@example.com" />
                                                            <label >Nombres</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" className="form-control" id="apellidoUsuario" placeholder="name@example.com" />
                                                            <label >Apellidos</label>
                                                        </div>

                                                    </div>
                                                    <div className="col-6">
                                                        <div className="form-floating mb-3">
                                                            <input type="number" className="form-control" id="cedulaUsuario" placeholder="name@example.com" />
                                                            <label >Cedula Usuario</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="email" className="form-control" id="correoUsuario" placeholder="name@example.com" />
                                                            <label >Correo Usuario</label>
                                                        </div>

                                                        <div className="form-floating mb-3">
                                                            <input type="password" className="form-control" id="contraUsuario" placeholder="name@example.com" />
                                                            <label >Contraseña</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="number" className="form-control" id="telefonoUsuario" placeholder="name@example.com" />
                                                            <label >Telefono</label>
                                                        </div>

                                                        <div className="pt-1 mb-4 contenedorBotones">
                                                            <div className="botones">
                                                                <button onClick={func_retroceder} className="btn btn-dark btn-lg btn-block" type="button">Atras</button>

                                                            </div>
                                                            <div className="botones">
                                                                <button style={{ backgroundColor: "rgb(105, 30, 48)" }} disabled={barraCarga} className="btn btn-dark btn-lg btn-block" type="submit"> {barraCarga ? (<> <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>Registrandose... </>) : ('Registrarse')}  </button>

                                                            </div>


                                                        </div>

                                                    </div>
                                                </div>





                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Registro;