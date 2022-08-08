package com.cleverskills.data

import io.r2dbc.postgresql.PostgresqlConnectionConfiguration
import io.r2dbc.postgresql.PostgresqlConnectionFactory
import io.r2dbc.spi.ConnectionFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.data.r2dbc.config.AbstractR2dbcConfiguration
import org.springframework.data.r2dbc.connectionfactory.init.CompositeDatabasePopulator
import org.springframework.data.r2dbc.connectionfactory.init.ResourceDatabasePopulator
import org.springframework.data.r2dbc.convert.R2dbcCustomConversions
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories
import java.util.*
import org.springframework.data.r2dbc.connectionfactory.init.ConnectionFactoryInitializer as ConnectionFactoryInitializer1

@Configuration
@EnableR2dbcRepositories
class PostgresConfig(@Value("\${db.host}") private val host: String,
                     @Value("\${db.port}") private val port: Int,
                     @Value("\${db.database}") private val database: String,
                     @Value("\${db.username}") private val username: String,
                     @Value("\${db.password}") private val password: String,
                     @Value("\${db.schema}") private val schema: String
) : AbstractR2dbcConfiguration() {

    @Bean
    override fun connectionFactory(): PostgresqlConnectionFactory {
        val config = PostgresqlConnectionConfiguration.builder()
                .host(host)
                .port(port)
                .database(database)
                .username(username)
                .password(password)
                .build()

        return PostgresqlConnectionFactory(config)
    }

    @Bean
    fun initializer(connectionFactory: ConnectionFactory): ConnectionFactoryInitializer1 {

        val initializer = ConnectionFactoryInitializer1()
        initializer.setConnectionFactory(connectionFactory)

        val populator = CompositeDatabasePopulator()
        populator.addPopulators(ResourceDatabasePopulator(ClassPathResource(schema)))
        initializer.setDatabasePopulator(populator)

        return initializer
    }

    @Bean
    override fun r2dbcCustomConversions(): R2dbcCustomConversions {
        val converters: ArrayList<Any> = ArrayList()
//        converters.add(JsonToMapConverter())
        //   converters.add(MapToJsonConverter())
        return R2dbcCustomConversions(storeConversions, converters)
    }
}
