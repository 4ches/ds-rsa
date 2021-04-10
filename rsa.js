const toSha = document.querySelector('#sha'); // Кнопка SHA256
const msg = document.querySelector('#msg'); // Входное сообщение
let hashedAnswer = document.querySelector('#hashed-answer')

toSha.onclick = () => {
	let msgVal = msg.value;
	hashedAnswer.innerHTML = SHA256(msgVal)
	document.querySelector('#hashed').classList.add('d-block');
	setTimeout(() => {
		document.querySelector('.keys').classList.add('d-block')
	}, 1000);
}


const genKeys = document.querySelector('#gen-keys') // Генерировать ключи
let n; // Модуль

function relPrime(num,comp){ // Проверка на взаимно простое число
	let isRelPrime = false;
	let i = 2;
	while(i<=num){
		if((num % i === 0) && (comp % i === 0 )){ isRelPrime = true;break}
		i++;
	}
	return isRelPrime;
}

function hexToDec(hexString){ // Hex в Decimal 
	return parseInt(hexString, 16);
  }
function getRandomArrNumber(arr){ // Получить случайное число с массива
	const arrLen = arr.length;
	return Math.floor(Math.random() * arrLen);
}
genKeys.onclick = () => {
	const pVal = +document.querySelector('#p').value; // p
	const qVal = +document.querySelector('#q').value; // q
	n = pVal * qVal;
	document.querySelector('#nEl').innerHTML = n
	const f = (pVal - 1) * (qVal - 1); // Функция Эйлера
	document.querySelector('#fEl').innerHTML = f;
	const eArr = []; // Массив чисел e
	for(let i = 3;i<f;i+=2){
		if(relPrime(i,f)) {continue}
		eArr.push(i);
	}
	const eArrEl = document.querySelector('#eArr'); 
	eArrEl.innerHTML = eArr.map(function(el){
		return '['+el+']';
	}).join(', ')

	const eOnly = eArr[getRandomArrNumber(eArr)]; // Число е
	const eOnlyEl = document.querySelector('#eOnly');
	eOnlyEl.innerHTML = eOnly
	
	let d = 0; // число d
	(() => { // Вычисление d
		d++;
		while((d*eOnly)% f !== 1){
			d++
		}
	})()
	document.querySelector('#dEl').innerHTML = d;
	setTimeout(() => {
		document.querySelector('.generated-keys').classList.add('d-block')
	}, 1000);
	
	document.querySelector('#public-key').innerHTML =  '{'+ eOnly +', ' + n +'}'
	document.querySelector('#private-key').innerHTML =  '{'+ d +', ' + n +'}'
}
