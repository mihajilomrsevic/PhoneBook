using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IContactRepository _contactRepository;
        private readonly IContactService _contactService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IContactRepository contactRepository,
            DataContext context)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _contactRepository = contactRepository;
            _context = context;
        }

        // vraca sve korisnike
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUserDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            if(users!=null)
            return Ok(users);
            else
            {
                return BadRequest("Database is empty!");
            }
        }

        // vraca jednog korisnika
        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<AppUserDto>> GetUser(string username)
        {
            if(await _userRepository.GetMemberAsync(username) != null)
            {
                return await _userRepository.GetMemberAsync(username);
            }
            else
            {
                return BadRequest("There is no user with this username");
            }
        }


        // azurira korisnika
        [HttpPut]
        public async Task<ActionResult> UpdateUser(AppUserUpdateDto userUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);

            _mapper.Map(userUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        
    }
}
