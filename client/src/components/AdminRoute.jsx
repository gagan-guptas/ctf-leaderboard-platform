import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
