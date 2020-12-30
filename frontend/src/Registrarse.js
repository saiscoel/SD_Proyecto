import React from 'react';
import SellerServices from './service/SellerService';
import CustomerServices from './service/CustomerService';
import {Button} from 'primereact/button'
export class Registrarse extends React.Component{
    constructor(){
        super();
        this.state={
            userx:{
                user:'',
                mail:'',
                passwd:'',
                phone:'',
                direccion:'',
            },
            option:''
        };
        this.sellerServices= new SellerServices();
        this.customerServices=new CustomerServices();
        this.save=this.save.bind(this);
      }

      save(){
          if (this.state.option==="usuario"){
            this.customerServices.save(this.state.userx).then(data => {
                this.setState({
                    userx:{
                        user:'',
                        mail:'',
                        passwd:'',
                        phone:'',
                        direccion:'',
                        tarjeta:'',
                        numeroTarjeta:''
                    }
                });
            })
         }else{
            this.sellerServices.save(this.state.userx).then(data => {
                this.setState({
                    userx:{
                        user:'',
                        mail:'',
                        passwd:'',
                        phone:'',
                        direccion:'',
                        productList:[]
                    }
                });
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
                <h1>Registrarse</h1>
                <div class="main-agilerow"> 
                    <div class="signup-wthreetop">
                        <h2>Bienvenido al Registro</h2>
                        <p>Debe llenar todos los campos. </p>
			        </div>
                    <div className="contact-wthree">
                        <form id="userx-form" onSubmit={this.save} >
                            
                            <h3>Paso 1 :</h3>
                            <div className="form-w3step1">
                                <input type="email" className="email agileits-btm" name="Email" placeholder="Email"  
                                    value={this.state.userx.mail} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let userx = Object.assign({},prevState.userx);
                                            userx.mail=val;
                                            return {userx};
                                        })}
                                    }required/> 
                            </div> 
                            <h3>Paso 2 :</h3>
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
                            <h3>Paso 3 :</h3>
                            <div className="form-w3step1 w3ls-formrow">
                                <input type="text" name="Number" placeholder="Número de Teléfono"  
                                    value={this.state.userx.phone} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let userx = Object.assign({},prevState.userx);
                                            userx.phone=val;
                                            return {userx};

                                        })}
                                    }required/>
                            </div>
                            <h4>Paso 4 :</h4>
                            <div className="tipo">
                                <selected required>
                                <p>Tipo:
                                    Usuario <input type = "radio" name = "ice" value = "usuario"
                                    onChange={(e) =>{
                                        let val=e.target.value;
                                        this.setState(prevOpt => {
                                            let option = Object.assign('',prevOpt.option);
                                            option=val;
                                            return{option};
                                    })}
                                    }/>  
                                    Vendedor <input type = "radio" name = "ice" value = "vendedor"
                                    onChange={(e) =>{
                                        let val=e.target.value;
                                        this.setState(prevOpt => {
                                            let option = Object.assign('',prevOpt.option);
                                            option=val;
                                            return{option};
                                    })}
                                    }/> 
                                </p>
                                </selected>
                            </div>
                                
                            <div className="w3ls-formrow2">
                                <input type="checkbox" id="brand2" value=""required/>
                                <label for="brand2" class="text-light"><span></span>Aceptar Terminos y Condiciones</label> 
                            </div>  
                            <Button  label="ENVIAR" id="btn_enviar" type= "submit" ></Button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
