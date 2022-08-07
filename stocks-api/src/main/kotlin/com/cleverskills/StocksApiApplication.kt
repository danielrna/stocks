package com.cleverskills

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import springfox.documentation.swagger2.annotations.EnableSwagger2WebFlux

@EnableSwagger2WebFlux
@SpringBootApplication
class StocksApiApplication

fun main(args: Array<String>) {
	runApplication<StocksApiApplication>(*args)
}
