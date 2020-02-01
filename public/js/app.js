console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
search.addEventListener('keypress',setQuery);
const messageOne = document.querySelector('.city')
const summary = document.querySelector('.weather')
const temperature = document.querySelector('.temp')
const highlow = document.querySelector('.hi-low')
const date = document.querySelector('.date')

var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];  
function dateFormat1(d) {
    var t = new Date(d);
    return n + " " + t.getDate() + ' ' + monthNames[t.getMonth()]  + " " + t.getFullYear();
  }
// console.log(dateFormat1(new Date()))

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();



newdate = year + "/" + month + "/" + day;

	function setQuery(evt){
	if(evt.keyCode==13){
    const location = search.value
    fetch('/weather?address=' + location).then ((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            date.textContent = dateFormat1(new Date())
            summary.textContent = data.summary
            temperature.textContent = data.temp + "°c";
            highlow.textContent = data.low  + "°c / " + data.high + "°c";
            } 
        })
    })
	}
}
 