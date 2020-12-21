using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IContactRepository
    {
        public Task<Contact> GetContact(int id);
        public Task<ActionResult<AppUserDto>> GetContactsByAdminUsername(string username);
        public Task<ActionResult<AppUser>> DeleteEmployee(int contactId, string username);
        public void Update(Contact contact);
    }
}
