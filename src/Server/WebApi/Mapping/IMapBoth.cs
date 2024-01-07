namespace Cbc.WebApi.Mapping;
using AutoMapper;

public interface IMapBoth<T>
{
    void Mapping(Profile profile) => profile.CreateMap(typeof(T), this.GetType()).ReverseMap();
}
