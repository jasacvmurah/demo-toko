<script type='text/javascript'>
$(window).bind('load', function() {
    $.each(dataOrder, function(key, value) {
        var ifAvaURL = '//lh3.googleusercontent.com/-QlJpOYV6yF4/XNEPty8zjJI/AAAAAAAAF6k/7RaA8suy7AsVhOYwcP6WLMf2qc54GUXWwCEwYBhgL/h60/ava.png';
        if (value.avaURL != '') {
            ifAvaURL = value.avaURL;
        }
        $('\
<div class="item" datetime="' + value.time + '">\
<span class="avaURL" style="background-image:url(' + ifAvaURL + ');"></span>\
<h5><a class="closeliveSales_widget" href="javascript:void(0);"><i class="icon ion-ios-close"></i></a></h5>\
<span class="infoOrder">\
<b>' + key + '</b> telah membuat <a href="' + value.templateURL + '" target="_blank">' + value.template + '</a>\
<small><a href="' + value.screenshotURL + '" class="lightbox viewliveSales_widget" title="- Bukti Transfer dari ' + key + '"><i class="icon ion-ios-search"></i>cek testimoni</a><i class="icon ion-md-pricetag"></i> <time class="timeago postingTime" datetime="' + value.time + '"></time></small>\
    </span>\
    </div>\
').appendTo('.liveSales_widget');
    });
    $(".liveSales_widget > .item:gt(0)").removeClass('active');
    setInterval(function() {
        $('.liveSales_widget > .item:first').removeClass('active')
        setTimeout(function() {
            $('.liveSales_widget > .item:first').next().addClass('active').end().appendTo('.liveSales_widget');
        }, 4000);
    }, 8000);
});
$(document).on('click', '.liveSales_widget .closeliveSales_widget', function() {
    $(this).parents('.item').addClass('hidden');
});

      var cekMobile = false;
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        cekMobile = true;
      }
      function timeAgo(timeStamp) {
        var previous = new Date(timeStamp);
        var current = new Date();
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        var ago = 'lalu';
        var elapsed = current - previous;
        if (elapsed < msPerMinute) {
          return Math.round(elapsed/1000) + ' detik ' + ago;   
        }
        else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPerMinute) + ' menit ' + ago;   
        }
        else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour ) + ' jam ' + ago;   
        }
        else if (elapsed < msPerMonth) {
          return Math.round(elapsed/msPerDay) + ' hari ' + ago;   
        }
        else if (elapsed < msPerYear) {
          return Math.round(elapsed/msPerMonth) + ' bulan ' + ago;   
        }
        else {
          return Math.round(elapsed/msPerYear ) + ' tahun ' + ago;   
        }
      }
      $('.comment .datetime').each(function(){
        var timestamp = $(this).find('a').text();
        $(this).find('a').text(timeAgo(timestamp));
      });
      $(window).bind('load',function(){
        $('.timeago').each(function(){
          var timestamp = $(this).attr('datetime');
          $(this).text(timeAgo(timestamp));
        });
      });
      //]]>
    </script>
