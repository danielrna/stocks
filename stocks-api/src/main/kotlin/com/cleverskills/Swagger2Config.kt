package com.cleverskills.stocksapi;

import com.fasterxml.classmate.ResolvedType
import com.fasterxml.classmate.TypeResolver
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.schema.AlternateTypeRule
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2WebFlux
import java.time.Duration
import java.time.LocalDate
import java.util.*

@Configuration
@EnableSwagger2WebFlux
class Swagger2Config {
    @Bean
    fun api(): Docket {
        val typeResolver = TypeResolver()
        val stringType: ResolvedType = typeResolver.resolve(String::class.java)

        // Interpret durations as strings
        val durationType: ResolvedType = typeResolver.resolve(Duration::class.java)
        val durationAsStringRule = AlternateTypeRule(durationType, stringType)

        // Interpret localDates as strings
        val localDateType: ResolvedType = typeResolver.resolve(LocalDate::class.java)
        val localDateAsStringRule = AlternateTypeRule(localDateType, stringType)

        return Docket(DocumentationType.SWAGGER_2)
            .directModelSubstitute(
                Array<LocalDate>::class.java,
                Array<Date>::class.java
            ) // FIXME fix LocalDate list issue
            .alternateTypeRules(durationAsStringRule)
            .alternateTypeRules(localDateAsStringRule)
            .select()
            .apis(
                RequestHandlerSelectors
                    .basePackage("com.cleverskills.api")
            )
            .paths(PathSelectors.any())
            .build()
    }

}
