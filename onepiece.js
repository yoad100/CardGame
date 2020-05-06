document.querySelector('#deck2').addEventListener('click',HitDeck);
document.querySelector('#change-card-button').addEventListener('click',changeCard)
document.querySelector('#attack-button').addEventListener('click',Attack)
let yourDeck=[];
let enemyDeck=[];
let cardOn=false;
let yourCard;
let enemyCard;
const CardSound=new Audio('./sounds/swish.mp4');
const AttSound=new Audio('./sounds/PUNCH.mp3');
const DeathSound=new Audio('./sounds/pain-death.mp3')
let onePieceGame={
'cards':['abdullah','ace','aokiji','apoo','arlong','bellamy','bentham','blackbeard','bonney'
,'borsalino','brook','buggy','caesar','cavendish','chinjao','chopper','cracker','crocodile','diamante','diamond','doflamingo','eneru'
,'franky','fujitora','garp','goldroger','hancock','hatchan','hawkins','ivankov','jinbei','kid','killer','kuma','kyros','laffitte','lindbergh'
,'linlin','lucci','luffy','marco','mihawk','momonga','mont','morgan','moriah','nami','nekomamushi','perona','perospero','pica','pink','raizo'
,'robin','sabo','sanji','sengoku','shanks','smoker','trafalgarlaw','urouge','usopp','vergo','viola','vista','wapol','whitebeard','xdrake'
,'zoro','kaido',],
'power':{'abdullah':50,'ace':250,'aokiji':390,'apoo':280,'arlong':100,'bellamy':130,'bentham':100,'blackbeard':350,'bonney':300
,'borsalino':370,'brook':180,'buggy':140,'caesar':180,'cavendish':180,'chinjao':190,'chopper':160,'cracker':250,'crocodile':220,'diamante':210,'diamond':330,'doflamingo':290,'eneru':230
,'franky':190,'fujitora':390,'garp':400,'goldroger':500,'hancock':280,'hatchan':110,'hawkins':270,'ivankov':220,'jinbei':290,'kid':310,'killer':300,'kuma':270,'kyros':130,'laffitte':140,'lindbergh':250
,'linlin':400,'lucci':150,'luffy':320,'marco':350,'mihawk':430,'momonga':270,'mont':250,'morgan':100,'moriah':90,'nami':90,'nekomamushi':270,'perona':180,'perospero':210,'pica':200,'pink':170,'raizo':150
,'robin':140,'sabo':340,'sanji':260,'sengoku':400,'shanks':450,'smoker':200,'trafalgarlaw':290,'urouge':260,'usopp':110,'vergo':210,'viola':160,'vista':300,'wapol':60,'whitebeard':480,'xdrake':290
,'zoro':310,'kaido':480},
'hp':{'abdullah':50,'ace':250,'aokiji':390,'apoo':280,'arlong':100,'bellamy':130,'bentham':100,'blackbeard':350,'bonney':300
,'borsalino':370,'brook':180,'buggy':140,'caesar':180,'cavendish':180,'chinjao':190,'chopper':160,'cracker':250,'crocodile':220,'diamante':210,'diamond':330,'doflamingo':290,'eneru':230
,'franky':190,'fujitora':390,'garp':400,'goldroger':500,'hancock':280,'hatchan':110,'hawkins':270,'ivankov':220,'jinbei':290,'kid':310,'killer':300,'kuma':270,'kyros':130,'laffitte':140,'lindbergh':250
,'linlin':400,'lucci':150,'luffy':320,'marco':350,'mihawk':430,'momonga':270,'mont':250,'morgan':100,'moriah':90,'nami':90,'nekomamushi':270,'perona':180,'perospero':210,'pica':200,'pink':170,'raizo':150
,'robin':140,'sabo':340,'sanji':260,'sengoku':400,'shanks':450,'smoker':200,'trafalgarlaw':290,'urouge':260,'usopp':110,'vergo':210,'viola':160,'vista':300,'wapol':60,'whitebeard':480,'xdrake':290
,'zoro':310,'kaido':480},
'lvl':{'abdullah':1,'ace':1,'aokiji':1,'apoo':1,'arlong':1,'bellamy':1,'bentham':1,'blackbeard':1,'bonney':1
,'borsalino':1,'brook':1,'buggy':1,'caesar':1,'cavendish':1,'chinjao':1,'chopper':1,'cracker':1,'crocodile':1,'diamante':1,'diamond':1,'doflamingo':1,'eneru':1
,'franky':1,'fujitora':1,'garp':1,'goldroger':1,'hancock':1,'hatchan':1,'hawkins':1,'ivankov':1,'jinbei':1,'kid':1,'killer':1,'kuma':1,'kyros':1,'laffitte':1,'lindbergh':1
,'linlin':1,'lucci':1,'luffy':1,'marco':1,'mihawk':1,'momonga':1,'mont':1,'morgan':1,'moriah':1,'nami':1,'nekomamushi':1,'perona':1,'perospero':1,'pica':1,'pink':1,'raizo':1
,'robin':1,'sabo':1,'sanji':1,'sengoku':1,'shanks':1,'smoker':1,'trafalgarlaw':1,'urouge':1,'usopp':1,'vergo':1,'viola':1,'vista':1,'wapol':1,'whitebeard':1,'xdrake':1
,'zoro':1,'kaido':1},
}
function changeCard(){//call your Nakama
  CardSound.play();
  document.querySelector('#enemyAct').style.display='none'
  document.querySelector('#enemyAct2').style.display='none'
  onePieceGame['hp'][yourCard]+=Math.floor(Math.random()*(onePieceGame['power'][yourCard]*0.7));
  CardPick(RandomCard1())
  
  
  enemyTurn();
}
function Attack(){
  document.querySelector('#enemyAct').style.display='none'
  document.querySelector('#enemyAct2').style.display='none'
  
  Fight(yourCard,enemyCard)
  enemyTurn();
}

function HitDeck(){//The opening of the game
 HandOutCards();
 CardPick(RandomCard1())
 enemyCardPick(RandomCard2())
 document.querySelector('#change-card-button').style.display='flex';
 document.querySelector('#attack-button').style.display='flex';
 Showlvl();
 CardSound.play();
}

function CardPick(card){
  cardRemove(cardOn);
 let cardImg=document.createElement('img')
 cardImg.setAttribute('id','opCard')
 cardImg.src=`./images/${card}.png`
 document.querySelector('#board2').appendChild(cardImg);
 cardImg.style.width='15.9%';
 cardImg.style.height='250px';
 cardImg.style.position='absolute'
 document.querySelector('#yourPower').style.display='block';
document.querySelector('#Attack2').textContent=onePieceGame['power'][card];
document.querySelector('#HP2').textContent=onePieceGame['hp'][card];
document.querySelector('#yourLevel').innerHTML=`<b>${onePieceGame['lvl'][card]}</b>`;
cardOn=true;
yourCard=card;
}
function RandomCard1(){
    return yourDeck[Math.floor(Math.random()*yourDeck.length)]
}
function RandomCard2(){
  return enemyDeck[Math.floor(Math.random()*enemyDeck.length)]
}
function cardRemove(card){
  if(card==true){
document.querySelector('#opCard').remove();
console.log('REMOVED');

  }
}
function enemyCardPick(card2){
  CardSound.play();
 let cardImg2=document.createElement('img')
 cardImg2.setAttribute('id','opCard2')
 cardImg2.src=`./images/${card2}.png`
 document.querySelector('#board1').appendChild(cardImg2);
 cardImg2.style.width='15.9%';
 cardImg2.style.height='250px';
 cardImg2.style.position='absolute'
 document.querySelector('#enemyPower').style.display='block';
document.querySelector('#Attack').textContent=onePieceGame['power'][card2];
document.querySelector('#HP').textContent=onePieceGame['hp'][card2];
document.querySelector('#enemyLevel').innerHTML=`<b>${onePieceGame['lvl'][card2]}</b>`;
cardOn=true;
 enemyCard=card2;
}


function HandOutCards(){
for(i=0;i<onePieceGame['cards'].length;i++){
  let rnd=Math.floor(Math.random()*2)
  if(enemyDeck.length>=35){
  yourDeck.push(onePieceGame['cards'][i])
  continue;
  }
  else if(yourDeck.length>=35){
      enemyDeck.push(onePieceGame['cards'][i])
      continue;
  }
      else if(rnd==0){
    yourDeck.push(onePieceGame['cards'][i])
     
  }
  else if(rnd==1)
    enemyDeck.push(onePieceGame['cards'][i])

}



}


async function enemyTurn(){
  document.querySelector('#change-card-button').style.display='none';
 document.querySelector('#attack-button').style.display='none';
  await sleep(3000);
  
let SelectChoise=Math.floor(Math.random()*6);
if(SelectChoise==1||SelectChoise==2||SelectChoise==3||SelectChoise==4||SelectChoise==5){
  enemyFight(enemyCard,yourCard);
  AttSound.play();
  document.querySelector('#enemyAct2').style.display='none'
  document.querySelector('#enemyAct').style.display='flex'
}
  else{
  onePieceGame['hp'][enemyCard]+=Math.floor(Math.random()*(onePieceGame['power'][enemyCard]*0.7));
  enemyCardPick(RandomCard2());
  document.querySelector('#enemyAct').style.display='none'
  document.querySelector('#enemyAct2').style.display='flex'
  }
  document.querySelector('#Heroes').innerHTML=''
   Heroes=document.querySelector('#Heroes')
 for(i=0;i<yourDeck.length;i++){
  Heroes.innerHTML+="<td>  <b>"+yourDeck[i]+"</b>  :  "+onePieceGame['hp'][yourDeck[i]]+"  </td>";
  
 }
  

  document.querySelector('#change-card-button').style.display='flex';
 document.querySelector('#attack-button').style.display='flex';
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms))
}
async function Fight(attacker,deffender){
  AttSound.play();
let attack=Math.floor(Math.random()*onePieceGame['power'][attacker])
onePieceGame['hp'][deffender]=onePieceGame['hp'][deffender]-attack;
document.querySelector('#HP').textContent=onePieceGame['hp'][deffender];
ShowDamageEnemy(attack);
if(onePieceGame['hp'][deffender]<=0){
  onePieceGame['lvl'][attacker]++;
  document.querySelector('#yourLevel').innerHTML=`<b>${onePieceGame['lvl'][attacker]}</b>`;
  onePieceGame['power'][attacker]=Math.floor(onePieceGame['power'][attacker]*1.1);
  document.querySelector('#Attack2').textContent=onePieceGame['power'][attacker]
  DeathSound.play();
  enemyDeck.splice(enemyDeck.indexOf(deffender),1)
  enemyCardPick(RandomCard2());
  console.log(enemyDeck);
  
}
  else if(enemyDeck.length==0){
  document.querySelector('#massage').style.display='flex';
  document.querySelector('#massage').style.color='green';
  document.querySelector('#board1').remove();
  document.querySelector('#board2').remove();
  }
  else if(yourDeck.length==0){
    document.querySelector('#massage').style.display='flex';
    document.querySelector('#massage').textContent='You LOSE!'
    document.querySelector('#massage').style.color='red'
    document.querySelector('#board2').remove();
    document.querySelector('#board1').remove();
    }
}

 async function enemyFight(attacker,deffender){
  cardAnime=document.querySelector('#opCard')
  cardAnime.setAttribute('class','animated shake infinity')
  await sleep(500)
 cardAnime.setAttribute('class','aassa')
  let attack=Math.floor(Math.random()*onePieceGame['power'][attacker])
  onePieceGame['hp'][deffender]=onePieceGame['hp'][deffender]-attack;
  document.querySelector('#HP2').textContent=onePieceGame['hp'][deffender];
  ShowDamage(attack);
  if(onePieceGame['hp'][deffender]<=0){
    onePieceGame['lvl'][attacker]++;
  document.querySelector('#enemyLevel').innerHTML=`<b>${onePieceGame['lvl'][attacker]}</b>`;
    onePieceGame['power'][attacker]=Math.floor(onePieceGame['power'][attacker]*1.1);
    document.querySelector('#Attack').textContent=onePieceGame['power'][attacker]
    DeathSound.play();
    yourDeck.splice(yourDeck.indexOf(deffender),1)
    CardPick(RandomCard1());
    console.log(yourDeck);
  }
    else if(yourDeck.length==0){
    document.querySelector('#massage').style.display='flex';
    document.querySelector('#massage').textContent='You LOSE!'
    document.querySelector('#massage').style.color='red'
    document.querySelector('#board2').remove();
    document.querySelector('#board1').remove();
    }
    else if(enemyDeck.length==0){
      document.querySelector('#massage').style.display='flex';
      document.querySelector('#massage').style.color='green';
      document.querySelector('#board1').remove();
      document.querySelector('#board2').remove();
      }
  
  }
  function ShowDamage(attack){

    let f = document.getElementById('DmgText');
    document.querySelector('#enemyDamage').textContent='-'+attack;
    let sec=0;
    let s =setInterval(function() {
      sec++;
      if(sec==4){
      clearInterval(s)
        if(f.style.display='')
          f.style.display='none'
      }
        f.style.display = (f.style.display == 'none' ? '' : 'none');
        
    },200);
  }
  function ShowDamageEnemy(attack){

    let f = document.getElementById('DmgText2');
    document.querySelector('#yourDamage').textContent='-'+attack;
    let sec=0;
    let s =setInterval(function() {
      sec++;
      if(sec==4){
      clearInterval(s)
        if(f.style.display='')
          f.style.display='none'
      }
        f.style.display = (f.style.display == 'none' ? '' : 'none');
        
    },200);
  }
function Showlvl(){
  document.querySelector('#yourLevel').innerHTML=`<b>${onePieceGame['lvl'][yourCard]}</b>`;
  document.querySelector('#enemyLevel').innerHTML=`<b>${onePieceGame['lvl'][yourCard]}</b>`;;
  document.querySelector('#yourLevel').style.display='block';
  document.querySelector('#enemyLevel').style.display='block';
}
