
/*Test Object*/
var testData = 
{ 
    "values" : 
                [
                    { "name": "first", "value" : 352, "color" : "", "angleRad": ""},
                    { "name": "second", "value" : 120, "color" : "", "angleRad": ""},
                    { "name": "third", "value" : 120, "color" : "", "angleRad": ""},
                    { "name": "fourth", "value" : 60, "color" : "", "angleRad": ""},
                    { "name": "fifth", "value" : 47, "color" : "", "angleRad": ""},
                    { "name": "sixth", "value" : 15, "color" : "", "angleRad": ""},
                    { "name": "seventh", "value" : 39, "color" : "", "angleRad": ""},
                    { "name": "eighth", "value" : 84, "color" : "", "angleRad": ""}
                ]
};

/**
 * Round diagramm
 */
var roundDiagram = function(canvas, data){

     /**
     * Variables
     */
    this.data = data;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.cw = canvas.width;
    this.ch = canvas.height;
    /**
     * Initiate. Приготовить объект для отрисовки:
     */
    this.init = function(){
        
         var summValue = 0;       
         this.data["values"].forEach(element => {
            summValue += element["value"];   
         });
        //прописываем рандомные цвета и углы в радианах
        this.data["values"].forEach(element => {
            element["color"] = 'rgba('+ Math.floor(Math.random()* 255) + ',' + Math.floor(Math.random()* 255) + ',' + Math.floor(Math.random()* 255) + ', 0.5)';
            element["angleRad"] = ((element["value"] / summValue) * 360) * Math.PI / 180;  
        });
    }

    /**
     * Animate
     */
    this.animate = function(progress)
    {
       // для каждого объёма вычислить угол
       
          var nextAngleStart = 0;

                this.ctx.clearRect(0,0, this.cw,this.ch);
          this.data["values"].forEach(element => {
                this.ctx.fillStyle = element["color"];
                this.ctx.beginPath();
                this.ctx.moveTo(this.cw / 2, this.ch / 2);
                this.ctx.arc(this.cw / 2, this.ch / 2 , this.cw / 3, nextAngleStart, nextAngleStart + element["angleRad"] * progress,false);
                this.ctx.lineTo(this.cw / 2, this.ch / 2);
                this.ctx.fill();
            
             nextAngleStart += element["angleRad"];
       });       
    }

    this.drawTitle = function(){
        //получить количество элементов, от него рассчитать координаты рискования каждого названия
        var koef = 30;
        var length = this.data["values"].length * koef ;
         
            this.ctx.textBaseline = "middle";
            this.ctx.font = "14px Times"
         
        for(var i=0; i< this.data["values"].length; i++ ){
                this.ctx.fillStyle = 'black';
                this.ctx.beginPath();
                // сместить всё на половину высоты всего столбца
                this.ctx.fillText(this.data["values"][i]["name"],350, this.ch / 2 - length / 2 + i * koef + koef/2, 100);
                this.ctx.fillStyle = this.data["values"][i]["color"];
                this.ctx.fillRect(335, this.ch / 2 - length / 2 + i * koef + koef/2 - 5, 10,10);
        }
     
        
    }
}

var canvasAllowble = function(){
    var element = document.createElement("canvas");
    return  !!(element.getContext || element.getContext("2d"));
}


if(canvasAllowble){
    var c = document.createElement("canvas");
    c.width = 400;
    c.height = 400;
    document.body.appendChild(c);
    var ctx = c.getContext("2d");
    var diag = new roundDiagram(c, testData);


    diag.init();

    var requestAnimationFrame = window.requestAnimationFrame;
    var progress = 0 ; //0 -> 1
    function step(start){
            progress += 0.05;
            diag.animate(progress); 
            diag.drawTitle();      
            if(progress >= 1){
                cancelAnimationFrame(requestAnimationFrame);
                return;  
            }
            requestAnimationFrame(step, c);
        }
    requestAnimationFrame(step);
}


