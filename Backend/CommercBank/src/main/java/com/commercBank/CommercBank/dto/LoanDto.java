package com.commercBank.CommercBank.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

import java.math.BigDecimal;

@Data
public class LoanDto {
    private BigDecimal loanOriginAmount;
    private BigDecimal interestRate;

}
