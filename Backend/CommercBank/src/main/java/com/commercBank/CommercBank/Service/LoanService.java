package com.commercBank.CommercBank.Service;

import com.commercBank.CommercBank.Domain.Account;
import com.commercBank.CommercBank.Domain.Loan;
import com.commercBank.CommercBank.Repository.AccountRepository;
import com.commercBank.CommercBank.Repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    public List<Loan> findAll() {
        return loanRepository.findAll();
    }

    public Loan findById(Long id) {
        Optional<Loan> loan = loanRepository.findById(id);
        return loan.orElse(null);
    }
    public Loan create(Loan loan, String userId) {
        return loanRepository.save(loan);
    }

    public Loan save(Loan loan) {
        return loanRepository.save(loan);
    }
}