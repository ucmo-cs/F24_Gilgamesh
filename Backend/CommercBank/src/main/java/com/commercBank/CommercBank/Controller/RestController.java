package com.commercBank.CommercBank.Controller;

import com.commercBank.CommercBank.Domain.Book;
import com.commercBank.CommercBank.Repository.BookRepository;
import com.commercBank.CommercBank.Service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@org.springframework.web.bind.annotation.RestController
@AllArgsConstructor
public class RestController {

    private final BookService bookService;
    @PostMapping("/book")
    public ResponseEntity<?> save(@RequestBody Book book){
        return new ResponseEntity<>(bookService.create(book), HttpStatus.CREATED);
    }

    @GetMapping("/book")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(
                bookService.findAll(),HttpStatus.OK);
    }
    //@GetMapping("/user/{id}")


}
