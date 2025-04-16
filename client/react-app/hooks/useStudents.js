import { useState, useEffect } from "react";
import connection from "../src/config/hubs/signalRConnection"; // conexion a SignalR
import { getStudentsList } from "../src/actions/students.actions"; //  función obtener la lista de estudiantes

const useStudents = () => {
    const [students, setStudents] = useState([{ // Estado para almacenar la lista de estudiantes
        "id": 0,
        "name": "",
        "isPresent": false
    }]); 

     // Función para iniciar la conexión con SignalR con intentos de reconexión
    const startConnection = (retries = 2) => {
        // "conection" es la definición de la conexion que se hizo en el archivo 'signalRConnection.js'
        // Verificamos si la conexión con SignalR está en estado 'Disconnected' antes de iniciarla
        if (connection.state === "Disconnected") {
            connection
                .start() // Iniciamos la conexión con el servidor SignalR
                .then(() => {
                    console.log("Conectado a SignalR");
                })
                .catch((err) => {
                    console.error("Error al conectar con SignalR:", err);
                    if (retries > 0) {
                        console.info(`Reintentando conexión... Intentos restantes: ${retries}`);
                        setTimeout(() => startConnection(retries - 1), 3000); // Reintenta después de 3 segundos
                    } else {
                        console.warn("No se pudo conectar a SignalR después de varios intentos.");
                    }
                });
        }
    };

    // Función asíncrona para obtener la lista de estudiantes desde el servidor
    const loadStudents = async () => {
        const studentList = await getStudentsList();
        if (Array.isArray(studentList) && studentList.length > 0) {
            setStudents(studentList); // Guardamos los estudiantes en el estado
        } 
    };

    /* Función se encarga de manejar las actualizaciones en tiempo real del estado de asistencia de un estudiante específico. 
            ? Lógica interna:
                - Recorre la lista actual de estudiantes (prevStudents).
                - Compara el id de cada estudiante con el id del updatedStudent.
                - Si encuentra coincidencia, actualiza su propiedad isPresent a true.
                - El resto de los estudiantes permanece sin cambios.*/
    const handleAttendanceUpdate = (updatedStudent) => {
        setStudents((prevStudents) => {
            const index = prevStudents.findIndex(s => s.id === updatedStudent.id);
            if (index === -1) return prevStudents;

            const updatedList = [...prevStudents];
            updatedList[index] = {
                ...updatedList[index],
                isPresent: true
            };
            return updatedList;
        });
    };


    useEffect(() => {       
        loadStudents(); // Ejecutamos la función para obtener los estudiantes al montar el componente
        startConnection(); // Iniciar la conexión con SignalR

        // ? "ReceiveAttendanceUpdate""es el metodo que se definió en "AttendanceHub.cs" (backend)
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