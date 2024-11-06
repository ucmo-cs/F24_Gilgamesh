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
            Account account = new ModelMapper().map(accountDto, Account.class);
            account.setCreated_at(new Timestamp(System.currentTimeMillis()));

            Account savedAccount = accountService.create(account); // may need to remove
            return new ResponseEntity<>(accountService.create(account), HttpStatus.CREATED);
        }
}
