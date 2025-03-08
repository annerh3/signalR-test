using Microsoft.AspNetCore.Mvc;
using RealTimeAttendance.Services;

namespace RealTimeAttendance.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _attendanceService;

        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }


        [HttpGet("students")]
        public IActionResult GetStudents()
        {
            return Ok(_attendanceService.GetStudents());
        }

        [HttpPost("check-in/{id}")]
        public IActionResult CheckIn(int id)
        {
            var response =  _attendanceService.CheckInStudent(id);
            if (!response)
            {
                return NotFound(new { message = "Estudiante no encontrado" });
            }
            return Ok(new { message = "Check-in exitoso" });
        }
        
    }
}
