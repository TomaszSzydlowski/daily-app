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
    public class CreateUserRegisterHandler : IRequestHandler<CreateUserRegisterCommand, RegisterUserResponse>
    {
        private readonly IAuthService _authService;

        public CreateUserRegisterHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<RegisterUserResponse> Handle(CreateUserRegisterCommand request, CancellationToken cancellationToken)
        {
            return await _authService.Register(request);
        }
    }
}