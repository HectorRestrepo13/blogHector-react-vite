
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DisenoLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [barraCarga, setBarraCarga] = useState(false);
    const navigate = useNavigate();


    // funcion para iniciar Sesion
    const func_InciarSesion = async () => {
        try {
            if (email != "" && password != "") {
                setBarraCarga(true);
                let respuesta = await fetch(`http://localhost:3000/usuario/iniciarSesion/?correo=${email}&contra=${password}`);
                if (!respuesta.ok) {
                    throw new Error("Hubo un error al enviar los datos al http Revisar " + respuesta.status)
                }
                respuesta = await respuesta.json();
                setBarraCarga(false);

                if (respuesta.status == true) {

                    // ACA VOY A METER LOS DATOS EN EL LOCALSTORE Y DIRIJIRLO A OTRA PAGINA
                    let local = window.localStorage;
                    local.setItem("usuario", JSON.stringify(respuesta));
                    navigate('/dueñoBlog')
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
                        title: respuesta.descripcion
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
                    title: "Llene primero las Casillas para poder validar"
                });

            }
        } catch (error) {
            console.log("Hubo un error " + error)
        }

    }

    // FUNCION PARA ENVIAR A LA PAGINA DE REGISTRO

    const func_mandarPaginaRegistro = () => {
        navigate(`/registroUsuario`)
    }

    // -- FIN FUNCION --

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
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: '1rem 0 0 1rem' }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span className="h1 fw-bold mb-0">Blogs De Hector</span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Bienvenido a mi Blog</h5>

                                                <div className="form-outline mb-4">
                                                    <input onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" type="email" id="form2Example17" className="form-control form-control-lg" />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input onChange={(e) => { setPassword(e.target.value) }} placeholder="Contraseña" type="password" id="form2Example27" className="form-control form-control-lg" />
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button disabled={barraCarga} onClick={func_InciarSesion} className="btn btn-dark btn-lg btn-block" type="button"> {barraCarga ? (<> <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>Iniciar Sesion </>) : ('Iniciar Sesion')}  </button>

                                                </div>

                                                <a className="small text-muted" href="#!">Se te olvido la Contraseña?</a>
                                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>No tienes Cuenta? <a onClick={func_mandarPaginaRegistro} href="#!"
                                                    style={{ color: '#393f81' }}>Registrarse ahora</a></p>

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

export default DisenoLogin;