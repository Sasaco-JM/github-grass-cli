export { extractContributions, displayContiributions }

function extractContributions (contributions) {
  const contributionsJson = JSON.parse(contributions)
  const res =
    contributionsJson.data.user.contributionsCollection.contributionCalendar

  return res
}

function displayContiributions (contributions) {
  // 取得したcontributionsを曜日ごとに並び替える
  const sortedContributions = sortingContirbutions(contributions)

  // contributionを■に変える
  const replacedContributions = replaceContributionToSquare(sortedContributions)
  // 月の略称を追加
  addMonths(sortedContributions, replacedContributions)
  // 曜日名を追加
  addDayOfTheWeek(replacedContributions)

  console.log(
    `    ${contributions.totalContributions} contributions in the last year`
  )

  replacedContributions.forEach((contributions) => {
    console.log(contributions.join(''))
  })
}

function sortingContirbutions (contributions) {
  const contributionsByWeeks = contributions.weeks
  const contributionsByDayOfTheWeek = []
  for (let i = 0; i < 7; i++) {
    contributionsByDayOfTheWeek[i] = []
  }
  let i = 0
  let j = 0
  contributionsByWeeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      contributionsByDayOfTheWeek[i][j] = day

      if (i === 6) {
        i = 0
        j += 1
      } else {
        i += 1
      }
    })
  })

  return contributionsByDayOfTheWeek
}

function replaceContributionToSquare (contributions) {
  const replacedContributions = []
  for (let i = 0; i < 7; i++) {
    replacedContributions[i] = []
  }

  for (let i = 0; i < 7; i++) {
    contributions[i].forEach((day, j) => {
      if (day.contributionCount === 0) {
        replacedContributions[i][j] = '□ '
      } else {
        replacedContributions[i][j] = '\x1b[32m■\x1b[0m '
      }
    })
  }

  return replacedContributions
}

function addDayOfTheWeek (replacedContributions) {
  replacedContributions.forEach((week, index) => {
    if (index === 2) week.unshift('Mon')
    else if (index === 4) week.unshift('Wed')
    else if (index === 6) week.unshift('fri')
    else week.unshift('   ')
  })
}

function addMonths (sortedContributions, replacedContributions) {
  const englishMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const months = []
  sortedContributions[0].forEach((day) => {
    const contributionDate = new Date(day.date)
    const contributionMonth = contributionDate.getMonth()

    months.push(contributionMonth)
  })

  const englishContributionMonths = []
  let lastMonth = months[0]
  let monthCount = 0
  months.forEach((month, index, months) => {
    if (month !== lastMonth || index === months.length - 1) {
      if (index === months.length - 1) {
        englishContributionMonths.push(englishMonths[lastMonth])
      } else {
        let paddedMonth = `${englishMonths[lastMonth]}           `
        paddedMonth = paddedMonth.slice(0, 2 * monthCount)
        englishContributionMonths.push(paddedMonth)

        monthCount = 0
      }
    }
    monthCount += 1
    lastMonth = month
  })
  replacedContributions.unshift(englishContributionMonths)
}
