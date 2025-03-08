import { useState, useEffect } from "react";
import connection from "../src/config/hubs/signalRConnection"; // conexion a SignalR
import { getStudentsList } from "../src/actions/students.actions"; //  función  obtener la lista de estudiantes

const useStudents = () => {
    const [students, setStudents] = useState([]); // Estado para almacenar la lista de estudiantes

    useEffect(() => {
        // Función asíncrona para obtener la lista de estudiantes desde el servidor
        const loadStudents = async () => {
            const studentList = await getStudentsList();
            setStudents(studentList); // Guardamos los estudiantes en el estado
        };

        loadStudents(); // Ejecutamos la función para obtener los estudiantes al montar el componente

        // "conection" es la definición de la conexion que se hizo en el archivo 'signalRConnection.js'
        // Verificamos si la conexión con SignalR está en estado 'Disconnected' antes de iniciarla
        if (connection.state === "Disconnected") {
            connection
                .start() // Iniciamos la conexión con el servidor SignalR
                .then(() => console.log("Conectado a SignalR"))
                .catch((err) => console.error("Error al conectar con SignalR", err));
        }

        // Función que maneja la actualización de la asistencia en tiempo real.
        // Aqui se recibe al estudiante (en especifico) que ha cambiado su estado (se ha actualizado).
        // se actualiza el estado local de la lista de estudiantes en el cliente.
        // La función recorre la lista de estudiantes y actualiza solo el estudiante cuyo 'id' 
        // coincide con el estudiante que fue marcado como presente, sin modificar el resto de la lista.
        const handleAttendanceUpdate = (updatedStudent) => {

            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === updatedStudent.id ? { ...student, isPresent: true } : student
                )
            );
        };


        //# "ReceiveAttendanceUpdate""es el metodo que se definio en "AttendanceHub.cs" (backend)
        // Escuchamos el evento "ReceiveAttendanceUpdate" desde el servidor
        connection.on("ReceiveAttendanceUpdate", handleAttendanceUpdate);

        // Retornamos una función de limpieza que se ejecuta cuando el componente se desmonta
        return () => {
            connection.off("ReceiveAttendanceUpdate", handleAttendanceUpdate); // Eliminamos el listener del evento para evitar duplicados
        };
    }, []); // El efecto solo se ejecuta una vez cuando el componente se monta

    return { students }; // Retornamos el estado con la lista de estudiantes para ser utilizado en otros componentes
};

export default useStudents; 
