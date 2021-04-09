let toSha = document.querySelector('#sha'); // Кнопка SHA256
let msg = document.querySelector('#msg'); // Входное сообщение
let hashedAnswer = document.querySelector('#hashed-answer')
toSha.onclick = () => {
	let msgVal = msg.value;
	hashedAnswer.innerHTML = SHA256(msgVal)
	document.querySelector('#hashed').classList.add('d-block');
	setTimeout(() => {
		document.querySelector('.keys').classList.add('d-block')
	}, 1000);
}