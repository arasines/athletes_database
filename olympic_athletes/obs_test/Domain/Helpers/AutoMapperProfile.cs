using AutoMapper;
using obs_test.Domain.Entities;
using obs_test.Domain.Models;

namespace obs_test.Domain.Helpers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Athlete -> AthleteModel
        CreateMap<Athlete, AthleteModel>()
            .ForMember(dest => dest.Id, source => source.MapFrom(y => y.AthleteId))
            .ForMember(dest => dest.FullName, source => source.MapFrom(y => $"{y.Name} {y.Surname}"));
        // AthletePhoto -> AthletePhotoModel
        CreateMap<AthletePhoto, AthletePhotoModel>();
        // AthletePhoto -> AthletePhotoModel
        CreateMap<AthleteResult, AthleteResultModel>()
            .ForMember(dest => dest.City, source => source.MapFrom(y => y.Game.City))
            .ForMember(dest => dest.Year, source => source.MapFrom(y => y.Game.Year));
    }
}