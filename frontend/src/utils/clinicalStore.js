const HISTORY_KEY = "neurox-patient-history";
const APPOINTMENTS_KEY = "neurox-appointments";

export const readPatientHistory = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]") || [];
  } catch {
    return [];
  }
};

export const savePatientHistory = (entry) => {
  if (typeof window === "undefined") return [];
  const current = readPatientHistory();
  const next = [entry, ...current].slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
};

export const readAppointments = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]") || [];
  } catch {
    return [];
  }
};

export const saveAppointment = (appointment) => {
  if (typeof window === "undefined") return [];
  const current = readAppointments();
  const next = [appointment, ...current].slice(0, 20);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(next));
  return next;
};
