package com.commercBank.CommercBank.dto;

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

}
