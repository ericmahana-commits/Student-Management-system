// Shows the list of students. It only DISPLAYS data it receives through props.
// Props: students (array), onEdit and onDelete (functions from App).
function StudentTable({ students, onEdit, onDelete }) {
  // Empty state: shown when there are no students.
  if (students.length === 0) {
    return <p className="empty">No students yet. Click "Add Student" to add one.</p>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* map() turns each student object into a table row */}
          {students.map((student) => (
            <tr key={student.id}>
              <td data-label="ID">{student.id}</td>
              <td data-label="Full Name">{student.name}</td>
              <td data-label="Age">{student.age}</td>
              <td data-label="Email">{student.email}</td>
              <td data-label="Course">{student.course}</td>
              <td data-label="Status">{student.enrolled ? 'Enrolled' : 'Not enrolled'}</td>
              <td data-label="Actions" className="actions">
                <button className="btn" onClick={() => onEdit(student)}>Edit</button>
                <button className="btn red" onClick={() => onDelete(student)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
