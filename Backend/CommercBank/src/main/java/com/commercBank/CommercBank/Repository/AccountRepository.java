package com.commercBank.CommercBank.Repository;

import com.commercBank.CommercBank.Domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import com.commercBank.CommercBank.Domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long > {

    Optional<Account> findByUserId(String userId);

}




