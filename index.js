const btns = document.querySelectorAll('button');
const form = document.querySelector('form');
const formAct = document.querySelector('form span');
const input = document.querySelector('input');
const error = document.querySelector('.error');

var activity = 'cycling'; // default

btns.forEach(btn => {
  btn.addEventListener('click', event => {
    // get activity
    activity = event.target.dataset.activity

    // remove and add active class
    btns.forEach( btn => btn.classList.remove('active'))
    event.target.classList.add('active')

    // set id of input field
    input.setAttribute('id', activity)

    // set text of forms span
    formAct.textContent = activity

    // call the update function
    update(data)
  })
})

// form submit
form.addEventListener('submit', ev => {
  // prevent default action from reloading the page
  ev.preventDefault();

  const distance = parseInt(input.value);
  if (distance){
    db.collection('activities').add({
      distance: distance, // or ES6 formate: distance, 
      activity: activity,
      date: new Date().toString()
    }).then( () => {
      error.textContent = '';
      input.value = '';
    }) 
  } else {
    error.textContent = 'Please enter a valid distance';
  }
})