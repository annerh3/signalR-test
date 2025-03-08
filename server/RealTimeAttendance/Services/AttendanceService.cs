using Microsoft.AspNetCore.SignalR;
using RealTimeAttendance.Dtos;
using RealTimeAttendance.Hubs;

namespace RealTimeAttendance.Services
{
    public class AttendanceService : IAttendanceService
    {
        private static readonly List<Student> _students = new()
        {
            new() { Id = 1, Name = "Juan", IsPresent = false },
            new() { Id = 2, Name = "María", IsPresent = false },
            new() { Id = 3, Name = "Carlos", IsPresent = false },
            new() { Id = 4, Name = "Ana", IsPresent = false },
            new() { Id = 5, Name = "Luis", IsPresent = false },
            new() { Id = 6, Name = "Elena", IsPresent = false },
            new() { Id = 7, Name = "Pedro", IsPresent = false },
            new() { Id = 8, Name = "Lucía", IsPresent = false },
            new() { Id = 9, Name = "Miguel", IsPresent = false },
            new() { Id = 10, Name = "Sofía", IsPresent = false },
            new() { Id = 11, Name = "Jorge", IsPresent = false },
            new() { Id = 12, Name = "Marta", IsPresent = false },
            new() { Id = 13, Name = "Raúl", IsPresent = false },
            new() { Id = 14, Name = "Laura", IsPresent = false },
            new() { Id = 15, Name = "Alberto", IsPresent = false },
            new() { Id = 16, Name = "Patricia", IsPresent = false },
            new() { Id = 17, Name = "Fernando", IsPresent = false },
            new() { Id = 18, Name = "Cristina", IsPresent = false },
            new() { Id = 19, Name = "Andrés", IsPresent = false },
            new() { Id = 20, Name = "Beatriz", IsPresent = false },
            new() { Id = 21, Name = "Manuel", IsPresent = false },
            new() { Id = 22, Name = "Isabel", IsPresent = false },
            new() { Id = 23, Name = "Ricardo", IsPresent = false },
        };

        private readonly IHubContext<AttendanceHub> _hubContext;

        public AttendanceService(IHubContext<AttendanceHub> hubContext)
        {
            _hubContext = hubContext;
            
        }

        // Cambia el estado del estudiante y envía una notificación en tiempo real con SignalR.
        public bool CheckInStudent(int studentId)
        {
            var student = _students.FirstOrDefault(s => s.Id == studentId);
            if (student != null)
            {
                student.IsPresent = true;
                // Notificamos a los clientes en tiempo real.
                // Se envía la actualización específica del estudiante al cliente conectado, no toda la lista de estudiantes.
                // Los clientes solo reciben esa actualización del estudiante específico
                _hubContext.Clients.All.SendAsync("ReceiveAttendanceUpdate", student);
                return true;
            }
            return false;
        }

        // Devuelve la lista de estudiantes.
        public List<Student> GetStudents()
        {
            return _students;
        }
    }
}
