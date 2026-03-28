import { useState, useEffect, useMemo, useCallback } from 'react';
import api from './api';
import { getAvailabilityClass } from './utils';
import Navbar from './components/Navbar';
import HeroStats from './components/HeroStats';
import EmployeeCard from './components/EmployeeCard';
import EmployeeModal from './components/EmployeeModal';
import DeleteModal from './components/DeleteModal';
import ToastContainer, { useToast } from './components/Toast';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [deleteEmp, setDeleteEmp] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { toasts, addToast } = useToast();

  // ---- Fetch all employees ----
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getAll();
      setEmployees(data);
    } catch (err) {
      addToast('Failed to load employees', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // ---- Keyboard shortcut: Escape closes modals ----
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setFormOpen(false);
        setEditingEmp(null);
        setDeleteEmp(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ---- Computed stats ----
  const stats = useMemo(() => {
    const total = employees.length;
    const fullTime = employees.filter(
      (e) => getAvailabilityClass(e.availability) === 'full-time'
    ).length;
    const roles = new Set(employees.map((e) => e.role).filter(Boolean)).size;
    return { total, fullTime, roles };
  }, [employees]);

  // ---- Filtered employees ----
  const filtered = useMemo(() => {
    if (!search.trim()) return employees;
    const q = search.toLowerCase();
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        (e.role || '').toLowerCase().includes(q) ||
        (e.skills || '').toLowerCase().includes(q)
    );
  }, [employees, search]);

  // ---- Handlers ----
  const openAdd = () => {
    setEditingEmp(null);
    setFormOpen(true);
  };

  const openEdit = (emp) => {
    setEditingEmp(emp);
    setFormOpen(true);
  };

  const openDelete = (emp) => {
    setDeleteEmp(emp);
  };

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingEmp) {
        const updated = await api.update(editingEmp.id, data);
        setEmployees((prev) =>
          prev.map((e) => (e.id === editingEmp.id ? updated : e))
        );
        addToast(`${data.name} updated successfully`);
      } else {
        const created = await api.create(data);
        setEmployees((prev) => [...prev, created]);
        addToast(`${data.name} added to the team!`);
      }
      setFormOpen(false);
      setEditingEmp(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteEmp) return;
    setSubmitting(true);
    try {
      await api.delete(deleteEmp.id);
      setEmployees((prev) => prev.filter((e) => e.id !== deleteEmp.id));
      addToast(`${deleteEmp.name} removed`, 'info');
      setDeleteEmp(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Render ----
  return (
    <>
      <div className="bg-mesh" />
      <ToastContainer toasts={toasts} />

      <div className="app">
        <Navbar />

        <HeroStats
          total={stats.total}
          fullTime={stats.fullTime}
          roles={stats.roles}
        />

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, role, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search-input"
            />
          </div>
          <button className="btn btn-brand" onClick={openAdd} id="add-employee-btn">
            ➕ Add Employee
          </button>
        </div>

        {/* Employee Grid */}
        <div className="cards-grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div className="skeleton skeleton-card" key={i} />
            ))
          ) : filtered.length > 0 ? (
            filtered.map((emp, i) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                index={i}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))
          ) : employees.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">👥</span>
              <h3>No employees yet</h3>
              <p>Add your first team member to get started!</p>
              <button className="btn btn-brand" onClick={openAdd}>
                ➕ Add First Employee
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <h3>No results found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>
            Built with ❤️ using{' '}
            <a href="https://fastapi.tiangolo.com" target="_blank" rel="noopener noreferrer">FastAPI</a>
            {' '}&amp;{' '}
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a>
            {' '}— by <strong>Dheeraj</strong>
          </p>
        </footer>
      </div>

      {/* Modals */}
      <EmployeeModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingEmp(null); }}
        onSubmit={handleFormSubmit}
        employee={editingEmp}
        isLoading={submitting}
      />

      <DeleteModal
        isOpen={!!deleteEmp}
        employee={deleteEmp}
        onConfirm={handleDelete}
        onClose={() => setDeleteEmp(null)}
        isLoading={submitting}
      />
    </>
  );
}
