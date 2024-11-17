package com.commercBank.CommercBank.Controller;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/{id}")
    public ResponseEntity<Account> getUserById(@PathVariable Long id) {
        Account account = accountService.findByUserId(String.valueOf(id));
        if (account != null) {
            return ResponseEntity.ok(account);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Account account) {
        account.setUserType(0); // Assuming 0 is for customers
        accountService.save(account);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody Account account) {
        Account existingAccount = accountService.findByUserId(String.valueOf(id));
        if (existingAccount != null) {
            existingAccount.setUserName(account.getUserName());
            existingAccount.setEmail(account.getEmail());
            existingAccount.setPhoneNumber(account.getPhoneNumber());
            accountService.save(existingAccount);
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}
