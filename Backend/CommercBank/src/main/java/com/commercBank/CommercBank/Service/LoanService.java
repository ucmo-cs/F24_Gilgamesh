package com.commercBank.CommercBank.Service;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Domain.LoanPayment;
import com.commercBank.CommercBank.Repository.AccountRepository;
import com.commercBank.CommercBank.Repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private AccountRepository accountRepository;//fetches account by id


    public List<Loan> findByUserId(String userId) {
        // Find account using userId
        Account account = accountRepository.findByUserId(userId);
        if (account == null) {
            throw new RuntimeException("Account with userId: " + userId + " not found.");
        }
        // Fetch loans associated with the account
        return loanRepository.findByUserAccount_AccountId(account.getAccountId());
    }


    public List<Loan> findByAccountId(Long accountId) {
        // Implementation of the new method
        return loanRepository.findByUserAccount_AccountId(accountId);
    }

    public List<Loan> findAll() {
        return loanRepository.findAll();
    }

    public Loan findById(Long id) {
        Optional<Loan> loan = loanRepository.findById(id);
        return loan.orElse(null);
    }

    public Loan create(Loan loan, String userId) {
        Optional<Account> accountOptional = Optional.ofNullable(accountRepository.findByUserId(userId));

        Account account = accountOptional.orElseThrow(() ->
                new RuntimeException("Account with userId: " + userId + " not found.")
        );

        loan.setUser_account(account);

        // Set currentBalance to loanOriginAmount if not explicitly set
        if (loan.getCurrentBalance() == null) {
            loan.setCurrentBalance(loan.getLoanOriginAmount());
        }

        return loanRepository.save(loan);
    }

    public Loan save(Loan loan) {
        return loanRepository.save(loan);
    }



}
