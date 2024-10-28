package com.commercBank.CommercBank.Repository;

import com.commercBank.CommercBank.Domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {


}
