/**
 * Created by alexproc on 07.01.2017.
 */

$(window).ready(function () {

    //Отправка данных на сервер
    $('#sendtStatic').click(function (event) {
        event.preventDefault();
//Аякс на запись данных в файл
        $.ajax({
            type:"POST",
            url:'server/add.php',
            dataType: "html",
            data: {
                name: username,
                score: qtFood
            },
            success: function (data) {
                $('.sendStatus').append('Отправленно').fadeOut(4000);
            }
        });
    });

  //  $('#getStatic').click(function (event) {
   ///     event.preventDefault();
    //    //Аякс получения данных
     //   $('.getStatus').load("server/get.php");
   //     $('.closeTable').show();
   // });
    //Получение данных с сервера
    $('#getStatic').click(function (event) {
        event.preventDefault();
        //Аякс получения данных
        $.post("server/get.php",
        function(data) {
            var getStat=$('.getStatus');
            getStat.empty();
            data.sort(function(a, b) {
                if (parseFloat(a['score']) > parseFloat(b['score'])) return 1;
                if (parseFloat(a['score']) < parseFloat(b['score'])) return -1;
            });
            var reverse=data.reverse();
            //Выравнивание масива по возрастанию
            for (var i=0; i<reverse.length; i++){
                getStat.append('<p>'+reverse[i]['name']+':'+ reverse[i]['score']+' очков'+'</p>').show();
                //a['name'] = unshift
            }
         },
         "json"
        );
        $('.closeTable').show();
    });

    $('.closeTable').click(function (event) {
        event.preventDefault();
        $('.getStatus').hide();
        $('.closeTable').hide();
    });

    var nameusers;
    var inputGetNames=$('#getName');
//Автозаполнение
    inputGetNames.click(function () {
        $.get("server/getuser.php",
        function (data) {
            nameusers=[];
            for (var i=0; i<data.length; i++){
                nameusers.push(data[i]['name']);
            }
            inputGetNames.autocomplete({
                source: nameusers
            });
        },
        "json")
    });

});
