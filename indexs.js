function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let totalDaysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];
    let currentMonth = start.getMonth();
    let currentYear = start.getFullYear();
    let totalDaysWorked = 0;

    while (currentYear < end.getFullYear() || (currentYear === end.getFullYear() && currentMonth <= end.getMonth())) {
        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        let workingDays = 0;
        let workedDays = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            let currentDate = new Date(currentYear, currentMonth, day);
            if (currentDate > end) break;
            if (currentDate >= start && currentDate <= end && currentDate.getDay() !== 5) {
                workedDays++;
            }
            if (currentDate.getDay() !== 5) {
                workingDays++;
            }
        }

        totalDaysExcludingFridays.push(workingDays);
        daysWorkedExcludingFridays.push(workedDays);
        totalDaysWorked += workedDays;

        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    }

    // Proportionally distribute the target based on working days
    let totalTarget = 0;
    daysWorkedExcludingFridays.forEach((days, i) => {
        let monthlyTarget = (days / totalDaysWorked) * totalAnnualTarget;
        monthlyTargets.push(monthlyTarget);
        totalTarget += monthlyTarget;
    });

    return {
        daysExcludingFridays: totalDaysExcludingFridays,
        daysWorkedExcludingFridays: daysWorkedExcludingFridays,
        monthlyTargets: monthlyTargets,
        totalTarget: totalTarget
    };
}

// Example usage
console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));