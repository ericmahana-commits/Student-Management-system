import { useState } from 'react'

// The Add / Edit modal. Props:
//   student  = the student being edited (null when adding)
//   students = the whole list (used to check for a duplicate email)
//   onSave / onCancel = functions from App
function StudentForm({ student, students, onSave, onCancel }) {
  // The form fields are state. When editing, start with the student's values.
  // Inputs always give us TEXT, so age starts as a string here.
  const [form, setForm] = useState(
    student
      ? { ...student, age: String(student.age) }
      : { id: '', name: '', age: '', email: '', course: '', enrolled: true }
  )
  const [errors, setErrors] = useState({})

  // Runs every time someone types. [event.target.name] is the field name.
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  // Checks the form and RETURNS an object of error messages ({} = no errors).
  function validate() {
    let found = {} // let: we add messages to it below
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // var: works the same here; shown for the assignment

    if (form.id.trim() === '') {
      found.id = 'Student ID is required.'
    } else {
      // some() is true if ANY other student already has this ID
      const idTaken = students.some(
        (s) => s.id.toLowerCase() === form.id.trim().toLowerCase() && (!student || s.id !== student.id)
      )
      if (idTaken) found.id = 'This Student ID is already used.'
    }

    if (form.name.trim() === '') {
      found.name = 'Full name is required.'
    }

    const age = Number(form.age) // convert text to a number
    if (form.age === '') {
      found.age = 'Age is required.'
    } else if (age < 16 || age > 100) {
      found.age = 'Age must be between 16 and 100.'
    }

    if (form.course.trim() === '') {
      found.course = 'Course of study is required.'
    }

    if (form.email.trim() === '') {
      found.email = 'Email is required.'
    } else if (!emailPattern.test(form.email)) {
      found.email = 'Enter a valid email, like name@example.com.'
    } else {
      // some() is true if ANY other student already has this email
      const duplicate = students.some(
        (s) => s.email === form.email.trim() && (!student || s.id !== student.id)
      )
      if (duplicate) found.email = 'This email is already used.'
    }

    return found
  }

  function handleSubmit(event) {
    event.preventDefault() // stop the page from reloading
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) return // errors exist: do not save

    // Convert the text values to the right types before saving.
    onSave({
      id: form.id.trim(),
      name: form.name.trim(),
      age: Number(form.age),                  // string -> number
      email: form.email.trim(),
      course: form.course.trim(),
      enrolled: form.enrolled === true || form.enrolled === 'true', // string -> boolean
    })
  }

  return (
    <div className="backdrop">
      <div className="modal">
        <h2>{student ? 'Edit Student' : 'Add Student'}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <label>Student ID</label>
          <input name="id" value={form.id} onChange={handleChange} />
          {errors.id && <p className="error">{errors.id}</p>}

          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Age</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} />
          {errors.age && <p className="error">{errors.age}</p>}

          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Course of Study</label>
          <input name="course" value={form.course} onChange={handleChange} />
          {errors.course && <p className="error">{errors.course}</p>}

          <label>Enrollment Status</label>
          <select name="enrolled" value={String(form.enrolled)} onChange={handleChange}>
            <option value="true">Enrolled</option>
            <option value="false">Not enrolled</option>
          </select>

          <div className="buttons">
            <button type="button" className="btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn blue">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentForm
