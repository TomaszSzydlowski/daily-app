using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using DailyApi.Controllers.Config;
using DailyApi.Resources;
using MongoDB.Driver;

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

        protected async Task<NoteResource> CreateNoteAsync(SaveNoteResource request)
        {
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Notes.Post, request);
            return await response.Content.ReadAsAsync<NoteResource>();
        }
        private async Task<string> GetJwtAsync()
        {
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Auth.Register,
                new SaveUserRegisterResource
                {
                    Email = IntegrationUserEmail,
                    Password = IntegrationUserPassword
                });

            var token = response.Headers.GetValues(_AuthorizationHeader);
            return token.FirstOrDefault();
        }
    }
}
