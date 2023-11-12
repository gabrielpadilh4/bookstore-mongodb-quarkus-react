package io.github.gabrielpadilh4.exception.GenericException;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class GenericExceptionMapper implements ExceptionMapper<GenericException> {
    @Override
    public Response toResponse(GenericException exception) {
        return Response.status(Response.Status.BAD_REQUEST).entity(exception.toString()).build();
    }
}
