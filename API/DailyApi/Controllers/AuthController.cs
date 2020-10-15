using System.Threading.Tasks;
using DailyApi.Commands;
using Microsoft.AspNetCore.Mvc;
using DailyApi.Domain.Services;
using AutoMapper;
using DailyApi.Controllers.Config;
using DailyApi.Resources;
using DailyApi.Commands.AuthCommands;
using MediatR;

namespace DailyApi.Controllers
{
    public class AuthController : ControllerBase
    {
        private const string Authorization = "Authorization";
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public AuthController(IAuthService authService, IMapper mapper, IMediator mediator)
        {
            _authService = authService;
            _mapper = mapper;
            _mediator = mediator;
        }

        // POST: api/auth/register
        [HttpPost(ApiRoutes.Auth.Register)]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> Register([FromBody] CreateUserRegisterCommand createUserRegisterCommand)
        {
            var registerResult = await _mediator.Send(createUserRegisterCommand);

            if (!registerResult.Success)
                return BadRequest(new ErrorResource(registerResult.Message));

            var loginUserResource = _mapper.Map<CreateUserRegisterCommand, LoginUserCommand>(createUserRegisterCommand);

            var loginResult = await _mediator.Send(loginUserResource);

            if (!loginResult.Success)
                return BadRequest(new ErrorResource(loginResult.Message));

            Response.Headers.Add(Authorization, loginResult.Token);
            return Ok();

        }

        // POST: api/auth/login
        [HttpPost(ApiRoutes.Auth.Login)]
        [ProducesResponseType(typeof(string), 200)]
        [ProducesResponseType(typeof(ErrorResource), 401)]
        public async Task<IActionResult> Login([FromBody] LoginUserCommand loginUserResource)
        {
            var result = await _mediator.Send(loginUserResource);

            if (result.User == null)
                return Unauthorized(new ErrorResource(result.Message));

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            return Ok(result.Token);
        }
    }
}