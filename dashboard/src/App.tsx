import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MainDashboard from './pages/dashboard/Main';
import DashboardLayout from './layouts/DashboardLayout';
import Products from './pages/dashboard/Products';
import Alerts from './pages/dashboard/Alerts';
import Analytics from './pages/dashboard/Analytics';
import Users from './pages/dashboard/Users';
import IoTSimulator from './pages/dashboard/IoT';
import Blockchain from './pages/dashboard/Blockchain';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<MainDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="iot" element={<IoTSimulator />} />
          <Route path="blockchain" element={<Blockchain />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
