
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage';
import './App.css';




function App() {
  return (


    <div className='vh-100 gradient-custom'>
      <div className='container'>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<IndexPage />}></Route>
            <Route path='/create' element={<CreatePage />}></Route>
            <Route path='/edit/:id' element={<EditPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;
