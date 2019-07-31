//console.log('client side js app executed');

//fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//    response.json().then( (data) => {
//        console.log(data);
//    })
//})

//fetch('http://52.168.77.89:3000/weather?address=Kyoto').then((response) => {
//    response.json().then( (data) => {
//        if(data.error){
//            console.log(data.error);
//        } else{
//            console.log(data.location);
//            console.log(data);
//        }
//    })
//})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    //console.log(search.value);

//    fetch('http://52.168.77.89:3000/weather?address='+location).then((response) => {
    fetch('/weather?address='+location).then((response) => {
        response.json().then( (data) => {
            if(data.error){
                //console.log(data.error);
                messageOne.textContent = data.error;
            } else{
                //console.log(data.location);
                //console.log(data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })

})

