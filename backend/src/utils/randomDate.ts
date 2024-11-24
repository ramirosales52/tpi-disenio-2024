export default function randomDate(start: string, end: string) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime())
  const randomDate = new Date(randomTime)

  // Formatear la fecha a 'YYYY-MM-DD'
  const year = randomDate.getFullYear()
  const month = String(randomDate.getMonth() + 1).padStart(2, '0')
  const day = String(randomDate.getDate()).padStart(2, '0')

  return new Date(`${year}-${month}-${day}`)
}
