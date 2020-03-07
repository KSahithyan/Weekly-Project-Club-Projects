const fs = require('fs')

function getWeeklyTotals() {
    let totalMoneyMade = fs.readFileSync('./Total.txt').toString().split('\n').slice(1).reverse()
    let weeklyTotals = []
    let lastWeekTotal = 0

    for (let i in totalMoneyMade) {
        let todayTotal = totalMoneyMade[i]

        if (i % 7 == 0 && i != 0) {
            weeklyTotals.push(lastWeekTotal)
            lastWeekTotal = 0
        }
        lastWeekTotal += +todayTotal
    }
    if (lastWeekTotal != 0) weeklyTotals.push(lastWeekTotal)
    return weeklyTotals
}

function getMonthlyTotals() {
    let monthlyTotals = []
    let weeklyTotals = getWeeklyTotals()
    let lastMonthTotal = 0

    for (let i in weeklyTotals) {
        let thisWeekTotal = weeklyTotals[i]
        if (i % 4 == 0 && i != 0) {
            monthlyTotals.push(lastMonthTotal)
            lastMonthTotal = 0
        }
        lastMonthTotal += thisWeekTotal
    }
    if (lastMonthTotal != 0) monthlyTotals.push(lastMonthTotal)
    return monthlyTotals
}

function getYearlyReport() {
    let yearlyTotals = []
    let monthlyTotals = getMonthlyTotals()
    let lastYearTotal = 0

    for (let i in monthlyTotals) {
        let thisMonthTotal = monthlyTotals[i]
        if (i % 12 == 0 && i != 0) {
            yearlyTotals.push(lastYearTotal)
            lastYearTotal = 0
        }
        lastYearTotal += thisMonthTotal

    }
    if (lastYearTotal != 0) yearlyTotals.push(lastYearTotal)

    return yearlyTotals
}
if (progress.argv[2] == undefined) { console.log("Pass in 'yearly' or 'montly' or 'weekly' to get report. (without quotes)") }
if (progress.argv[2] == 'yearly') { console.log(getYearlyReport) }
if (progress.argv[2] == 'monthly') { console.log(getMonthlyTotals) }
if (progress.argv[2] == 'weekly') { console.log(getWeeklyTotals) }
