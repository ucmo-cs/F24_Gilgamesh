package com.commercBank.CommercBank.Service;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Repository.AccountRepository;
import com.commercBank.CommercBank.dto.AccountDto;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@AllArgsConstructor
@Service
public class AccountService {
    @Autowired
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;  // Inject PasswordEncoder
    private final ModelMapper modelMapper = new ModelMapper();


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

    public List<Account> findAll() {
        return accountRepository.findAll();  // Retrieves all users from the database
    }

    // New Method: Get bank details
    public AccountDto getBankDetails(Long id) {
        // Fetch the account by ID, throw exception if not found
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        // Convert Account entity to AccountDto
        AccountDto dto = modelMapper.map(account, AccountDto.class);
        return dto;  // Return the AccountDto
    }
}
