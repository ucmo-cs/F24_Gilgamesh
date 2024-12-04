package com.commercBank.CommercBank.Domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    @Column(nullable = false)
    private BigDecimal currentBalance;
    @Column(name = "interest_rate", nullable = false)
    private BigDecimal interestRate;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private Timestamp created_at;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_account_id", nullable = false)
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

    public void setLoanOriginAmount(BigDecimal LoanOriginAmount) {
        this.loanOriginAmount =LoanOriginAmount;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Account getUserAccount() {
        return userAccount;
    }

    public void setUser_account(Account userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserId() {
        return userAccount != null ? userAccount.getUserId() : null;
    }

    public BigDecimal getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(BigDecimal currentBalance) {
        this.currentBalance = currentBalance;
    }

    // Mocked method to get the amount left to pay. Replace this with actual logic.
    /*public BigDecimal getAmountLeftToPay() {
        BigDecimal totalPaid = new BigDecimal("0.00"); // This should come from your database or payment service
        return loanOriginAmount.subtract(totalPaid);
    }
     */
}
