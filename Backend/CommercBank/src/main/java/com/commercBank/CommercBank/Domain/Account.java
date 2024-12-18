package com.commercBank.CommercBank.Domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.management.relation.Role;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
//@NoArgsConstructor
@Data
@Entity
@Table(name = "account")  // Specify the table name if it's different from the entity name
public class Account {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long accountId;

    private int userType;
    @Column(name = "user_Id", unique = true, nullable = false)
    private String userId;
    @Column(name = "user_name")
    private String userName;
    //@JsonIgnore
    private String password; // Consider using @JsonIgnore if using in REST API
    private String email;
    private String phoneNumber;

    @Version  // This is the version field for optimistic locking
    private Long version= 0L; // Initialize the version field to 0

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    public enum Role {
        USER,
        ADMIN
    }
    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp created_at;

    @OneToMany(mappedBy = "userAccount", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Loan>  loans = new ArrayList<>();

    public Account() {
        if (this.role == null) {
            this.role = Role.USER;  // Default to USER if not set
        }
    }


    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    // Getter and Setter for bank account number
    @Column(name = "bank_account_number", nullable = true)
    private String bankAccountNumber;

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        if (bankAccountNumber != null && bankAccountNumber.matches("\\d+")) {
            this.bankAccountNumber = bankAccountNumber;
        } else {
            throw new IllegalArgumentException("Bank account number must contain only digits.");
        }
    }

    // Getter and Setter for routing number
    @Column(name = "routing_number", nullable = true)
    private String routingNumber;

    public String getRoutingNumber() {
        return routingNumber;
    }

    public void setRoutingNumber(String routingNumber) {
        if (routingNumber != null && routingNumber.matches("\\d+")) {
            this.routingNumber = routingNumber;
        } else {
            throw new IllegalArgumentException("Routing number must contain only digits.");
        }
    }
}
