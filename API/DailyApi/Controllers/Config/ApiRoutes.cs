namespace DailyApi.Controllers.Config
{
    public static class ApiRoutes
    {
        public const string Root = "api";

        public static class Notes
        {
            public const string GetAll = Root + "/notes";
            public const string Get = Root + "/notes/{noteId}";
            public const string GetNotesDates = Root + "/notes/dates";
            public const string Post = Root + "/notes";
            public const string Update = Root + "/notes";
            public const string Delete = Root + "/notes/{noteId}";
            public const string DeleteAll = Root + "/notes";
        }

        public static class Projects
        {
            public const string GetAll = Root + "/projects";
            public const string Post = Root + "/projects";
        }

        public static class Auth
        {
            public const string Register = Root + "/auth/register";
            public const string Login = Root + "/auth/login";
            public const string isUserAuthorized = Root + "/auth/isUserAuthorized";
        }
    }
}