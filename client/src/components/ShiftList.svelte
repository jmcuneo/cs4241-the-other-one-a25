<script>
    import { shifts } from '../lib/store.js'
    import { updateShift, deleteShift } from '../lib/api.js'

    let $shifts
    $: shifts.subscribe(v => $shifts = v)

    async function inlineEdit(id, field, value) {
        await updateShift(id, { [field]: value })
        // optimistic: update local store
        shifts.update(list => list.map(s => s._id===id ? { ...s, [field]: value } : s))
    }
    async function remove(id) {
        await deleteShift(id)
        shifts.update(list => list.filter(s => s._id !== id))
    }
</script>

<table>
    <thead><tr><th>Restaurant</th><th>Hours</th><th>Tips</th><th></th></tr></thead>
    <tbody>
    {#each $shifts as s}
        <tr>
            <td>{s.restaurant}</td>
            <td><input type="number" min="0" step="0.1" value={s.hours}
                       on:change={(e)=>inlineEdit(s._id, 'hours', Number(e.target.value))}></td>
            <td><input type="number" min="0" step="0.01" value={s.tips}
                       on:change={(e)=>inlineEdit(s._id, 'tips', Number(e.target.value))}></td>
            <td><button on:click={()=>remove(s._id)}>Delete</button></td>
        </tr>
    {/each}
    </tbody>
</table>
