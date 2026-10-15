import { useState, useEffect } from 'react'
import StudentTable from './components/StudentTable.jsx'
import StudentForm from './components/StudentForm.jsx'
import DeleteModal from './components/DeleteModal.jsx'
import Navbar from './components/Navbar.jsx'
import Dashboard from './components/Dashboard.jsx'

// const: this array is never reassigned (we make a NEW array when data changes).
// It starts EMPTY: the user types in their own students.
// Each student is an OBJECT: strings (id, name, email, course), number (age), boolean (enrolled).
const startingStudents = []

function App() {
  // STATE: the list of students (an ARRAY of objects).
  // The function inside useState reads localStorage once, when the app first loads.
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students')
    return saved ? JSON.parse(saved) : startingStudents
  })

  // STATE for navigation: which page is showing, and the search text.
  const [page, setPage] = useState('dashboard') // 'dashboard' or 'students'
  const [search, setSearch] = useState('')

  // STATE for the modals. null = closed.
  const [showForm, setShowForm] = useState(false)        // true = add/edit modal is open
  const [studentToEdit, setStudentToEdit] = useState(null)   // null = adding, object = editing
  const [studentToDelete, setStudentToDelete] = useState(null) // object = delete modal is open

  // Save to localStorage every time the students list changes.
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  // ----- Functions that open the modals -----
  const openAddModal = () => {
    setStudentToEdit(null)
    setShowForm(true)
  }

  const openEditModal = (student) => {
    setStudentToEdit(student)
    setShowForm(true)
  }

  // ----- ADD or EDIT -----
  function saveStudent(formData) {
    if (studentToEdit) {
      // EDIT: map() goes through the list and swaps in the updated student.
      setStudents(students.map((s) => (s.id === studentToEdit.id ? formData : s)))
    } else {
      // ADD: copy the old list and add the new student (the ID was typed in the form).
      setStudents([...students, formData])
    }
    setShowForm(false) // close the modal
  }

  // ----- DELETE -----
  function deleteStudent() {
    // filter() keeps every student EXCEPT the one being deleted.
    setStudents(students.filter((s) => s.id !== studentToDelete.id))
    setStudentToDelete(null) // close the modal
  }

  // Students whose name contains the search text (lowercase on both sides so case does not matter)
  const filteredStudents = students.filter((s) =>
    (s.name + ' ' + s.id).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <Navbar page={page} onChange={setPage} />

      <div className="page">
        {/* Show ONE page depending on the page state */}
        {page === 'dashboard' && (
          <Dashboard
            students={students}
            onAdd={openAddModal}
            onViewStudents={() => setPage('students')}
          />
        )}

        {page === 'students' && (
          <div>
            <div className="top">
              <h1>Students</h1>
              <button className="btn blue" onClick={openAddModal}>Add Student</button>
            </div>

            <input
              className="search"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {students.length > 0 && filteredStudents.length === 0 ? (
              <p className="empty">No student matches your search.</p>
            ) : (
              <StudentTable
                students={filteredStudents}
                onEdit={openEditModal}
                onDelete={setStudentToDelete}
              />
            )}
          </div>
        )}
      </div>

      {showForm && (
        <StudentForm
          student={studentToEdit}
          students={students}
          onSave={saveStudent}
          onCancel={() => setShowForm(false)}
        />
      )}

      {studentToDelete && (
        <DeleteModal
          student={studentToDelete}
          onConfirm={deleteStudent}
          onCancel={() => setStudentToDelete(null)}
        />
      )}
    </div>
  )
}

export default App
