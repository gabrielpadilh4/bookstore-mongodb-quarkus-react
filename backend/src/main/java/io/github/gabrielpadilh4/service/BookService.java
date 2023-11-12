package io.github.gabrielpadilh4.service;

import io.github.gabrielpadilh4.entity.Book;
import io.github.gabrielpadilh4.resource.dto.BookDTO;

import java.util.List;

public interface BookService {
    String createNewBook(BookDTO bookDTO);
    List<Book> getAllBooks();
    Book getBookById(String bookId);
    void updateBookById(String bookId, BookDTO bookDTO);

    void deleteBookById(String bookId);
}
