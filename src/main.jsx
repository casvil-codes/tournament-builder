import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";

import { Home } from './views/Home/Home.jsx';
import { Admin } from './views/Admin/Admin.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
