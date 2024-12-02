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


//This controller includes a resetPassword method
// that takes a user ID and a new password from the
// request body. It checks if the user exists, updates
// the password if they do, and returns an appropriate response.
@RestController
@RequestMapping("/reset")
public class ResetController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AccountService accountService;

    @PostMapping("/password-reset")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String newPassword = credentials.get("newPassword");
        Account account = accountService.findByUserId(userId);

        if (account != null) {
            account.setPassword(passwordEncoder.encode(newPassword));
            accountService.save(account);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping("/ID-reset")
    public ResponseEntity<Map<String, String>> resetUserID(@RequestBody Map<String, String> credentials) {
        String oldUserID = credentials.get("oldUserID");
        String newUserID = credentials.get("newUserID");
        Account account = accountService.findByUserId(oldUserID);

        if (account != null) {
            account.setUserId(newUserID);
            accountService.save(account);

            Map<String, String> response = new HashMap<>();
            response.put("message", "User ID reset successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping("/username-reset")
    public ResponseEntity<Map<String, String>> resetUsername(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String newUsername = credentials.get("newUsername");
        Account account = accountService.findByUserId(userId);

        if (account != null) {
            account.setUserName(newUsername);
            accountService.save(account);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Username reset successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping("/email-reset")
    public ResponseEntity<Map<String, String>> resetEmail(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String newEmail = credentials.get("newEmail");
        Account account = accountService.findByUserId(userId);

        if (account != null) {
            account.setEmail(newEmail);
            accountService.save(account);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Email reset successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping("/phoneNumber-reset")
    public ResponseEntity<Map<String, String>> resetPhoneNumber(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String newPhoneNumber = credentials.get("newPhoneNumber");
        Account account = accountService.findByUserId(userId);

        if (account != null) {
            account.setPhoneNumber(newPhoneNumber);
            accountService.save(account);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Phone number reset successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping("/bankAccountNumber-reset")
    public ResponseEntity<Map<String, String>> resetBankAccountNumber(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String newBankAccountNumber = credentials.get("newBankAccountNumber");
        Account account = accountService.findByUserId(userId);

        if (account != null) {
            account.setBankAccountNumber(newBankAccountNumber);
            accountService.save(account);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Bank account number reset successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping("/routingNumber-reset")
    public ResponseEntity<Map<String, String>> resetRoutingNumber(@RequestBody Map<String, String> credentials) {
        String userId = credentials.get("userId");
        String newRoutingNumber = credentials.get("newRoutingNumber");
        Account account = accountService.findByUserId(userId);

        if (account != null) {
            account.setRoutingNumber(newRoutingNumber);
            accountService.save(account);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Routing number reset successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }


}