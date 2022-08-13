package com.cleverskills.api.project

import com.cleverskills.domain.Project
import com.cleverskills.domain.ProjectInputs
import com.cleverskills.domain.ProjectOutputs
import com.cleverskills.domain.ProjectService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
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
        return projectService.createOrUpdate(
            null,
            request.type,
            request.userId,
            request.name,
            request.inputs.toDomain(),
        ).toApi()
    }

    @ApiOperation(value = "Update project")
    @PutMapping("")
    suspend fun update(
        @RequestBody request: ApiUpdateProjectRequest
    ): ApiProject {
        return projectService.createOrUpdate(
            request.id,
            request.type,
            request.userId,
            request.name,
            request.inputs.toDomain(),
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

    @ApiOperation(value = "Delete project by id")
    @DeleteMapping("{id}")
    suspend fun delete(
        @PathVariable(name = "id", required = true) id: Long,
    ): ResponseEntity<Unit> {
        projectService.deleteById(id)
        return ResponseEntity<Unit>(HttpStatus.NO_CONTENT)
    }

    @ApiOperation(value = "Calculate project outputs")
    @PostMapping("calculateOutputs")
    suspend fun calculateOutputs(
        @RequestBody(required = true) req: ApiProjectInputs,
    ): ApiProjectOutputs {
        return projectService.calculateOutputs(req.toDomain()).toApi()
    }


    private fun Project.toApi(): ApiProject {
        return ApiProject(
            id = id,
            type = type,
            userId = userId,
            name = name,
            inputs = inputs?.toApi(),
            outputs = outputs.toApi(),
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

    private fun ApiProjectInputs.toDomain(): ProjectInputs {
        return ProjectInputs(
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
            id = null,
        )
    }

    private fun ProjectOutputs.toApi(): ApiProjectOutputs {
        return ApiProjectOutputs(
            monthlyExpenses = monthlyExpenses,
            notaire = notaire,
            tfMensuelle = tfMensuelle,
            monthlyRent = monthlyRent,
            totalEmprunte = totalEmprunte,
            cashflow = cashflow,
            cashflowAfterCredit = cashflowAfterCredit,
            gestion = gestion,
            creditMensuel = creditMensuel,
            rendementBrut = rendementBrut,
            rendementNet = rendementNet,
        )
    }

}
