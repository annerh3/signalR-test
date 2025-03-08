using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using RealTimeAttendance.Services;
using RealTimeAttendance.Hubs;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;

namespace RealTimeAttendance
{
    public class Startup
    {
        private IConfiguration Configuration { get; }

        // Creacion del Constructor de Startup
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddSignalR(); // Agrear SignalR
            services.AddTransient<IAttendanceService, AttendanceService>(); // El servicio donde está la logica de la aplicación. 

            //Aqui lo siempre.

            // NOTA: El 'Nullable' lo tengo habilitado, no se por qué me daba error si lo deshabilitaba
            services.AddHttpContextAccessor();

            // Configurar CORS (necesario configurar correctamente)
            services.AddCors(opt =>
            {
                var allowURLS = Configuration.GetSection("AllowURLS").Get<string[]>();

                opt.AddPolicy("CorsPolicy", builder => builder
                .WithOrigins(allowURLS ?? ["http://localhost:5173"]) // puse esto porque si no me decia que allowURLS puede ser NULL
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // Mapea el endpoint para el Hub de SignalR
                // Esto permite que los clientes se conecten al Hub en esta URL: /attendanceHub
                // SignalR gestionará la comunicación en tiempo real para este Hub
                endpoints.MapHub<AttendanceHub>("/attendanceHub");
            });

            
        }
    }
}
