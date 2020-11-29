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
using System;

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
        private readonly Guid _fakeFirstProjectId = new Guid();
        private readonly Guid _fakeSecoundProjectId = new Guid();
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
                    ProjectId = _fakeFirstProjectId.ToString()
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
            Assert.Equal(_fakeFirstProjectId, responseNote.ProjectId);
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
                    ProjectId = _fakeFirstProjectId.ToString()
                });
            var createdNote2 = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = _fakeSecoundProjectId.ToString()
                });

            //Act
            var response = await TestClient.GetAsync(ApiRoutes.Notes.GetAll); // by userId

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseNote = await response.Content.ReadAsAsync<IEnumerable<NoteResource>>();

            Assert.NotEmpty(createdNote.Id.ToString());
            Assert.Equal(_dateTimeRequestFake, responseNote.LastOrDefault().Date);
            Assert.Equal(_contentFake, responseNote.LastOrDefault().Content);
            Assert.Equal(_fakeFirstProjectId, responseNote.LastOrDefault().ProjectId);

            Assert.NotEmpty(createdNote2.Id.ToString());
            Assert.Equal(_dateTimeSecondRequestFake, responseNote.FirstOrDefault().Date);
            Assert.Equal(_contentSecondFake, responseNote.FirstOrDefault().Content);
            Assert.Equal(_fakeSecoundProjectId, responseNote.FirstOrDefault().ProjectId);
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
                    ProjectId = _fakeFirstProjectId.ToString()
                });
            var createdNote2 = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = _fakeSecoundProjectId.ToString()
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
            Assert.Equal(_fakeFirstProjectId, responseNote.FirstOrDefault().ProjectId);
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
                    ProjectId = _fakeFirstProjectId.ToString()
                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(_dateTimeRequestFake, responseNote.Date);
            Assert.Equal(_contentFake, responseNote.Content);
            Assert.Equal(_fakeFirstProjectId, responseNote.ProjectId);
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
                    ProjectId = _fakeFirstProjectId.ToString()
                });

            //Act
            var response = await TestClient.PutAsJsonAsync(ApiRoutes.Notes.Update,
                new CreateNoteCommand
                {
                    Id = createdNote.Id.ToString(),
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = _fakeSecoundProjectId.ToString()
                });

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNote = await response.Content.ReadAsAsync<NoteResource>();

            Assert.Equal(createdNote.Id, responseNote.Id);
            Assert.Equal(_dateTimeSecondRequestFake, responseNote.Date);
            Assert.Equal(_contentSecondFake, responseNote.Content);
            Assert.Equal(_fakeSecoundProjectId, responseNote.ProjectId);
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
                    ProjectId = _fakeFirstProjectId.ToString()
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
            Assert.Equal(_fakeFirstProjectId, responseNote.ProjectId);
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
                    ProjectId = _fakeFirstProjectId.ToString()
                });
            var createdNote2 = await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = _fakeSecoundProjectId.ToString()
                });

            //Act
            var response = await TestClient.DeleteAsync(ApiRoutes.Notes.DeleteAll);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
            var responseNote = await response.Content.ReadAsAsync<IEnumerable<NoteResource>>();

            Assert.NotEmpty(createdNote2.Id.ToString());
            Assert.Equal(_dateTimeSecondRequestFake, responseNote.FirstOrDefault().Date);
            Assert.Equal(_contentSecondFake, responseNote.FirstOrDefault().Content);
            Assert.Equal(_fakeSecoundProjectId, responseNote.FirstOrDefault().ProjectId);

            Assert.NotEmpty(createdNote.Id.ToString());
            Assert.Equal(_dateTimeRequestFake, responseNote.LastOrDefault().Date);
            Assert.Equal(_contentFake, responseNote.LastOrDefault().Content);
            Assert.Equal(_fakeFirstProjectId, responseNote.LastOrDefault().ProjectId);
        }

        [Fact]
        public async Task GetNotesDates_TwoDates_ReturnsOneNote()
        {
            // Arrange
            await AuthenticateAsync();
            await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeRequestFake,
                    Content = _contentFake,
                    ProjectId = _fakeFirstProjectId.ToString()
                });

            await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = _fakeSecoundProjectId.ToString()
                });
            await CreateNoteAsync(
                new CreateNoteCommand
                {
                    Date = _dateTimeSecondRequestFake,
                    Content = _contentSecondFake,
                    ProjectId = _fakeSecoundProjectId.ToString()
                });

            //Act
            var response = await TestClient.GetAsync(ApiRoutes.Notes.GetNotesDates);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

            var responseNotesDates = await response.Content.ReadAsAsync<string[]>();

            Assert.Equal(2, responseNotesDates.Length);
            Assert.Equal("2020-10-12", responseNotesDates[0]);
            Assert.Equal("2020-10-11", responseNotesDates[1]);
        }
    }
}