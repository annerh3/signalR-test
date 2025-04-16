import useStudents from "../hooks/useStudents";
const StudentsList = () => {
  const {students} = useStudents();
  return (
    <main className="flex-1 py-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Lista de Estudiantes</h2>
      <section className="flex justify-center">
        <table className="table-auto border-collapse border border-slate-900">
          <thead>
            <tr>
              <th className="border border-slate-900 px-4 py-2">Id</th>
              <th className="border border-slate-900 px-4 py-2">Nombre</th>
              <th className="border border-slate-900 px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {students[0].id != 0 
              ?(students.map((student) => (
                  <tr key={student.id}>
                    <td className="border border-slate-900 px-4 py-2">{student.id}</td>
                    <td className="border border-slate-900 px-4 py-2">{student.name}</td>
                    <td className={`border border-slate-900 px-4 py-2 ${student.isPresent ? 'bg-green-300' : 'bg-red-300'} transition-colors`}>{student.isPresent ? "Presente" : "Ausente"}</td>
                  </tr>)))
              : (<tr key={'9c1b5e34-199c-49f8-8e6d-339a5714103b'}><td>No hay Data</td></tr>) 
            }
          </tbody>
        </table>
      </section>
    </main>
  );
};
export default StudentsList;