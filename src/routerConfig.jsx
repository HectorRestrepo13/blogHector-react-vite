import { DisenoLogin, DuenoBlogg, RegistroUsuario } from "./pages";

export const routes = [
    {
        path: '/',
        element: <DisenoLogin></DisenoLogin>
    },
    {
        path: '/dueñoBlog',
        element: <DuenoBlogg />
    },
    {
        path: '/registroUsuario',
        element: <RegistroUsuario />
    }
]