package com.commercBank.CommercBank.Service;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@AllArgsConstructor
@Service
public class AccountService {
    @Autowired
    private final AccountRepository accountRepository;

    @Transactional
    public Account create(Account acct) {

        return accountRepository.save(acct);
    }

    public Account findByUserId(String userId) {
        return accountRepository.findByUserId(userId);
    }

    public Account save(Account account) {
        return accountRepository.save(account);
    }
}