using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using DailyApi.Controllers.Config;
using DailyApi.IntegrationTest.Base;
using Xunit;
using DailyApi.Commands.NoteCommands;
using DailyApi.Resources;

namespace DailyApi.IntegrationTest.Tests
{
    //This tag is added to stop running paraller test in diffrent classes
    [Collection("IntegrationTest")]
    public class NotesControllerTest : TestFixture
    {
        private readonly string _dateTimeRequestFake = "2020-10-11T21:19Z";
        private readonly string _dateTimeSecondRequestFake = "2020-10-12T21:19Z";
        private readonly string _contentFake = "Integration test content";
        private readonly string _contentSecondFake = "Integration test second content";
        public NotesControllerTest() : base()
        {
        }

        [Fact]
        public async Task GetById_OneNote_ReturnsOneNote()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeRequestFake,
                    Content = _contentFake,
                    ProjectId = 1
                });

            //Act
            var response = await TestClient.GetAsync(ApiRoutes.Notes.Get.Replace("{noteId}", createdNote.Id.ToString()));

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.NotEmpty(createdNote.Id.ToString());
            Assert.Equal(_dateTimeRequestFake, responseNote.Date);
            Assert.Equal(_contentFake, responseNote.Content);
            Assert.Equal(1, responseNote.ProjectId);
        }

        [Fact]
        public async Task GetAll_TwoNotes_ReturnsTwoNotes()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeRequestFake,
                    Content = _contentFake,
                    ProjectId = 1
                });
            var createdNote2 = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = 2
                });

            //Act
            var response = await TestClient.GetAsync(ApiRoutes.Notes.GetAll); // by userId

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseNote = await response.Content.ReadAsAsync<IEnumerable<NoteResource>>();

            Assert.NotEmpty(createdNote.Id.ToString());
            Assert.Equal(_dateTimeRequestFake, responseNote.FirstOrDefault().Date);
            Assert.Equal(_contentFake, responseNote.FirstOrDefault().Content);
            Assert.Equal(1, responseNote.FirstOrDefault().ProjectId);

            Assert.NotEmpty(createdNote2.Id.ToString());
            Assert.Equal(_dateTimeSecondRequestFake, responseNote.LastOrDefault().Date);
            Assert.Equal(_contentSecondFake, responseNote.LastOrDefault().Content);
            Assert.Equal(2, responseNote.LastOrDefault().ProjectId);
        }

        [Fact]
        public async Task GetAll_TwoNotes_ReturnsOneNotesByFilers()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeRequestFake,
                    Content = _contentFake,
                    ProjectId = 1
                });
            var createdNote2 = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = 2
                });

            //Act
            var response = await TestClient.GetAsync(ApiRoutes.Notes.GetAll + "?date=2020-10-11"); // by userId

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseNote = await response.Content.ReadAsAsync<IEnumerable<NoteResource>>();

            Assert.NotEmpty(createdNote.Id.ToString());
            Assert.Single(responseNote);
            Assert.Equal(_dateTimeRequestFake, responseNote.FirstOrDefault().Date);
            Assert.Equal(_contentFake, responseNote.FirstOrDefault().Content);
            Assert.Equal(1, responseNote.FirstOrDefault().ProjectId);
        }

        [Fact]
        public async Task Post_OneNote_ReturnPostedNote()
        {
            // Arrange
            await AuthenticateAsync();

            //Act
            var response = await TestClient.PostAsJsonAsync(ApiRoutes.Notes.Post,
                new CreateNoteCommand
                {
                    Date = _dateTimeRequestFake,
                    Content = _contentFake,
                    ProjectId = 1
                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(_dateTimeRequestFake, responseNote.Date);
            Assert.Equal(_contentFake, responseNote.Content);
            Assert.Equal(1, responseNote.ProjectId);
        }

        [Fact]
        public async Task Update_OneNote_ReturnUpdatedNote()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeRequestFake,
                    Content = _contentFake,
                    ProjectId = 1
                });

            //Act
            var response = await TestClient.PutAsJsonAsync(ApiRoutes.Notes.Update,
                new CreateNoteCommand
                {
                    Id = createdNote.Id.ToString(),
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = 2
                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(createdNote.Id, responseNote.Id);
            Assert.Equal(_dateTimeSecondRequestFake, responseNote.Date);
            Assert.Equal(_contentSecondFake, responseNote.Content);
            Assert.Equal(2, responseNote.ProjectId);
        }

        [Fact]
        public async Task Delete_OneNote_ReturnDeletedNote()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeRequestFake,
                    Content = _contentFake,
                    ProjectId = 1
                });

            //Act
            var response = await TestClient.DeleteAsync(ApiRoutes.Notes.Delete.Replace("{noteId}", createdNote.Id.ToString()));

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(createdNote.Id, responseNote.Id);
            Assert.Equal(_dateTimeRequestFake, responseNote.Date);
            Assert.Equal(_contentFake, responseNote.Content);
            Assert.Equal(1, responseNote.ProjectId);
        }

        [Fact]
        public async Task DeleteAll_TwoNote_ReturnTwoDeletedNote()
        {
            // Arrange
            await AuthenticateAsync();
            var createdNote = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeRequestFake,
                    Content = _contentFake,
                    ProjectId = 1
                });
            var createdNote2 = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = 2
                });

            //Act
            var response = await TestClient.DeleteAsync(ApiRoutes.Notes.DeleteAll);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseNote = await response.Content.ReadAsAsync<IEnumerable<NoteResource>>();

            Assert.NotEmpty(createdNote.Id.ToString());
            Assert.Equal(_dateTimeRequestFake, responseNote.FirstOrDefault().Date);
            Assert.Equal(_contentFake, responseNote.FirstOrDefault().Content);
            Assert.Equal(1, responseNote.FirstOrDefault().ProjectId);

            Assert.NotEmpty(createdNote2.Id.ToString());
            Assert.Equal(_dateTimeSecondRequestFake, responseNote.LastOrDefault().Date);
            Assert.Equal(_contentSecondFake, responseNote.LastOrDefault().Content);
            Assert.Equal(2, responseNote.LastOrDefault().ProjectId);
        }
    }
}