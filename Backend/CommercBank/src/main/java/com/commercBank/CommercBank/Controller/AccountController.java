package com.commercBank.CommercBank.Controller;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.dto.AccountDto;
import com.commercBank.CommercBank.Service.AccountService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;

@AllArgsConstructor
@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    @Autowired
    private final AccountService accountService;

    @CrossOrigin
    @PostMapping("/account")
    public ResponseEntity<?> save(@RequestBody AccountDto accountDto) {
        System.out.println("Received account creation request: " + accountDto);

        // Log the accountDto for debugging
        if (accountDto.getUserId() != null) {
            System.out.println("UserId: " + accountDto.getUserId());
        }

        // Map the AccountDto to Account entity
        Account account = new ModelMapper().map(accountDto, Account.class);

        // Set the current timestamp as account creation time
        account.setCreated_at(new Timestamp(System.currentTimeMillis()));

        // Ensure the bank details are set properly (this is optional if they are already in the DTO)
        if (accountDto.getBankAccountNumber() != null) {
            account.setBankAccountNumber(accountDto.getBankAccountNumber());
        }
        if (accountDto.getRoutingNumber() != null) {
            account.setRoutingNumber(accountDto.getRoutingNumber());
        }

        // Save the account with bank details and other fields
        Account createdAccount = accountService.create(account);

        // Return the created account response
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }
}
