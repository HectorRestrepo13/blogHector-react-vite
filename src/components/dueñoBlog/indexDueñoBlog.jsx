import React from 'react';
import EntradasBlog from './entradasBlog';
import HeaderBlog from './headerBlog';
import InsertarEntrada from './insertarEntrada';
const DueñoBlog = () => {
    // console.log(datosUsuario)


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
                        <div className="btnRedactar">

                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" className="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                </svg>
                            </button>

                        </div>
                        {/* ACA COLOCO EL  MODAL QUE ES PARA INSERTAR LAS ENTRADAS */}
                        <InsertarEntrada></InsertarEntrada>
                        <div className="page-timeline">

                            {/* Pongo las Entradas del blog */}
                            <EntradasBlog></EntradasBlog>


                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default DueñoBlog;