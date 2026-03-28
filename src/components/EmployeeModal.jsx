import { useState, useEffect, useRef } from 'react';

const initialForm = {
  name: '',
  email: '',
  role: '',
  skills: '',
  availability: 'Full-time',
};

export default function EmployeeModal({ isOpen, onClose, onSubmit, employee, isLoading }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (employee) {
        setForm({
          name: employee.name || '',
          email: employee.email || '',
          role: employee.role || '',
          skills: employee.skills || '',
          availability: employee.availability || 'Full-time',
        });
      } else {
        setForm(initialForm);
      }
      setErrors({});
      setTimeout(() => nameRef.current?.focus(), 200);
    }
  }, [isOpen, employee]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Valid email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
      skills: form.skills.trim(),
      availability: form.availability,
    });
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-head">
          <h2 className="modal-title">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close" id="modal-close-btn">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="field-name">Full Name *</label>
            <input
              ref={nameRef}
              type="text"
              className={`form-input ${errors.name ? 'has-error' : ''}`}
              id="field-name"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={handleChange('name')}
            />
            {errors.name && <div className="form-error-msg">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-email">Email Address *</label>
            <input
              type="email"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              id="field-email"
              placeholder="e.g. rahul@company.com"
              value={form.email}
              onChange={handleChange('email')}
            />
            {errors.email && <div className="form-error-msg">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-role">Role / Position</label>
            <input
              type="text"
              className="form-input"
              id="field-role"
              placeholder="e.g. Backend Developer"
              value={form.role}
              onChange={handleChange('role')}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-skills">Skills</label>
            <input
              type="text"
              className="form-input"
              id="field-skills"
              placeholder="e.g. Python, SQL, AWS (comma-separated)"
              value={form.skills}
              onChange={handleChange('skills')}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="field-availability">Availability</label>
            <select
              className="form-select"
              id="field-availability"
              value={form.availability}
              onChange={handleChange('availability')}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="form-row">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success" disabled={isLoading} id="form-submit-btn">
              {isLoading ? (
                <><span className="spinner" /> Saving...</>
              ) : (
                <>💾 {employee ? 'Update' : 'Save Employee'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
