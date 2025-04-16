# Test-Proyect SignalR por Anner Henriquez

`ASP.NET Core SignalR` es una biblioteca de código abierto que simplifica la incorporación de funciones web en tiempo real a las aplicaciones. La funcionalidad web en tiempo real permite que el código del servidor envíe contenidos a los clientes al instante. [Leer más](https://learn.microsoft.com/es-mx/aspnet/core/signalr/introduction?view=aspnetcore-8.0)

### Dependencias en el servidor (Backend-.NET8 .0)
- Microsoft.AspNetCore.SignalR (v1.2.0)

### Dependencias en el cliente (React-App)
- @microsoft/signalr (v8.0.7)
- Axios: (v1.8.2)
- tailwindcss: (v4.0.12)

Dentro de la carpeta del cliente, hacer `npm i` para instalar dependencias.


## ¿Como probar esta funcionalidad?

En el archivo `AttendanceService.cs` está definido una lista de Estudiantes las propiedades: Id, Name y IsPresent. La propiedaad IsPresent está declarada en `false` para cada elemento de la lista.

**¿Como hacer `check-in`?**

Cuando un estudiante hace 'check-in' debe de usar un endpoint, ese endpoint lo puede usar desde Bruno `brunoCollections/SignalR/CheckIn.bru`, esto haciendo uso del id del estudiante.

Si hace esto, visualizando la pagina en el cliente (frontend), podrá ver como los datos se actualizan en tiempo real.


> [!IMPORTANT]  
>   Revisar que los puertos esten configurados correctamente tanto en el servidor (backend), como en el cliente (frontend).
>   Esto lo puede revisar en:
>   - **En Servidor:**
>   `server/RealTimeAttendance/Startup.cs`
>    - **En Cliente:**
>   `client/react-app/src/config/hubs/signalRConnection.js` y `client/react-app/src/config/api.js`
>   
> Esto para evitar problemas con CORS.
