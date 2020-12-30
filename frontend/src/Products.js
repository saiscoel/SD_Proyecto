import React from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ProductServices from './service/ProductServices';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import {Panel} from 'primereact/panel';
export class Products extends React.Component{
  constructor(){
    super();
    this.state={
      layout:'grid',
      selectedProduct:{}
      
    };

    this.productServices = new ProductServices();
    this.itemTemplate = this.itemTemplate.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }
  componentDidMount(){this.productServices.getAll().then(data =>this.setState({products:data}))}
  
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
              <form action={`http://localhost:8080/login`} >
                      <div className="p-grid">
                          <div className="p-col-12">id: <b>{data.id}</b></div>
                          <div className="p-col-12">name: <b>{data.name}</b></div>
                          <div className="p-col-12">price: <b>{data.price}</b></div>
                          <div className="p-col-12">description: <b>{data.description}</b></div>
                          <div className="p-col-12">stock: <b>{data.stock}</b></div>
                      </div>
                  <button type="submit" className="googles-cart pgoogles-cart" onSubmit={data.id}>Comprar</button>
                </form>
            </div>
        </div>
    );
}

renderGridItem(data) {
    return (
        <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
          <form action={`http://localhost:8080/login`} >
            <Panel header={data.id} style={{ textAlign: 'center' }}>
                <div className="p-col-12">id: <b>{data.id}</b></div>
                <div className="p-col-12">name: <b>{data.name}</b></div>
                <div className="p-col-12">price: <b>{data.price}</b></div>
                <div className="p-col-12">description: <b>{data.description}</b></div>
                <div className="p-col-12">stock: <b>{data.stock}</b></div>
                <button type="submit" className="googles-cart pgoogles-cart">Comprar</button>                
            </Panel>
            </form>
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
      <header>
        <div class="row">
            <div class="col-md-3 top-info text-left mt-lg-4"></div>
            <div class="col-md-6 logo-w3layouts text-center">
                <h1 class="logo-w3layouts">
                    <a class="navbar-brand" href="http://localhost:8080/products">
                        <img alt="logo" src="images/logo-hadita.png"/> </a>
                </h1>
            </div>
            <div class="col-md-3 top-info-cart text-right mt-lg-4">
                <ul class="cart-inner-info">
                    <li class="button-log">
                        <a class="btn-open" >
                            <span class="fa fa-user" aria-hidden="true"></span>
                        </a>
                    </li>
                    <li class="galssescart galssescart2 cart cart box_1">
                        <form action="#" method="post" class="last">
                            <input type="hidden" name="cmd" value="_cart"/>
                            <input type="hidden" name="display" value="1"/>
                        </form>
                    </li>
                </ul>
                <div class="overlay-login text-left">
                    <button type="button" class="overlay-close1">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="wrap">
                        <h5 class="text-center mb-4">Sesion</h5>
                        <div class="login p-5 bg-dark mx-auto mw-100">

                            <div class="mensaje">
                                <form action="http://localhost:8080/login">
                                  <button type="submit" class="btn btn-primary submit mb-4" href="http://localhost:8080/login" >Iniciar Sesion</button>
                                </form>                                   
                            </div>

                            <div class="mensaje">
                                <p>Si no tiene una cuenta, registrese.</p>
                                <form action="http://localhost:8080/registrarse">
                                  <button type="submit" class="btn btn-primary submit mb-4" href="http://localhost:8080/registrarse" >Registrarse</button>
                                </form>                                   
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

      
      <nav class="navbar navbar-expand-lg navbar-light bg-light top-header mb-2">
          <button class="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon">

              </span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav nav-mega mx-auto">
                  <li class="nav-item active">
                      <a class="nav-link ml-lg-0" href="http://localhost:8080/products">Inicio
                          <span class="sr-only">(current)</span>
                      </a>
                  </li>
                  
                  <li class="nav-item">
                      <a class="nav-link" href="about.html">Quienes somos</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="contact.html">Contactenos</a>
                  </li>
              </ul>

          </div>
      </nav>
  </header>
  <body>
      <div>
        <div class="banner">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
              </ol>
              <div class="carousel-inner" role="listbox">
                  <div class="carousel-item active">
                      <div class="carousel-caption text-center">
                          <h3>Men’s eyewear
                              <span>Cool summer sale 50% off</span>
                          </h3>
                      </div>
                  </div>

                  <div class="carousel-item item2">
                      <div class="carousel-caption text-center">
                          <h3>Women’s eyewear
                              <span>Want to Look Your Best?</span>
                          </h3>

                      </div>
                  </div>

                  <div class="carousel-item item3">
                      <div class="carousel-caption text-center">
                          <h3>Men’s eyewear
                              <span>Cool summer sale 50% off</span>
                          </h3>

                      </div>
                  </div>

                  <div class="carousel-item item4">
                      <div class="carousel-caption text-center">
                          <h3>Women’s eyewear
                              <span>Want to Look Your Best?</span>
                          </h3>
                      </div>
                  </div>
              </div>

              <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
              </a>

              <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
              </a>
          </div>
        </div>
        <div className="dataview-demo">
          <DataView value={this.state.products} layout={this.state.layout} header={header}
                  itemTemplate={this.itemTemplate} aginator={true} paginatorPosition={'both'} p rows={20}
                  sortOrder={this.state.sortOrder} sortField={this.state.sortField} 
                  />
        </div>
      </div>
    </body>
    </div>
    )
  }
}
