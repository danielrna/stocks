package com.cleverskills.api

import com.cleverskills.domain.Project
import com.cleverskills.domain.ProjectInputs
import com.cleverskills.domain.ProjectService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.web.bind.annotation.*


@Api("Project")
@RestController
@RequestMapping("project")
class ProjectController(val projectService: ProjectService) {

    @ApiOperation(value = "Create project")
    @PostMapping("")
    suspend fun create(
        @RequestBody request: ApiCreateProjectRequest
    ): ApiProject {
        return projectService.create(
            request.type,
            request.ownerId,
            request.name,
            request.inputs,
        ).toApi()
    }

    @ApiOperation(value = "Get project")
    @GetMapping("{id}")
    suspend fun get(
        @PathVariable(name = "id", required = true) id: Long,
    ): ApiProject? {
        return projectService.get(id)?.toApi()
    }

    @ApiOperation(value = "Get projects by user id")
    @GetMapping("")
    suspend fun findByUserId(
        @RequestParam(name = "userId", required = true) userId: String,
    ): List<ApiProject> {
        return projectService.findByUserId(userId).map { it.toApi() }
    }

}

private fun Project.toApi(): ApiProject {
    return ApiProject(
        id = id,
        type = type,
        ownerId = ownerId,
        name = name,
        inputs = inputs?.toApi(),
        createdDate = createdDate,
        upadatedDate = upadatedDate
    )
}

private fun ProjectInputs.toApi(): ApiProjectInputs {
    return ApiProjectInputs(
        nbChambre = nbChambre,
        prixChambre = prixChambre,
        prix = prix,
        travaux = travaux,
        apport = apport,
        tauxCredit = tauxCredit,
        dureeCredit = dureeCredit,
        meubles = meubles,
        copro = copro,
        impots = impots,
        tf = tf,
        pno = pno,
        autre = autre,
        cfe = cfe,
        entretien = entretien,
        chasse = chasse,
        vacance = vacance,
    )
}

