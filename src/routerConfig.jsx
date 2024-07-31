import { DisenoLogin, DuenoBlogg, RegistroUsuario, Perfil } from "./pages";

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
    },
    {
        path: '/verPerfil',
        element: <Perfil />
    }
]