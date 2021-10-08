

/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast/';
const zip = '?zip=';
const key = '&appid=4905706c62d6c7f908e3e05fa62cffff';
const btn = document.getElementById('generate');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const projectData = {}


btn.addEventListener('click',async(e)=>{
    e.preventDefault()
    const zipInput = document.getElementById('zipCode').value;
    const feeling = document.getElementById('feeling').value;

    let zipCode = zip+zipInput;
    const url = baseUrl+zipCode+key;
    await  getApi(url)

      
  postData('/add', {temperature:projectData.temperature , date:newDate , feeling:feeling})
  .then(data => {
    console.log(data); 
  });

  updateUi()

})




// getapi fun to get data from weather site api
async function getApi (url){
    await fetch(url).then(response => response.json()).
    then(data=>projectData.temperature = data.list[0].main.temp)            
}


//postData fun to send data to our server
async function postData (url = '', data = {}) {
    
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
    });
    return response.json(); 
  }



  //update ui fun to set data to our html
async function updateUi(){
    const container = document.getElementsByClassName('weather')[0];
    const temp = document.getElementsByClassName('temperaure');
    await fetch('/all').then(response => response.json()).
    then(update)
    
    container.style.transform  = 'scale(1)'
}

function update(data){  
    document.getElementsByClassName('temperaure')[0].innerHTML=data[0].tempe;
    document.getElementsByClassName('feeling')[0].innerHTML = data[0].feeling;
    document.getElementsByClassName('date')[0].innerHTML = data[0].date;

}