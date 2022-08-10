package com.cleverskills.api

import com.cleverskills.domain.ProjectService
import data.DBProject
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@Api("Project")
@RestController
@RequestMapping("project")
class ProjectController(val projectService: ProjectService) {

    @ApiOperation(value = "Create project")
    @PostMapping("/create")
    suspend fun create(
        @RequestBody request: ApiCreateProjectRequest
    ): ResponseEntity<Unit> {
        projectService.create(
            request.type,
            request.ownerId,
            request.name,
            request.inputs,
        )
        return ResponseEntity.noContent().build()
    }
    @ApiOperation(value = "Get project")
    @GetMapping("{id}")
    suspend fun get(
        @PathVariable(name = "id", required = true) id: Long,
    ): DBProject? {
        return projectService.get(id)
    }

}

