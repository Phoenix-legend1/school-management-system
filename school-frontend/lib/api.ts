// lib/api.ts
const BASE_URL = "http://127.0.0.1:8000/api";

export async function getStudents() {
  // We use 'no-store' to ensure we get fresh data from Django every time
  const res = await fetch(`${BASE_URL}/students/`, { 
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch students from Django');
  }

  return res.json();
}

export async function getFees() {
  const res = await fetch(`${BASE_URL}/fees/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch fees');
  return res.json();
}