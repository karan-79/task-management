package com.taskmaster.config;

import com.zaxxer.hikari.HikariDataSource;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import javax.sql.DataSource;

@Configuration
public class DbConfig {

    @Bean public SimpleJdbcInsert simpleJdbcInsert(DataSource dataSource) {
        return new SimpleJdbcInsert(dataSource);
    }

    @Bean
    public DataSource dataSource(@Value("${db.local}") String dbType) {
        var ds = (HikariDataSource) getDs(dbType);
        System.out.println("*** INTIALIZED DS **** ");
        System.out.println("DB - TYPE " + ds.getDriverClassName());
        System.out.println("DB - URL " + ds.getJdbcUrl());

        if("h2".equals(dbType)) {
            cleanMigrate(ds);
        } else {
            migratePostgres(ds);
        }

        return ds;
    }

    private void migratePostgres(DataSource ds) {
        var fw = Flyway.configure()
                .dataSource(ds)
//                .cleanDisabled(false)
                .locations("db/migrations/postgres")
                .load();

//        fw.clean();
        fw.migrate();

    }

    private DataSource getDs(String dbType) {
        return "postgres".equals(dbType) ? getPostgresDs() : getH2Ds();
    }

    private DataSource getPostgresDs() {
        return DataSourceBuilder.create()
                .url("jdbc:postgresql://localhost:5430/mydatabase")
                .driverClassName("org.postgresql.Driver")
                .username("myuser")
                .password("secret")
                .build();
    }
    private DataSource getH2Ds() {
        return DataSourceBuilder.create()
                .url("jdbc:h2:mem:testdb")
                .driverClassName("org.h2.Driver")
                .username("sa")
                .password("")
                .build();
    }

    private void cleanMigrate(DataSource ds) {
        var fw = Flyway.configure()
                .dataSource(ds)
                .locations("db/migrations/h2")
                .cleanDisabled(false)
                .load();


        fw.clean();
        fw.migrate();
    }

}
