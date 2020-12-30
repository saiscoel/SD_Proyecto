package com.example.Process.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Process")
public class Proceso {
    //@Id
    //private int id;
    private String date;
    private String direccion;
    private String phoneCustomer;
    private String phoneSeller;
    private String product;
    private double price;
    private String  customer;
    private String seller;

    /*public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }*/

    public String getDate() {
        return date;
    }

    public void setDate(String date) {this.date = date;}

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getPhoneCustomer() {
        return phoneCustomer;
    }

    public void setPhoneCustomer(String phoneCustomer) {
        this.phoneCustomer = phoneCustomer;
    }

    public String getPhoneSeller() {
        return phoneSeller;
    }

    public void setPhoneSeller(String phoneSeller) {
        this.phoneSeller = phoneSeller;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getSeller() {
        return seller;
    }

    public void setSeller(String seller) {
        this.seller = seller;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Proceso(String date, String direccion, String phoneCustomer, String phoneSeller, String product, double price, String customer, String seller) {
        this.date = date;
        this.direccion = direccion;
        this.phoneCustomer = phoneCustomer;
        this.phoneSeller = phoneSeller;
        this.product = product;
        this.price = price;
        this.customer = customer;
        this.seller = seller;
    }
}
