import React from 'react';
import {Products} from "./Products";
import {Registrarse} from "./Registrarse";
import {Proceso} from "./Proceso";
import {ActionSeller} from "./ActionSeller";
import {Login} from "./Login";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

class App extends React.Component{
  constructor(){
    super();
    this.state={
    };
  }
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/login/products/seller/:user" component={ActionSeller}/>
          <Route path="/login/products/:user" component={Proceso}/> 
          <Route path="/registrarse" component={Registrarse}/>
          <Route path="/login" component={Login}/>
          <Route path="/" component={Products}/>
          <Route path="/products"component={Products}/>
        </Switch>
      </Router>
    )
  }

}
export default App;