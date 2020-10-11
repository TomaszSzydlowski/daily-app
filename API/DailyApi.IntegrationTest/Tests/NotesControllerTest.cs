using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using DailyApi.Controllers.Config;
using DailyApi.IntegrationTest.Base;
using DailyApi.Resources;
using Xunit;

namespace DailyApi.IntegrationTest.Tests
{
    //This tag is added to stop running paraller test in diffrent classes
    [Collection("IntegrationTest")]
    public class MeasurementsControllerTests : TestFixture
    {
        private readonly string _dateTimeFake = "2020-10-11T21:19";
        private readonly string _dateTimeSecondFake = "2020-10-11T21:19";
        private readonly string _contentFake = "Integration test content";
        private readonly string _contentSecondFake = "Integration test second content";
        public MeasurementsControllerTests() : base()
        {
        }

        [Fact]
        public async Task GetById_OneNote_ReturnsOneNote()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new SaveNoteResource
                {
                    Date = _dateTimeFake,
                    Content = _contentFake,
                    ProjectId = 1
                });

            //Act
            var response = await TestClient.GetAsync(ApiRoutes.Notes.Get.Replace("{noteId}", createdNote.Id.ToString()));

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(responseNote.Date, _dateTimeFake);
            Assert.Equal(responseNote.Content, _contentFake);
            Assert.Equal(responseNote.ProjectId, 1);
        }

        [Fact]
        public async Task GetAll_TwoNotes_ReturnsTwoNotes()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new SaveNoteResource
                {
                    Date = _dateTimeFake,
                    Content = _contentFake,
                    ProjectId = 1
                });
            var createdNote2 = await CreateNoteAsync(
                new SaveNoteResource
                {
                    Date = _dateTimeSecondFake,
                    Content = _contentSecondFake,
                    ProjectId = 2
                });

            //Act
            var response = await TestClient.GetAsync(ApiRoutes.Notes.Get.Replace("{noteId}", createdNote.Id.ToString()));

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseNote = await response.Content.ReadAsAsync<IEnumerable<NoteResource>>();

            Assert.Equal(responseNote.FirstOrDefault().Date, _dateTimeFake);
            Assert.Equal(responseNote.FirstOrDefault().Content, _contentFake);
            Assert.Equal(responseNote.FirstOrDefault().ProjectId, 1);

            Assert.Equal(responseNote.LastOrDefault().Date, _dateTimeSecondFake);
            Assert.Equal(responseNote.LastOrDefault().Content, _contentSecondFake);
            Assert.Equal(responseNote.LastOrDefault().ProjectId, 2);
        }

        [Fact]
        public async Task Post_OneNote_ReturnPostedNote()
        {
            // Arrange
            await AuthenticateAsync();

            //Act
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Notes.Post,
                new SaveNoteResource
                {
                    Date = _dateTimeFake,
                    Content = _contentFake,
                    ProjectId = 1
                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(responseNote.Date, _dateTimeFake);
            Assert.Equal(responseNote.Content, _contentFake);
            Assert.Equal(responseNote.ProjectId, 1);
        }

        [Fact]
        public async Task Update_OneNote_ReturnUpdatedNote()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new SaveNoteResource
                {
                    Date = _dateTimeFake,
                    Content = _contentFake,
                    ProjectId = 1
                });

            //Act
            var response = await TestClient.PutAsJsonAsync(ApiRoutes.Notes.Update,
                new SaveNoteResource
                {
                    Id = createdNote.Id.ToString(),
                    Date = _dateTimeSecondFake,
                    Content = _contentSecondFake,
                    ProjectId = 2
                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(responseNote.Id, createdNote.Id);
            Assert.Equal(responseNote.Date, _dateTimeSecondFake);
            Assert.Equal(responseNote.Content, _contentSecondFake);
            Assert.Equal(responseNote.ProjectId, 2);
        }

        [Fact]
        public async Task Delete_OneNote_ReturnDeletedNote()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new SaveNoteResource
                {
                    Date = _dateTimeFake,
                    Content = _contentFake,
                    ProjectId = 1
                });

            //Act
            var response = await TestClient.DeleteAsync(ApiRoutes.Notes.Delete.Replace("{noteId}", createdNote.Id.ToString()));

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(responseNote.Id, createdNote.Id);
            Assert.Equal(responseNote.Date, _dateTimeFake);
            Assert.Equal(responseNote.Content, _contentFake);
            Assert.Equal(responseNote.ProjectId, 1);
        }

        [Fact]
        public async Task DeleteAll_TwoNote_ReturnTwoDeletedNote()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new SaveNoteResource
                {
                    Date = _dateTimeFake,
                    Content = _contentFake,
                    ProjectId = 1
                });
            var createdNote2 = await CreateNoteAsync(
                new SaveNoteResource
                {
                    Date = _dateTimeSecondFake,
                    Content = _contentSecondFake,
                    ProjectId = 2
                });

            //Act
            var response = await TestClient.DeleteAsync(ApiRoutes.Notes.DeleteAll);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseNote = await response.Content.ReadAsAsync<IEnumerable<NoteResource>>();

            Assert.Equal(responseNote.FirstOrDefault().Date, _dateTimeFake);
            Assert.Equal(responseNote.FirstOrDefault().Content, _contentFake);
            Assert.Equal(responseNote.FirstOrDefault().ProjectId, 1);

            Assert.Equal(responseNote.LastOrDefault().Date, _dateTimeSecondFake);
            Assert.Equal(responseNote.LastOrDefault().Content, _contentSecondFake);
            Assert.Equal(responseNote.LastOrDefault().ProjectId, 2);
        }
    }
}