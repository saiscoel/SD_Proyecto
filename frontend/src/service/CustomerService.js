import axios from 'axios';

 class CustomerService{
    baseUrl = "http://localhost:8083/customer/"; 

    getAll(){
        return axios.get(this.baseUrl + "findAllCustomer").then(res => res.data);
    }

    save(customer) {
        return axios.post(this.baseUrl + "addCustomer", customer).then(res => res.data);
    }

    getOne(id){
        return axios.get(this.baseUrl+"/findCustomer/"+id).then(res =>res.data);
    }

    update(customer) {
        return axios.put(this.baseUrl + "updateCustomer", customer).then(res => res.data);
    }

}
export default CustomerService;