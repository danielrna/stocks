package com.cleverskills.domain.project

import com.cleverskills.data.project.DBProjectInputs
import com.cleverskills.data.project.ProjectInputsRepository
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.springframework.stereotype.Service

@Service
class ProjectInputsService(
    val projectInputsRepository: ProjectInputsRepository,
) {
    suspend fun createOrUpdate(
        id: Long? = null, inputs: ProjectInputs
    ): ProjectInputs {
        return projectInputsRepository.save(inputs.toDB(id)).awaitFirst().toDomain()
    }

    suspend fun get(id: Long): ProjectInputs? {
        return projectInputsRepository.findById(id).awaitFirstOrNull()?.toDomain()
    }

    suspend fun findByProjectId(projectId: Long): ProjectInputs? {
        return projectInputsRepository.findById(projectId).awaitFirstOrNull()?.toDomain()
    }

    suspend fun getNotNull(id: Long): ProjectInputs {
        return projectInputsRepository.findById(id).awaitFirstOrNull()?.toDomain()
            ?: throw IllegalStateException("No Project input found ")
    }

    suspend fun delete(id: Long) {
        projectInputsRepository.deleteById(id).awaitFirstOrNull()
    }

    suspend fun deleteByProjectId(projectId: Long) {
        projectInputsRepository.deleteByProjectId(projectId).awaitFirstOrNull()
    }

    internal fun DBProjectInputs.toDomain(): ProjectInputs {
        return when (this.type) {

            ProjectType.COLOC -> ColocProjectInputs(
                id = checkNotNull(id),
                nbChambre = nbChambre!!,
                prixChambre = prixChambre!!,
                vacance = vacance!!,
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
                projectId = projectId
            )

            ProjectType.LCD -> LcdProjectInputs(
                id = checkNotNull(id),
                prixNuit = prixNuit!!,
                occupation = occupation!!,
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
                projectId = projectId
            )

            ProjectType.IDR -> TODO()


        }

    }

    private fun ProjectInputs.toDB(id: Long? = null): DBProjectInputs {
        return DBProjectInputs(
            id = id,
            projectId = checkNotNull(this.projectId),
            prix = this.prix,
            travaux = this.travaux,
            apport = this.apport,
            loanRate = this.loanRate,
            dureeCredit = this.dureeCredit,
            meubles = this.meubles,
            copro = this.copro,
            impots = this.impots,
            tf = this.tf,
            pno = this.pno,
            autre = this.autre,
            cfe = this.cfe,
            entretien = this.entretien,
            chasse = this.chasse,
            vacance = if (this is ColocProjectInputs) this.vacance else null,
            nbChambre = if (this is ColocProjectInputs) this.nbChambre else null,
            prixChambre = if (this is ColocProjectInputs) this.prixChambre else null,
            prixNuit = if (this is LcdProjectInputs) this.prixNuit else null,
            occupation = if (this is LcdProjectInputs) this.occupation else null,
            type = when (this) {
                is ColocProjectInputs -> ProjectType.COLOC
                is LcdProjectInputs -> ProjectType.LCD
            },
        )
    }
}
