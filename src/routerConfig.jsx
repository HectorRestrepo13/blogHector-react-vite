import { DisenoLogin, DuenoBlogg } from "./pages";

export const routes = [
    {
        path: '/',
        element: <DisenoLogin></DisenoLogin>
    },
    {
        path: '/dueñoBlog',
        element: <DuenoBlogg />
    }
]