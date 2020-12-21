using API.DTOs;
using API.Entities;
using System.Linq;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, AppUserDto>();
              
            CreateMap<Contact, ContactDto>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.MobileNumber, opt => opt.MapFrom(src => src.MobileNumber));
            CreateMap<AppUserUpdateDto, AppUser>();
        }
    }
}
