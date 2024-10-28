package com.commercBank.CommercBank.Controller;
import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.dto.LoanDto;
import com.commercBank.CommercBank.Service.LoanService;
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
@RequestMapping("/loan")
public class LoanController {

    @Autowired
    private final LoanService loanService;

    //@CrossOrigin
    @PostMapping
    public ResponseEntity<Loan> createLoan(@RequestBody LoanDto loanDto) {

        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        loan.setCreated_at(new Timestamp(System.currentTimeMillis()));
        // Add logging to debug loan details
        System.out.println("Loan Origin Amount: " + loan.getLoanOriginAmount());
        System.out.println("Interest Rate: " + loan.getInterestRate());

        String userId = "testId";
        //accountId
        //userId
        //userName

        Loan savedLoan = loanService.create(loan, userId);

        return new ResponseEntity<>(savedLoan, HttpStatus.CREATED);

    }

    @CrossOrigin
    @GetMapping("/loans")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(loanService.findAll(), HttpStatus.OK);
    }
}
