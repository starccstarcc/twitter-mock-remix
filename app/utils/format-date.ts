export function formatDate(date: string) {
  const currentDate = new Date()
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()
  const hoursAgo = currentDate.getHours() - targetDate.getHours()

  //TODO:Handle this part better in the future
  if (yearsAgo > 0) {
    return `${yearsAgo}y`
  } else if (monthsAgo > 0) {
    return `${monthsAgo}mo`
  } else if (daysAgo > 0) {
    return `${daysAgo}d`
  } else if (hoursAgo < 24 && hoursAgo > 0) {
    return `${hoursAgo}h`
  } else {
    return 'now'
  }
}
