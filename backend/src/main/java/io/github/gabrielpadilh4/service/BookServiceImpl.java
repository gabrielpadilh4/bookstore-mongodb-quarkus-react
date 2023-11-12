package io.github.gabrielpadilh4.service;

import io.github.gabrielpadilh4.entity.Book;
import io.github.gabrielpadilh4.exception.BookNotFound.BookNotFoundException;
import io.github.gabrielpadilh4.repository.BookRepository;
import io.github.gabrielpadilh4.resource.dto.BookDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.bson.types.ObjectId;

import java.util.List;

@ApplicationScoped
public class BookServiceImpl implements BookService {
    @Inject
    BookRepository bookRepository;

    public String createNewBook(BookDTO bookDTO) {
        Book book = new Book(bookDTO.getTitle(), bookDTO.getAuthor(), bookDTO.getPublishYear());
        bookRepository.persist(book);

        return book.getId().toString();
    }

    public List<Book> getAllBooks() {
        return bookRepository.listAll();
    }

    public Book getBookById(String bookId) {
        return this.findBookById(bookId);
    }

    public void updateBookById(String bookId, BookDTO bookDTO) {
        Book book = findBookById(bookId);

        book.setAuthor(bookDTO.getAuthor());
        book.setTitle(bookDTO.getTitle());
        book.setPublishYear(bookDTO.getPublishYear());

        bookRepository.update(book);
    }

    public void deleteBookById(String bookId) {
        Book book = findBookById(bookId);
        bookRepository.delete(book);
    }

    private Book findBookById(String bookId) {
        Book book = bookRepository.findById(new ObjectId(bookId));

        if (book == null ) {
            throw new BookNotFoundException();
        }

        return book;
    }
}
