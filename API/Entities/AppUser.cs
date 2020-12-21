using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string MobileNumber { get; set; }
        public string CallingCode { get; set; }
        public ICollection<Contact> Contacts { get; set; }
        //public ICollection<UserLike> LikedByUsers { get; set; }
        //public ICollection<UserLike> LikedUsers { get; set; }

    }
}
