using RealTimeAttendance.Dtos;

namespace RealTimeAttendance.Services
{
    public interface IAttendanceService
    {
        List<Student> GetStudents();

        bool CheckInStudent(int studentId);
    }
}
