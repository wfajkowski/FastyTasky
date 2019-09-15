var hamburger = document.getElementById('hamburger');
var navigation = document.getElementById('navigation');

hamburger.onclick = function() {
  if(hamburger.classList.contains('turnLeft')) 
  { 
    hamburger.classList.remove('turnLeft');   
    hamburger.className = 'turnRight'; 

    navigation.classList.remove('goRight');
    navigation.className = 'goLeft';

  } else if (hamburger.classList.contains('turnRight')){

    hamburger.classList.remove('turnRight');   
    hamburger.className = 'turnLeft'; 

    navigation.classList.remove('goLeft');
    navigation.className = 'goRight';
  } else {
    navigation.className = 'goLeft';
  }
}

