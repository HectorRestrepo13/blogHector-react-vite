import React from "react";
import DisenoLogin from "../components/login";

export { DisenoLogin }

export const DuenoBlogg = React.lazy(() => import('../components/dueñoBlog/indexDueñoBlog'));
export const RegistroUsuario = React.lazy(() => import('../components/registroUsuario/registro'));
export const Perfil = React.lazy(() => import("../components/perfilUsuario/perfilUsuario"))