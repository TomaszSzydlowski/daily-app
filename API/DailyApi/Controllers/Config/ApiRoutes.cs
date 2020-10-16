namespace DailyApi.Controllers.Config
{
    public static class ApiRoutes
    {
        public const string Root = "api";

        public static class Notes
        {
            public const string GetAll = Root + "/notes";
            public const string Get = Root + "/notes/{noteId}";
            public const string Post = Root + "/notes";
            public const string Update = Root + "/notes";
            public const string Delete = Root + "/notes/{noteId}";
            public const string DeleteAll = Root + "/notes";
        }

        public static class Auth
        {
            public const string Register = Root + "/auth/register";
            public const string Login = Root + "/auth/login";
        }
    }
}