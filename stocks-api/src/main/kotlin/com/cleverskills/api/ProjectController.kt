package com.cleverskills.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@Api("Project")
@RestController
@RequestMapping("project")
class ProjectController() {

    @ApiOperation(value = "Create project")
    @PostMapping("/create")
    suspend fun createProject(
//        @RequestBody request: ApiCreateProjectRequest
    ): String {
        return "sqddq"
    }

}

