import useStudents from "../hooks/useStudents";

const StudentsList = () => {
  const {students} = useStudents();
  return (
    <main className="flex-1 py-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Lista de Estudiantes</h2>
      <section className="flex justify-center">
        <table className="table-auto border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300 px-4 py-2">Id</th>
              <th className="border border-slate-300 px-4 py-2">Nombre</th>
              <th className="border border-slate-300 px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border border-slate-300 px-4 py-2">{student.id}</td>
                <td className="border border-slate-300 px-4 py-2">{student.name}</td>
                <td className={`border border-slate-300 px-4 py-2 ${student.isPresent ? 'bg-green-500' : 'bg-red-500'}`}>{student.isPresent ? "Presente" : "Ausente"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default StudentsList;
