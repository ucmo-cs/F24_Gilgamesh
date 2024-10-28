package com.commercBank.CommercBank.Service;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Repository.AccountRepository;
import com.commercBank.CommercBank.Repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@AllArgsConstructor
@Service

public class LoanService {
    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public Loan create(Loan loan, String userId){

        Account account = accountRepository.findByUserId(userId).orElse(null);

        if(account!=null){
            loan.setUserAccount(account);
        }
        // Ensure interest rate is set
        if (loan.getInterestRate() == null) {
            throw new IllegalArgumentException("Interest rate must not be null");
        }

        return loanRepository.save(loan);

    }

    @Transactional(readOnly = true)
    public List<Loan> findAll(){
        return loanRepository.findAll();
    }


}
