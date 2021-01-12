
// Виды услуг
const CALLS = 1;
const DEBTS_ABROAD = 2;
const PUT_IN_ON  = 3;
const DEBTS_IN_IT = 4;
const SPAM = 5;
const SPECIAL_SERVICE = 6;

// ===========================================================
// Управление модальным окном для отправки заявки
// ===========================================================

// Открытие формы
async function show_form(SERVICE) {
	let form = document.getElementById('_modal_form'); // Найти форму
	form.querySelector('select').value =  String(SERVICE); // Установить необходмое значение
	form.parentNode.classList.add("_active_form"); // Отобразить
}

// Закрытие формы
function close_form() { document.querySelector('.modal_form').classList.remove("_active_form"); }

// ===========================================================
// Функционал отвечающий за непосредственную отправку письма
// ===========================================================

// Данные для работы с EmailJS
const USER_ID = "user_AfinSkPKiSC5Nyr2sFnIq";
const SERVICE_ID = 'service_z1a5vtt';
const TEMPLATE_ID = 'template_rahas53';

emailjs.init(USER_ID); // Идентификация сервиса отправки писем

// Список услуг
const service_list = ["Постоянные звонки обидчику/должнику", "Возврат долгов за границей", "Подлог записок и *подарков* под дверь", "Возврат долгов в сфере IT", "Спам в соц. сетях", "Особая услуга"];


function send_mail(form) {

	// Валидация формы
	let result = is_valid(form);
	console.log("Кнопка нажата");

	// Если форма валидна
	if ( result ) 
	{

		form.classList.add("_sending");

		// Собираем необходимые данные
		var params = {
			name: result[0].value,
			email: result[1].value,
			service: service_list[Number(result[2].value) - 1],
			description_of_the_problem: result[3].value
		};

		emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
		    .then(function(response) {
	       		send();
		    }, function(error) {
	       		error();
		    });
		};

		function send() {
			close_form();
			
			setTimeout( function () {
				form.reset();
				form.classList.remove("_sending");
				show_message();
			} , 1000 );
			setTimeout(close_message, 6000)
		}
		function error() {

	        close_form();

			setTimeout( function () {
				form.reset();
				form.classList.remove("_sending");
				show_error_message();
			} , 1000 );
			setTimeout(close_message, 6000)
		}

}


function is_valid(form) 
{
	let error = 0;
	formReq = form.getElementsByClassName('_req');

	for (let i = 0; i < formReq.length; i++) {
		let input = formReq[i];
		removeError(input);

		if (input.classList.contains('_email')) {
			if (emailTest(input)){
				addError(input);
				error++;
			}
		} else if (input.classList.contains('_select')) {
			if (input.value == '0') {
				addError(input);
				error++;
			}
		} else {
			let str = input.value;
			if (str != null && typeof(str) !== "undefined") { str = str.trim(); }
			if (!str) { 
				addError(input);
				error++;
			}
		}
	}

	if (error != 0) { return false; } else { return formReq; }
}

let addError = (input) => input.classList.add('_error');
let removeError = (input) => input.classList.remove('_error');

let emailTest = (input) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); 

// Открытие/закрытие сообщения об отправке
function show_message() { document.querySelector('.message_wrapper').classList.add("_active_message");}
function show_error_message () {
	let message = document.getElementsByClassName('message');
   	message.classList.add("message_error");
   	message.parrentNode.innerHTML = "Ошибка отправки!";
   	document.querySelector('.message_wrapper').classList.add("_active_message");
}

function close_message() { document.querySelector('.message_wrapper').classList.remove("_active_message"); }
