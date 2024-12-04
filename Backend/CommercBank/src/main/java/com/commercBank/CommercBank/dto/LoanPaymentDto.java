package com.commercBank.CommercBank.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class LoanPaymentDto {
    private Long loanId;
    private BigDecimal amount;
    private LocalDate date;

    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

}
