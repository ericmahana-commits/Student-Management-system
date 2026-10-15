// Asks "are you sure?" before deleting. It does NOT delete by itself:
// it calls onConfirm (delete) or onCancel (close) which come from App.
function DeleteModal({ student, onConfirm, onCancel }) {
  return (
    <div className="backdrop">
      <div className="modal">
        <h2>Delete Student?</h2>
        <p>Are you sure you want to delete <strong>{student.name}</strong>? This cannot be undone.</p>
        <div className="buttons">
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn red" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
