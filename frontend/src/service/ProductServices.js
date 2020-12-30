import axios from 'axios';

 class ProductServices{
    baseUrl = "http://localhost:8083/product/"; 
    getAll(){
        return axios.get(this.baseUrl+"findAllProducts").then(res =>res.data);
    }
    getOne(id){
        return axios.get(this.baseUrl+"/findAllProduct/"+id).then(res =>res.data);
    }

    update(customer) {
        return axios.put(this.baseUrl + "updateCustomer", customer).then(res => res.data);
    }

    update(product){
        return axios.put(this.baseUrl+"updateProduct",product).then(res => res.data);
    }
}
export default ProductServices;