package com.commercBank.CommercBank.Domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "loan_payments")
public class LoanPayment {

    @Id
    @Column(name = "payment_id")
    @GeneratedValue
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "loan_id", nullable = false)
    private Loan loan; //links loan to the loan table

    @Column(name = "paymentAmount", nullable = false)
    private BigDecimal paymentAmount; // payment amount

    @Column(name = "paymentDate", nullable = false)
    private LocalDateTime PaymentDate; // date when payment was made

    @Column(name = "scheduled_payment", nullable = false)
    private BigDecimal scheduledPayment;

    @Column(name = "nextDueDate")
    private LocalDateTime nextDueDate; //date of next due date

    @Enumerated(EnumType.STRING)
    @Column(name = "paymentStatus", nullable = false)
    private PaymentStatus paymentStatus; // payment status (pending/complete)

    public enum PaymentStatus {
        PENDING, COMPLETED
    }
    // enum ==  a special data type that consists of a set of pre-defined named values separated by commas.
    // These named values are also known as elements or enumerators or enum instances. Since the values in the enum type
    // are constant, you should always represent them in UPPERCASE letters.


    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public LocalDateTime getPaymentDate() {
        return PaymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        PaymentDate = paymentDate;
    }

    public BigDecimal getScheduledPayment() {
        return scheduledPayment;
    }
    public void setScheduledPayment(BigDecimal scheduledPayment) {
        this.scheduledPayment = scheduledPayment;
    }

    public LocalDateTime getNextDueDate() {
        return nextDueDate;
    }

    public void setNextDueDate(LocalDateTime nextDueDate) {
        this.nextDueDate = nextDueDate;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
