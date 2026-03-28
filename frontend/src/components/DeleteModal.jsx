export default function DeleteModal({ isOpen, employee, onConfirm, onClose, isLoading }) {
  if (!isOpen || !employee) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="delete-modal-content">
          <div className="delete-icon-wrap">⚠️</div>
          <h2 className="modal-title" style={{ marginBottom: 12 }}>Delete Employee?</h2>
          <p className="delete-text">
            Are you sure you want to remove <strong>{employee.name}</strong> from the team?
            This action cannot be undone.
          </p>
          <div className="form-row">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={isLoading}
              id="confirm-delete-btn"
            >
              {isLoading ? (
                <><span className="spinner" /> Deleting...</>
              ) : (
                <>🗑️ Delete</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
