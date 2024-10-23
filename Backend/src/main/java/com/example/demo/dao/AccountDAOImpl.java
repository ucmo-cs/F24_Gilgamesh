package com.example.demo.dao;

import com.example.demo.entity.BankAccount;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository //@Repository is an annotation used to indicate that a class is a repository
public class AccountDAOImpl implements AccountDAO {

    //define field for entity manger
    private EntityManager entityManager;

    //inject entity manager using constructor injection
    @Autowired //@Autowired is one of the core annotations in Spring, used for automatic dependency injection
    public AccountDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    //implement save method
    @Override
    @Transactional
//@Transactional annotation is metadata that specifies that an interface, class, or method must have transactional semantics
    public void save(BankAccount theBankAccount) {
        entityManager.persist(theBankAccount);//save to the database
    }

    @Override
    public BankAccount findById(Integer id) {
        return entityManager.find(BankAccount.class, id);
    }

    @Override
    public List<BankAccount> findAll() {

        // create query
        TypedQuery<BankAccount> theQuery = entityManager.createQuery("FROM BankAccount ", BankAccount.class);
        // from student prints all students in the order they were input. order by last name prints by last name by A-Z

        //return query results

        return theQuery.getResultList();
    }

    @Override
    public List<BankAccount> findByLastName(String theLastName) {

        //create query
        TypedQuery<BankAccount> theQuery = entityManager.createQuery("From BankAccount " +
                "WHERE lastName =:theData", BankAccount.class);

        //set query parameters
        theQuery.setParameter("theData", theLastName);// can pass in any parameter for last not and not just 'Doe'

        //return query results
        return theQuery.getResultList();
    }

    @Override
    @Transactional
    public void update(BankAccount theStudent) {
        entityManager.merge(theStudent); //updates the student any field last name, first name etc
    }
}
