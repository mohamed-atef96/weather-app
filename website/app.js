/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast/'
const zip = '?zip='
const key = '&appid=4905706c62d6c7f908e3e05fa62cffff&units=metric'
const btn = document.getElementById('generate')

// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear()
const projectData = {}

btn.addEventListener('click', async e => {
  e.preventDefault()
  const zipInput = document.getElementById('zipCode').value
  const feeling = document.getElementById('feeling').value

  let zipCode = zip + zipInput
  const url = baseUrl + zipCode + key
  try {
    await getApi(url)
    await postData('/add', {
      temp: projectData.temperature,
      date: newDate,
      content: feeling
    })
    await updateUI()
  } catch (err) {
    console.log(err)
  }
})

// getapi fun to get data from weather site api
const getApi = async url => {
  const request = await fetch(url)
  try {
    const allData = await request.json()
    projectData.temperature = allData.list[0].main.temp
    console.log(allData)
  } catch (err) {
    console.log(err)
  }
}

//postData fun to send data to our server
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
  try {
    const res = await response.json()
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
  }
}

//update ui fun to set data to our html
const updateUI = async () => {
  const request = await fetch('/all')
  try {
    const allData = await request.json()
    console.log(allData)
    document.getElementById('date').innerHTML = `Date: ${allData.date}`
    document.getElementById(
      'temp'
    ).innerHTML = `Temperature: ${allData.temp} \u2103`
    document.getElementById('content').innerHTML = `I feel: ${allData.content}`

    const container = document.getElementById('weather')
    container.style.transform = 'scale(1)'
    container.style.opacity = '1'
  } catch (err) {
    console.log('error', err)
  }
}
