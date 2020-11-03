using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DailyApi.Controllers.Config;
using MongoDB.Driver;
using DailyApi.Resources;
using DailyApi.Commands.NoteCommands;
using DailyApi.Commands.AuthCommands;
using DailyApi.Commands.ProjectCommands;

namespace DailyApi.IntegrationTest.Base
{
    public abstract class TestFixture : DbFixture
    {
        protected readonly string _AuthorizationHeader = "Authorization";
        protected readonly string IntegrationUserEmail = "test@integration.com";
        protected readonly string IntegrationUserPassword = "testintegration123";

        protected TestFixture() : base() { }

        protected async Task AuthenticateAsync()
        {
            TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", await GetJwtAsync());
        }

        protected async Task<NoteResource> CreateNoteAsync(CreateNoteCommand request)
        {
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Notes.Post, request);
            return await response.Content.ReadAsAsync<NoteResource>();
        }

        protected async Task<ProjectResource> CreateProjectAsync(CreateProjectCommand request)
        {
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Projects.Post, request);
            return await response.Content.ReadAsAsync<ProjectResource>();
        }
        private async Task<string> GetJwtAsync()
        {
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Auth.Register,
                new CreateUserRegisterCommand
                {
                    Email = IntegrationUserEmail,
                    Password = IntegrationUserPassword
                });

            var token = response.Headers.GetValues(_AuthorizationHeader);
            return token.FirstOrDefault();
        }
    }
}
