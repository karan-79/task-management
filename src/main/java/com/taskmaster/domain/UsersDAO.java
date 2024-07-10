package com.taskmaster.domain;

import com.taskmaster.api.web.v1.model.APIUser;
import com.taskmaster.domain.model.Account;
import com.taskmaster.domain.model.Role;
import com.taskmaster.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@RequiredArgsConstructor
public class UsersDAO {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public void createUser(User user) {
        var sql = """
                INSERT INTO USERS
                (GUID, USERNAME, PASSWORD, NAME, EMAIL)
                VALUES 
                (:guid, :username, :password, :name, :email)
                """;

        jdbcTemplate.update(sql, Map.of(
                "guid", user.guid(),
                "username", user.username(),
                "password", user.password(),
                "name", user.name(),
                "email", user.email() == null ? "" : user.email()
        ));
    }

    public Account getAccountByUsername(String username) {
        var sql = "SELECT USERNAME, GUID, PASSWORD FROM USERS WHERE USERNAME = :username";

        return jdbcTemplate.queryForObject(sql, Map.of("username", username), (rs, i) -> {
            return new Account((UUID) rs.getObject("guid"), rs.getString("username"), rs.getString("password"));
        });

    }

    public User getUserById(UUID userId) {
        var sql = "SELECT Username, Name, Role from USERS where guid = :guid";
        return jdbcTemplate.queryForObject(sql, Map.of("guid", userId), (rs, i) -> {
            return new User(null,
                    userId,
                    rs.getString("Username"),
                    null,
                    rs.getString("NAME"),
                    null,
                    Role.valueOf(rs.getString("Role")),
                    null);

        });
    }

    public List<User> getUsers(Set<UUID> userIds) {
        var sql = """
                 SELECT GUID, NAME, EMAIL FROM USERS WHERE GUID IN (:userIds)
                """;
        return jdbcTemplate.query(sql, Map.of("userIds", userIds), getUserRowMapper());
    }

    private RowMapper<User> getUserRowMapper() {
        return (rs, num) -> {
            return new User(
                    null,
                    (UUID) rs.getObject("GUID"),
                    null,
                    null,
                    rs.getString("NAME"),
                    null,
                    null,
                    null
            );
        };
    }

    public List<User> findUser(String searchQuery) {
        var sql = """
                SELECT * FROM USERS WHERE NAME ILIKE :name
                """;
        return jdbcTemplate.query(sql, Map.of("name", "%" + searchQuery + "%"), getUserRowMapper());
    }
}
