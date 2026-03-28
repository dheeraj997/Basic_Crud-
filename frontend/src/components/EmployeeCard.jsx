import { getInitials, getAvatarVariant, getAvailabilityClass, parseSkills } from '../utils';

export default function EmployeeCard({ employee, index, onEdit, onDelete }) {
  const { id, name, email, role, skills, availability } = employee;
  const availClass = getAvailabilityClass(availability);
  const skillList = parseSkills(skills);

  return (
    <div
      className="emp-card emp-card-enter"
      style={{ animationDelay: `${index * 0.06}s` }}
      id={`card-${id}`}
    >
      <div className="card-top">
        <div className="card-identity">
          <div className={`avatar ${getAvatarVariant(id)}`}>
            {getInitials(name)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="emp-name">{name}</div>
            <div className="emp-role">{role || 'No role assigned'}</div>
          </div>
        </div>
        <div className="card-actions">
          <button
            className="btn-icon edit"
            onClick={() => onEdit(employee)}
            title="Edit"
            aria-label={`Edit ${name}`}
            id={`edit-${id}`}
          >
            ✏️
          </button>
          <button
            className="btn-icon delete"
            onClick={() => onDelete(employee)}
            title="Delete"
            aria-label={`Delete ${name}`}
            id={`delete-${id}`}
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="card-details">
        <div className="detail-row">
          <div className="detail-icon">📧</div>
          <div>
            <div className="detail-label">Email</div>
            <div className="detail-value">{email}</div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-icon">🛠️</div>
          <div>
            <div className="detail-label">Skills</div>
            {skillList.length > 0 ? (
              <div className="skills-wrap">
                {skillList.map((s, i) => (
                  <span className="skill-chip" key={i}>{s}</span>
                ))}
              </div>
            ) : (
              <div className="detail-value">Not specified</div>
            )}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-icon">📅</div>
          <div>
            <div className="detail-label">Availability</div>
            <span className={`avail-badge ${availClass}`}>
              <span className="avail-dot" />
              {availability || 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
