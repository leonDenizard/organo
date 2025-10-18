const dayOfWeekPT = [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabádo"
]

/**
 * estrutura da escala completa de um mês.
 * @param {Object} params
 * @param {number} params.month - Mês (1-12)
 * @param {number} params.year - Ano (ex: 2025)
 * @param {Array} params.shifts - Lista de shifts [{ userId, status, time }]
 * @returns {Array} Estrutura [{ date, dayOfWeek, shifts }]
 */

export default function createSchedule({month, year, shifts}){

    const daysInMonth = new Date(year, month, 0).getDate()
    const schedule = []

    for(let day = 1; day <= daysInMonth; day++){
        const dateObj = new Date(year, month - 1, day)
        const dayOfWeek = dayOfWeekPT[dateObj.getDay()]

        const formattedDate = dateObj
        .toLocaleDateString("pt-BR", {day: "2-digit", month: "2-digit", year: "numeric"})
        .replace(/\//g, "-")

        schedule.push({
            date: formattedDate,
            dayOfWeek,
            shifts: shifts || []
        })
    }

    return schedule
}