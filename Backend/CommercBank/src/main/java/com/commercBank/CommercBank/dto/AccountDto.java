package com.commercBank.CommercBank.dto;

import com.commercBank.CommercBank.Domain.Account;
import lombok.Data;

@Data
public class AccountDto {
    private long accountId; //not needed DB makes it and auto increments it
    private int userType;
    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;
    private Account.Role role;

    public void setRole(Account.Role role) {
        this.role = role;  // Assign the incoming value to the internal role field
    }
}
