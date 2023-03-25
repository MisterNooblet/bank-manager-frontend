import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Account, Accounts, Error404, Home, Layout, Transaction, Transactions, User, Users } from "./pages";
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/accounts', element: <Accounts /> },
        { path: '/accounts/:id', element: <Account /> },
        { path: '/users', element: <Users /> },
        { path: '/users/:id', element: <User /> },
        { path: '/transactions', element: <Transactions /> },
        { path: '/transactions/:id', element: <Transaction /> },
      ]

    },

  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
