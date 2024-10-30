package com.commercBank.CommercBank.Repository;

import com.commercBank.CommercBank.Domain.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface LoanRepository extends JpaRepository <Loan, Long > {

}
