$(function () {
  "use strict";

  // Fixed Sidebar
  $(document).ready(function(){
    $(window).scroll(function () {   
     if($(window).scrollTop() > 200) {
        $('.cat-sidebar').css('position','fixed');
        $('.cat-sidebar').css('top','0'); 
     }
     else if ($(window).scrollTop() <= 200) {
        $('.cat-sidebar').css('position','');
        $('.cat-sidebar').css('top','');
     } 
     if ($('.cat-sidebar').offset().top + $(".cat-sidebar").height() > $("#footer").offset().top) {
          $('.cat-sidebar').css('top',-($(".cat-sidebar").offset().top + $(".cat-sidebar").height() - $("#footer").offset().top));
        }
    });
  });

  /*!
  * jQuery Cookie Plugin v1.4.1
  * https://github.com/carhartl/jquery-cookie
  */
  (function(factory) {
      if (typeof define === 'function' && define.amd) {
          // AMD
          define(['jquery'], factory);
      } else if (typeof exports === 'object') {
          // CommonJS
          factory(require('jquery'));
      } else {
          // Browser globals
          factory(jQuery);
      }
  }(function($) {
      var pluses = /\+/g;
      function encode(s) {
          return config.raw ? s : encodeURIComponent(s);
      }
      function decode(s) {
          return config.raw ? s : decodeURIComponent(s);
      }
      function stringifyCookieValue(value) {
          return encode(config.json ? JSON.stringify(value) : String(value));
      }
      function pakrtookieValue(s) {
          if (s.indexOf('"') === 0) {
              // This is a quoted cookie as according to RFC2068, unescape...
              s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
          }
          try {
              // Replace server-side written pluses with spaces.
              // If we can't decode the cookie, ignore it, it's unusable.
              // If we can't parse the cookie, ignore it, it's unusable.
              s = decodeURIComponent(s.replace(pluses, ' '));
              return config.json ? JSON.parse(s) : s;
          } catch (e) {}
      }
      function read(s, converter) {
          var value = config.raw ? s : pakrtookieValue(s);
          return $.isFunction(converter) ? converter(value) : value;
      }
      var config = $.cookie = function(key, value, options) {
          // Write
          if (value !== undefined && !$.isFunction(value)) {
              options = $.extend({}, config.defaults, options);
              if (typeof options.expires === 'number') {
                  var days = options.expires,
                      t = options.expires = new Date();
                  t.setTime(+t + days * 864e+5);
              }
              return (document.cookie = [
                  encode(key), '=', stringifyCookieValue(value),
                  options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                  options.path ? '; path=' + options.path : '',
                  options.domain ? '; domain=' + options.domain : '',
                  options.secure ? '; secure' : ''
              ].join(''));
          }
          // Read
          var result = key ? undefined : {};
          // To prevent the for loop in the first place assign an empty array
          // in case there are no cookies at all. Also prevents odd result when
          // calling $.cookie().
          var cookies = document.cookie ? document.cookie.split('; ') : [];
          for (var i = 0, l = cookies.length; i < l; i++) {
              var parts = cookies[i].split('=');
              var name = decode(parts.shift());
              var cookie = parts.join('=');
              if (key && key === name) {
                  // If second argument (value) is a function it's a converter...
                  result = read(cookie, value);
                  break;
              }
              // Prevent storing a cookie that we couldn't decode.
              if (!key && (cookie = read(cookie)) !== undefined) {
                  result[name] = cookie;
              }
          }
          return result;
      };
      config.defaults = {};
      $.removeCookie = function(key, options) {
          if ($.cookie(key) === undefined) {
              return false;
          }
          // Must not alter options, thus extending a fresh object...
          $.cookie(key, '', $.extend({}, options, {
              expires: -1
          }));
          return !$.cookie(key);
      };
  }));

  // easycart
  var krt_MODULE_IS_HERE = true,
      krt_BX_COOKIE_PREFIX = 'BITRIX_SM_',
      krt_flag_tension_line = false,
      krt_ec_start_coordY = 0,
      krt_ec_start_height;

  function krt_SetHeight() {
      var defaultHeight = 200,
          savedHeight = parseInt($.cookie(krt_BX_COOKIE_PREFIX + 'krt_HEIGHT'));
      var maxHeight = $('#krt_sticky').find('.krt.krt_headers').offset().top - window.pageYOffset - 50;
      if (savedHeight > 50) {
          if (savedHeight < maxHeight) {
              $('#krt_sticky').find('.krt_content .krt_tabs').css({
                  'height': savedHeight + 'px'
              });
          }
      } else {
          $('#krt_sticky').find('.krt_content .krt_tabs').css({
              'height': defaultHeight + 'px'
          });
      }
  }
  function krt_HideEasyCart() {
      $('#krt_sticky').find('.krt_content').removeClass('open');
      $('#krt_sticky').find('.krt_tab').removeClass('selected');
      $('#krt_sticky').find('.krt_changer').removeClass('selected');
  }
  function krt_SwitchTab($link) {
      var wasOpened = $('#krt_sticky').find('.krt_content').hasClass('open');
      var tabWasOpened = $($link.attr('href')).hasClass('selected');
      krt_SetHeight();
      if (wasOpened && tabWasOpened) {
          krt_HideEasyCart();
      } else if (wasOpened && !tabWasOpened) {
          $('#krt_sticky').find('.krt_tab').removeClass('selected');
          $($link.attr('href')).addClass('selected');
          $('#krt_sticky').find('.krt_changer').removeClass('selected');
          $link.addClass('selected');
          $('#krt_sticky').find('.krt_content').addClass('open');
      } else {
          $('#krt_sticky').find('.krt_tab').removeClass('selected');
          $($link.attr('href')).addClass('selected');
          $('#krt_sticky').find('.krt_changer').removeClass('selected');
          $link.addClass('selected');
          $('#krt_sticky').find('.krt_content').addClass('open');
      }
  }
  $(document).ready(function() {
      // easycart is here
      krt_MODULE_IS_HERE = true;
      // add padding for body
      if ($('#krt_sticky').hasClass('addbodypadding')) {
          $('body').css('padding-bottom', '40px');
      }
      // tab switcher
      $(document).on('click', '#krt_sticky .krt_headers .krt_changer', function() {
          krt_SwitchTab($(this));
          return false;
      });
      // close by outside click
      $(document).on('click', function(e) {
          if ($(e.target).parents('#krt_sticky').length > 0) {
          } else {
              krt_HideEasyCart();
          }
      });
      // close by close button
      $(document).on('click', '#krt_sticky a.krt_close', function(e) {
          krt_HideEasyCart();
          return false;
      });
      // easycart resize
      $(document).on('mousedown', '.krt_tyanya', function(e) {
          krt_flag_tension_line = true;
          $('html').addClass('krt_disableSelection');
          krt_ec_start_coordY = e.pageY;
          krt_ec_start_height = $('#krt_sticky').find('.krt_tabs').height();
      });
      $(document).on('mouseup', function() {
          if (krt_flag_tension_line) {
              krt_flag_tension_line = false;
              $('html').removeClass('krt_disableSelection');
          }
      });
      $(document).mousemove(function(e) {
          var krt_ec_cur_height = $('#krt_sticky').find('.krt_tabs').height();
          if (krt_flag_tension_line && (krt_ec_start_height + krt_ec_start_coordY - e.pageY) > 100) {
              $.cookie(krt_BX_COOKIE_PREFIX + 'krt_HEIGHT', (krt_ec_start_height + krt_ec_start_coordY - e.pageY), '/');
              krt_SetHeight();
          }
      });
      // quantity
      $(document).on('click', '#krt_sticky .krt_minus', function() {
          var $btn = $(this);
          var ratio = parseFloat($btn.parent().find('.krt_quantity').data('ratio'));
          var ration2 = ratio.toString().split('.', 2)[1];
          var length = 0;
          if (ration2 !== undefined) {
              length = ration2.length;
          }
          var val = parseFloat($btn.parent().find('.krt_quantity').val());
          if (val > ratio) {
              $btn.parent().find('.krt_quantity').val((val - ratio).toFixed(length));
              $btn.parent().find('.krt_quantity').trigger('change');
          }
          return false;
      });
      $(document).on('click', '#krt_sticky .krt_plus', function() {
          var $btn = $(this);
          var ratio = parseFloat($btn.parent().find('.krt_quantity').data('ratio'));
          var ration2 = ratio.toString().split('.', 2)[1];
          var length = 0;
          if (ration2 !== undefined) {
              length = ration2.length;
          }
          var val = parseFloat($btn.parent().find('.krt_quantity').val());
          $btn.parent().find('.krt_quantity').val((val + ratio).toFixed(length));
          $btn.parent().find('.krt_quantity').trigger('change');
          return false;
      });
      $(document).on('blur', '#krt_sticky .krt_quantity', function() {
          var $input = $(this);
          var ratio = parseFloat($input.data('ratio'));
          var ration2 = ratio.toString().split('.', 2)[1];
          var length = 0;
          if (ration2 !== undefined) {
              length = ration2.length;
          }
          var val = parseFloat($input.val());
          if (val > 0) {
              $input.val((ratio * (Math.floor(val / ratio))).toFixed(length));
          } else {
              $input.val(ratio);
          }
      });
      $(document).on('mouseenter', '#krt_sticky .krt_quantity', function() {
          $('html').addClass('krt_disableSelection');
      }).on('mouseleave', '#krt_sticky .krt_quantity', function() {
          $('html').removeClass('krt_disableSelection');
      });
  });

	// Header Mobile Menu
	// const krtbtn = document.querySelector("#main-responsive-menu-btn"); 
	
	// $("#main-responsive-menu-btn").click(function() {
	// 	$("#responsive-menu").toggleClass('open');
	// });
	
	// $(document).on("click", function (e) { 
	// 	if (e.target !== krtbtn) 
	// 	$("#responsive-menu").removeClass("open");
	// }); 

    const $menuU = $('.navtop');


    
    $("#main-responsive-menu-btn").click(function() {
      $menuU.toggleClass('is-active');
    });

    $(document).mouseup(e => {
    if ($menuU.is(e.target) || $menuU.has(e.target).length === 0)
        {
            $menuU.removeClass('is-active');
        }
    });
    

    // Sidebar Mobile Menu
    // const krtbtnsidebar = document.querySelector("#category-menu-toggle"); 
    // $("#category-menu-toggle").click(function() {
	// 	$("#bs-example-navbar-collapse-1").toggleClass('open');
	// });

});