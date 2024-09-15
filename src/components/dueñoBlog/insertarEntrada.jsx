import './css/styleModalInsertar.css'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'


const InsertarEntrada = () => {

    let [validaciones, setValidaciones] = useState(null);
    let [datosInsertacion, setDatosInsertacion] = useState("sin Datos");
    // EVENTO PARA QUE LA IMAGEN QUE SELECIONO SE COLOQUE DE UNA
    useEffect(() => {
        const fileInput = document.getElementById('imagenEntrada');
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

    // ACA VOY A INSERTAR LA ENTRADA
    const getDatosFrm = async (e) => {
        e.preventDefault(); // para evitar la recarga automatica del form
        let imagenEntrada = e.target.imagenEntrada.files[0]; // obtener el archivo seleccionado
        let tituloEntrada = e.target.tituloEntrada.value; // obtener el valor del título
        let descripcionEntrada = e.target.descripcionEntrada.value; // obtener el valor de la descripción

        if (descripcionEntrada != "") {

            if (imagenEntrada != undefined) {

                if (tituloEntrada != "") {
                    try {
                        setDatosInsertacion("")
                        let date = new Date();
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
                        const year = date.getFullYear();
                        let fechaActual = `${year}-${month}-${day}`;

                        // aca voy a traer el Id del blog desde el localStore
                        let local = window.localStorage;
                        local = JSON.parse(local.getItem("usuario"))
                        let idBlog = local.descripcion.blogs[0].id;
                        const formData = new FormData();
                        formData.append("imagenEntrada", imagenEntrada)
                        let responseHttp = await fetch(`http://localhost:3000/entradas/insertarEntrada/?TituloEntrada=${tituloEntrada}&ContenidoEntrada=${descripcionEntrada}&FechaCreacion=${fechaActual}&BlogId=${idBlog}`, {
                            method: "POST",
                            body: formData
                        })

                        if (!responseHttp.ok) {
                            throw new Error(`Hubo un error al enviar los datos con HTTP : ${responseHttp.status}`)
                        }





                        let respuestaJson = await responseHttp.json();
                        setDatosInsertacion(respuestaJson.descripcion)

                        console.log(respuestaJson)
                        if (respuestaJson.status == true) {
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
                                icon: "success",
                                title: respuestaJson.descripcion
                            });
                            window.location.reload()
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
                                title: respuestaJson.descripcion
                            });
                        }


                    } catch (error) {
                        console.log(`ERROR: ${error}`)
                    }


                }
                else {
                    setValidaciones("Escribe un titulo para la Entrada")

                }


            }
            else {
                setValidaciones("Selecione Una Imagen para la Entrada")
            }


        }
        else {
            setValidaciones("Escribe una Descripcion para la Entrada")
        }

    }
    // -- FIN FUNCION --



    // FUNCION PARA AL CERRAR EL ALERTA LA VARIABLE VALIDACION QUEDE OTRA VEZ EN NULL
    const func_cerrarAlerta = () => {
        setValidaciones(null)

    }



    return (

        <>

            {/* Modal  */}
            <form onSubmit={getDatosFrm}>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div style={{ backgroundColor: "#d9d8de" }} className="modal-header tipoLetra">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva Entrada</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body conten">
                                <div className="container">
                                    {/* MENSAJE DE ALERTA */}
                                    {
                                        validaciones != null ? (<div className="row">
                                            <div className="col">
                                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                                    <strong>Atencion!</strong> {validaciones}.
                                                    <button onClick={func_cerrarAlerta} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>
                                            </div>
                                        </div>) : ("")

                                    }


                                    <div className="row">
                                        <div className="col colImagenEntrada">
                                            <div className="file-input-wrapper">
                                                <input name='imagenEntrada' type="file" id="imagenEntrada" />
                                                <img src="agregacionFoto.jpg" alt="Seleccionar archivo" id="placeholder-image" />
                                            </div>
                                            <div className="descripcionImagen">
                                                <p>Seleccione una Imagen</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-floating mb-3">
                                                <input style={{ backgroundColor: "#d9d8de" }} type="text" className="form-control" id="tituloEntrada" placeholder="name@example.com" />
                                                <label htmlFor="floatingInput">Ingrese el Titulo</label>
                                            </div>
                                            <div className="mb-3">
                                                <textarea style={{ backgroundColor: "#d9d8de" }} placeholder='Ingresa La Descripcion de la Entrada' className="form-control" id="descripcionEntrada"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div style={{ backgroundColor: "#d9d8de" }} className="modal-footer">
                                {
                                    datosInsertacion.length > 0 ? (<> <button type="button" className="btn btn-secondary tipoLetra" data-bs-dismiss="modal">Cerrar</button>
                                        <button style={{ backgroundColor: "#b33600", color: "#d9d8de", border: "none" }} type="submit" className="btn btn-primary tipoLetra">Guardar</button></>) : (<div className="text-center">
                                            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>)
                                }

                            </div>

                        </div>

                    </div>
                </div>
            </form>



        </>
    );
}

export default InsertarEntrada;