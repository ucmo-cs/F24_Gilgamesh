package com.commercBank.CommercBank.Controller;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Domain.LoanPayment;
import com.commercBank.CommercBank.Service.AccountService;
import com.commercBank.CommercBank.Service.LoanPaymentService;
import com.commercBank.CommercBank.Service.LoanService;
import com.commercBank.CommercBank.dto.LoanDto;
import com.commercBank.CommercBank.dto.LoanPaymentDto;
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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;


@RestController
@RequestMapping("/payment")
@EnableScheduling
public class PaymentController {
    private static final Logger LOGGER = Logger.getLogger(PaymentController.class.getName());
    @Autowired
    private LoanService loanService;

    @Autowired
    private LoanPaymentService loanPaymentService;

    @Autowired
    public PaymentController(LoanService loanService, LoanPaymentService loanPaymentService) {
        this.loanService = loanService;
        this.loanPaymentService = loanPaymentService;
    }


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
    public ResponseEntity<String> schedulePayment(@RequestBody LoanPaymentDto paymentRequest) {
        //logic to save to database
        loanPaymentService.saveScheduledPayment(paymentRequest.getLoanId(), paymentRequest.getAmount(), paymentRequest.getDate());
        return ResponseEntity.ok("Payment of " + paymentRequest.getAmount() + " scheduled for " + paymentRequest.getDate() + " successfully");
    }

    @Scheduled(cron = "0 0 1 * * ?")
    public void processScheduledPayments(){
        List<Loan> loans = loanService.findAll();
        for (Loan loan : loans) {
            processPayment(loan);
        }
    }
    private void processPayment(Loan loan) {
        BigDecimal paymentAmount = BigDecimal.valueOf(getScheduledPayment());
        //calc principal reduction
        BigDecimal principle = loan.getLoanOriginAmount();
        BigDecimal rate = loan.getInterestRate().divide(BigDecimal.valueOf(12), RoundingMode.HALF_UP);
        BigDecimal newPrinciple = principle.add(principle.multiply(rate)).subtract(paymentAmount);

        //update loan balance
        loan.setLoanOriginAmount(newPrinciple.max(BigDecimal.ZERO));
        loanService.save(loan);

        LoanPayment payment = new LoanPayment();
        payment.setLoan(loan);
        payment.setPaymentAmount(paymentAmount);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentStatus(LoanPayment.PaymentStatus.COMPLETED);
        loanPaymentService.save(payment);

        LOGGER.info("Payment processed for Loan ID: " + loan.getLoan_id() + ", Amount: " + paymentAmount);
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
