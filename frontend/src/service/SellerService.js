import axios from 'axios';

 class SellerServices{
    baseUrl = "http://localhost:8083/seller/"; 

    getAll(){
        return axios.get(this.baseUrl + "findAllSeller").then(res => res.data);
    }

    save(seller) {
        return axios.post(this.baseUrl + "addSeller", seller).then(res => res.data);
    }

    getOne(id){
        return axios.get(this.baseUrl+"/findAllSeller/"+id).then(res =>res.data);
    }

    update(seller) {
        return axios.put(this.baseUrl + "updateSeller", seller).then(res => res.data);
    }
    
}
export default SellerServices;