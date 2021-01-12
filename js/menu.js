// Анимация яконных ссылок
$(document).ready(function(){
	$('._link-page').on("click", function (event) {
		$('menu').removeClass("_active_menu");
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top - 45;
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 500);
	});
});

// Открытие/закрытие меню в мобильной версии
$('.menu_button').on("click", function (event) {
	$('menu').toggleClass("_active_menu");
});
