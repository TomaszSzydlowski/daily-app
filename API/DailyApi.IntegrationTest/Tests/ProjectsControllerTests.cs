using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using DailyApi.Controllers.Config;
using DailyApi.IntegrationTest.Base;
using Xunit;
using DailyApi.Commands.ProjectCommands;
using DailyApi.Resources;

namespace DailyApi.IntegrationTest.Tests
{
    //This tag is added to stop running paraller test in diffrent classes
    [Collection("IntegrationTest")]
    public class ProjectsControllerTest : TestFixture
    {
        private readonly string _nameFake = "Project name";
        private readonly string _secoundNameFake = "Secound Project name";
        public ProjectsControllerTest() : base()
        {
        }

        [Fact]
        public async Task GetAll_TwoProjects_ReturnsAllTwoProjects()
        {
            // Arrange
            await AuthenticateAsync();
            var createdProject = await CreateProjectAsync(
                new CreateProjectCommand
                {
                    Name = _nameFake,
                });
            var createdProject2 = await CreateProjectAsync(
                new CreateProjectCommand
                {
                    Name = _secoundNameFake,
                });

            //Act
            var response = await TestClient.GetAsync(ApiRoutes.Projects.GetAll); // by userId

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseProject = await response.Content.ReadAsAsync<IEnumerable<ProjectResource>>();

            Assert.NotEmpty(createdProject.Id.ToString());
            Assert.Equal(_nameFake, responseProject.FirstOrDefault().Name);
            Assert.NotEmpty(createdProject2.Id.ToString());
            Assert.Equal(_secoundNameFake, responseProject.LastOrDefault().Name);
        }

        [Fact]
        public async Task Post_OneProject_ReturnPostedProject()
        {
            // Arrange
            await AuthenticateAsync();

            //Act
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Projects.Post,
                new CreateProjectCommand
                {
                    Name = _nameFake,

                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseProject = await response.Content.ReadAsAsync<ProjectResource>();

            Assert.Equal(_nameFake, responseProject.Name);
            Assert.NotNull(responseProject.Id);
        }
    }
}