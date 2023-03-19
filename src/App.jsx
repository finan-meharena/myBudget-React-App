
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { logoutAction } from "./actions/logout";


// Library Import 
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// layout
import Main, { mainLoader } from "./layouts/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensePageAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetLoader, budgetPageAction } from "./pages/BudgetPage";
import deleteBudget from "./actions/deleteBudget";
import Intro from "./components/Intro";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    loader : mainLoader, 
    errorElement: <Error></Error>, 
    children: [
      {
        index: true,
        path: "/",
        element:<Dashboard></Dashboard>,
        loader : dashboardLoader,
        action: dashboardAction
      }, 
      {
        path: "expenses",
        element:<ExpensesPage></ExpensesPage>,
        loader : expensesLoader,
        action: expensePageAction
      },
      {
        path: "budget/:id",
        element:<BudgetPage></BudgetPage>,
        loader: budgetLoader,
        action : budgetPageAction, 
        children : [
          {
            path : "delete",
            action : deleteBudget,
            // element : <p>Deleted</p>
          }
        ]
      }, 
      {
        path:"logout",
        action: logoutAction
      }
    ]
  },

  {
    path: "/about",
    element: <h1>About</h1>
  },
  {
    path:"*",
    element : <Error></Error>
  }
]);


function App() {

  return (
    <div className="App">
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
