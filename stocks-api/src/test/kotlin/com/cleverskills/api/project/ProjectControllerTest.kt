import com.cleverskills.api.project.ApiCreateOrUpdateColocProjectRequest
import com.cleverskills.api.project.ApiProject
import com.cleverskills.api.project.ProjectController
import com.cleverskills.defaultApiColocProjectInputs
import com.cleverskills.defaultFullProject
import com.cleverskills.domain.project.ColocProjectInputs
import com.cleverskills.domain.project.ProjectService
import io.mockk.coEvery
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith


@ExtendWith(MockKExtension::class)
class ProjectControllerTest {

    @MockK
    private lateinit var projectService: ProjectService

    @InjectMockKs
    private lateinit var projectController: ProjectController

    @Test
    fun `should create a coloc when asked`() {
        /* Given */
        coEvery {
            projectService.createOrUpdateProject(
                id = null, userId = any(), name = any(), inputs = any<ColocProjectInputs>()
            )
        } returns defaultFullProject.copy(name = "Dubai project")
        /* When */
        val res = runBlocking {
            projectController.createColoc(
                request = ApiCreateOrUpdateColocProjectRequest(
                    id = null, userId = "", name = "", inputs = defaultApiColocProjectInputs
                )
            )
        }/* Then */
        assertThat(res).isInstanceOf(ApiProject::class.java)
        assertThat(res.name).isEqualTo("Dubai project")
    }
}
