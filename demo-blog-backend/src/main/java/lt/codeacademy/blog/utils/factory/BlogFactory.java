package lt.codeacademy.blog.utils.factory;

import com.thedeanda.lorem.Lorem;
import com.thedeanda.lorem.LoremIpsum;
import lt.codeacademy.blog.entity.BlogUser;
import lt.codeacademy.blog.entity.Comment;
import lt.codeacademy.blog.entity.Post;
import org.ajbrown.namemachine.Name;
import org.ajbrown.namemachine.NameGenerator;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Stream;

public class BlogFactory {
    public final static List<BlogUser> BLOG_USERS;
    public final static List<Post> POSTS;

    private static final int BLOG_USERS_MAX_SIZE = 10;
    private static final int BLOG_USERS_MIN_SIZE = 5;
    private static final int POSTS_MAX_SIZE = 30;
    private static final int POSTS_MIN_SIZE = 20;
    private static final int COMMENTS_MAX_SIZE = 10;
    private static final int COMMENTS_MIN_SIZE = 5;

    private static final NameGenerator GENERATOR = new NameGenerator();
    private static final Lorem LOREM = LoremIpsum.getInstance();
    private static final Random RANDOM = new Random();

    static {
        BLOG_USERS = generateBlogUsers();
        POSTS = generatePosts();
    }

    private BlogFactory() {
    }

    private static List<BlogUser> generateBlogUsers() {
        return Stream.generate(BlogFactory::generateBlogUser)
                .limit(RANDOM.nextInt(BLOG_USERS_MAX_SIZE - BLOG_USERS_MIN_SIZE) + BLOG_USERS_MIN_SIZE)
                .toList();
    }

    public static BlogUser generateBlogAdmin() {
        return new BlogUser(
                "admin",
                "ADMIN",
                "$2a$10$JM11cOpmVZMhEIjwp4gfTuztM2YUEs7FbWJYrpG6pLDEk6NYib/TO",
                "admin@mail.com"
        );
    }

    private static BlogUser generateBlogUser() {
        Name name = GENERATOR.generateName();
        return new BlogUser(
                name.toString(),
                "USER",
                "$2a$12$8wt5PvXjFtd0dAg3p/.AL.5b2rSYN7CvZKAgb/yNvLkUHt0oWxGIS",
                "%s.%s@mail.com".formatted(name.getFirstName(), name.getLastName())
        );
    }

    private static List<Post> generatePosts() {
        return Stream.generate(BlogFactory::generatePost)
                .limit(RANDOM.nextInt(POSTS_MAX_SIZE - POSTS_MIN_SIZE) + POSTS_MIN_SIZE)
                .peek(post -> post.getBlogUser().addPost(post))
                .peek(post -> post.setComments(BlogFactory.generateComments(post)))
                .toList();
    }

    private static Post generatePost() {
        return new Post(
                LOREM.getTitle(2, 4),
                LOREM.getParagraphs(2, 6),
                LocalDate.now().minusDays(RANDOM.nextInt(365) + 100),
                LocalDate.now().minusDays(RANDOM.nextInt(50)),
                BLOG_USERS.get(RANDOM.nextInt(BLOG_USERS.size())),
                null
        );
    }

    private static List<Comment> generateComments(Post post) {
        return Stream.generate(BlogFactory::generateComment)
                .limit(RANDOM.nextInt(COMMENTS_MAX_SIZE - COMMENTS_MIN_SIZE) + COMMENTS_MIN_SIZE)
                .peek(comment -> comment.getBlogUser().addComment(comment))
                .peek(comment -> comment.setPost(post))
                .toList();
    }

    private static Comment generateComment() {
        return new Comment(
                LOREM.getWords(10, 100),
                LocalDate.now().minusDays(RANDOM.nextInt(100)),
                BLOG_USERS.get(RANDOM.nextInt(BLOG_USERS.size())),
                null
        );
    }
}
