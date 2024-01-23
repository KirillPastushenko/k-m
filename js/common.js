var APP_ROOT = 'https://www.krasotka-market.ru';
var APP_ROOT_REL = '/';

function clearwishlist() {
	$.ajax({
		url: "/ajax/clearwishlist/",
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			if(data.status == 'error') {
				alert(data.error);
			}
			window.location.reload();
		}
	});
}

function updateBottomBar() {
	$.ajax({
		url: '/',
		type: "GET",
		success: function(html) {
			var data = $(html).find('#krt_sticky').html();
			$('#krt_sticky').html(data);
		}
	})
}

function addwishlist(element, changeText) {
	if(!changeText)
		changeText = false;

	if(!element)
		return false;
	
	var id = $(element).attr('data-product-id');

	if(!id)
		return false;
	
	$.ajax({
		url: "/ajax/addwishlist/",
		type: 'POST',
		data: {id: id},
		dataType: 'json',
		success: function(data) {
			if(data.status == 'error') {
				alert(data.error);
			}
			
			updateBottomBar();

			var count = parseInt($('#wishlist-total').attr('data-count'));
			$('#wishlist-total').attr('data-count', count + 1).attr('title', "("+(count + 1)+")").text("("+(count + 1)+")");
			$(element).removeClass('btn-info').addClass('btn-success').attr('title', 'Из избранного');
			if(changeText) {
				$(element).attr('onclick', 'delwishlist(this, true);');
				$(element).text('УБРАТЬ ИЗ ИЗБРАННОГО')
			} else { 
				$(element).attr('onclick', 'delwishlist(this, false);');
			}
		}
	});
}

function delwishlist(element, changeText) {
	if(!changeText)
		changeText = false;

	if(!element)
		return false;

	var id = $(element).attr('data-product-id');

	if(!id)
		return false;

	$.ajax({
		url: "/ajax/delwishlist/",
		type: 'POST',
		data: {id: id},
		dataType: 'json',
		success: function(data) {
			if(data.status == 'error') {
				alert(data.error);
			}
			
			updateBottomBar();

			var count = parseInt($('#wishlist-total').attr('data-count'));
			$('#wishlist-total').attr('data-count', count - 1).attr('title', "("+(count - 1)+")").text("("+(count - 1)+")");
			$(element).removeClass('btn-success').addClass('btn-info').attr('title', 'В избранное');	
			if(changeText) {
				$(element).attr('onclick', 'addwishlist(this, true);');
				$(element).text('ДОБАВИТЬ В ИЗБРАННОЕ')
			} else { 
				$(element).attr('onclick', 'addwishlist(this, false);');
			}
		}
	});
}

function bar_delwishlist(id) {
	if(!id)
		return false;

	$.ajax({
		url: "/ajax/delwishlist/",
		type: 'POST',
		data: {id: id},
		dataType: 'json',
		success: function(data) {
			if(data.status == 'error') {
				alert(data.error);
			}
			var count = parseInt($('#wishlist-total').attr('data-count'));
			$('#wishlist-total').attr('data-count', count - 1).attr('title', "("+(count - 1)+")").text("("+(count - 1)+")");
			$('#bar-wishlist-total').text($('#wishlist-total').attr('data-count'));
			$('[data-favorite-item][data-id="'+ id +'"]').remove();
		}
	});
}




function ChangeColorVariant(t, id) {
	var input = $(t);
	var json = new Object;
	json['key'] = id;
	json['change_color_variant'] = input.val();

	$('.incart-list').css('opacity', '0.5');
	$.post("/ajax/changebasketcolorvariant/", json, function (html) {
		$('.incart-list').html($(html).find('.incart-list').html());
		$('.incart-list').css('opacity', '1');
	});
}

function bar_ChangeQuan(key, value) {
	var json = new Object;
	json['key'] = key;
	json['quantity'] = value;

	$('#checkout-basket').css('opacity', '0.5');
	$.post("/ajax/changebasketquantity/", json, function (html) {
		$('#krt_basket').html($(html).find('#krt_basket').html())
		$('#krt_orlink_basket').html($(html).find('#krt_orlink_basket').html())

		$('#checkout-basket').html($(html).find('#checkout-basket').html());
		$('#checkout-basket').css('opacity', '1');
		$('#top-right-corner').html($(html).find('#top-right-corner').html());
	});
}

function ChangeQuan(t, id) {
	t.value = t.value.replace(/\D+/, '');
	if (t.value == "0") t.value = "1";
	if (t.value == "") t.value = "1";
	var quantit = $(t).attr('name');

	var json = new Object;
	json['key'] = id;
	json['quantity'] = t.value;

	$('#checkout-basket').css('opacity', '0.5');
	$.post("/ajax/changebasketquantity/", json, function (html) {
		$('#krt_basket').html($(html).find('#krt_basket').html())
		$('#krt_orlink_basket').html($(html).find('#krt_orlink_basket').html())

		$('#checkout-basket').html($(html).find('#checkout-basket').html());
		$('#checkout-basket').css('opacity', '1');
		$('#top-right-corner').html($(html).find('#top-right-corner').html());
	});
}

function bar_RemovieItemCart(key) {
	var json = new Object;
	json['key'] = key;

	$('#checkout-basket').css('opacity', '0.5');
	$.post("/ajax/removefrombasket/", json, function (html) {
		$('#krt_basket').html($(html).find('#krt_basket').html())
		$('#krt_orlink_basket').html($(html).find('#krt_orlink_basket').html())

		$('#checkout-basket').html($(html).find('#checkout-basket').html());
		$('#checkout-basket').css('opacity', '1');
		$('#top-right-corner').html($(html).find('#top-right-corner').html());
	});
}

function RemovieItemCart(t, id) {
	var json = new Object;
	var removie = $(t).attr('id');

	var json = new Object;
	json['key'] = id;

	$('#checkout-basket').css('opacity', '0.5');
	$.post("/ajax/removefrombasket/", json, function (html) {
		$('#krt_basket').html($(html).find('#krt_basket').html())
		$('#krt_orlink_basket').html($(html).find('#krt_orlink_basket').html())

		$('#checkout-basket').html($(html).find('#checkout-basket').html());
		$('#checkout-basket').css('opacity', '1');
		$('#top-right-corner').html($(html).find('#top-right-corner').html());
	}
	);
}

function ClearCart() {
	$('#checkout-basket').css('opacity', '0.5');
	$.post("/ajax/clearbasket/", [], function () {
		window.location.reload();
	});
}

var ClearCategoryFilter = function(category_id) {
	$.ajax({
		url: '/ajax/clear_category_filter/',
		type: 'post',
		data: {"category_id": category_id},
		success: function(data) {
			$.pjax({url: window.location.pathname});
		}
	});
}

var ApplyCategoryFilter = function(form) {
	$.pjax({ 
		url: window.location.pathname + '?' + $(form).serialize() 
	});
}

// var zoomOptions = {   
// 	          zoomWidth: 350,
// 	          zoomHeight: 450,
// 	          scale : 2
// 	        }; 

var zoomOptions = {
	zoomType: "window",
	scrollZoom: true,
	cursor: "crosshair",
	zoomWindowFadeIn: 500,
	zoomWindowFadeOut: 500
};

	function showBuyNotice(pid){
		jQuery('<div id="addToCartReult"/>')
			.appendTo(jQuery('body'))
			.load('/static_html/buy_success.html?id=' + pid, function() {

			var html = jQuery('#addToCartReult').html();
			html += '<h3>Товаров: '+$('#basket_count').html()+'. К оплате: '+$('#basket_total').html()+'р.</h3><br><br>' +
				'<a href="/checkout" class="buttonstyle">Перейти в корзину</a></button>&nbsp;' +
				'<a href="javascript:;" onclick="window.location.reload();" class="buttonstyle" id="back-link">Продолжить покупки</a></body></html>';

			jQuery.fancybox(html, {
			    width: '400',
			    height: '200',
				afterClose : function() {
					window.location.reload();
					jQuery('#addToCartReult').remove();
				}
			});
		});
	}

	var animateProdToBasket = function (key, callback) {

		if ($('#top-right-responsive').css('display') == 'none') {
			if($('#small-cart').css('visibility') == 'visible') {
				var cart = $('#small-cart').offset();		
			} else {
				var cart = $('#top-right-corner').offset();		
			}
			
		}
		else {
			var cart = $('#top-right-responsive').offset();
		}
	
		var imgdrag = $('.animate-image-' + key).find('img');
		if (imgdrag.length) {
			var img = imgdrag.clone()
				.offset({ top: imgdrag.offset().top, left: imgdrag.offset().left })
				.css({ 'opacity': '0.8', 'position': 'absolute', 'z-index': '10000' })
				.appendTo($('body'))
				.animate({
					'top': cart.top,
					'left': cart.left,
					'width': 0,
					'height': 0
				}, 1000, function () {
					setTimeout(function () {
						img.remove();
						if (callback) callback();
					}, 25);
				});
		}
	};


	$(function(){
		$('.inputboxquantityvis').on('keyup', function(){
			$('.inputboxquantity[type=hidden][data-key='+$(this).attr('data-key')+'][data-size='+$(this).attr('data-size')+']').val($(this).val());
		});
	});


	function update_basket(resp){
		if(resp.length > 0){
			var splited = resp.split('_');
			jQuery('.cart-function-block').show();
			var textPrice = splited[1].toString();
			jQuery('.basket_total').text(textPrice.split('.')[0] + 'р.');
			jQuery('.basket_count').text(splited[0] + ' шт');
			jQuery('.cart-info-block div').show();

			jQuery('.cart-info-block #tmp-msg').remove();
		}
	}


	function cancel_basket(){
		var postCart = jQuery.ajax({
								type: "POST",
								data: 'reset=true',
								url : APP_ROOT_REL + '_ajax/reset_basket/',
								success : function(resp){
									document.location= document.location;	
								}
							});
	}
	function refresh_page(){
		parent.location=parent.location;	
	}



	/*
 	* инкремент значения в поле количества товара
 	**/
 	function changeProductCount(bttn){
 		var $targetField = jQuery(bttn).parent().find('input');
 		var that = bttn;

 		jQuery.each($targetField,  function(index, item){

 			//текущее количество
 			var qty = jQuery(jQuery(item).get(0)).val();

     		if(jQuery(that).data('plus')){
     			if ((parseInt(qty) + 1) > $(that).data('count')) {
     				
     				return false;
     			}

     			//увеличение
     			if(!isNaN(qty)) { 
	     				qty++;
	     				jQuery(jQuery(item).get(0)).val(qty);
	     				if (qty >= $(that).data('count')) {
	     					if ($(that).parent().find('.prodano').length > 0) {
		     					$(that).parent().find('.prodano').show();
		     				}
	     				}
     				}
     		} else {
     			if ($(that).parent().find('.prodano').length > 0) {
 					$(that).parent().find('.prodano').hide();
 				}

     			//уменьшение
     			if(!isNaN(qty) && qty > 0 ) { 
     				qty--;
     				jQuery(jQuery(item).get(0)).val(qty);
     			}	     			
     		}

 		});
 	}

function bindIncrementButton(){
	//примитивный singleton для слежения
	if(window.bb != 1){
		$(document).on('click', '.quant-change-button', function(){
            changeProductCount(this);
        });
		window.bb = 1;
	} else {
		return;
	}
}

function isiPhone(){ 
		return ( (navigator.platform.indexOf("iPhone") != -1)
			 || (navigator.platform.indexOf("iPod") != -1)
			 || (navigator.platform.indexOf("iPad") != -1) );
	}

/*
* Simple jQuery snippets
**/

jQuery(function() {
	


	$("#mob-search-btn").on('click',function(){
		$(this).toggleClass('active');
		$('#search-form, #category-top .search').toggleClass('showMobile');
 
		setTimeout(function(){
			if($("#mob-search-btn").hasClass('active')){
 				 $('input[name="articul"]').focus();
 			}else{
				$('input[name="articul"]').blur();
			}
		},300)
	})
	
 
/* 	$("#search-form").submit(function(event){
		$("#mob-search-btn").toggleClass('active');
	}) */
	

	$('input[name=shipping]').change(function(){
		if ($(this).val() == 2) {
			$('#passportinfo').hide();
			$('#passcode, #passnum, #passfrom').addClass('notrequired');
		} else {
			$('#passportinfo').show();
			$('#passcode, #passnum, #passfrom').removeClass('notrequired');
		}
	})

	$('.inputboxquantity').keyup(function(){
		$('#quant'+$(this).attr('data-id')+'[data-size='+$(this).attr('data-size')+']').val($(this).val());
	});


   if(!isiPhone()){
   		jQuery('body').addClass('has-hover');
   }
   

		if(jQuery.fancybox != undefined){
		 	jQuery(".fancybox, .lightbox-window").fancybox({height:400,
		 													beforeLoad : function() {         
		 	            this.height = parseInt(this.element.data('fancybox-height')) || 400;
		 		var thatWidth = this.element.data('fancybox-width');
		 		if (thatWidth != 'undefined' && thatWidth != undefined) {
		 		   this.width  = parseInt(thatWidth);  
		 		}
															 	},
															 afterClose : function() {
															 	//перезагрузка если есть атрибут
															 	//if(this.element.data('fancybox-reload')){
																	// location.reload();		
															 	//}
													        return;
													    }
													});			
		 }

					  
		// jQuery('.colorpick').jPicker();

		//очистка форматирования текста в продукте
		if(jQuery('.fulldescr').length){
			jQuery.each(jQuery('.fulldescr dd, .fulldescr div, .fulldescr span'), function(){
				jQuery(this).attr('style','');
			})
		}

		//корзина, проверка если пуста
		if(jQuery('#basket_total').text() == 0){
			jQuery('.cart-function-block').hide();
			jQuery('.cart-info-block div').hide();
			jQuery('.cart-info-block').append('<div id="tmp-msg">Ваша корзина пока что пуста.</div>').attr('id','empty-cart');
		}

		//кнопки на товаре -/+
		bindIncrementButton();

		//разворачивание блока кода вставки в блог
		jQuery('.retail-header').click(function(){
 			jQuery('.retail-code').toggle();
 		});

 		
		//вызов приложения
		var _w = new App({root:APP_ROOT, UIsettings : {closecat:false}});
		_w.init();


		jQuery('#close-msg').click(function(){
			jQuery(this).parent().remove();
		})


		//чтобы не дергалася блок на страницах категорий
		//пока подгружается вторая
		// jQuery('.category-products-listing .prodblock').hover(function(){
		// 	var bi = jQuery(this).find('.back-image');
		// 	console.log(bi, jQuery(bi).prev().find('img').height());
		// 	jQuery(bi).height(jQuery(bi).prev().find('img').height());
		// })

});


/*
* The Factory Method
**/
function ObjectFactory() {}
ObjectFactory.create = function (o) {
    var args = [].slice.call(arguments, 1);
    function F() {}
    F.prototype = o.prototype;
    var instance = new F();
    o.apply(instance, args);
    return instance;
};


/*
* Application shop
**/
var App = function(config) {

this.root = config.root;
var that = this; 

this.init = function() {


	//1
	//меню каталога слева
	if (config.UIsettings.closecat) {
		
		//подразделы - свернуты, разворачивание при нажатии
		jQuery('.sub-categories').hide();
		jQuery.each(jQuery('.top-category-name'), function(){
			jQuery(this).click(function(e){
				e.stopPropagation();
				jQuery(this).parent().find('.sub-categories').toggle('normal');	
			});
		});
	} else {
		//все разделы открыты, переход на главную категорию по клику
		jQuery.each(jQuery('.top-category-name'), function(){
				jQuery(this).click(function(){
				document.location.href = that.root + '/products/c/' +jQuery(this).data('cid')['key'];
			});
		});

	}

	//2
	//раскрывающиеся списки
	jQuery.each(jQuery('.collapse-binder'), function(){
			jQuery(this).click(function(e){
				jQuery(this).next('.collapsible-block').toggle('normal').toggleClass('collapsed');
			});
		});

	//3
	//перезагружать страницу после закрытия вспл окна 
	//с добавлением в корзину
	//см jQuery.fancybox
	jQuery.each(jQuery('.new-items-buy-button a'), function(){
		jQuery(this).data('fancybox-reload',true);
	});

	//подсветка активного меню
	var curPageConf = jQuery('#maintab').data('config');
	if (curPageConf != undefined) {
		jQuery('li#'+curPageConf.prefix+curPageConf.id).addClass('active');
	}

	// //страница товара -> просмотр картинки
	//  if (jQuery('.big-image:not(.no_magnify)').length){     
	//     // jQuery('.big-image').jqzoom(zoomOptions);
	//     jQuery('.big-image img[data-zoom-image]:visible').elevateZoom(zoomOptions);
	//  }

	 //faq страница
	 if(jQuery("body").hasClass("text-page")){
		jQuery("h2 > .toggled",".content").hide();
		jQuery("h2 > .toggled",".content").addClass("disclosure-active").click(function(){
			jQuery(this).next().toggle();
		});
	}

	$(document).on("pjax:end", function(xhr, options){
		$('.page-text h2, #page-text h2').on('click', function(){
			$(this).next('div').toggle();
		});
	});
	$('.page-text h2, #page-text h2').on('click', function(){
		$(this).next('div').toggle();
	});

	//страница категории подгрузка оборотных фото
	

	if(jQuery("body").hasClass("category-page")){
		jQuery('.prodblock.prodblock-category').hover(function(){
			if(jQuery(this).find('a.back-image').length){
				var imgEl = jQuery(this).find('a.back-image').find('img');
				jQuery(imgEl).attr('src', jQuery(imgEl).data('url'));
			}
		})
	}
//
	 //страница товара - дополнительные фото
	/*
	  jQuery.each(jQuery('.thumbs li a.thumb'), function(){
	      jQuery(this).click(function(){
	        var img = jQuery(this).attr('href')
	        var old = jQuery('.big-image').attr('href');

	        jQuery('.big-image').attr('href', img);
	      //  var tempImg = jQuery('.big-image').find('img');
	        jQuery('.big-image').html('<img src="'+img+'" width="300" alt="dsds" title="sdsdsd">');
	       // jQuery('.big-image').find('img').attr('src',img);

	         jQuery('.big-image').jqzoom(zoomOptions);

	        jQuery(this).attr('href', old).find('img').attr('src',old);
	        return false;
	      })
    })
*/

	
};


this.showMessage = function(text, type){
jQuery('.message-container').text(text).addClass(type);
}

App.prototype = {
 //
}

}

$(function(){
	$('.button-all-sizes').on('click', function(){
		$this = $(this);
		key = $this.attr('data-key');
		$this.toggleClass('active');
		if ($this.hasClass('detail')) {
			if ($this.hasClass('active')) {
				$this.parent().parent().find('.nprice').hide();
				$this.parent().parent().find('.srprice').show();
				$('.srquant'+key).attr('value', 1);
			} else {
				$this.parent().parent().find('.nprice').show();
				$this.parent().parent().find('.srprice').hide();
				$('.srquant'+key).attr('value', 0);
			}	
		} else {
			if ($this.hasClass('active')) {
				$this.parent().prev().find('.nprice').hide();
				$this.parent().prev().find('.srprice').show();
				$('.srquant'+key).attr('value', 1);
			} else {
				$this.parent().prev().find('.nprice').show();
				$this.parent().prev().find('.srprice').hide();
				$('.srquant'+key).attr('value', 0);
			}	
		}
	});
})

/*
*	Custom
*/
$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
});

var Application = function(){

	return {
		getSRQuantity: getSRQuantity,
		getQuantity: getQuantity,
		add2Basket: add2Basket,
		add2RetailBasket: add2RetailBasket,
		getBoxQuantity: getBoxQuantity,
		add2BasketBox: add2BasketBox,
		add2RetailBasketBox: add2RetailBasketBox
	}

	function getSRQuantity(prodID) {
		var quantity = $('[data-rel="srcount"][data-prod="'+prodID+'"]').val();
		return {
			'size_range': "Y",
			'quantity': quantity
		}
	}

	function getQuantity(itemID) {
		var sizeQuantity = {
			'sizes': {},
			'quantity': 0
		};

		$('div[data-rel=item-'+itemID+']').find('input.quantity-input').each(function(){
			if ($(this).val() > 0)
				sizeQuantity.sizes[$(this).attr('data-rel')] = parseInt($(this).val());
		});

		$('div[data-rel=item-'+itemID+']').find('input.standart-quantity').each(function(){
			if ($(this).val() > 0)
				sizeQuantity.quantity += parseInt($(this).val());
		});

		return sizeQuantity;
	}

	function getBoxQuantity(itemID) {
		var sizeQuantity = {
			'sizes': {0: 1},
			'quantity': 1
		};

		return sizeQuantity;
	}

	function add2RetailBasket(url, elementID, quantity)
	{
		if (quantity.quantity > 0 || Object.keys(quantity.sizes).length > 0)
		{
			$.ajax({
				url: url,
				type: 'POST',
				data: { 'elementID': elementID, 'quantity': quantity, 'retail': 'Y' },
				dataType: 'JSON',
				success: function(data) {
                    animateProdToBasket(elementID);
                    $('div[data-rel=item-'+elementID+']').find('input.quantity-input').val(0);
                    $('div[data-rel=item-'+elementID+']').find('input.standart-quantity').val(0);
    				$.ajax({
    					url: '/',
    					success: function(data) {
							$('#krt_basket').html($(data).find('#krt_basket').html())
							$('#krt_orlink_basket').html($(data).find('#krt_orlink_basket').html())

							$('#top-right-corner').html($(data).find('#top-right-corner').html());
							$('#top-right-responsive').html($(data).find('#top-right-responsive').html());
    						$('#small-cart').html($(data).find('#small-cart').html());
    					}
    				});
				}
			})
		}
		else
		{
			alert('Необходимо выбрать количество товара.');
		}

		return false;
	}

	function add2Basket(url, elementID, quantity, pickup)
	{
		pickup = pickup ? 'Y': 'N';

		if (quantity.quantity > 0 || Object.keys(quantity.sizes).length > 0)
		{
			$.ajax({
				url: url,
				type: 'POST',
				data: { 'elementID': elementID, 'quantity': quantity, 'pickup': pickup },
				dataType: 'JSON',
				success: function(data) {
                    animateProdToBasket(elementID);
                    $('div[data-rel=item-'+elementID+']').find('input.quantity-input').val(0);
                    $('div[data-rel=item-'+elementID+']').find('input.standart-quantity').val(0);
    				$.ajax({
    					url: '/',
    					success: function(data) {
							$('#krt_basket').html($(data).find('#krt_basket').html())
							$('#krt_orlink_basket').html($(data).find('#krt_orlink_basket').html())

							$('#top-right-corner').html($(data).find('#top-right-corner').html());
							$('#top-right-responsive').html($(data).find('#top-right-responsive').html());
    						$('#small-cart').html($(data).find('#small-cart').html());
    					}
    				});
				}
			})
		}
		else
		{
			alert('Необходимо выбрать количество товара.');
		}

		return false;
	}

	function add2RetailBasketBox(url, elementID, quantity)
	{
		if (quantity.quantity > 0 || Object.keys(quantity.sizes).length > 0)
		{
			$.ajax({
				url: url,
				type: 'POST',
				data: { 'elementID': elementID, 'quantity': quantity, 'retail': 'Y', 'box': 'Y'},
				dataType: 'JSON',
				success: function(data) {
					animateProdToBasket(elementID);
                    $('div[data-rel=item-'+elementID+']').find('input.quantity-input').val(0);
                    $('div[data-rel=item-'+elementID+']').find('input.standart-quantity').val(0);
    				$.ajax({
    					url: '/',
    					success: function(data) {
							$('#krt_basket').html($(data).find('#krt_basket').html())
							$('#krt_orlink_basket').html($(data).find('#krt_orlink_basket').html())

    						$('#top-right-corner').html($(data).find('#top-right-corner').html());
    						$('#small-cart').html($(data).find('#small-cart').html());
    					}
    				});
				}
			})
		}
		else
		{
			alert('Необходимо выбрать количество товара.');
		}

		return false;
	}

	function add2BasketBox(url, elementID, quantity, pickup)
	{
		pickup = pickup ? 'Y': 'N';

		if (quantity.quantity > 0 || Object.keys(quantity.sizes).length > 0)
		{
			$.ajax({
				url: url,
				type: 'POST',
				data: { 'elementID': elementID, 'quantity': quantity, 'pickup': pickup, 'box': 'Y'},
				dataType: 'JSON',
				success: function(data) {
					animateProdToBasket(elementID);
                    $('div[data-rel=item-'+elementID+']').find('input.quantity-input').val(0);
                    $('div[data-rel=item-'+elementID+']').find('input.standart-quantity').val(0);
    				$.ajax({
    					url: '/',
    					success: function(data) {
							$('#krt_basket').html($(data).find('#krt_basket').html())
							$('#krt_orlink_basket').html($(data).find('#krt_orlink_basket').html())

    						$('#top-right-corner').html($(data).find('#top-right-corner').html());
    						$('#small-cart').html($(data).find('#small-cart').html());
    					}
    				});
				}
			})
		}
		else
		{
			alert('Необходимо выбрать количество товара.');
		}

		return false;
	}

}();
