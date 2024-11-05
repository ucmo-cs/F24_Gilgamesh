package com.commercBank.CommercBank.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity

@Table(name = "loan")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_id")
    private Long loan_id;
    @Column(name = "loan_origin_amount", nullable = false)
    private BigDecimal loanOriginAmount;
    @Column(name = "interest_rate", nullable = false)
    private BigDecimal interestRate;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private Timestamp created_at;
    @Column(name = "scheduled_payment", nullable = false)
    private BigDecimal scheduledPayment;

    @ManyToOne
    @JoinColumn(name = "user_account_id")
    @JsonIgnore
    private Account userAccount;

    public Long getLoan_id() {
        return loan_id;
    }

    public void setLoan_id(Long loan_id) {
        this.loan_id = loan_id;
    }

    public BigDecimal getLoanOriginAmount() {
        return loanOriginAmount;
    }

    public void setLoanOriginAmount(BigDecimal setLoanOriginAmount) {
        this.loanOriginAmount = setLoanOriginAmount;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interest_rate) {
        this.interestRate = interest_rate;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Account getUser_account() {
        return userAccount;
    }

    public void setUser_account(Account user_account) {
        this.userAccount = user_account;
    }

    public BigDecimal getScheduledPayment() {
        return scheduledPayment;
    }
    public void setScheduledPayment(BigDecimal scheduledPayment) {
        this.scheduledPayment = scheduledPayment;
    }

}
