console.log("HMS JavaScript connected");

/* =====================================================
   PATIENTS (BACKEND CRUD)
===================================================== */

const PATIENT_API = "http://localhost:3000/api/patients";
const patientForm = document.querySelector("#patientForm");
const patientsTableBody = document.querySelector("#patientsTableBody");
let editingPatientId = null;

async function loadPatients() {
  const res = await fetch(PATIENT_API);
  const patients = await res.json();
  patientsTableBody.innerHTML = "";

  patients.forEach(p => {
    const row = document.createElement("tr");

    ["name", "age", "gender", "disease"].forEach(k => {
      const td = document.createElement("td");
      td.textContent = p[k];
      row.appendChild(td);
    });

    const actionCell = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const inputs = patientForm.querySelectorAll("input");
      inputs[0].value = p.name;
      inputs[1].value = p.age;
      inputs[2].value = p.gender;
      inputs[3].value = p.disease;
      editingPatientId = p.id;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`${PATIENT_API}/${p.id}`, { method: "DELETE" });
      loadPatients();
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);
    patientsTableBody.appendChild(row);
  });
}

if (patientsTableBody) loadPatients();

if (patientForm) {
  patientForm.onsubmit = async e => {
    e.preventDefault();
    const inputs = patientForm.querySelectorAll("input");

    const patient = {
      name: inputs[0].value,
      age: inputs[1].value,
      gender: inputs[2].value,
      disease: inputs[3].value
    };

    if (editingPatientId) {
      await fetch(`${PATIENT_API}/${editingPatientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient)
      });
      editingPatientId = null;
    } else {
      await fetch(PATIENT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient)
      });
    }

    patientForm.reset();
    loadPatients();
  };
}

/* =====================================================
   DOCTORS (BACKEND CRUD)
===================================================== */

const DOCTOR_API = "http://localhost:3000/api/doctors";
const doctorForm = document.querySelector("#doctorForm");
const doctorsTableBody = document.querySelector("#doctorsTableBody");
let editingDoctorId = null;

async function loadDoctors() {
  const res = await fetch(DOCTOR_API);
  const doctors = await res.json();
  doctorsTableBody.innerHTML = "";

  doctors.forEach(d => {
    const row = document.createElement("tr");

    ["name", "specialization", "experience", "contact"].forEach(k => {
      const td = document.createElement("td");
      td.textContent = d[k];
      row.appendChild(td);
    });

    const actionCell = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const inputs = doctorForm.querySelectorAll("input");
      inputs[0].value = d.name;
      inputs[1].value = d.specialization;
      inputs[2].value = d.experience;
      inputs[3].value = d.contact;
      editingDoctorId = d.id;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`${DOCTOR_API}/${d.id}`, { method: "DELETE" });
      loadDoctors();
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);
    doctorsTableBody.appendChild(row);
  });
}

if (doctorsTableBody) loadDoctors();

if (doctorForm) {
  doctorForm.onsubmit = async e => {
    e.preventDefault();
    const inputs = doctorForm.querySelectorAll("input");

    const doctor = {
      name: inputs[0].value,
      specialization: inputs[1].value,
      experience: inputs[2].value,
      contact: inputs[3].value
    };

    if (editingDoctorId) {
      await fetch(`${DOCTOR_API}/${editingDoctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor)
      });
      editingDoctorId = null;
    } else {
      await fetch(DOCTOR_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor)
      });
    }

    doctorForm.reset();
    loadDoctors();
  };
}

/* =====================================================
   APPOINTMENTS (BACKEND CRUD)
===================================================== */

const APPOINTMENT_API = "http://localhost:3000/api/appointments";
const appointmentForm = document.querySelector("#appointmentForm");
const appointmentsTableBody = document.querySelector("#appointmentsTableBody");
let editingAppointmentId = null;

async function loadAppointments() {
  const res = await fetch(APPOINTMENT_API);
  const appointments = await res.json();
  appointmentsTableBody.innerHTML = "";

  appointments.forEach(a => {
    const row = document.createElement("tr");

    ["patient", "doctor", "date", "time"].forEach(k => {
      const td = document.createElement("td");
      td.textContent = a[k];
      row.appendChild(td);
    });

    const actionCell = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const inputs = appointmentForm.querySelectorAll("input");
      inputs[0].value = a.patient;
      inputs[1].value = a.doctor;
      inputs[2].value = a.date;
      inputs[3].value = a.time;
      editingAppointmentId = a.id;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`${APPOINTMENT_API}/${a.id}`, { method: "DELETE" });
      loadAppointments();
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);
    appointmentsTableBody.appendChild(row);
  });
}

if (appointmentsTableBody) loadAppointments();

if (appointmentForm) {
  appointmentForm.onsubmit = async e => {
    e.preventDefault();
    const inputs = appointmentForm.querySelectorAll("input");

    const appointment = {
      patient: inputs[0].value,
      doctor: inputs[1].value,
      date: inputs[2].value,
      time: inputs[3].value
    };

    if (editingAppointmentId) {
      await fetch(`${APPOINTMENT_API}/${editingAppointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
      });
      editingAppointmentId = null;
    } else {
      await fetch(APPOINTMENT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
      });
    }

    appointmentForm.reset();
    loadAppointments();
  };
}
