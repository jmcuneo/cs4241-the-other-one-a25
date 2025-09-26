export async function getMe() {
    const r = await fetch('/auth/me', { credentials: 'include' })
    return r.ok ? r.json() : null
}
export async function login(username, password) {
    const r = await fetch('/auth/login', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body: JSON.stringify({ username, password })
    })
    return r.ok
}
export async function logout() {
    await fetch('/auth/logout', { method:'POST', credentials:'include' })
}

export async function listShifts() {
    const r = await fetch('/api/shifts', { credentials:'include' })
    return r.json()
}
export async function createShift(shift) {
    const r = await fetch('/api/shifts', {
        method:'POST', headers:{'Content-Type':'application/json'},
        credentials:'include', body: JSON.stringify(shift)
    })
    return r.json()
}
export async function updateShift(id, patch) {
    await fetch(`/api/shifts/${id}`, {
        method:'PUT', headers:{'Content-Type':'application/json'},
        credentials:'include', body: JSON.stringify(patch)
    })
}
export async function deleteShift(id) {
    await fetch(`/api/shifts/${id}`, { method:'DELETE', credentials:'include' })
}
