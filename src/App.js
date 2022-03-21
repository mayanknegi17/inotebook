import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Custom components
import LoginPage from "./Pages/LoginPage/LoginPage";
import * as AppConstants from "./Constants/AppContants";

// Styles
import "./Styles/main.scss";
import Navbar from "./Component/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/Home/About";
import NoteState from "./Context/notes/NoteState";
import Signup from "./Pages/LoginPage/Signup";
import Login from "./Pages/LoginPage/Login";
import Alert from "./Component/Alert";

function App() {
    React.useEffect(() => {
        document.title = AppConstants.APP_NAME;
    }, []);

    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 10000);
    }

    return (
        <>
            <NoteState>
                <Router>
                    <Navbar />
                    <Alert alert={alert} />
                    {/* <div className="container"> */}
                        <Switch>
                            <Route exact path="/">
                                <Home showAlert={showAlert} />
                            </Route>
                            <Route exact path="/about">
                                <About />
                            </Route>
                            <Route exact path="/login">
                                <Login showAlert={showAlert} />
                            </Route>
                            <Route exact path="/signup">
                                <Signup showAlert={showAlert} />
                            </Route>
                        </Switch>
                    {/* </div> */}

                    {/* <LoginPage /> */}
                </Router>
            </NoteState>
        </>
    );
}

export default App;
