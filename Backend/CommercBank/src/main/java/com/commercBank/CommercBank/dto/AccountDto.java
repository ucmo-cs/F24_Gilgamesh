package com.commercBank.CommercBank.dto;

import com.commercBank.CommercBank.Domain.Account;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class AccountDto {
    private long accountId; // not needed, DB auto-increments
    private int userType;
    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;
    private Account.Role role;
    private String bankAccountNumber;
    private String routingNumber;

    public void setRole(Account.Role role) {
        this.role = role;  // Assign the incoming value to the internal role field
    }

}
