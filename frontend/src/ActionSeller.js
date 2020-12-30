import React from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ProductServices from './service/ProductServices';
import SellerServices from './service/SellerService';
import CustomerServices from './service/CustomerService';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import {Panel} from 'primereact/panel';
var pageURL = window.location.href;
var usuario = pageURL.substr(pageURL.lastIndexOf('/') + 1);

export class ActionSeller extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userx:{},
      activeIndex:0,
      productsT:[],
      products:[],
      ids:[],
      selected:{}
    };

    this.items = [
        {
            label: 'Mis Datos',
            command: (event) => {
                document.getElementById("proceso-datos").style.display='inline';
                document.getElementById("proceso-productos").style.display='none';
                document.getElementById("proceso-edit").style.display='none';
                
            }
        },
        {
            label: 'Seleccionar Productos',
            command: (event) => {
                document.getElementById("proceso-productos").style.display='inline';
                document.getElementById("proceso-datos").style.display='none';
                document.getElementById("proceso-edit").style.display='none';                
            }
        },
        {
            label: 'Producto Seleccionado',
            command: (event) => {
                document.getElementById("proceso-productos").style.display='none';
                document.getElementById("proceso-datos").style.display='none';
                document.getElementById("proceso-edit").style.display='inline';                
            }
        }
    ];
    this.sellerServices= new SellerServices();
    this.productServices = new ProductServices();
    this.itemTemplate = this.itemTemplate.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.customerServices = new CustomerServices();
  };

  componentDidMount(){
        let idsx=[]
        let arr=[]
        this.sellerServices.getOne(usuario).then(data =>{
            this.setState({userx:data})
            idsx.push(data.productList);
        })
        if (idsx[0]!==null){
        this.productServices.getAll().then(data =>{
            data.forEach(function(a){
                idsx[0].forEach(function(i){
                    console.log(i)            
                    if(a.id===i){
                        arr.push(a);
                    }
            })
        })

        })}
    this.setState({ids:idsx})    
    this.setState({products:arr})
        
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.setState({
            sortOrder: -1,
            sortField: value.substring(1, value.length),
            sortKey: value
        });
    }
    else {
        this.setState({
            sortOrder: 1,
            sortField: value,
            sortKey: value
        });
    }
}
  renderListItem(data) {
    return (
        <div className="p-col-12">
            <div className="product-details">
                      <div className="p-grid">
                          <div className="p-col-12">id: <b>{data.id}</b></div>
                          <div className="p-col-12">name: <b>{data.name}</b></div>
                          <div className="p-col-12">price: <b>{data.price}</b></div>
                          <div className="p-col-12">description: <b>{data.description}</b></div>
                          <div className="p-col-12">stock: <b>{data.stock}</b></div>
                      </div>
                  <Button type="submit" label="EDITAR" className="googles-cart pgoogles-cart" onClick={(e) => {
                      this.setState({ selected: data })
                      this.setState({activeIndex:2})
                      document.getElementById("proceso-datos").style.display='none';
                      document.getElementById("proceso-productos").style.display='none';
                      document.getElementById("proceso-edit").style.display='inline';
                  }}></Button>
            </div>
        </div>
    );
}

renderGridItem(data) {
    return (
        <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
            <Panel header={data.id} style={{ textAlign: 'center' }}>
                <div className="p-col-12">id: <b>{data.id}</b></div>
                <div className="p-col-12">name: <b>{data.name}</b></div>
                <div className="p-col-12">price: <b>{data.price}</b></div>
                <div className="p-col-12">description: <b>{data.description}</b></div>
                <div className="p-col-12">stock: <b>{data.stock}</b></div>
                <Button type="submit" label="EDITAR" className="googles-cart pgoogles-cart"onClick={(e) => {
                      this.setState({ selected: data })
                      this.setState({activeIndex:2})
                      document.getElementById("proceso-datos").style.display='none';
                      document.getElementById("proceso-productos").style.display='none';
                      document.getElementById("proceso-edit").style.display='inline';
                  }}></Button>                
            </Panel>
        </div>
    );
    
}
itemTemplate(product,layout) {
    if (!product) {
      return;
  }    
    if (layout === 'list') {
      return this.renderListItem(product);
    }
    if (layout === 'grid') {
      return this.renderGridItem(product);
    }
}

renderHeader() {
  const sortOptions = [
      {label: 'Mayor Precio', value: '!price'},
      {label: 'Menor Precio', value: 'price'},
      {label: 'Nombre', value: 'name'}
  ];

  return (
    <div className="p-grid">
        <div className="p-col-6" style={{textAlign: 'left'}}>
            <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} style={{width: '12em'}} />
        </div>
        <div className="p-col-6" style={{textAlign: 'left'}}>
            <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
        </div>
    </div>
  );
}

 
 render(){
    const header = this.renderHeader();
    return(
    <div>       
        <div>        
            <div className="card">
                    <h1>Administracion del vendedor</h1>
                    <Steps model={this.items} activeIndex={this.state.activeIndex} onSelect={(e) => this.setState({ activeIndex: e.index })} readOnly={false} />
                </div>
            </div>

            <div id="proceso-datos"  className="card">
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

                        </div>    
                        <Button  label="ACTUALIZAR" id="btn_enviar" type= "submit" onClick={(e)=>{
                            this.sellerServices.update(this.state.userx)
                            this.setState({activeIndex:1})
                            document.getElementById("proceso-datos").style.display='none';
                            document.getElementById("proceso-productos").style.display='inline';
                            document.getElementById("proceso-edit").style.display='none';
                            }}></Button>    
            </div>
            <div id="proceso-productos" hidden>
            <div class="container"  >
                <div className="dataview-demo">
                    <DataView value={this.state.products} layout={this.state.layout} header={header}
                        itemTemplate={this.itemTemplate} aginator={true} paginatorPosition={'both'} p rows={20}
                        sortOrder={this.state.sortOrder} sortField={this.state.sortField} 
                    />
                </div>
            </div>
            </div>
            <div id="proceso-edit"  className="card" hidden>
                    <div className="p-fluid"> 
                            <div className="p-field p-col-12 p-md-4">
                                <span className="p-float-label">
                                    <label type="text" name="User Name" className="p-col-20 p-md-20" placeholder="Username"  
                                        value={usuario}>ID: {this.state.selected.id}</label>
                                </span>
                            </div>

                            <div className="p-field p-col-12 p-md-4">
                            <span className="p-float-label">
                                <InputText id="name" value={this.state.selected.name} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let selected = Object.assign({},prevState.selected);
                                            selected.name=val;
                                            return {selected};

                                        })}
                                    }required/>
                                <label htmlFor="inputtext"className="p-col-20 p-md-20">Nombre: </label>
                            </span>
                            </div>

                            <div className="p-field p-col-12 p-md-4">
                            <span className="p-float-label">
                                <InputNumber id="price" currency="USD"  value={this.state.selected.price} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let selected = Object.assign({},prevState.selected);
                                            selected.price=val;
                                            return {selected};

                                        })}
                                    }required/>
                                <label htmlFor="inputtext"className="p-col-20 p-md-20">Precio: </label>
                            </span>
                            </div>

                            <div className="p-field p-col-12 p-md-4">
                            <span className="p-float-label">
                                <InputTextarea rows={5} cols={30} id="description" value={this.state.selected.description} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let selected = Object.assign({},prevState.selected);
                                            selected.description=val;
                                            return {selected};

                                        })}
                                    }required/>
                                <label htmlFor="inputtext"className="p-col-20 p-md-20">Descripcion: </label>
                            </span>
                            </div>

                            <div className="p-field p-col-12 p-md-4">
                            <span className="p-float-label">
                                <InputNumber id="stock"  value={this.state.selected.stock} 
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        this.setState(prevState => {
                                            let selected = Object.assign({},prevState.selected);
                                            selected.stock=val;
                                            return {selected};

                                        })}
                                    }required/>
                                <label htmlFor="inputtext"className="p-col-20 p-md-20">stock: </label>
                            </span>
                            </div>
                            <div className="p-field p-col-12 p-md-4">
                            <Button  label="ACTUALIZAR" id="btn_enviar"  type= "submit" onClick={(e)=>{
                                this.productServices.update(this.state.selected)
                                this.setState({activeIndex:0})
                                this.setState({selected:{}})
                                document.getElementById("name").value=""
                                document.getElementById("description").value=""
                                document.getElementById("stock").value=""
                                document.getElementById("price").value=""
                                document.getElementById("proceso-datos").style.display='inline'
                                document.getElementById("proceso-productos").style.display='none'
                                document.getElementById("proceso-edit").style.display='none'
                            }}></Button>
                                
                            </div>                            
                </div>
            </div>
    </div>
    )
}
}