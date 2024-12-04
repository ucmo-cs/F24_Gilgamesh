package com.commercBank.CommercBank.Controller;
import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.dto.LoanDto;
import com.commercBank.CommercBank.Service.LoanService;
import com.commercBank.CommercBank.dto.LoanPaymentDto;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @GetMapping("/account/{accountId}")
    public ResponseEntity<?> findByAccountId(@PathVariable Long accountId) {
        return new ResponseEntity<>(loanService.findByAccountId(accountId), HttpStatus.OK);
    }

    //@CrossOrigin
    private static final Logger logger = LoggerFactory.getLogger(LoanController.class);

    @PostMapping("createLoan")
    public ResponseEntity<Loan> createLoan(@RequestBody LoanDto loanDto) {
        //debug
        logger.info("Creating Loan with Origin Amount: {}", loanDto.getLoanOriginAmount());
        logger.info("Interest Rate: {}", loanDto.getInterestRate());
        logger.info("UserId: {}", loanDto.getUserId());

        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        loan.setCreated_at(new Timestamp(System.currentTimeMillis()));
        // Add logging to debug loan details
        System.out.println("Loan Origin Amount: " + loan.getLoanOriginAmount());
        System.out.println("Interest Rate: " + loan.getInterestRate());

        String userId = loanDto.getUserId();
        //accountId
        //userId
        //userName

        Loan savedLoan = loanService.create(loan, loanDto.getUserId());

        return new ResponseEntity<>(savedLoan, HttpStatus.CREATED);

    }



    @CrossOrigin
    @GetMapping("/loans")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(loanService.findAll(), HttpStatus.OK);
    }
}
