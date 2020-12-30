package com.example.Process.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "Seller") //necesario si se quiere entrar a mas campos de la base de datos, si no quitar @id, y todos los atributos, menos id
public class Seller {
    @Id
    private String user;
    private String mail;
    private String passwd;
    private String phone;
    private String direccion;
    private List<Integer> productList;

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public List<Integer> getProductList() {
        return productList;
    }

    public void setProductList(List<Integer> productList) {
        this.productList = productList;
    }

    @Override
    public String toString() {
        return "Vendedor:" + '\'' +
                ", usuario='" + user + '\'' +
                ", teléfono='" + phone + '\'' +
                ", dirección='" + direccion;
    }

}
