/**
 * Created by alexproc on 29.12.2016.
 */
//Константы
function Define() {


    this.selfRandom = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    //Размер поля
    this.getField = function() {
        switch ($(".field option:selected").val()) {
            case '10':
                this.field = 10;
                break;
            case '20':
                this.field = 20;
                break;
            case '25':
                this.field = 25;
                break;
            default:
                this.field = 20;
                break;
        }
        return this.field;
    };


    this.def = {
        'defRow': 1,
        'defCol': 1,
        'defRows': this.getField(),
        'defCols': this.getField()
    };
    this.x = this.selfRandom(this.def['defRow'], this.def['defRows']);
    this.y = this.selfRandom(this.def['defCol'], this.def['defCols']);
    this.def1 = {
        'defRow': this.x,
        'defCol': this.y
    };

    this.xAny = this.selfRandom(this.def['defRow'], this.def['defRows']);
    this.yAny = this.selfRandom(this.def['defCol'], this.def['defCols']);
    this.def1any = {
        'defRow': this.xAny,
        'defCol': this.yAny
    };

    //Скорость игры
    this.getSpeed = function() {
        switch ($(".level option:selected").val()) {
            case '1':
                this.speed = 200;
                break;
            case '2':
                this.speed = 150;
                break;
            case '3':
                this.speed = 100;
                break;
            default:
                this.speed = 200;
                break;
        }
        return this.speed;
    };

}