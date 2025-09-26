<script>
    import { stats } from '../lib/store.js'
    let $stats
    $: stats.subscribe(v => $stats = v)
</script>

<div style="display:flex; gap:1rem; flex-wrap:wrap">
    <div>Total Shifts: {$stats.count}</div>
    <div>Total Hours: {$stats.totalHours.toFixed(1)}</div>
    <div>Total Tips: ${$stats.totalTips.toFixed(2)}</div>
    <div>Avg $/hr: ${$stats.avgHourly.toFixed(2)}</div>
</div>
