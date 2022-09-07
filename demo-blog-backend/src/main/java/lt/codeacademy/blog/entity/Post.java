package lt.codeacademy.blog.entity;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collector;

@Entity
@Table
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob
    private String content;
    private LocalDate createdOn;
    private LocalDate updatedOn;
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "blog_user_id")
    private BlogUser blogUser;
    @OneToMany(mappedBy = "post", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private List<Comment> comments;

    public Post() {
    }

    public Post(String title, String content, LocalDate createdOn, LocalDate updatedOn, BlogUser blogUser, List<Comment> comments) {
        this.title = title;
        this.content = content;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
        this.blogUser = blogUser;
        this.comments = comments;
    }

    public Post updateContent(String updatedContent) {
        setContent(updatedContent);
        setUpdatedOn(LocalDate.now());
        return this;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDate getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(LocalDate updatedOn) {
        this.updatedOn = updatedOn;
    }

    public BlogUser getBlogUser() {
        return blogUser;
    }

    public void setBlogUser(BlogUser blogUser) {
        this.blogUser = blogUser;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public JsonNode asJson() {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.createObjectNode()
                .put("id", id)
                .put("title", title)
                .put("content", content)
                .put("createdOn", createdOn.toString())
                .put("updatedOn", updatedOn.toString())
                .put("blogUser", blogUser.getUserName())
                .put("comments", comments.size());
    }

    public JsonNode asJsonWithComments() {
        return ((ObjectNode) asJson())
                .set("comments", getComments().stream()
                        .map(Comment::asJson)
                        .collect(Collector.of(() -> new ObjectMapper().createArrayNode(), ArrayNode::add, ArrayNode::addAll))
                );
    }

    @Override
    public String toString() {
        return "Post{" + "title='" + title + '\'' + ", content='" + content + '\'' + ", createdOn=" + createdOn + ", updatedOn=" + updatedOn + ", blogUser=" + blogUser.getUserName() + ", comments=" + comments.size() + '}';
    }
}
