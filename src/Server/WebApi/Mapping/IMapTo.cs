namespace Cbc.WebApi.Interfaces;

using AutoMapper;

public interface IMapTo<T>
{
    void Mapping(Profile profile) => profile.CreateMap(this.GetType(), typeof(T));
}
