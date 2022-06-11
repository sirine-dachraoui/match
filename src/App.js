// import logo from './logo.svg';
import { BrowserRouter , Routes, Route} from "react-router-dom";

import Welcome from './components/welcome/welcome'
import Navbar from './components/navbar/navbar'
import Form from './components/form/form'
import DataTable from './components/data-table/data-table'

import './App.scss';

function App() {
  return (
    <div className="App">
     

      <BrowserRouter>
        <header >
          <Navbar></Navbar>
        </header>
        <Routes>
          <Route path='/' element={<Welcome/>} ></Route>
          <Route path='add-match' element={<Form/>}></Route>
          <Route path='matches' element={<DataTable/>}></Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
