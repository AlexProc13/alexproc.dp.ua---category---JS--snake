/**
 * Created by alexproc on 02.01.2017.
 */
var username;//ИМЯ ПОЛЬЗОВАТЕЛЯ - Wtite+

//При открытии страницы;
$(document).ready(function() {

    //Определим переменные;
    var getInput = $(":text:first");

    $("a:first").click(function(event) {
        event.preventDefault();
        if (getInput.val().length >= 3) {
            username = getInput.val();
            $('.authorization').hide();
            //Открыть блок с приветствием
            $('.greeting').show();
            $('.config').show();
            $('.all').show();
            $('.ajax').show();
            $('.config  img').css({
                'width': '40px',
                'height': '40px'
            });
            $('.greeting > p').html('<b>Удачной игры, ' + username + '</b>');
            $('h1').after("<div id='info' style='background-position: 10px center; background-repeat: no-repeat; padding:15px 10px 15px 50px; border: 1px solid;font-size:13px;font-family:Arial, Helvetica, sans-serif; margin: 20px auto; color: #00529b; background-color: #bde5f8; background-image: url(img/info.png);'>Вы точно выграете!!<script>  </script> </div>");
            $('#info').fadeOut(3000);
        } else {
            $('h1').after("<div id='error' style='background-position: 10px center; background-repeat: no-repeat; padding:15px 10px 15px 50px; border: 1px solid;font-size:13px;font-family:Arial, Helvetica, sans-serif; margin: 20px auto; color: #D8000C; background-color: #FFBABA; background-image: url(img/error.png);'>Ошибка. Минимальный размер 3 символа.</div>");
            $('#error').fadeOut(3000);
        }
    });
    //Всплывающее модальное окно
    var modalWindow1 = function() {
        $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
            function() { // пoсле выпoлнения предъидущей aнимaции
                $('#modal_form')
                    .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
                    .animate({
                        opacity: 1,
                        top: '50%'
                    }, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
            });
    };
    //Всплывающее модальное окно ч2
    var modalWindow2 = function() {
        $('#modal_form')
            .animate({
                    opacity: 0,
                    top: '45%'
                }, 200, // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                function() { // пoсле aнимaции
                    $(this).css('display', 'none'); // делaем ему display: none;
                    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                }
            );
    };

    //Всплывающее модальное окно при нажатии натсроек

    $('a[name=sitting]').click(function(event) {
        event.preventDefault(); // выключaем стaндaртную рoль элементa
        modalWindow1();
    });
    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $('#modal_close, #overlay').click(function() { // лoвим клик пo крестику или пoдлoжке
        modalWindow2();
    });
    //Двигать

});