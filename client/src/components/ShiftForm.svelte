<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    let restaurant = '', hours = '', tips = ''

    function submit() {
        const h = Number(hours), t = Number(tips)
        if (!restaurant.trim() || isNaN(h) || isNaN(t)) return
        dispatch('create', { restaurant, hours: h, tips: t })
        restaurant = ''; hours = ''; tips = ''
    }
</script>

<form on:submit|preventDefault={submit} style="display:flex; gap:.5rem; flex-wrap:wrap">
    <input placeholder="Restaurant" bind:value={restaurant}>
    <input placeholder="Hours" bind:value={hours} type="number" min="0" step="0.1">
    <input placeholder="Tips" bind:value={tips} type="number" min="0" step="0.01">
    <button>Add Shift</button>
</form>
