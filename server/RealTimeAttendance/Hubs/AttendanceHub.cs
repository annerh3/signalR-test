using Microsoft.AspNetCore.SignalR;
using RealTimeAttendance.Dtos;

namespace RealTimeAttendance.Hubs
{
    // La clase hereda de Hub, lo que permite que actúe como un canal de comunicación en tiempo real.
    public class AttendanceHub : Hub
    {
        // Método que los clientes pueden llamar para enviar una actualización
        public async Task SendAttendanceUpdate(Student student)
        {
            // Enviar la actualización a todos los clientes conectados. 
            // "ReceiveAttendanceUpdate" es método que el servidor y el cliente usan para comunicarse a través de SignalR
            await Clients.All.SendAsync("ReceiveAttendanceUpdate", student);
        }
    }
}