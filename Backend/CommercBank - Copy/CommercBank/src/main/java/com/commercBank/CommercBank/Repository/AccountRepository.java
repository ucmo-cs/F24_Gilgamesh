package com.commercBank.CommercBank.Repository;

import com.commercBank.CommercBank.Domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long > {
    Account findByUserId(String userId);
}




