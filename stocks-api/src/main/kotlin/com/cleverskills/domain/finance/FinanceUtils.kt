package com.cleverskills.domain.finance

import kotlin.math.roundToInt

fun Double.twoDecimals(): Double {

    return (this * 100.0).roundToInt() / 100.0
}
