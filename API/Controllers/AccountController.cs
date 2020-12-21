using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        // kad se ucita strana povezi se sa bazom
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        // vrsi registraciju korisnika
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // proverava jel postoji username
            if (await UserExists(registerDto.UserName))
            {
                // ako postoji baca Exception
                return BadRequest("Username is taken!");
            }

            // random kljuc
            using var hmac = new HMACSHA512();

            // pravi objekat tj. popunjava ga podacima iz akcije tj iz DTO-a
            var user = new AppUser
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                KnownAs = registerDto.KnownAs,
                Gender = registerDto.Gender,
                City = registerDto.City,
                Country = registerDto.Country,
                MobileNumber = registerDto.MobileNumber,
                CallingCode = registerDto.CallingCode
            };
            // dodaje korisnika u tabelu
            _context.Users.Add(user);
            //cuva u bazi
            if(await _context.SaveChangesAsync()!=0)
            // vraca ga kao iz izlaz iz API da se koristi u front-end
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                KnownAs = user.KnownAs
            };
            else
            {
                return BadRequest("Try again in few minutes");
            }
        }

        // prihvata username i password i vrsi login korisnika
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // proverava u bazi da li postoji podudaranje sa prosledjenim username
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username");

            // uzima PasswordSalt iz tabele
            using var hmac = new HMACSHA512(user.PasswordSalt);

            // racuna Hash od prosledjene lozinke
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            // uporedjuje Hash i PasswordSalt
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");
            }
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                KnownAs = user.KnownAs
            };
        }

        // pita bazu da li postoji prosledjeni username 
        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
