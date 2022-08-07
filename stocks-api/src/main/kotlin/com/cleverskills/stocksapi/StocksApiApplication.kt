package com.cleverskills.stocksapi

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class StocksApiApplication

fun main(args: Array<String>) {
	runApplication<StocksApiApplication>(*args)
}
