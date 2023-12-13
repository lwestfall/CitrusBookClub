namespace Cbc.WebApi.Interfaces;

using AutoMapper;

public interface IMapFrom<T>
{
    void Mapping(Profile profile) => profile.CreateMap(typeof(T), this.GetType());
}
