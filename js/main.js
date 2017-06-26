/**
 * Created by alexproc on 29.12.2016.
 */
//Определим переменны
var defines = new Define();
var t1 = new Table('table1', defines.def['defRows'], defines.def['defCols']);
var go; //переменная для движения змейки
var i = 1; //Идентификатор - что нужно увеличивать змейку
var snakeX = [];
var snakeY = [];
var qtFood =0 ;//Количетво яблок - Wtite+

//_____________________________________
// Создание таблицы и задание и файл конфигурафии с параметрами

function Table(containerId, rows, cols, sizeCell) {

    this.containerId = containerId;
    this.rows = rows || sizeCell;
    this.cols = cols || sizeCell;
    this.sizeCell = sizeCell || 20;
    //Создание таблицы
    this.createTable = function() {
        var getIDtable = document.getElementById(this.containerId);
        getIDtable.style.width = this.cols * this.sizeCell + 'px';
        getIDtable.style.height = this.rows * this.sizeCell + 'px';
        var n = this.rows * this.cols;
        for (var i = 0; i < n; i++) {
            var div = document.createElement('div');
            div.className = 'cell';
            getIDtable.appendChild(div);
        }
    };
    this.setCell = function(row, col, value, color) {
        this.value = value;
        var ind = (row - 1) * this.cols + col - 1;
        var getIDtable = document.getElementById(this.containerId);
        var cell = getIDtable.children[ind];
        this.color = color;
        if (value == true) {
            cell.style.background = this.color;
        } else {
            cell.style.background = 'transparent';
        }
        //cell.className= (value ? 'cell on' : "cell");
    };
}
// переменные создание с помощью set  -- движение и один вызов
//_______________________________________________________________________________
function Square(row, col, course) {
    this.point = [row, col];
    this.course = course;
    this.create = function() {
        t1.setCell(this.point[0], this.point[1], true, 'red');
    };

    this.target = function(row, col, value, color) {
        t1.setCell(row, col, value, color);
    };

    this.gameOver = function() {
        if (this.point[0] <= 0 || this.point[1] <= 0 || this.point[0] > defines.def['defRows'] || this.point[1] > defines.def['defCols']) {
            clearInterval(go);
            $('#game_snake').css('pointer-events', 'auto');
            t1.setCell(this.oldvar[0], this.oldvar[1], false, 'red');
            defines.def1['defRow'] = defines.selfRandom(defines.def['defRow'], defines.def['defRows']);
            defines.def1['defCol'] = defines.selfRandom(defines.def['defCol'], defines.def['defCols']);
            //this.target(xfood,yfood,false,'green');
            $("div.cell").each(function(index) {
                $(this).css("background-color", "transparent");
            });
            //Очистим массив змейки
            snakeX = [];
            snakeY = [];
            $('#sendtStatic').css('pointer-events', 'auto');
            i = 1;//Начальное положение.
            $('h1').after("<div id='error' style='background-position: 10px center; background-repeat: no-repeat; padding:15px 10px 15px 50px; border: 1px solid;font-size:13px;font-family:Arial, Helvetica, sans-serif; margin: 20px auto; color: #D8000C; background-color: #FFBABA; background-image: url(img/error.png);'>Игра окончена. Вы проиграли.</div>");
            $('#error').fadeOut(3000);
            //alert('Игра окончена. Вы проиграли.');
            return false;
        } else {
            return true;
        }
    };


    this.repeat = function() {
        defines.def1['defRow'] = this.point[0];
        defines.def1['defCol'] = this.point[1];
        if (this.gameOver() == true) {
            if (getCell(defines.def1['defRow'], defines.def1['defCol'], 'green')) {
                i++;
                qtFood++;
                //НОВАЯ ЕДА
                this.x = defines.selfRandom(defines.def['defRow'], defines.def['defRows']);
                this.y = defines.selfRandom(defines.def['defCol'], defines.def['defCols']);
                this.target(this.x, this.y, true, 'green');
            } else {
                i = 0;
            }
            $("div.cell").each(function(index) {
                if ($(this).css("background-color") !== 'rgb(0, 128, 0)') {
                    $(this).css("background-color", "transparent");
                }
            });
            for (var n = 0; n < snakeX.length; n++) {
                t1.setCell(snakeX[n], snakeY[n], true, 'red');

            }
        }

    };
    //Направление
    //Движение --автоматизировать***
    this.flowRight = function() {
        this.oldvar = this.point.slice();
        this.point = [this.point[0], this.point[1] + 1];
        //обновить кардинаты
        snakeX.unshift(this.point[0]);
        snakeY.unshift(this.point[1]);
        // alert(i);
        if (i == 0) {
            snakeX.pop(this.point[0]);
            snakeY.pop(this.point[1]);
        }
        this.repeat();
    };
    this.flowLeft = function() {
        this.oldvar = this.point.slice();
        this.point = [this.point[0], this.point[1] - 1];
        //обновить кардинаты +
        snakeX.unshift(this.point[0]);
        snakeY.unshift(this.point[1]);
        if (i == 0) {
            snakeX.pop(this.point[0]);
            snakeY.pop(this.point[1]);
        }
        this.repeat();
    };

    this.flowTop = function() {
        this.oldvar = this.point.slice();
        this.point = [this.point[0] - 1, this.point[1]];
        //обновить кардинаты +
        snakeX.unshift(this.point[0]);
        snakeY.unshift(this.point[1]);
        if (i == 0) {
            snakeX.pop(this.point[0]);
            snakeY.pop(this.point[1]);
        }
        this.repeat();
    };

    this.flowDown = function() {
        this.oldvar = this.point.slice();
        this.point = [this.point[0] + 1, this.point[1]];
        //обновить кардинаты +
        snakeX.unshift(this.point[0]);
        snakeY.unshift(this.point[1]);
        if (i == 0) {
            snakeX.pop(this.point[0]);
            snakeY.pop(this.point[1]);
        }
        this.repeat();
    };

    //Определить курс
    this.startshow = function() {
        switch (this.course) {
            case 'left':
                this.flowLeft();
                break;
            case 'right':
                this.flowRight();
                break;
            case 'top':
                this.flowTop();
                break;
            case 'down':
                this.flowDown();
                break;
        }
    };
}
var dialog1 = function() {
    $('#table1').after("<div id='info2' style='background-position: 10px center; background-repeat: no-repeat; padding:15px 10px 15px 50px; border: 1px solid;font-size:13px;font-family:Arial, Helvetica, sans-serif; margin: 20px auto; color: #00529b; background-color: #bde5f8; background-image: url(img/info.png);'>Нажмите вверх-вниз, влево-вправо - клавиши со стрелками</div>");
    $('#info2').fadeOut(4000);
};
var dialog2 = function() {
    $('#table1').after("<div id='info1' style='background-position: 10px center; background-repeat: no-repeat; padding:15px 10px 15px 50px; border: 1px solid;font-size:13px;font-family:Arial, Helvetica, sans-serif; margin: 20px auto; color: #00529b; background-color: #bde5f8; background-image: url(img/info.png);'>Собирайте прямоуголиники. И не врезайтесь в стены и преграды.</div>");
    $('#info1').fadeOut(4000);
};

//Установка цели
function Target(row, col, color) {
    t1.setCell(row, col, true, color);
}

function getCell(row, col, color) {
    var ind = (row - 1) * 20 + col - 1;
    var getIDtable = document.getElementById('table1');
    var cell = getIDtable.children[ind];
    if (cell.style.background == color) {
        return true;
    } else {
        return false;
    }
}

//Вывод
$(document).ready(function() {

    t1.createTable();
    $('#game_snake').click(function(event) {
        //start
        $('#game_snake').css('pointer-events', 'none');
        var squr = new Square(defines.def1['defRow'], defines.def1['defCol'], 'right');
        event.preventDefault();
        squr.create();
        dialog1();
        setTimeout(dialog2, 4000);
        squr.target(defines.xAny, defines.yAny, true, 'green');
        document.onkeydown = function(e) {
            clearInterval(go);
            if ($('#game_snake').css('pointer-events') == 'none') {
                switch (e.keyCode) {
                    // если нажата клавиша влево
                    case 37:
                        squr = new Square(defines.def1['defRow'], defines.def1['defCol'], 'left');
                        break;
                    // если нажата клавиша вверх
                    case 38:
                        squr = new Square(defines.def1['defRow'], defines.def1['defCol'], 'top');
                        break;
                    // если нажата клавиша вправо
                    case 39:
                        squr = new Square(defines.def1['defRow'], defines.def1['defCol'], 'right');
                        break;
                    // если нажата клавиша вниз
                    case 40:
                        squr = new Square(defines.def1['defRow'], defines.def1['defCol'], 'down');
                        break;
                }
                squr.gameOver();
                go = setInterval(squr.startshow.bind(squr), defines.getSpeed());
            }
        };
    });
    $('#game_off').click(function(event) {
        event.preventDefault();
        location.reload();
    });

});