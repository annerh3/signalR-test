import { HubConnectionBuilder } from "@microsoft/signalr";

// Aqui se define la conexion por medio del sdk de signalR
const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5233/attendanceHub")
  .build();

export default connection;
