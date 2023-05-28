import { useEffect } from 'react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { checkAuth } from './features/auth/authSlice';
import { useAppDispatch } from './hooks/redux-hooks';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Header } from './components/Header';
import { PrivateRoute } from './components/PrivateRoute';

import { Timer } from './components/Timer';
import { Tasks } from './pages/Tasks'
// import { NewTicket } from './pages/NewTicket';
// import { Tickets } from './pages/Tickets';
// import { Ticket } from './pages/Ticket';

function App() {

  const dispatch = useAppDispatch();

    useEffect(() => {
      if (localStorage.getItem('token')) {
        dispatch(checkAuth());
      }
  })

  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Timer/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket/>} />
            </Route> */}
            <Route path='/tasks' element={<PrivateRoute />}>
              <Route path='/tasks' element={<Tasks/>} />
            </Route>
            {/* <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
              <Route path='/ticket/:ticketId' element={<Ticket/>} />
            </Route> */}

          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;