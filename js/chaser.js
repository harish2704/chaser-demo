//pads left
String.prototype.lpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
 
//pads right
String.prototype.rpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}

function shiftDesign( initialState, num ){
    this.num = num == null ? 1 : num;
    this.initialState = initialState.toString(2).lpad(0,10).split('');
    this.currentState = initialState.toString(2).lpad(0,10).split('');
}
shiftDesign.prototype.next = function(x) {
    for (var i = 0; i < this.num; i ++) {
        this.currentState.unshift (this.currentState.pop());
    }
    return this.currentState;
};


var interval = 200;
var initialState = 3;

var startRunner = function(){
    var shiftDesignObj = new shiftDesign( initialState, 2);
    function runner (){
        var cPattern = shiftDesignObj.next();
        cPattern.forEach( function(v, i ){
            $('.led' + i).attr({state:v})
        })
    }
    return setInterval( runner, interval);
}

var runnerId = null;
var stopRunner = function(){
    if ( runnerId != null ){
        clearInterval( runnerId );
    }
    return false;
}
var doRestart = function (){
    stopRunner();
    var form = document.forms.config;
    var newInitlaState = form.initialState.value;
    if ( newInitlaState != "" ){
        try {
            var tmp = parseInt( newInitlaState );
            if ( tmp != null ){
                initialState = tmp;
            }
        }
        catch (e){
            console.log( e );
        }
    }
    var newInterval = form.interval.value;
    if ( newInterval != "" ){
        try {
            var tmp = parseInt( newInterval );
            if ( tmp != null ){
                interval = tmp;
            }
        }
        catch (e){
            console.log( e );
        }
    }
    $('.led').attr({state:0});
    runnerId = startRunner();
    return false;
}


