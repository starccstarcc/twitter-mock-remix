export const MONTHS = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
]

export const DAYS = Array.from(Array(31).keys()).map(item => {
  return { label: `${item + 1}`, value: `${item + 1}` }
})

const currentYear = new Date().getFullYear()
export const YEARS = Array.from(Array(currentYear - 1950).keys()).map(item => {
  return { label: `${currentYear - item}`, value: `${currentYear - item}` }
})
