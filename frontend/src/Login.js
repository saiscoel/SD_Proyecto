import React from 'react';
import SellerServices from './service/SellerService';
import CustomerServices from './service/CustomerService';
import {Button} from 'primereact/button'
//import {Link} from 'react-dom'

export class Login extends React.Component{
    constructor(){
        super();
        this.state={
            userx:{
                user:'',
                passwd:''
            },
            opcion:'',
            realuser:'',
            link:``


        };
        this.getOne=this.getOne.bind(this);
        this.sellerServices= new SellerServices();
        this.customerServices=new CustomerServices();
      }
      
      //componentDidMount(){this.customerServices.getOne().then(data =>this.setState({customer:data}))}

      getOne(){
        if (this.state.opcion==="usuario"){
            this.customerServices.getOne(this.state.userx.user).then(data =>{
                if(data.user===this.state.userx.user && data.passwd===this.state.userx.passwd){
                    //document.getElementById('perfil').innerHTML=data.user;
                    window.open(`http://localhost:8080/login/products/${data.user}`);
                    
                }else{
                    alert("error");
                }
            })
       }else{
            this.sellerServices.getOne(this.state.userx.user).then(data => {
                if(data.user===this.state.userx.user && data.passwd===this.state.userx.passwd){
                    window.open(`http://localhost:8080/login/products/seller/${data.user}`); 
                }else{
                    alert("error");
                }
            })
          }
       }
    
       
      
      render(){
        return(
        <div>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <link href="css/style_resgitrar.css" rel="stylesheet" type="text/css" media="all" />
            <link href="//fonts.googleapis.com/css?family=Old+Standard+TT:400,400i,700" rel="stylesheet"/>
            <link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'/>
            <div class="main main-agileits">
                <h1>Iniciar Sesion</h1>
                <div class="main-agilerow"> 
                    <div class="signup-wthreetop">
                        <h2>Bienvenido</h2>
                        <p>Ingrese su Usuario y Contraseña. </p>
			        </div>
                    <div className="contact-wthree">
                            <h3>Credenciales :</h3>
                            <div className="form-w3step1">  
                                <input type="text" name="User Name" placeholder="Username"  
                                    value={this.state.userx.user} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let userx = Object.assign({},prevState.userx);
                                            userx.user=val;
                                            return {userx};
                                        })}
                                    }required/>
                                <input type="password" name="Password" placeholder="Password" 
                                    value={this.state.userx.passwd} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let userx = Object.assign({},prevState.userx);
                                            userx.passwd=val;
                                            return {userx};
                                        })}
                                    }required/>
                            </div>
                            <h4>Verificar usuario :</h4>
                            <div className="tipo">
                                <p>Tipo:
                                    Usuario <input type = "radio" name = "ice" value = "usuario"
                                    onChange={(e) =>{
                                        let val=e.target.value;
                                        this.setState(prevOpt => {
                                            let opcion = Object.assign('',prevOpt.opcion);
                                            opcion=val;
                                            return{opcion};
                                    })}
                                    }/>  
                                    Vendedor <input type = "radio" name = "ice" value = "vendedor"
                                    onChange={(e) =>{
                                        let val=e.target.value;
                                        this.setState(prevOpt => {
                                            let opcion = Object.assign('',prevOpt.opcion);
                                            opcion=val;
                                            return{opcion};
                                    })}
                                    }/> 
                                </p>
                            </div>

                            <Button  label="ENVIAR" id="btn_enviar" type= "submit" onClick={this.getOne} ></Button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
