namespace Cbc.WebApi.Mapping;
using System.Reflection;
using AutoMapper;
using Cbc.WebApi.Interfaces;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        this.ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly(), typeof(IMapFrom<>), nameof(IMapFrom<object>.Mapping));
        this.ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly(), typeof(IMapTo<>), nameof(IMapTo<object>.Mapping));
    }

    private void ApplyMappingsFromAssembly(Assembly assembly, Type mappedType, string mappingMethodName)
    {
        bool HasInterface(Type t) => t.IsGenericType && t.GetGenericTypeDefinition() == mappedType;

        var types = assembly.GetExportedTypes().Where(t => t.GetInterfaces().Any(HasInterface)).ToList();

        var argumentTypes = new Type[] { typeof(Profile) };

        foreach (var type in types)
        {
            var instance = Activator.CreateInstance(type);

            var methodInfo = type.GetMethod(mappingMethodName);

            if (methodInfo is not null)
            {
                methodInfo.Invoke(instance, new object[] { this });
            }
            else
            {
                var interfaces = type.GetInterfaces().Where(HasInterface).ToList();

                if (interfaces.Count > 0)
                {
                    foreach (var @interface in interfaces)
                    {
                        var interfaceMethodInfo = @interface.GetMethod(mappingMethodName, argumentTypes);

                        interfaceMethodInfo?.Invoke(instance, new object[] { this });
                    }
                }
            }
        }
    }
}
