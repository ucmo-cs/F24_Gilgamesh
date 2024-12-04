package com.commercBank.CommercBank.Controller;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Service.AccountService;
import com.commercBank.CommercBank.Service.LoanService;
import com.commercBank.CommercBank.Service.LoanPaymentService;
import com.commercBank.CommercBank.dto.AccountDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private LoanService loanService;

    @Autowired
    private LoanPaymentService loanPaymentService;

    @CrossOrigin
    @GetMapping("/loans")
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.findAll();

        return ResponseEntity.ok(loans);
    }

    @GetMapping("/user/{userId}/loan/{loanId}/details")
    public ResponseEntity<?> getLoanDetails(@PathVariable String userId, @PathVariable Long loanId) {
        Loan loan = loanService.findById(loanId);
        if (loan != null && loan.getUserId().equals(userId)) {
            return ResponseEntity.ok(Map.of(
                    "userId", loan.getUserId(),
                    "loanId", loan.getLoan_id()
                    //"amountLeftToPay", loan.getAmountLeftToPay()

            ));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Loan or User not found");
    }

    @GetMapping("/user/{userId}/loans")
    public ResponseEntity<List<Loan>> getLoansByUserId(@PathVariable String userId) {
        try {
            // Fetch loans for a specific userId
            List<Loan> loans = loanService.findByUserId(userId);
            return ResponseEntity.ok(loans);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<Account>> getAllUsers() {
        try {
            // Fetch all users from the account service
            List<Account> users = accountService.findAll();

            // Return a response with the users list
            return ResponseEntity.ok(users);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/loan/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
        Loan loan = loanService.findById(id);
        if (loan != null) {
            return ResponseEntity.ok(loan);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    @PostMapping("/loan")
    public ResponseEntity<String> createLoan(@RequestBody Loan loan) {
        loanService.save(loan);
        return ResponseEntity.status(HttpStatus.CREATED).body("Loan created successfully");
    }

    @PutMapping("/loan/{id}")
    public ResponseEntity<String> updateLoan(@PathVariable Long id, @RequestBody Loan loan) {
        Loan existingLoan = loanService.findById(id);
        if (existingLoan != null) {
            existingLoan.setLoanOriginAmount(loan.getLoanOriginAmount());
            existingLoan.setInterestRate(loan.getInterestRate());
            loanService.save(existingLoan);
            return ResponseEntity.ok("Loan updated successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Loan not found");
    }

    @CrossOrigin
    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdminAccount() {
        System.out.println("Creating admin account");

        // Create a new AccountDto (this will hold the admin account data)
        AccountDto accountDto = new AccountDto();
        accountDto.setUserId("admin");  // Unique userId for the admin
        accountDto.setUserName("admin");  // Admin's username
        accountDto.setPassword("letMeInter123");  // Default admin password
        accountDto.setRole(Account.Role.ADMIN);  // Set role to ADMIN

        // Log accountDto for debugging
        System.out.println("AccountDto: " + accountDto);

        // Map the AccountDto to Account entity using ModelMapper
        Account account = new ModelMapper().map(accountDto, Account.class);

        // Set the created_at timestamp
        account.setCreated_at(new Timestamp(System.currentTimeMillis()));

        // Encrypt the password before saving the account
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(account.getPassword());
        account.setPassword(encodedPassword);

        // Save the account
        accountService.save(account);

        return new ResponseEntity<>("Admin account created successfully", HttpStatus.CREATED);
    }




    /*public ResponseEntity<String> createAdminAccount(@RequestBody Account account) {
        Account adminAccount = new Account();
        adminAccount.setUserName("admin");


        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode("letMeInter123");
        adminAccount.setPassword(encodedPassword);
        adminAccount.setRole(Account.Role.ADMIN);


        accountService.save(adminAccount);

        return ResponseEntity.status(HttpStatus.CREATED).body("Admin account created successfully");
    }*/
}

