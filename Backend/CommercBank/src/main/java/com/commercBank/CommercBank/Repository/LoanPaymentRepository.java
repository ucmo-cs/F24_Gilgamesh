package com.commercBank.CommercBank.Repository;

import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Domain.LoanPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanPaymentRepository extends JpaRepository <LoanPayment, Long>{

    List<LoanPayment> findAllByLoan(Loan loan);

}
