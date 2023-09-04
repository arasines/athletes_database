# Olimpics Athletes
![](https://www.obs.tv/assets/logoOBS.svg)

### Features

-  .NET 7.0 + EF + SQLite (API)
- React + TypeStript + Material  UI (SPA)
- Support for REST and GraphQL API endpoints
- Clean Architecture on CQRS

###Tools required to run project

- .[NET SDK](https://dotnet.microsoft.com/en-us/download "NET SDK") - includes the .NET runtime and command line tools
- [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code") - code editor that runs on Windows, Mac and Linux
- [C# extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp "C# extension for Visual Studio Code") - adds support to VS Code for developing .NET applications

###Run the Olimpics Athletes API Locally

1. Download or clone the project code from https://github.com/arasines/athletes_database
2. Start the API by executing the BAT file **obs_test_api.bat** on the solution root folder (where the *olympic_athletes.sln* file is located) or running dotnet run from the command line  in the project root folder (where the *obs_test_api.csproj* file is located).  You should see the message Now listening on: https://localhost:7198 and http://localhost:5007.
3. You should be not able to read the [Swagger](https://localhost:7198/swagger/index.html "Swagger") endpoint and the [GraphQL Playground](https://localhost:7198/ui/playground "GraphQL Playground") to test both APIs.

###Run the Olimpics Athletes SPA Locally

1. Download or clone the project code from https://github.com/arasines/athletes_database
2. Start the SPA by executing the BAT file **obs_test_ui.bat** on the solution root folder  (where the olympic_athletes.sln file is located) or running dotnet run from the command line in the project root folder (where the obs_test_api.csproj file is located).  One other alternative it yo do it manually via yarn.
3. Once completed the application will be automatically open in your web browser.

> Note: Please execute always first the API.
