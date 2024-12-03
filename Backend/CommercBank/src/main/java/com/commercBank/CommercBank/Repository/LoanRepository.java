package com.commercBank.CommercBank.Repository;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Domain.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface LoanRepository extends JpaRepository <Loan, Long > {
    List<Loan> findByUserAccount_AccountId(long userAccountAccountId);
}
