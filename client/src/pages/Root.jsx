import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';

function Root()  {
  return (
      <AuthProvider>
          <Navbar />
          <main>
            <Outlet />
          </main>
      </AuthProvider>
  );
}

export default Root;