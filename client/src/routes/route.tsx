import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import {
    Home,
    Ingestion,
    JoinTables
} from '../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'get-started',
                element: <Ingestion />
            },
            {
                path: 'join-tables',
                element: <JoinTables />
            }
        ],
    },
]);
