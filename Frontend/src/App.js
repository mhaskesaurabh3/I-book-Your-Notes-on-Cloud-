import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Fragment } from 'react';
import About from './Components/About';
import NoteState from './context/notes/noteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import Alert from './Components/Alert';



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Fragment>
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />} >
                </Route>
                <Route exact path="/about" element={<About showAlert={showAlert} />}>
                </Route>
                <Route exact path="/login" element={<Login showAlert={showAlert} />}>
                </Route>
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />}>
                </Route>
              </Routes>
            </Fragment>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
