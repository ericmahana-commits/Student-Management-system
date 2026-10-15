// Home page: a quick summary and shortcuts. Props: students (array) and two functions from App.
function Dashboard({ students, onAdd, onViewStudents }) {
  // filter() picks only the enrolled students, .length counts them
  const enrolled = students.filter((s) => s.enrolled).length
  const notEnrolled = students.length - enrolled

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <p className="number">{students.length}</p>
          <p>Total students</p>
        </div>
        <div className="card">
          <p className="number">{enrolled}</p>
          <p>Enrolled</p>
        </div>
        <div className="card">
          <p className="number">{notEnrolled}</p>
          <p>Not enrolled</p>
        </div>
      </div>

      <div className="shortcuts">
        <button className="btn blue" onClick={onAdd}>Add Student</button>
        <button className="btn" onClick={onViewStudents}>View All Students</button>
      </div>
    </div>
  )
}

export default Dashboard
