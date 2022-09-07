package lt.codeacademy.blog.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lt.codeacademy.blog.dto.AuthRequest;
import lt.codeacademy.blog.entity.BlogUser;
import lt.codeacademy.blog.repository.BlogUserRepository;
import lt.codeacademy.blog.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {
    private final BlogUserRepository blogUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public AuthService(
            BlogUserRepository blogUserRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtProvider jwtProvider
    ) {
        this.blogUserRepository = blogUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    public boolean signup(AuthRequest authRequest) {
        BlogUser blogUser = this.mapToBlogUser(authRequest);
        return blogUserRepository.findByUserName(blogUser.getUserName())
                .map(user -> false)
                .orElseGet(() -> {
                    blogUserRepository.save(blogUser);
                    return true;
                });
    }

    private BlogUser mapToBlogUser(AuthRequest authRequest) {
        return new BlogUser(
                authRequest.getUserName(),
                "USER",
                passwordEncoder.encode(authRequest.getPassword()),
                authRequest.getEmail()
        );
    }

    public ResponseEntity<JsonNode> login(AuthRequest loginRequest) {
        Authentication authenticate;
        try {
            authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUserName(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authenticate);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(badCredentialsResponseNode(loginRequest));
        }
        return ResponseEntity.ok(loginSuccessResponseNode(authenticate));
    }

    private ObjectNode badCredentialsResponseNode(AuthRequest loginRequest) {
        return new ObjectMapper().createObjectNode()
                .put("error", badCredentialsMessage(loginRequest.getUserName()));
    }

    private String badCredentialsMessage(String userName) {
        return blogUserRepository.findByUserName(userName)
                .map(user -> "Invalid password")
                .orElse("Invalid username");
    }

    private ObjectNode loginSuccessResponseNode(Authentication authentication) {
        return new ObjectMapper().createObjectNode()
                .put("userName", authentication.getName())
                .put("authorities", authorities(authentication.getAuthorities()))
                .put("jwt", jwtProvider.generateToken(authentication));
    }

    private String authorities(Collection<? extends GrantedAuthority> grantedAuthority) {
        return grantedAuthority.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
    }

    public Optional<BlogUser> getBlogUser() {
        String blogUserName = SecurityContextHolder.getContext().getAuthentication().getName();
        return blogUserRepository.findByUserName(blogUserName);
    }
}
