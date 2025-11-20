import React, { useState } from 'react';

/**
 * Usage:
 * <RegistrationForm organizationId={ORG_UUID} />
 *
 * The architecture requires that registration_requests include organization_id
 * (the organization/tenant UUID). Pass that down from your page props or centre context.
 */
export default function RegistrationForm({ organizationId }) {
  const [form, setForm] = useState({
    student_first_name: '',
    student_last_name: '',
    student_dob: '',
    student_gender: '',
    guardian_name: '',
    guardian_email: '',
    guardian_phone: '',
    guardian_address: '',
    preferred_class: '',
    preferred_start_date: '',
    referral_source: '',
    early_bird: false,
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    if (!organizationId) {
      setStatus({ loading: false, error: 'Missing organization context.', success: '' });
      return;
    }

    // Basic client validation
    if (!form.student_first_name || !form.student_last_name || !form.guardian_name || !form.guardian_email) {
      setStatus({ loading: false, error: 'Please fill required fields.', success: '' });
      return;
    }

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: organizationId,
          student_first_name: form.student_first_name,
          student_last_name: form.student_last_name,
          student_dob: form.student_dob || null,
          student_gender: form.student_gender || null,
          guardian_name: form.guardian_name,
          guardian_email: form.guardian_email,
          guardian_phone: form.guardian_phone || null,
          guardian_address: form.guardian_address || null,
          preferred_class: form.preferred_class || null,
          preferred_start_date: form.preferred_start_date || null,
          referral_source: form.referral_source || null,
          early_bird: !!form.early_bird,
          message: form.message || null,
        }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'Submission failed');

      setStatus({ loading: false, error: '', success: 'Registration submitted. We will contact you soon.' });
      setForm({
        student_first_name: '',
        student_last_name: '',
        student_dob: '',
        student_gender: '',
        guardian_name: '',
        guardian_email: '',
        guardian_phone: '',
        guardian_address: '',
        preferred_class: '',
        preferred_start_date: '',
        referral_source: '',
        early_bird: false,
        message: '',
      });
    } catch (err) {
      setStatus({ loading: false, error: err.message || 'Unexpected error', success: '' });
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Registration form">
      <h3>Register your child</h3>

      <fieldset>
        <legend>Student</legend>
        <label>
          First name *
          <input value={form.student_first_name} onChange={e => update('student_first_name', e.target.value)} required />
        </label>
        <label>
          Last name *
          <input value={form.student_last_name} onChange={e => update('student_last_name', e.target.value)} required />
        </label>
        <label>
          Date of birth
          <input type="date" value={form.student_dob} onChange={e => update('student_dob', e.target.value)} />
        </label>
        <label>
          Gender
          <select value={form.student_gender} onChange={e => update('student_gender', e.target.value)}>
            <option value="">Prefer not to say</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>Guardian</legend>
        <label>
          Name *
          <input value={form.guardian_name} onChange={e => update('guardian_name', e.target.value)} required />
        </label>
        <label>
          Email *
          <input type="email" value={form.guardian_email} onChange={e => update('guardian_email', e.target.value)} required />
        </label>
        <label>
          Phone
          <input value={form.guardian_phone} onChange={e => update('guardian_phone', e.target.value)} />
        </label>
        <label>
          Address
          <textarea value={form.guardian_address} onChange={e => update('guardian_address', e.target.value)} />
        </label>
      </fieldset>

      <fieldset>
        <legend>Preferences</legend>
        <label>
          Preferred class
          <input value={form.preferred_class} onChange={e => update('preferred_class', e.target.value)} />
        </label>
        <label>
          Preferred start date
          <input type="date" value={form.preferred_start_date} onChange={e => update('preferred_start_date', e.target.value)} />
        </label>
        <label>
          Referral source
          <input value={form.referral_source} onChange={e => update('referral_source', e.target.value)} />
        </label>
        <label>
          Early bird?
          <input type="checkbox" checked={form.early_bird} onChange={e => update('early_bird', e.target.checked)} />
        </label>
        <label>
          Message
          <textarea value={form.message} onChange={e => update('message', e.target.value)} />
        </label>
      </fieldset>

      <div>
        <button type="submit" disabled={status.loading}>{status.loading ? 'Sending...' : 'Submit registration'}</button>
      </div>

      {status.error && <div role="alert" style={{ color: 'red' }}>{status.error}</div>}
      {status.success && <div role="status" style={{ color: 'green' }}>{status.success}</div>}
    </form>
  );
}