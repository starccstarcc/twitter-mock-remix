export const MONTHS = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
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
