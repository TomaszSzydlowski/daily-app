using System.Collections.Generic;

namespace DailyApi.IntegrationTest.Mocks
{
    class ErrorResourceFake
    {
        public bool Success => false;
        public List<string> Messages { get; set; }
    }
}
