package io.github.gabrielpadilh4.resource;

import io.github.gabrielpadilh4.resource.dto.BookDTO;
import io.github.gabrielpadilh4.service.BookService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import java.net.URI;

@Path("/books")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BookResource {

    @Inject
    BookService bookService;

    @Context UriInfo uriInfo;

    @POST
    public Response createBook(BookDTO bookDTO) {
        String bookId = bookService.createNewBook(bookDTO);
        URI uri = uriInfo.getAbsolutePathBuilder().path(bookId).build();
        return Response.created(uri).build();
    }

    @GET
    public Response getAllBooks() {
        return Response.ok(bookService.getAllBooks()).build();
    }

    @GET
    @Path("/{bookId}")
    public Response getBookById(String bookId) {
        return Response.ok(bookService.getBookById(bookId)).build();
    }

    @PUT
    @Path("/{bookId}")
    public Response updateBookById(@PathParam("bookId") String bookId, @RequestBody BookDTO bookDTO) {
        bookService.updateBookById(bookId, bookDTO);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{bookId}")
    public Response deleteBookById(String bookId) {
        bookService.deleteBookById(bookId);
        return Response.noContent().build();
    }
}
