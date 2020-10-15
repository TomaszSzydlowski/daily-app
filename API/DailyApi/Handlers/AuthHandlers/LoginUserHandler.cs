using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DailyApi.Commands.AuthCommands;
using DailyApi.Commands.NoteCommands;
using DailyApi.Domain.Models;
using DailyApi.Domain.Services;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Handlers
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, LoginUserResponse>
    {
        private readonly IAuthService _authService;

        public LoginUserHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<LoginUserResponse> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            return  await _authService.Login(request);
        }
    }
}