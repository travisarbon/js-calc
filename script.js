/**
 * Created by Travis on 7/20/2016.
 */
$(document).ready(function(){
    (function(){

        var calculator = {

            holdingArea : [],

            init : function(){
                this.cacheDOM();
                this.bindEvents();
            },

            cacheDOM : function(){
                this.$el = $("#calculator");
                this.$zero = this.$el.find("#zero");
                this.$one = this.$el.find("#one");
                this.$two = this.$el.find("#two");
                this.$three = this.$el.find("#three");
                this.$four = this.$el.find("#four");
                this.$five = this.$el.find("#five");
                this.$six = this.$el.find("#six");
                this.$seven = this.$el.find("#seven");
                this.$eight = this.$el.find("#eight");
                this.$nine = this.$el.find("#nine");
                this.$plus = this.$el.find("#plus");
                this.$minus = this.$el.find("#minus");
                this.$multiply = this.$el.find("#multiply");
                this.$divide = this.$el.find("#divide");
                this.$decimal = this.$el.find("#decimal");
                this.$clear = this.$el.find("#clear");
                this.$backspace = this.$el.find("#backspace");
                this.$sign = this.$el.find("#sign");
                this.$equals = this.$el.find("#equals");
                this.$display = this.$el.find("#display");
            },

            bindEvents : function(){
                this.$zero.on("click", {number : 0},  this.addNumber.bind(this));
                this.$one.on("click", {number : 1}, this.addNumber.bind(this));
                this.$two.on("click", {number : 2}, this.addNumber.bind(this));
                this.$three.on("click", {number : 3}, this.addNumber.bind(this));
                this.$four.on("click", {number : 4}, this.addNumber.bind(this));
                this.$five.on("click", {number : 5}, this.addNumber.bind(this));
                this.$six.on("click", {number : 6}, this.addNumber.bind(this));
                this.$seven.on("click", {number : 7}, this.addNumber.bind(this));
                this.$eight.on("click", {number : 8}, this.addNumber.bind(this));
                this.$nine.on("click", {number : 9}, this.addNumber.bind(this));
                this.$plus.on("click", {symbol : "+"}, this.addSymbol.bind(this));
                this.$minus.on("click", {symbol : "—"}, this.addSymbol.bind(this));
                this.$multiply.on("click", {symbol : "x"}, this.addSymbol.bind(this));
                this.$divide.on("click", {symbol : "/"}, this.addSymbol.bind(this));
                this.$decimal.on("click", {symbol : "."}, this.addDecimal.bind(this));
                this.$clear.on("click", {symbol : "."}, this.clearAll.bind(this));
                this.$backspace.on("click", {symbol : "."}, this.backspace.bind(this));
                this.$sign.on("click", this.changeSign.bind(this));
                this.$equals.on("click", this.compute.bind(this));
            },

            render : function(){
                var data = this.holdingArea.join(" ");
                this.$display.html(data);
            },

            addNumber : function(event){
                var patt = /[\+—\/x]/;
                if (typeof this.holdingArea[0] == "undefined"){
                    this.holdingArea.push(String(event.data.number));
                } else if (patt.test(this.holdingArea[this.holdingArea.length - 1])){
                    this.holdingArea.push(String(event.data.number));
                } else if (this.holdingArea[this.holdingArea.length - 1].length === 0){
                    this.holdingArea.push(String(event.data.number));
                } else if (this.holdingArea[this.holdingArea.length - 1].length > 0){
                    this.holdingArea[this.holdingArea.length - 1] = this.holdingArea[this.holdingArea.length - 1] + String(event.data.number);
                }
                this.render();
                console.log(this.holdingArea);
            },

            addSymbol : function(event){
                var patt = /[\+—\/x]/;
                if (patt.test(this.holdingArea[this.holdingArea.length - 1]) || typeof this.holdingArea[0] == "undefined"){
                    this.render();
                } else {
                    this.holdingArea.push(event.data.symbol);
                    this.render();
                }
            },

            addDecimal : function(event){
                var patt = /[\+—\/x.]/;
                if (patt.test(this.holdingArea[this.holdingArea.length - 1]) || typeof this.holdingArea[0] == "undefined"){
                    this.render();
                } else {
                    this.holdingArea[this.holdingArea.length - 1] = this.holdingArea[this.holdingArea.length - 1] + String(event.data.symbol);
                    this.render();
                }
            },

            changeSign : function(){
                var patt = /[\+—\/x]/;
                if (patt.test(this.holdingArea[this.holdingArea.length - 1]) || typeof this.holdingArea[0] == "undefined"){
                    this.render();
                } else if (this.holdingArea[this.holdingArea.length - 1].charAt(0) == "-") {
                    this.holdingArea[this.holdingArea.length - 1] = this.holdingArea[this.holdingArea.length - 1].slice(1);
                } else {
                    this.holdingArea[this.holdingArea.length - 1] = "-" + this.holdingArea[this.holdingArea.length - 1];
                }

                this.render();
            },

            clearAll : function(){
                this.holdingArea = [];
                this.render();
            },

            backspace : function(){
                this.holdingArea.pop();
                this.render();
            },

            compute : function(){
                var result = 0;
                while (this.holdingArea.length > 2){
                    if (this.holdingArea[1] === "+"){
                       result = parseFloat(this.holdingArea[0]) + parseFloat(this.holdingArea[2]);
                        this.holdingArea.splice(0, 3, result);
                    } else if (this.holdingArea[1] === "—"){
                        result = parseFloat(this.holdingArea[0]) - parseFloat(this.holdingArea[2]);
                        this.holdingArea.splice(0, 3, result);
                    } else if (this.holdingArea[1] === "x") {
                        result = parseFloat(this.holdingArea[0]) * parseFloat(this.holdingArea[2]);
                        this.holdingArea.splice(0, 3, result);
                    } else if (this.holdingArea[1] === "/") {
                        result = parseFloat(this.holdingArea[0]) / parseFloat(this.holdingArea[2]);
                        this.holdingArea.splice(0, 3, result);
                    }
                    this.render();
                }
            }

        };

        calculator.init();
    })();
});