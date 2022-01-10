import React from "react";
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

function App() {
  React.useEffect(() => {
    document.title = AppConstants.APP_NAME;
  }, []);

    return (
        <>
            <NoteState>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/about">
                                <About />
                            </Route>
                        </Switch>
                    </div>

                    {/* <LoginPage /> */}
                </Router>
            </NoteState>
        </>
    );
}

export default App;
