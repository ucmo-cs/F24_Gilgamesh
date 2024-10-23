package com.example.demo.dao;

import com.example.demo.entity.BankAccount;

import java.util.List;

public interface AccountDAO {
    void save(BankAccount theBankAccount);

    BankAccount findById(Integer id);

    List<BankAccount> findAll();

    List<BankAccount> findByLastName(String theLastName);

    void update(BankAccount theBankAccount);
}
