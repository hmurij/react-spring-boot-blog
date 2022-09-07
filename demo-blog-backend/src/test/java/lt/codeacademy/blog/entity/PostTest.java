package lt.codeacademy.blog.entity;

import com.fasterxml.jackson.databind.JsonNode;
import lt.codeacademy.blog.utils.factory.BlogFactory;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class PostTest {

    @Test
    void asJson_generatedPost_validJson() {
        Post post = BlogFactory.POSTS.get(1);

        JsonNode result = post.asJsonWithComments();

        assertTrue(true);
    }
}
