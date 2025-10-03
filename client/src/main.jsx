// ... (importaciones existentes)
import ProtectedRoute from './components/ProtectedRoute';
import './styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      // Añadiremos la ruta /users para administradores más adelante
    ]
  },
  { path: '/auth', element: <Login /> },
  { path: '/register', element: <Register /> }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

