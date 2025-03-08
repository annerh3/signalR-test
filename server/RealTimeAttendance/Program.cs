using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Hosting;
using RealTimeAttendance;

//Aqui lo de siempre. SignalR se configura en Startup.cs
var builder = WebApplication.CreateBuilder(args);
var startup = new Startup(builder.Configuration); // Inicializacion del Proyecto mediante el Startup
startup.ConfigureServices(builder.Services);
var app = builder.Build();
startup.Configure(app, app.Environment);

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();
}

app.Run();
