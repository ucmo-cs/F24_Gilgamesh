package com.commercBank.CommercBank.Repository;

import com.commercBank.CommercBank.Domain.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long> {

}

