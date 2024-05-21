module.exports = () => {
  const colors = [
    'red',
    'blue',
    'green',
    'gray',
    'purple',
    'aquamarine',
    'chartreuse',
    'cyan',
    'dodgerblue',
    'fuchsia',
    'lawngreen'
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}