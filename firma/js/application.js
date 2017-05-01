/*$(document).ready(function(){
	//Obtener el canvasalert("ready");
	var movimientos = new Array();
	var pulsado;
	var c = $("#canvas");//alert("C "+c);
	var context = c.get(0).getContext('2d');
	var container = $(c).parent();

	$("#canvas").mousedown(function(e){
		pulsado = true;
		movimientos.push([e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false]);
		repaint();
	});

	$("#canvas").mousemove(function(e){
		if(pulsado){
			movimientos.push([e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true]);	
			repaint();
		}
	});

	$("#canvas").mouseup(function(e){
		pulsado = false;
	});

	$("#canvas").mouseleave(function(e){
		pulsado = false;
	});	

	//Llamar o correr funcion cuando el navegador se redimensione
	$(window).resize(respondCanvas);

	function respondCanvas(){
		c.attr('width', $(container).width());
		c.attr('height', $(container).height());
	}

	function repaint(){
		c.width = c.width;
		context.strokeStyle = "#0000a0";
		context.lineJoin = "round";
		context.lineWidth = 6;

		for (var i = 0 ; i < movimientos.length ; i++) {
			context.beginPath();
			if(movimientos[i][2] && i){
				context.moveTo(movimientos[i-1][0], movimientos[i-1][1]);
			}else{
				context.moveTo(movimientos[i][0], movimientos[i][1]);
			}
			context.lineTo(movimientos[i][0], movimientos[i][1]);
			context.closePath();
			context.stroke();
		}
	}

	//Llama inicial
	respondCanvas();
	repaint();
});*/

var app = angular.module('firmaapp', []);
//var url_server = "http://127.0.0.1:8080/";
var url_server = "http://192.168.0.102:8080/";

/*app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);*/

/*$(document).ready(function(){
	
});*/

app.controller('firmaCtrl', function($scope, $http){
//app.controller('firmaCtrl', function($scope, $http){
	//alert("probando en touch v02.999");
	/*Cargando lo de la FIRMA*/
	$("#intro").show();
	$("#data-user").hide();
	$("#signing").hide();
	//Para el Switch
	$("#ByCurp").show();
	$("#ByINE").hide();
	//Para la firma
	//Obtener el canvasalert("ready");
	var movimientos = new Array();
	var pulsado;
	var c = $("#canvas");//alert("C "+c);
	var context = c.get(0).getContext('2d');
	var container = $(c).parent();

	 $('#canvas').bind('touchstart',function(event){
          var e = event.originalEvent;
          e.preventDefault();
          pulsado = true;
          movimientos.push([e.targetTouches[0].pageX - this.offsetLeft,
              e.targetTouches[0].pageY - this.offsetTop,
              false]);
          repaint();
        });

        $('#canvas').bind('touchmove',function(event){
          var e = event.originalEvent;
          e.preventDefault();
          if(pulsado){
              movimientos.push([e.targetTouches[0].pageX - this.offsetLeft,
                e.targetTouches[0].pageY - this.offsetTop,
                true]);
        repaint();
        }
    });
    
    $('#canvas').bind('touchend',function(event){
        var e = event.originalEvent;
        e.preventDefault();
        pulsado = false;
    });
    
    $('#canvas').mouseleave(function(e){
        pulsado = false;
    });
    //repaint();

	/*$("#canvas").mousedown(function(e){
		pulsado = true;
		movimientos.push([e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false]);
		repaint();
	});

	$("#canvas").mousemove(function(e){
		if(pulsado){
			movimientos.push([e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true]);	
			repaint();
		}
	});

	$("#canvas").mouseup(function(e){
		pulsado = false;
	});

	$("#canvas").mouseleave(function(e){
		pulsado = false;
	});	*/

	//Llamar o correr funcion cuando el navegador se redimensione
	$(window).resize(respondCanvas);

	function respondCanvas(){
		c.attr('width', $(container).width());
		c.attr('height', $(container).height());
	}

	function repaint(){
		c.width = c.width;
		context.strokeStyle = "#0000a0";
		context.lineJoin = "round";
		context.lineWidth = 6;

		for (var i = 0 ; i < movimientos.length ; i++) {
			context.beginPath();
			if(movimientos[i][2] && i){
				context.moveTo(movimientos[i-1][0], movimientos[i-1][1]);
			}else{
				context.moveTo(movimientos[i][0], movimientos[i][1]);
			}
			context.lineTo(movimientos[i][0], movimientos[i][1]);
			context.closePath();
			context.stroke();
		}
	}

	//Llama inicial
	//respondCanvas();
	repaint();
	/*Fin de la CARGA*/

	$scope.mode = 0;//inicialmente es por CURP (0)......INE(1)
	//VERIFICAR QUE PASA CON EL ng-Change
	$scope.getByCurp = function(){
		$scope.user = {};
		$http.get(url_server+'apiu/getByCurp/'+$scope.LUSUCUR).then(function(response){
			if(response.data.status){
				$scope.LUSUCUR = "";
				$scope.user = response.data.data;
				$("#intro").hide();
				$("#data-user").show();
			}else{
				alert("No se encontro el Usuario con Curp "+$scope.LUSUCUR);
			}
		});
	}

	$scope.getByINE = function(){
		$scope.user = {};
		$http.get(url_server+'apiu/getByINE/'+$scope.LUSUINE).then(function(response){
			if(response.data.status){
				$scope.LUSUINE = "";
				$scope.user = response.data.data;
				$("#intro").hide();
				$("#data-user").show();
			}else{
				alert("No se encontro el Usuario con INE "+$scope.LUSUINE);
			}
		});
	}

	$scope.changeMode = function(){
		if($scope.mode == 0){//
			$scope.mode = 1;
			$("#ByCurp").hide();
			$("#ByINE").show();
		}else{
			$scope.mode = 0;
			$("#ByCurp").show();
			$("#ByINE").hide();
		}
	}

	$scope.firmOptions = function(option){
		if(option == 1){
			$("#btnConfirm").hide();
			$("#signing").show();
			respondCanvas();
		}
	}

	$scope.back = function(){
		$("#intro").show();
		$("#data-user").hide();
		$("#signing").hide();
	}

	$scope.again = function(){
		alert("again");
		//movimientos = new Array();
		//repaint();
	}

	/*$scope.saveFirma = function(){
		canvas = document.getElementById("canvas");
		alert("img "+canvas.toDataURL());
	}*/
	
	$scope.saveFirma = function(){
		canvas = document.getElementById("canvas");
		//alert("img "+canvas.toDataURL());
		var data = {
			id: $scope.user._id,
			LUSUFIR: canvas.toDataURL() 
		};
		$http.post(url_server+'apiu/addFirm', data ).then(function(response){
			if(response.data.status){
				alert("Firma enviada");
			}else{
				alert("Error al agregar la firma");
			}
		});
	}


});
