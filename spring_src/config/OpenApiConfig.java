package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Cấu hình Swagger/OpenAPI cho API Documentation
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hệ thống Quản lý Phúc khảo HUSC - API Documentation")
                        .version("1.0.0")
                        .description("API Documentation cho hệ thống quản lý phúc khảo điểm thi của Trường Đại học Khoa học, Đại học Huế")
                        .contact(new Contact()
                                .name("HUSC Development Team")
                                .email("support@husc.edu.vn"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Development Server"),
                        new Server()
                                .url("https://api.husc.edu.vn")
                                .description("Production Server")
                ));
    }
}

