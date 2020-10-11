using System.Threading.Tasks;
using dailyApi.Domain.Models;
using dailyApi.Domain.Services;
using dailyApi.Domain.Services.Communication;
using dailyApi.Resources;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using Microsoft.Extensions.Configuration;
using dailyApi.Domain.Repositories;

namespace dailyApi.Services
{
    public class AuthService : IAuthService
    {
        readonly private IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;

        public AuthService(IAuthRepository authRepository, IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _unitOfWork = unitOfWork;
        }

        public async Task<LoginUserResponse> Login(LoginUserResource loginUserResource)
        {
            try
            {
                var userFromRepository = await _authRepository.Login(loginUserResource.Email.ToLower(), loginUserResource.Password);

                if (userFromRepository != null)
                {
                    //generate token
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]{
                            new Claim(ClaimTypes.NameIdentifier,userFromRepository.Id.ToString()),
                            new Claim(ClaimTypes.Name, userFromRepository.Email)
                        }),
                        Expires = DateTime.Now.AddHours(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var tokenString = tokenHandler.WriteToken(token);

                    return new LoginUserResponse(userFromRepository, tokenString);
                }

                return new LoginUserResponse("Unauthorized");
            }
            catch (Exception ex)
            {
                return new LoginUserResponse($"An error occurred when saving the product: {ex.Message}");
            }

        }

        public async Task<RegisterUserResponse> Register(SaveUserRegisterResource saveRegisterUserResource)
        {
            try
            {
                saveRegisterUserResource.Email = saveRegisterUserResource.Email.ToLower();

                if (await _authRepository.UserExists(saveRegisterUserResource.Email))
                    return new RegisterUserResponse("Email adress is already taken");

                var userToCreate = new User
                {
                    Id = Guid.NewGuid(),
                    Email = saveRegisterUserResource.Email
                };

                _authRepository.Register(userToCreate, saveRegisterUserResource.Password);
                await _unitOfWork.Commit();

                return new RegisterUserResponse();
            }
            catch (Exception ex)
            {
                return new RegisterUserResponse($"An error occurred when saving the product: {ex.Message}");
            }
        }
    }
}