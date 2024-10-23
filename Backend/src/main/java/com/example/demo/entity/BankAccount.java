package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Account")
public class BankAccount {

    //define fields
    @Id //@Id is your primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // GeneratedValue is for your increasing id# :
    //GenerationType.IDENTITY tells it that the DB is doing the increase
    @Column(name="id")
    private int id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="email")
    private String email;

    @Column(name="Amount_In_Account")
    private int Amount_In_Account;

    @Column(name="loan_amount")
    private int loan_amount;

    @Column(name="interest_rate")
    private double interest_rate;

    //define constructors

    public BankAccount(String firstName, String lastName, String email, int Amount_In_Account,
                       int loan_amount, double interest_rate) {
        //right-click and choose generate then constructor
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.Amount_In_Account = Amount_In_Account;
        this.loan_amount = loan_amount;
        this.interest_rate = interest_rate;
    }

    public BankAccount(){

    }

    //define getters/setter


    public int getAmount_In_Account() {
        return Amount_In_Account;
    }

    public void setAmount_In_Account(int amount_In_Account) {
        Amount_In_Account = amount_In_Account;
    }

    public int getLoan_amount() {
        return loan_amount;
    }

    public void setLoan_amount(int loan_amount) {
        this.loan_amount = loan_amount;
    }

    public double getInterest_rate() {
        return interest_rate;
    }

    public void setInterest_rate(double interest_rate) {
        this.interest_rate = interest_rate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    //define toString(); method


    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", firstName='" + firstName +'\''+
        ", lastName='" + lastName + '\'' +
        ", email='" + email + '\'' +
        '}';
    }
}
