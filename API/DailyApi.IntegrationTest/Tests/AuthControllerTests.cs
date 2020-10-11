using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using DailyApi.Controllers.Config;
using DailyApi.IntegrationTest.Base;
using DailyApi.Resources;
using Xunit;
using DailyApi.IntegrationTest.Mocks;

namespace DailyApi.IntegrationTest.Tests
{
    //This tag is added to stop running paraller test in diffrent classes
    [Collection("IntegrationTest")]
    public class AuthControllerTests : TestFixture
    {
        public AuthControllerTests() : base()
        {
        }

        [Fact]
        public async Task Register_NoUserInDb_ReturnToken()
        {
            // Arrange

            //Act
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Auth.Register,
                new SaveUserRegisterResource
                {
                    Email = "testuser@test.com",
                    Password = "test123"
                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var token = response.Headers.GetValues(_AuthorizationHeader).FirstOrDefault();
            Assert.NotEmpty(token);
        }

        [Fact]
        public async Task Login_NoUserInDb_ReturnToken()
        {
            // Arrange
            var responseRegister = await TestClient.PostAsJsonAsync(ApiRoutes.Auth.Register,
                new SaveUserRegisterResource
                {
                    Email = "testuser@test.com",
                    Password = "test123"
                });

            //Act
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Auth.Login,
                new LoginUserResource
                {
                    Email = "testuser@test.com",
                    Password = "test123"
                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("text/plain; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseLogin = response.Content.ReadAsStringAsync().Result;
            Assert.NotEmpty(responseLogin);
        }

        [Fact]
        public async Task Register_UserIsExisitng_ThrowError()
        {
            // Arrange
            var addedFirstUserResponse = await TestClient.PostAsJsonAsync(ApiRoutes.Auth.Register,
                new SaveUserRegisterResource
                {
                    Email = "testuser@test.com",
                    Password = "test123"
                });

            //Act
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Auth.Register,
                new SaveUserRegisterResource
                {
                    Email = "testuser@test.com",
                    Password = "test123"
                });

            //Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            var authResponse = await response.Content.ReadAsAsync<ErrorResourceFake>();
            Assert.False(authResponse.Success);
            Assert.Collection(authResponse.Messages, item => Assert.Contains("Email is already taken", item));
        }
    }
}