import React from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ProductServices from './service/ProductServices';
import CustomerServices from './service/CustomerService';
import { InputText } from 'primereact/inputtext';
import { Steps } from 'primereact/steps';
import { PickList } from 'primereact/picklist';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { OrderList } from 'primereact/orderlist';

var pageURL = window.location.href;
var usuario = pageURL.substr(pageURL.lastIndexOf('/') + 1);

export class Proceso extends React.Component{
  constructor(props){
    super(props);
    this.state={
      activeIndex: 0,
      pago:0,
      source:[],
      target:[],
      userx:{
        user:'',
        mail:'',
        passwd:'',
        phone:'',
        direccion:'',
        tarjeta:'',
        numeroTarjeta:''
    }
    };

    this.items = [
        {
            label: 'Productos',
            command: (event) => {
                document.getElementById("proceso-productos").style.display='inline';
                document.getElementById("proceso-datos").style.display='none';
                document.getElementById("proceso-pago").style.display='none';
                document.getElementById("proceso-confirmacion").style.display='none';
            }
        },
        {
            label: 'Datos Personales',
            command: (event) => {
                document.getElementById("proceso-productos").style.display='none';
                document.getElementById("proceso-datos").style.display='inline';
                document.getElementById("proceso-pago").style.display='none';
                document.getElementById("proceso-confirmacion").style.display='none';
            }
        },
        {
            label: 'Pago',
            command: (event) => {
                this.suma();
                document.getElementById("proceso-productos").style.display='none';
                document.getElementById("proceso-datos").style.display='none';
                document.getElementById("proceso-pago").style.display='inline';
                document.getElementById("proceso-confirmacion").style.display='none';
            }
        },
        {
            label: 'Confirmacion',
            command: (event) => {
                document.getElementById("proceso-productos").style.display='none';
                document.getElementById("proceso-datos").style.display='none';
                document.getElementById("proceso-pago").style.display='none';
                document.getElementById("proceso-confirmacion").style.display='inline';
            }
        }
    ];

    this.productServices = new ProductServices();
    this.itemTemplate = this.itemTemplate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.customerServices = new CustomerServices();
    this.suma = this.suma.bind(this);
    this.resta=this.resta.bind(this);
   
  }
  componentDidMount(){
      this.productServices.getAll().then(data =>this.setState({source:data}))
        this.customerServices.getOne(usuario).then(data => this.setState({userx:data}))        
   }

  onChange(event) {
    this.setState({
        source: event.source,
        target: event.target
    });
  }
 itemTemplate(data) {
    return (
        <div className="product-item">
            <div className="image-container">
            </div>
            <div className="product-list-detail">
                <h5 className="p-mb-2">{data.name}</h5>
                <i className="pi pi-tag product-category-icon"></i>
                <span className="product-category">{data.description}</span>
            </div>
            <div className="product-list-action">
                <h4 className="p-mb-2">${data.price}</h4>
            </div>
        </div>
    );
 }

 suma(){
    let suma=0;
    this.setState({pago:0});
    //for(let i of numeros)
     if(this.state.target!==null){
     this.state.target.forEach(function(a){suma+=a.price;})
     this.setState({pago:suma});
     }
 }

 resta(){
    this.state.target.forEach(function(a){
        let s=a.stock
        let snw=s-1
        a.stock=snw;
    })
 }


 render(){
    return(
        <div>
            <div>        
                <div className="card">
                    <h1>Proceso de Compra</h1>
                    <Steps model={this.items} activeIndex={this.state.activeIndex} onSelect={(e) => this.setState({ activeIndex: e.index })} readOnly={false} />
                </div>
            </div>

            <div id="proceso-productos" class="container" >
                <div className="card">
                    <PickList source={this.state.source} target={this.state.target} itemTemplate={this.itemTemplate}
                        sourceHeader="Productos" targetHeader="Seleccionado"
                        sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }}
                        onChange={this.onChange}></PickList>
                </div>
            </div>

            <div id="proceso-datos"  className="card" hidden>
                            <div className="p-fluid"> 
                            <div className="p-field p-col-12 p-md-4">
                                <span className="p-float-label">
                                    <label type="text" name="User Name" className="p-col-20 p-md-20" placeholder="Username"  
                                        value={usuario}>Usuario: {usuario}</label>
                                </span>
                            </div>
                            <div className="p-field p-col-12 p-md-4">
                                <span className="p-float-label">
                                    <label type="text" name="User Name" className="p-col-20 p-md-20" placeholder="Username"  
                                        >Mail: {this.state.userx.mail}</label>
                                </span>
                            </div>

                            <div className="p-field p-col-12 p-md-4">
                            <span className="p-float-label">
                                <InputText id="direccion" value={this.state.userx.direccion} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let userx = Object.assign({},prevState.userx);
                                            userx.direccion=val;
                                            return {userx};

                                        })}
                                    }required/>
                                <label htmlFor="inputtext"className="p-col-20 p-md-20">Direccion de domicilio</label>
                            </span>
                            </div>

                            <div className="p-field p-col-12 p-md-4">
                            <span className="p-float-label">
                                <InputNumber id="numero"  useGrouping={false} value={this.state.userx.phone} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let userx = Object.assign({},prevState.userx);
                                            userx.phone=val;
                                            return {userx};

                                        })}
                                    }required/>
                                <label htmlFor="inputtext"className="p-col-20 p-md-20">Numero de Contacto (Prefijo)</label>
                            </span>
                            </div>

                            <div className="p-field p-col-12 p-md-4">
                            <span className="p-float-label">
                                <InputNumber id="tarjeta" useGrouping={false} value={this.state.userx.numeroTarjeta} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let userx = Object.assign({},prevState.userx);
                                            userx.numeroTarjeta=val;
                                            return {userx};

                                        })}
                                    }required/>
                                <label htmlFor="inputtext"className="p-col-20 p-md-20">Numero de Tarjeta</label>
                            </span>
                            </div>
                            </div>
                        <Button  label="ACTUALIZAR" id="btn_enviar" type= "submit" onClick={(e) => {
                            this.customerServices.update(this.state.userx)
                            this.setState({activeIndex:2})
                            this.suma()
                            document.getElementById("proceso-productos").style.display='none';
                            document.getElementById("proceso-datos").style.display='none';
                            document.getElementById("proceso-pago").style.display='inline';
                            document.getElementById("proceso-confirmacion").style.display='none';
                            }}></Button>    
            </div>

            <div id="proceso-pago"  className="card" hidden >
                <div className="orderlist-demo">
                    <div className="card">
                        <OrderList value={this.state.target} header="Lista de Productos" dragdrop listStyle={{height:'auto'}} dataKey="id"
                            itemTemplate={this.itemTemplate} onChange={(e) => this.setState({ products: e.value })}></OrderList>
                    </div>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <span className="p-float-label">
                            <h3 type="text" name="pago" className="p-col-20 p-md-20" placeholder="Username"  
                                    >Total a pagar: {this.state.pago}</h3>
                    </span>
                </div>
            </div>

            <div id="proceso-confirmacion"  hidden >
            <div className="p-fluid "> 
                        <div>
                            <div className="p-col-4">
                                <span >
                                    <label type="text" name="User Name" className="p-mb-3 p-text-italic"  placeholder="Username"  
                                        value={usuario}>Usuario: {usuario}</label>
                                </span>
                            </div>
                            <div className="p-col-4">
                                <span >
                                    <label type="text" name="User Name" className="p-mb-3 p-text-italic"placeholder="Username"  
                                        >Mail: {this.state.userx.mail}</label>
                                </span>
                            </div>
                            <div className=" p-col-4 ">
                                <span >
                                    <label type="text" name="User Name" className="p-mb-3 p-text-italic" placeholder="Username"  
                                        >Direccion: {this.state.userx.direccion}</label>
                                </span>
                            </div>
                            <div className=" p-col-4 ">
                                <span >
                                    <label type="text" name="User Name"  className="p-mb-3 p-text-italic" placeholder="Username"  
                                        >Numero de contacto: {this.state.userx.phone}</label>
                                </span>
                            </div>
                            <div className="p-col-4">
                                <span >
                                    <label type="text" name="User Name"  className="p-mb-3 p-text-italic" placeholder="Username"  
                                        >Numero de Tarjeta: {this.state.userx.numeroTarjeta}</label>
                                </span>
                            </div>
                        </div>

                            <div className="orderlist-demo p-md-4">
                                <div className="card">
                                    <OrderList value={this.state.target} header="Lista de Productos" dragdrop listStyle={{height:'auto'}} dataKey="id"
                                        itemTemplate={this.itemTemplate} onChange={(e) => this.setState({ products: e.value })}></OrderList>
                                </div>
                            </div>
                            <div className="p-field p-col-12 p-md-4">
                                <span className="p-float-label">
                                        <h3 type="text" name="pago" className="p-col-20 p-md-20" placeholder="Username"  
                                                >Total a pagar: {this.state.pago}</h3>
                                </span>
                            </div>
                            <div className="p-field p-col-5 p-md-4" >
                            <Button   label="PAGAR" id="btn_enviar" type= "submit" onClick={(e)=>{
                                this.setState({target:null})
                                this.setState({activeIndex:0})
                                document.getElementById("proceso-productos").style.display='inline';
                                document.getElementById("proceso-datos").style.display='none';
                                document.getElementById("proceso-pago").style.display='none';
                                document.getElementById("proceso-confirmacion").style.display='none';
                                this.resta()}}></Button> 
                            </div>
        </div>
        </div>
    </div>
    )
}
}