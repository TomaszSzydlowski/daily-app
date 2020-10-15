using System.ComponentModel.DataAnnotations;
using DailyApi.Domain.Services.Communication;
using MediatR;

namespace DailyApi.Commands.AuthCommands
{
    public class CreateUserRegisterCommand : IRequest<RegisterUserResponse>
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters.")]
        public string Password { get; set; }

    }
}