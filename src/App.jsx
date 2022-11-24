import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.scss';
import Homepage from "./pages/Homepage/Homepage";
import Posts from "./pages/Posts/Posts";
import Header from "./components/Header/Header";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Header/>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/posts' element={<Posts/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
};

export default App;
