package lt.codeacademy.blog.repository;

import lt.codeacademy.blog.utils.factory.BlogFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DbInit {
    private final BlogUserRepository userRepository;

    public DbInit(BlogUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        BlogFactory.BLOG_USERS.forEach(userRepository::save);
        userRepository.save(BlogFactory.generateBlogAdmin());
    }
}
