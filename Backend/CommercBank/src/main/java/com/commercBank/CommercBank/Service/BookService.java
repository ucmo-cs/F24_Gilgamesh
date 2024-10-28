package com.commercBank.CommercBank.Service;

import com.commercBank.CommercBank.Domain.Book;
import com.commercBank.CommercBank.Repository.BookRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;
    //Book b = new Book();this does the same as the above line / dependency injection

    @Transactional //looks at the amount of something IE like money in your bank and withdrawals it
    public Book create(Book book){
        return bookRepository.save(book);
    }

    //@Transactional(readOnly = true)
    public List<Book> findAll(){
        return bookRepository.findAll();
    }
}
