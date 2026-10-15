// Top navigation bar. Props:
//   page = which page is showing ('dashboard' or 'students')
//   onChange = function from App that switches the page
function Navbar({ page, onChange }) {
  return (
    <nav className="navbar">
      <span className="brand">Student Manager</span>
      <div className="links">
        <button
          className={page === 'dashboard' ? 'link active' : 'link'}
          onClick={() => onChange('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={page === 'students' ? 'link active' : 'link'}
          onClick={() => onChange('students')}
        >
          Students
        </button>
      </div>
    </nav>
  )
}

export default Navbar
