using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Data
{
    public class ContactRepository : IContactRepository
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public ContactRepository(DataContext context, IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _context = context;
            _userRepository = userRepository;
        }

        public async Task<Contact> GetContact(int id)
        {
            return await _context.Contacts.SingleOrDefaultAsync(x => x.Id == id);
        }
        public async Task<ActionResult<AppUserDto>> GetContactsByAdminUsername(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username).Include(x => x.Contacts)
                .ProjectTo<AppUserDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<ActionResult<AppUser>> DeleteEmployee(int contactId, string username)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(e => e.UserName == username);
            var contact = user.Contacts.Where(e => e.Id == contactId);

             _context.Contacts.Remove((Contact)contact);

            return user;
        }

        public void Update(Contact contact)
        {
            _context.Entry(contact).State = EntityState.Modified;
            _context.SaveChangesAsync();
        }
    }
}
