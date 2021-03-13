import './App.css';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import User from "./components/Blog/user";
import Write from "./components/Blog/Write";
import PayCheck from "./components/Blog/PayCheck";


function App() {
  return (
    <div>

        <BrowserRouter>
            <Switch>
                <Route exact path = '/' component = {Register}/>
                <Route exact path = '/login' component = {Login}/>
                <Route exact path = '/user' component = {User}/>
                <Route exact path = '/write' component = {Write}/>
                <Route exact path = '/:data' component = {PayCheck}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
