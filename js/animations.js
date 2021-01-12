
// Функция анимирования чисел на странице
function start_number_anim() {
	let animNumbers = $('._anim_number'); // Массив из анимированных блоков

	// Запус анимации для всех анимированных чисел
	$.each(animNumbers, function (i, element) {
		let end_num = element.id; // Получаем начальное число

		$({numberValue: 0}).animate({numberValue: end_num}, {
			duration: 2000, // Продолжительность анимации, где 500 = 0,5 одной секунды, то есть 500 миллисекунд
			easing: "linear",
			step: function(val) {
				// Определение типа числа и пошаговое его увеличение
				if (end_num - Math.ceil(end_num) == 0 ) { element.innerHTML = Math.ceil(val); } else { element.innerHTML = val.toFixed(1); }
			}
		});
		element.classList.remove("_anim_number");
	});
}


// Запуск анимация при скроле
const anim_elements = document.querySelectorAll("._anim_on_scroll");
if (anim_elements.length > 0 )
{
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (var i = 0; i < anim_elements.length; i++) {
			const anim_element = anim_elements[i];
			const anim_item_height = anim_element.offsetHeight;
			const anim_item_offset = offset(anim_element).top;
			const anim_start = 2;

			let anim_item_point = window.innerHeight - anim_item_height / anim_start;

			if ((pageYOffset > anim_item_offset - anim_item_point ) && pageYOffset < (anim_item_offset + anim_item_height)){
				anim_element.classList.add("_active_anim_on_scroll");
				if (anim_element.classList.contains("performance_indicators")){ start_number_anim(); } // Если это числовой блок запустить анимация чисел
			}
		}
	}

	function offset(element) {
		const rect = element.getBoundingClientRect(),
			scroll_left = window.pageXOffset || document.documentElement.scrollLeft,
			scroll_top = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scroll_top, left: rect.left + scroll_left }
	}
}

animOnScroll();