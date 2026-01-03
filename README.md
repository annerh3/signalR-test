# SignalR Test Project by Anner Henriquez

`ASP.NET Core SignalR` is an open-source library that simplifies adding real-time web functionality to applications. Real-time web functionality enables server-side code to push content to clients instantly. [Read more](https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-8.0)

## Server Dependencies (Backend - .NET 8.0)
- Microsoft.AspNetCore.SignalR (v1.2.0)

## Client Dependencies (React App)
- @microsoft/signalr (v8.0.7)
- Axios (v1.8.2)
- tailwindcss (v4.0.12)

Inside the client folder, run `npm i` to install dependencies.

## How to Test This Functionality

In the `AttendanceService.cs` file, a list of Students is defined with the following properties: `Id`, `Name`, and `IsPresent`.  
The `IsPresent` property is initially set to `false` for every student in the list.

### How to Perform a `Check-in`

When a student performs a *check-in*, they must use an endpoint.  
This endpoint can be tested using Bruno via `brunoCollections/SignalR/CheckIn.bru`, providing the student's `id`.

After doing this, while viewing the client (frontend) page, you will see the data update in real time.

> [!IMPORTANT]  
> Make sure the ports are configured correctly on both the server (backend) and the client (frontend).  
> You can verify this in:
> - **Server:**  
>   `server/RealTimeAttendance/Startup.cs`
> - **Client:**  
>   `client/react-app/src/config/hubs/signalRConnection.js`  
>   `client/react-app/src/config/api.js`
>
> This helps prevent CORS-related issues.
