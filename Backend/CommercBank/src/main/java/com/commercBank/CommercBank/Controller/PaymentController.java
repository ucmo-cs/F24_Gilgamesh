package com.commercBank.CommercBank.Controller;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Service.AccountService;
import com.commercBank.CommercBank.Service.LoanService;
import com.commercBank.CommercBank.dto.LoanDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.context.annotation.EnableScheduling;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/payment")
@EnableScheduling
public class PaymentController {

    @Autowired
    private LoanService loanService;


    @GetMapping
    public ResponseEntity<String> getPayoffDate(@RequestBody LoanDto loanDto) {
        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        BigDecimal principle = loan.getLoanOriginAmount();
        BigDecimal rate = loan.getInterestRate();
        int months = 0;
        BigDecimal monthlyRate = rate.divide(BigDecimal.valueOf(12), RoundingMode.HALF_UP);
        BigDecimal payment = BigDecimal.valueOf(getScheduledPayment());

        while (principle.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal interest = principle.multiply(monthlyRate);
            principle = principle.add(interest).subtract(payment);
            if (principle.compareTo(BigDecimal.ZERO) <= 0)
                break;
            months++;
        }


        LocalDate payoffDate = LocalDate.now().plusMonths(months);
        return ResponseEntity.ok("Payoff date: " + payoffDate);


    }
    @PostMapping
    public ResponseEntity<String> schedulePayment(@RequestParam Long loanId, @RequestParam BigDecimal amount, @RequestParam LocalDate date) {
        //logic to save to database
        loanService.saveScheduledPayment(loanId, amount, date);
        return ResponseEntity.ok("Payment of " + amount + " scheduled for " + date + " successfully");
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void processPayment(){
        List<Loan> loans = loanService.findAll();
        for (Loan loan : loans) {
            processPayment(loan);
        }
    }
    private void processPayment(Loan loan) {
        BigDecimal paymentAmount = BigDecimal.valueOf(getScheduledPayment());
        BigDecimal principle = loan.getLoanOriginAmount();
        BigDecimal rate = loan.getInterestRate().divide(BigDecimal.valueOf(12), RoundingMode.HALF_UP);
        BigDecimal newPrinciple = principle.add(principle.multiply(rate)).subtract(paymentAmount);

        loan.setLoanOriginAmount(newPrinciple.max(BigDecimal.ZERO));
        loanService.save(loan);
    }
    private double getScheduledPayment(){
        return 500.0; //fixed payment amount
    }
//    private BigDecimal Payment(){
//        BigDecimal amount;
//        LocalDate date;
//
//    }
}
