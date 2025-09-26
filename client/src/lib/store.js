import { writable, derived } from 'svelte/store'

export const shifts = writable([])
// computed stats
export const stats = derived(shifts, ($s) => {
    if (!$s.length) return { totalTips:0, totalHours:0, avgHourly:0, count:0 }
    const totalTips = $s.reduce((a,b)=>a + (b.tips||0), 0)
    const totalHours = $s.reduce((a,b)=>a + (b.hours||0), 0)
    const count = $s.length
    const avgHourly = totalHours ? (totalTips / totalHours) : 0
    return { totalTips, totalHours, avgHourly, count }
})
