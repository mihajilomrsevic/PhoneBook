using API.Data;
using API.DTOs;
using API.Entities;
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
    public class ContactController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IContactService _contactService;
        private readonly IContactRepository _contactRepository;
        private readonly DataContext _context;
        public ContactController(IUserRepository userRepository, IMapper mapper, IContactRepository contactRepository, DataContext context)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _contactRepository = contactRepository;
            _context = context;
        }
        // vraca komplet korisnika
        [HttpGet]
        public async Task<ActionResult<AppUserDto>> GetContactsByAdminUsername()
        {
            var admin = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if(await _contactRepository.GetContactsByAdminUsername(admin) != null)
            {
                return await _contactRepository.GetContactsByAdminUsername(admin);
            }
            else
            {
                return BadRequest("There is no contacts by this user");
            }
        }
        // dodaje kontakt u listu kontakata
        [HttpPost("add-contact")]
        public async Task<IActionResult> AddContact(ContactDto contactDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var contact = new Contact
            {
                Name = contactDto.Name,
                MobileNumber = contactDto.MobileNumber,
                CallingCode = contactDto.CallingCode
            };

            user.Contacts.Add(contact);
            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<ContactDto>(contact));
            }

            return BadRequest("Problem addding contact");
        }

        [HttpDelete("delete-contact/{contactId}")]
        public async Task<ActionResult> DeletePhoto(int contactId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var contact = user.Contacts.FirstOrDefault(e => e.Id == contactId);
            _context.Contacts.Remove(contact);
            if (await _context.SaveChangesAsync() !=0)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Error while saving a changes!");
            }
        }
       
        // azurira kontakt
        [HttpPut("edit-contact")]
        public async Task<ActionResult> EditContact(ContactDto contactDto)
        {

            var kontakt = await _contactRepository.GetContact(contactDto.Id);
            kontakt.CallingCode = contactDto.CallingCode;
            kontakt.MobileNumber = contactDto.MobileNumber;
            kontakt.Name = contactDto.Name;

            _context.Contacts.Update(kontakt);
            if(await _context.SaveChangesAsync()!=0)
            return Ok();

            else
            {
                return BadRequest("Error while saving a changes!");
            }
        }
    }
}
