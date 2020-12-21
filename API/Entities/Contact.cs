using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Contacts")]
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string CallingCode { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}
