import './styles/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn, Home } from './pages';
import { ProtectedRoute } from './components';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
        <Route path='signin' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
