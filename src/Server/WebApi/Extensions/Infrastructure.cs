namespace Cbc.WebApi.Extensions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

public static class Infrastructure
{
    public static ModelBuilder ApplyConfigurationsFromAssemblyWithServiceInjection(this ModelBuilder modelBuilder, Assembly assembly, Type baseType, params object[] services)
    {
        // get the method 'ApplyConfiguration()' so we can invoke it against instances when we find them
        var applyConfigurationMethod = typeof(ModelBuilder).GetMethods().Single(e => e.Name == "ApplyConfiguration" && e.ContainsGenericParameters &&
                                                                        e.GetParameters().SingleOrDefault()?.ParameterType.GetGenericTypeDefinition() ==
                                                                        typeof(IEntityTypeConfiguration<>));


        // test to find IEntityTypeConfiguration<> classes
        bool IsEntityTypeConfiguration(Type i) => i.IsGenericType && i.GetGenericTypeDefinition() == baseType;
        // static bool IsEntityTypeConfiguration(Type i) => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>);

        // find all appropriate classes, then create an instance and invoke the configure method on them
        assembly.GetConstructableTypes()
            .ToList()
            .ForEach(t => t.GetInterfaces()
                .Where(IsEntityTypeConfiguration)
                .ToList()
                .ForEach(i =>
                {
                    {
                        var hasServiceConstructor = t.GetConstructor(services.Select(s => s.GetType()).ToArray()) is not null;
                        var hasEmptyConstructor = t.GetConstructor(Type.EmptyTypes) is not null;

                        if (hasServiceConstructor)
                        {
                            applyConfigurationMethod
                                .MakeGenericMethod(i.GenericTypeArguments[0])
                                .Invoke(modelBuilder, [Activator.CreateInstance(t, services)]);
                        }
                        else if (hasEmptyConstructor)
                        {
                            applyConfigurationMethod
                                .MakeGenericMethod(i.GenericTypeArguments[0])
                                .Invoke(modelBuilder, [Activator.CreateInstance(t)]);
                        }
                    }
                })
            );

        return modelBuilder;
    }

    private static IEnumerable<TypeInfo> GetConstructableTypes(this Assembly assembly)
    {
        return assembly
            .GetLoadableDefinedTypes()
            .Where(t => !t.IsAbstract && !t.IsGenericTypeDefinition);
    }

    private static IEnumerable<TypeInfo> GetLoadableDefinedTypes(this Assembly assembly)
    {
        try
        {
            return assembly.DefinedTypes;
        }
        catch (ReflectionTypeLoadException ex)
        {
            return ex.Types.Where(t => t is not null).Cast<Type>().Select(IntrospectionExtensions.GetTypeInfo);
        }
    }
}
