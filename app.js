//35:00

const cols = document.querySelectorAll('.col')

//смена цвета пробелом
document.addEventListener('keydown', (event) => {
  //отмена дефолт поведения элемента при клике пробелом
  event.preventDefault()

  if (event.code.toLocaleLowerCase() === 'space'){
    setRandomColors()
  }
})

//проверяем клик по объекту с дата "type"
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
  //проверка клика по тексту для copy
  else if (type === 'copy') {
    copyToClickboard(event.target.textContent)
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

//ф-ция копирования цвета при клике на h2
function copyToClickboard(text) {
  return navigator.clipboard.writeText(text)
}

//вставка случайного цвета на backGr и текста в h2
function setRandomColors(isInitial) {
  //создаем массив с цветами
  const colors = isInitial ? getColorsFromHash() : []

  cols.forEach((col, index) => {
    //определяем не висит ли замок на меняемом цвете
    const isLocked = col.querySelector('i').classList.contains('fa-lock')

    const text = col.querySelector('h2')
    const button = col.querySelector('button')


    if (isLocked) {
      colors.push(text.textContent)
      return
    }

    // const color = generateRandomColor()
    //проверяем, если первая загрузка то исп хеш в противном случае рандом
    const color = isInitial 
      ? colors[index]
        ? colors[index]
        : chroma.random() 
      : chroma.random()

    //если цвет не заблокирован то в пуш просто color при условии что это не первая загрузка
    if (!isInitial) {
      colors.push(color)
    }

    text.textContent = color
    col.style.background = color

    setTextColor(text, color)
    setTextColor(button, color)
  })

  updateColorsHash(colors)
}

//определим оттенок дял цвета текста, чтобы не сливался
function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

//работа с хешем для запоминания подборки цветов, убираем "#" и разделяем все "-"
function updateColorsHash(colors = []) {
  document.location.hash = colors
  .map((col) => {
    return col.toString().substring(1)
  })
  .join('-')
}

//ф-ция для проверки есть ли в хеше изначально цвета
function getColorsFromHash() {
  //проверим есть ли чтото, если нет, то вернем пустой массив
  if (document.location.hash.length > 1) {
    return document.location.hash
    .substring(1)
    .split('-')
    .map(color => '#' + color)
  }
  return []
}

setRandomColors(true)

