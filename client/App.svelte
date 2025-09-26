<script>
    import { onMount } from 'svelte'
    import { shifts } from './lib/store.js'
    import { listShifts, createShift, getMe, login, logout } from './lib/api.js'
    import ShiftForm from './components/ShiftForm.svelte'
    import ShiftList from './components/ShiftList.svelte'
    import Stats from './components/Stats.svelte'

    let me = null
    let username='', password=''

    onMount(async () => {
        me = await getMe()
        if (me) {
            const data = await listShifts()
            shifts.set(data)
        }
    })

    async function doLogin() {
        const ok = await login(username, password)
        if (ok) {
            me = await getMe()
            if (me) shifts.set(await listShifts())
        } else alert('Login failed')
    }
    async function doLogout() {
        await logout(); me = null; shifts.set([])
    }
    async function onCreate(e) {
        const created = await createShift(e.detail)
        // If your API returns the created doc, push it; if it returns all, set all:
        if (Array.isArray(created)) { shifts.set(created) }
        else { shifts.update(list => [created, ...list]) }
    }
</script>

{#if !me}
    <h1>Shift Tracker — Svelte Components</h1>
    <div style="display:flex; gap:.5rem; flex-wrap:wrap">
        <input placeholder="username" bind:value={username}>
        <input placeholder="password" bind:value={password} type="password">
        <button on:click={doLogin}>Login / Create</button>
    </div>
{:else}
    <header style="display:flex; justify-content:space-between; align-items:center">
        <h1>Shift Tracker</h1>
        <div>Hi {me.username} <button on:click={doLogout}>Logout</button></div>
    </header>

    <ShiftForm on:create={onCreate}/>
    <Stats/>
    <ShiftList/>
{/if}
