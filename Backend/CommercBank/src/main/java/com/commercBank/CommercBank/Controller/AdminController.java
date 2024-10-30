package com.commercBank.CommercBank.Controller;

import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Service.AccountService;
import com.commercBank.CommercBank.Service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private LoanService loanService;

    @GetMapping("/loans")
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.findAll();
        return ResponseEntity.ok(loans);
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
}

