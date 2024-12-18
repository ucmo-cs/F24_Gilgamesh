package com.commercBank.CommercBank.Service;


import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Domain.LoanPayment;
import com.commercBank.CommercBank.Repository.LoanPaymentRepository;
import com.commercBank.CommercBank.Repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@Service
public class LoanPaymentService {

    @Autowired
    private LoanPaymentRepository loanPaymentRepository;

    @Autowired
    private LoanRepository loanRepository;

    public LoanPayment saveScheduledPayment(Long loanId, BigDecimal paymentAmount, LocalDate scheduledDate){

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found with id: " + loanId)); // Handle Loan not found

        LoanPayment payment = new LoanPayment();

        payment.setLoan(loan);
        payment.setPaymentAmount(paymentAmount);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setNextDueDate(scheduledDate.plusMonths(1).atStartOfDay()); //sets payment to next month
        payment.setPaymentStatus(LoanPayment.PaymentStatus.PENDING); //can change when its gone though

        /*if(loanPaymentRepository.findAllByLoan(loan).isEmpty()){
            BigDecimal calculatedScheduledPayment = calculateScheduledPayment(loan);
            payment.setScheduledPayment(calculatedScheduledPayment);
        }*/

        BigDecimal calculatedScheduledPayment = calculateScheduledPayment(loan);
        payment.setScheduledPayment(calculatedScheduledPayment);

        return loanPaymentRepository.save(payment);
    }

    public LoanPayment save(LoanPayment loanPayment) {
        return loanPaymentRepository.save(loanPayment);
    }

    public void markPaymentComplete(long paymentId){
        LoanPayment payment = loanPaymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + paymentId));
        payment.setPaymentStatus(LoanPayment.PaymentStatus.COMPLETED);
        loanPaymentRepository.save(payment);
    }

    private BigDecimal calculateScheduledPayment(Loan loan) {
        BigDecimal principal = loan.getLoanOriginAmount();
        BigDecimal interestRate = loan.getInterestRate().divide(BigDecimal.valueOf(100)); // Convert percentage to decimal
        int numberOfPayments = 72; // we can change monthly payments can change this later if we want to allow us to
        //input a value

        BigDecimal monthlyPayment = principal.multiply(interestRate).divide(BigDecimal.valueOf(numberOfPayments), RoundingMode.HALF_UP);

        return monthlyPayment;
    }

    public Loan reduceLoanAmount(Long loanId, BigDecimal amount) {
        if (amount == null) {
            throw new IllegalArgumentException("Amount cannot be null");
        }

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        BigDecimal currentBalance = loan.getCurrentBalance();
        if (currentBalance == null) {
            throw new RuntimeException("Current balance is not set for loan with ID: " + loanId);
        }

        if (amount.compareTo(currentBalance) > 0) {
            throw new RuntimeException("Amount exceeds current balance");
        }
        loan.setCurrentBalance(currentBalance.subtract(amount));
        Loan updatedLoan = loanRepository.save(loan);

        // Create a new LoanPayment record
        LoanPayment payment = new LoanPayment();
        payment.setLoan(loan);
        payment.setPaymentAmount(amount);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentStatus(LoanPayment.PaymentStatus.COMPLETED);

        // Calculate and set the next due date
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime nextDueDate = LocalDateTime.of(currentDate.getYear(), currentDate.getMonth().plus(1), 1, 0, 0);
        payment.setNextDueDate(nextDueDate);
        

        BigDecimal scheduledPayment = calculateScheduledPayment(loan);
        payment.setScheduledPayment(scheduledPayment);

// Save the LoanPayment record
        loanPaymentRepository.save(payment);

        return updatedLoan;
    }

}
