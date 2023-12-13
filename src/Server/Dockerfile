# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
ARG TARGETARCH
WORKDIR /source

# copy csproj and restore as distinct layers
COPY WebApi/*.csproj .
RUN dotnet restore -a $TARGETARCH

# copy and publish app and libraries
COPY WebApi/. .
RUN dotnet publish --no-restore -a $TARGETARCH -o /app

# Enable globalization and time zones:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/enable-globalization.md
# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
EXPOSE 8080

ENV \
    ASPNETCORE_ENVIRONMENT=Production \
# Enable globalization and time zones
    DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
    LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
# Take secrets
    Authentication__Google__ClientId=change_me \
    Authentication__Google__ClientSecret=change_me \
    DbHost=change_me \
    DbPort=change_me \
    DbPassword=change_me

RUN apk add --no-cache \
    icu-data-full \
    icu-libs

WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["./WebApi"]
