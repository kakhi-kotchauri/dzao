const html = document.querySelector('#html')
const character = document.querySelector('#character')
const block = document.querySelector('#block')
const collider = document.querySelector('#collider')
const blockimg = document.querySelector('#blockimg')
const score = document.querySelector('#score')
const body = document.querySelector('#body')
const score1 = document.querySelector('#score1')
const record = document.querySelector('#record')
const reset = document.querySelector('#reset')
const restartpar = document.querySelector('#restartpar')
const par = document.querySelector('#par')
const newobj = document.querySelector('#newobj')
const test = document.querySelector('#test')
const portwidth = document.querySelector('#width')
const plane2 = document.querySelector('#plane2')
const horizone2 = document.querySelector('#horizone2')





let storer = 0
let maxscore = storer
let speed = 2600
let gamestat = true
let intersectstatus = false
let movmentcounter = 0
let multiply = 0.05
let lvl = 0
let maxlvl = lvl
let stopstop = true
let stopstop2 = true
let stopstop3 = true
let delay = 1000
let mobile = true
let changeisland = false
let changeplane = false
let randomnum = null
let width = null
let runstatus = true




setInterval(() => {

width = portwidth.offsetWidth


  if (mobile) {
   mobile = window.getComputedStyle(test, null).display 
   if(mobile === 'none') {
    speed = 2000
    multiply = 0.02
    mobile = false
   }
  }

  newobj.style.left = `${width * 80 / 100}px`


}, 10);


setInterval(() => {
  function randomizer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 randomnum = randomizer(1, 2)

}, 200);


let exp = () => {
  block.style.animation = `block ${speed}ms infinite linear`
}

setInterval(() => {

let blockleftp = window.getComputedStyle(block).getPropertyValue('left')


  if (movmentcounter % 10 === 0 && stopstop) {
     lvl = lvl + 1
    // console.log('ss')
    multiply = multiply + 0.01
     stopstop = false
  }

  
  if (movmentcounter % 10 !== 0) {
    stopstop = true
 }


 if (parseInt(blockleftp) < -width * 40 / 100 && randomnum === 2) {
  changeisland = true
}

if (parseInt(blockleftp) < -width * 40 / 100 && randomnum !== 2 ) {
  changeisland = false
}

let mobiledisp = window.getComputedStyle(test, null).display 
  

if ( mobiledisp !== 'none' && parseInt(blockleftp) < -width * 80 / 100 && randomnum === 2) {
  changeplane = true
}

if ( mobiledisp !== 'none' && parseInt(blockleftp) < -width * 80 / 100 && randomnum !== 2 ) {
  changeplane = false
}


if ( mobiledisp === 'none' && parseInt(blockleftp) < -width * 115 / 100 && randomnum === 2) {
  changeplane = true
}

if ( mobiledisp === 'none' && parseInt(blockleftp) < -width * 115 / 100 && randomnum !== 2 ) {
  changeplane = false
}


if(gamestat === false) {
  block.style.animation = `block 0ms infinite linear`
}


if (intersectstatus === false) {
  
  if (changeisland && stopstop2) {
    blockimg.src = 'pictures/island2.png'
    stopstop2 = false
  }
  
  if (changeisland === false) {
    setTimeout(() => {
      if(intersectstatus === false) {
        blockimg.src = 'pictures/cliff.png'
        stopstop2 = true
      }

    }, 100);
  }



  if (changeplane && stopstop3) {
    plane2.src = 'pictures/plane2green.png'
    stopstop3 = false
  }
  
  if (changeplane === false) {
    setTimeout(() => {
      if(intersectstatus === false) {
        plane2.src = 'pictures/plane2.png'
        stopstop3 = true
      }

    }, 100);
  }
   


}


if (movmentcounter >= 0) {
  speed = speed - multiply

  if(gamestat === true){
  exp()
  }

}





}, 10);



setInterval(() => {
  if(gamestat) {
  storer = storer + 1
  if (character.classList.value !== 'animate') {
  score.textContent = ` დონე ${lvl}, ქულა ${storer}`
  } else {
  score.textContent = `"ზარულიომ ჯადოქარი"`
  }
  }
}, 100);



setInterval(() => {

  html.addEventListener('keydown', addclass)

  function addclass(event) {

    if(intersectstatus) {
      if(event.code === 'Space') {
        restart()
      }
    }

    if(intersectstatus === false && runstatus) {

      if(event.code === 'ArrowUp' || event.code === 'Space') {
  
        if(character.classList.value !== 'animate') {

            character.classList.remove('animate1')
            character.classList.add('animate')
            character.src = 'pictures/jumped.png'
            setTimeout(function(){

              if(intersectstatus === false) {
                character.src = 'pictures/plane.png'
              }

            character.classList.remove('animate')

            if(character.classList.value !== 'smt') {
              character.classList.add('animate1')
            }
            },500)
        }  
      }
    
      if(event.code === 'ArrowDown') {
        setTimeout(function(){
        character.classList.remove('animate')
        character.classList.add('animate1')
        },150)
    }

    }

   }

}, 100);


setInterval(() => {

  body.addEventListener('touchstart', function() {
    c()
  })
  
  function c() {

    if(intersectstatus === false) {
      if(character.classList.value !== 'animate') {
        character.classList.remove('animate1')
        character.classList.add('animate')
        character.src = 'pictures/jumped.png'
        setTimeout(function(){
        character.classList.remove('animate')
        if(intersectstatus === false) {
          character.src = 'pictures/plane.png'
        }
        if(character.classList.value !== 'smt') {
          character.classList.add('animate1')
        }
        },500)
    } 
    }
 
}
}, 100);

let stoper = true

setInterval(function(){


  let verticalMatch = null
  let horizontalMatch = null
  let verticalMatch2 = null
  let horizontalMatch2 = null
  let intersect = null

  let div1 = character.getBoundingClientRect();
  let div1Top = div1.top;
  let div1Left = div1.left;
  let div1Right = div1.right
  let div1Bottom = div1.bottom
  let div1height = div1.height

  
  let div2 = collider.getBoundingClientRect();
  let div2Top = div2.top;
  let div2Left = div2.left;
  let div2Right = div2.right
  let div2Bottom = div2.bottom
  
  let div3 = newobj.getBoundingClientRect();
  let div3Top = div3.top;
  let div3Left = div3.left;
  let div3Right = div3.right
  let div3Bottom = div3.bottom


  if (div1Top + div1height * 90 /100 > div2Top) {
     verticalMatch = true
  } else{
     verticalMatch = false
  }

  
  if ((div2Right > div1Left && div2Right < div1Right)||(div2Left < div1Right && div2Left > div1Left)) {
    horizontalMatch = true
  } else {
    horizontalMatch = false
  }


  if (div1Top - div1height * 40 /100 < div3Top) {
    verticalMatch2 = true
 } else{
    verticalMatch2 = false
 }
 
 if ((div3Right > div1Left && div3Right < div1Right)||(div3Left < div1Right && div3Left > div1Left)) {
   horizontalMatch2 = true
 } else {
   horizontalMatch2 = false
 }
  
  if (horizontalMatch && verticalMatch || horizontalMatch2 && verticalMatch2){
    intersect = true
  } else {
    intersect = false
  }


  if (storer > maxscore) {
    maxscore = storer
  }

  
  if (lvl > maxlvl) {
    maxlvl = lvl
  }

  
  let charactertopp = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
  let newobjleftp = window.getComputedStyle(newobj).getPropertyValue('left')
  let blockleftp = window.getComputedStyle(block).getPropertyValue('left')


       if (parseInt(blockleftp) < 0 && stoper) {
         movmentcounter = movmentcounter + 1
         stoper = false
        }

        if(parseInt(blockleftp) > 0) {
          stoper = true
        }


  
function getRotationAngle(target) 
{
  const obj = window.getComputedStyle(target, null);
  const matrix = obj.getPropertyValue('-webkit-transform') || 
    obj.getPropertyValue('-moz-transform') ||
    obj.getPropertyValue('-ms-transform') ||
    obj.getPropertyValue('-o-transform') ||
    obj.getPropertyValue('transform');

  let angle = 0; 

  if (matrix !== 'none') 
  {
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
  } 

  return (angle < 0) ? angle +=360 : angle;
}



  if(intersect && intersectstatus === false) {
    intersectstatus = true
    runstatus = false
    horizone2.src = 'pictures/stopgif.png'
    restartpar.style.display = 'flex'
    score1.textContent = ` ძაოს დონე: ${lvl}, ქულა: ${storer},`
    score1.style.display = 'block'
    record.style.display = 'block'
    character.src = 'pictures/dest.png'
    blockimg.src = 'pictures/destcliff.png'
    score.textContent = `ძაო დაიმტვრა`
    record.textContent = ` ძაოს რეკორდი: დონე: ${maxlvl}, ქულა: ${maxscore},`
    gamestat = false
    character.style.top = `${charactertopp + charactertopp * 5 / 100}px`
    character.style.transform = `rotate(${getRotationAngle(character)}deg)`
    character.classList.remove('animate')
    character.classList.remove('animate1')
    character.classList.add('smt')
    block.style.left = blockleftp
    newobj.style.left = newobjleftp
    if (changeisland) {
    blockimg.src = 'pictures/island2dest.png'
    }
    if (verticalMatch2) {
      character.style.top = `${charactertopp + charactertopp * 2 / 100}px`
      character.style.transform = `rotate(220deg)`
      plane2.src = 'pictures/plane2dest.png'
       if (changeplane) {
         plane2.src = 'pictures/plane2greendest.png'
       }
    }

  }

}, 10);


function restart() {
  plane2.src = 'pictures/plane2.png'
  horizone2.src = 'pictures/somegif.gif'
  restartpar.style.display = 'none'
  block.style.display = 'none'
  block.classList.remove('blockpar')
  newobj.style.display = 'none'
  newobj.classList.remove('newobj')
  storer = 0
  character.src = 'pictures/plane.png'  
  blockimg.src = 'pictures/cliff.png'
  character.style.top = 'unset'
  character.style.transform = `rotate(0deg)`
  block.style.left = 'unset'
  intersectstatus = false
  gamestat = true
  setTimeout(() => {
    block.style.display = 'inline-block'
    block.classList.add('blockpar')
    newobj.style.display = 'inline-block'
    newobj.classList.add('newobj')
  }, 40);
  speed = 2600
  score1.style.display = 'none'
  record.style.display = 'none'
  character.classList.remove('smt')
  character.classList.add('animate1')
  movmentcounter = 0
  multiply = 0.05
  if (mobile) {
    multiply = 0.02
  }
  lvl = 0
  stopstop = true
  delay = 2500
  mobile = true
  changeisland = false
  changeplane = false
  setTimeout(() => {
    runstatus = true
  }, 20);
}