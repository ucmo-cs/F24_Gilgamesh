package com.commercBank.CommercBank.Controller;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String password = credentials.get("password");
        Account account = accountService.findByUserId(userId);

        if (account != null && passwordEncoder.matches(password, account.getPassword())) {
            Map<String, String> response = new HashMap<>();


            response.put("User", String.valueOf(account.getUserName()));
            response.put("role", String.valueOf(account.getRole()));
            response.put("account_id", String.valueOf(account.getAccountId()));
            response.put("email", account.getEmail());
            response.put("number", account.getPhoneNumber());
            response.put("Rounting", String.valueOf(account.getRoutingNumber()));
            response.put("BankAccount", String.valueOf(account.getBankAccountNumber()));
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    //old just incase things break
    /*public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String password = credentials.get("password");
        Account account = accountService.findByUserId(userId);

        if (account != null && passwordEncoder.matches(password, account.getPassword())
                && account.getEmail().equals(credentials.get("email"))) {
            return ResponseEntity.ok("Login successful" + account.getRole());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }*/
}
