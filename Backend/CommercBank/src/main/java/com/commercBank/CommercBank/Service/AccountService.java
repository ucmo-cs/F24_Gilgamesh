package com.commercBank.CommercBank.Service;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@AllArgsConstructor
@Service
public class AccountService {
    @Autowired
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;  // Inject PasswordEncoder

    @Transactional
    public Account create(Account account) {
        String encodedPassword = passwordEncoder.encode(account.getPassword());
        account.setPassword(encodedPassword);  // Set the encoded password


        System.out.println("Creating account: " + account);
        return accountRepository.save(account);
    }

    public Account findByUserId(String userId) {
        return accountRepository.findByUserId(userId);
    }


    public Account save(Account account) {
        return accountRepository.save(account);
    }


}
