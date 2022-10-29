//35:00

const cols = document.querySelectorAll('.col')

//смена цвета пробелом
document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLocaleLowerCase() === 'space'){
    setRandomColors()
  }
})

//проверяем клик по объекту с даа "type"
document.addEventListener('click', (event) => {
  const type = event.target.dataset.type

  if (type === 'lock') {
    const node = 
    //проверка клика по иконке или кнопке. если кнопка то смотреть ее children
    event.target.tagName.toLowerCase() === 'i'
      ? event.target
      : event.target.children[0]

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  }
})

// генерация случайного цвета
function generateRandomColor() {
  //RGB
  //#FF0000
  //#00FF00
  //#0000FF
  const hexCodes = '01234567890ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  return '#' + color
}

//вставка случайного цвета на backGr и текста в h2
function setRandomColors() {
  cols.forEach((col) => {
    const text = col.querySelector('h2')
    const button = col.querySelector('button')
    // const color = generateRandomColor()
    const color = chroma.random()

    text.textContent = color
    col.style.background = color

    setTextColor(text, color)
    setTextColor(button, color)
  })
}

//определим оттенок дял цвета текста, чтобы не сливался
function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRandomColors()

