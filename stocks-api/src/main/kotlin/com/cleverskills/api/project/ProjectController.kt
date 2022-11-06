package com.cleverskills.api.project

import com.cleverskills.domain.project.*
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@Api("Project")
@RestController
@RequestMapping("project")
class ProjectController(val projectService: ProjectService) {

    /**
     * COLOC
     */
    @ApiOperation(value = "Create or update coloc project")
    @PostMapping("coloc")
    suspend fun createColoc(
        @RequestBody request: ApiCreateOrUpdateColocProjectRequest
    ): ApiProject {
        return projectService.createOrUpdateProject(
            id = request.id,
            userId = request.userId,
            name = request.name,
            inputs = request.inputs.toDomain(request.id),
        ).toApi()
    }

    @PutMapping("coloc")
    suspend fun update(@RequestBody request: ApiCreateOrUpdateColocProjectRequest) = createColoc(request)

    /**
     * LCD
     */
    @ApiOperation(value = "Create or update LCD project")
    @PostMapping("lcd")
    suspend fun createLcd(
        @RequestBody request: ApiCreateOrUpdateLcdProjectRequest
    ): ApiProject {
        return projectService.createOrUpdateProject(
            id = request.id,
            userId = request.userId,
            name = request.name,
            inputs = request.inputs.toDomain(request.id) as LcdProjectInputs,
        ).toApi()
    }

    @PutMapping("lcd")
    suspend fun updateLcd(@RequestBody request: ApiCreateOrUpdateLcdProjectRequest) = createLcd(request)

    /**
     * otheer
     */
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
    @PostMapping("calculate-outputs")
    suspend fun calculateOutputs(
        @RequestBody(required = true) req: ApiColocProjectInputs,
    ): ApiProjectOutputs {
        return projectService.calculateOutputs(req.toDomain()).toApi()
    }

    private fun FullProject.toApi(): ApiProject {
        return ApiProject(
            id = id,
            type = type,
            userId = userId,
            name = name,
            inputs = inputs.toApi(),
            outputs = outputs.toApi(),
            createdDate = createdDate,
            upadatedDate = updatedDate
        )
    }

    internal fun ProjectInputs.toApi(): ApiProjectInputs {
        return when (this) {
            is ColocProjectInputs -> ApiColocProjectInputs(
                nbChambre = nbChambre,
                prixChambre = prixChambre,
                prix = prix,
                travaux = travaux,
                apport = apport,
                loanRate = loanRate,
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

            is LcdProjectInputs -> ApiLcdProjectInputs(
                prixNuit = prixNuit,
                occupation = occupation,
                prix = prix,
                travaux = travaux,
                apport = apport,
                loanRate = loanRate,
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
            )

        }
    }


    private fun ApiProjectInputs.toDomain(projectId: Long? = null): ProjectInputs {
        when (this) {
            is ApiColocProjectInputs -> return ColocProjectInputs(
                nbChambre = nbChambre,
                prixChambre = prixChambre,
                prix = prix,
                travaux = travaux,
                apport = apport,
                loanRate = loanRate,
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
                projectId = projectId
            )

            is ApiLcdProjectInputs -> return LcdProjectInputs(
                prixNuit = prixNuit,
                occupation = occupation,
                prix = prix,
                travaux = travaux,
                apport = apport,
                loanRate = loanRate,
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
                id = null,
                projectId = projectId
            )
        }

    }

    private fun ProjectOutputs.toApi(): ApiProjectOutputs {
        return ApiProjectOutputs(
            monthlyExpenses = monthlyExpenses,
            notaire = notaire,
            tfMensuelle = tfMensuelle,
            monthlyRent = monthlyRent,
            totalEmprunte = totalEmprunte,
            cashflow = cashflow,
            cashflowWithoutLoan = cashflowWithoutLoan,
            gestion = gestion,
            monthlyLoan = monthlyLoan,
            rendementBrut = rendementBrut,
            rendementNet = rendementNet,
        )
    }

}
