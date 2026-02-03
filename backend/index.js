const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let patients = [];
let doctors = [];
let appointments = [];

/* ---------------- ROOT ---------------- */

app.get("/", (req, res) => {
  res.send("HMS Backend is running");
});

/* ---------------- PATIENTS ---------------- */

app.get("/api/patients", (req, res) => {
  res.json(patients);
});

app.post("/api/patients", (req, res) => {
  const { name, age, gender, disease } = req.body;

  if (!name || !age || !gender || !disease) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const patient = {
    id: Date.now(),
    name,
    age,
    gender,
    disease
  };

  patients.push(patient);
  res.status(201).json(patient);
});

app.delete("/api/patients/:id", (req, res) => {
  const id = Number(req.params.id);
  patients = patients.filter(p => p.id !== id);
  res.json({ message: "Patient deleted" });
});

app.put("/api/patients/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, age, gender, disease } = req.body;

  const index = patients.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Patient not found" });
  }

  if (!name || !age || !gender || !disease) {
    return res.status(400).json({ error: "All fields are required" });
  }

  patients[index] = { id, name, age, gender, disease };
  res.json(patients[index]);
});

/* ---------------- DOCTORS ---------------- */

app.get("/api/doctors", (req, res) => {
  res.json(doctors);
});

app.post("/api/doctors", (req, res) => {
  const { name, specialization, experience, contact } = req.body;

  if (!name || !specialization || !experience || !contact) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const doctor = {
    id: Date.now(),
    name,
    specialization,
    experience,
    contact
  };

  doctors.push(doctor);
  res.status(201).json(doctor);
});

app.delete("/api/doctors/:id", (req, res) => {
  const id = Number(req.params.id);
  doctors = doctors.filter(d => d.id !== id);
  res.json({ message: "Doctor deleted" });
});

app.put("/api/doctors/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, specialization, experience, contact } = req.body;

  const index = doctors.findIndex(d => d.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Doctor not found" });
  }

  if (!name || !specialization || !experience || !contact) {
    return res.status(400).json({ error: "All fields are required" });
  }

  doctors[index] = { id, name, specialization, experience, contact };
  res.json(doctors[index]);
});

/* ---------------- APPOINTMENTS ---------------- */

app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

app.post("/api/appointments", (req, res) => {
  const { patient, doctor, date, time } = req.body;

  if (!patient || !doctor || !date || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const appointment = {
    id: Date.now(),
    patient,
    doctor,
    date,
    time
  };

  appointments.push(appointment);
  res.status(201).json(appointment);
});

app.delete("/api/appointments/:id", (req, res) => {
  const id = Number(req.params.id);
  appointments = appointments.filter(a => a.id !== id);
  res.json({ message: "Appointment deleted" });
});

app.put("/api/appointments/:id", (req, res) => {
  const id = Number(req.params.id);
  const { patient, doctor, date, time } = req.body;

  const index = appointments.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Appointment not found" });
  }

  if (!patient || !doctor || !date || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  appointments[index] = { id, patient, doctor, date, time };
  res.json(appointments[index]);
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
