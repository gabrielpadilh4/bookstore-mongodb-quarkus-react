package io.github.gabrielpadilh4.repository;

import io.github.gabrielpadilh4.entity.Book;
import io.quarkus.mongodb.panache.PanacheMongoRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BookRepository implements PanacheMongoRepository<Book> {
}
