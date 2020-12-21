using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class ContactService : IContactService
    {
        public Task<ActionResult<IEnumerable<ContactDto>>> ListContactsByAdminUsername()
        {
            throw new NotImplementedException();
        }
    }
}
