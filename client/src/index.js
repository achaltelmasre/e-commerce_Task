import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './views/Home/Home';
import Orders from './views/Orders/Orders';
import Buypage from './views/Buypage/Buypage';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
},
{
    path:'/signup',
    element: <Signup/>
},
{
    path:'/login',
    element:<Login/>
},
{
    path:'/orders',
    element:<Orders/>
},
{
    path:'/buy/:id',
    element:<Buypage/>
}
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router= {router} />);