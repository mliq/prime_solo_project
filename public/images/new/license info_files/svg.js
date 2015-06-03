/*************************************************************************/
/*************************************************************************/
/*	Instalacion: */
/*
	- Color Picker
	--------------
	<script type="text/javascript" src="jscolor.js"></script> 
	<input id="inputSelectColor" value="#000000" name="inputSelectColor" class="color {hash:true} box" onChange="changeInputcolor('#'+this.color);">

	- Colores favoritos
	-------------------
	<div class="favColors"></div>

	
	- Imagen SVG a modificar
	------------------------
	<img src="http://cdn.flaticon.com/svg/32/32441.svg"	 class="convertSvgInline" id="imgView" />

	- Formulario de descarga
	------------------------
    <form action="/download.php" id="sendImg" name="sendImg" method="POST">
        <input type="hidden" id="imgForm" name="imgForm" />
        <input type="hidden" id="imgName" name="imgName" />
    </form>

	- Botones de descarga
	---------------------
	<a href="javascript:void(0);" class="eventDownload" data-w="64" data-n="icon64">64x64</a>

*/
/*************************************************************************/
/*************************************************************************/


var ls = localStorage;


jQuery(document).ready(function() {	

	if (jQuery('#detail .wrapper').length > 0)
	{
		svgInline();
		paintFavColors();
	}
	
	jQuery('.eventDownload').click(function() { 		
		svg2png( {'width':jQuery(this).attr('data-w'), 'name':jQuery(this).attr('data-n')} ); 
	});

	jQuery('.colorBox').click(function() {

		$$("#divConvertSvg").style.height	= '256px';
		$$("#divConvertSvg").style.width	= '256px';

		// El id coincide con el HEX del color
		var c = jQuery(this).attr('id');

		// Coloco el color en el picker
		document.getElementById('inputSelectPngColor').value = '#'+c;
		document.getElementById('inputSelectPngColor').style.backgroundColor = '#'+c;
		document.getElementById('inputSelectBaseColor').value = '#'+c;
		document.getElementById('inputSelectBaseColor').style.backgroundColor = '#'+c;

		// Cambion el color al SVG
		changeSVGcolor('#'+c);	

		// Marco el color seleccionado	
		//jQuery(this).css('border-color','#000');
		jQuery(this).addClass('colorSelected');

	});

	$(".detail-down-icons-free .btng").on("click", function() {
		$$("#divConvertSvg").style.height	= '256px';
		$$("#divConvertSvg").style.width	= '256px';
	});


		
	// Duplicamos esta funcion para añadir dos campos
	$(".singleB64Download").on("click", function() {
	    		

	    elem = $$("#imgView");
	    id = elem.getAttribute('data-id');
	    kw = elem.getAttribute('data-kw');
	    
	    // Nuevo para SVG
		var width 		= jQuery(this).attr('data-w');
		var filename 	= jQuery(this).attr('data-n');
		
		download_size = this.getAttribute("rel");
		download_size = download_size[1];

	    acc = "base64";	

	    data = {};

	    // Para SVG, añadimos filename y width
	    data["i" + id] = {
	        "id": 		id,
	        "keyword": 	kw,
	        "filename": filename,
	        "width": 	width
	    };
	 
	    download_data = JSON.stringify(data);
	    	    
	    download_type = acc;
	    singleDownload = true;
	    displayModal(true);
	});


	$(".singlePngDownload").on("click", function() {

	    elem = $$("#imgView");


	    id = elem.getAttribute('data-id');
	    kw = elem.getAttribute('data-kw');
	      	    // Nuevo para SVG
		var width 		= jQuery(this).attr('data-w');
		var filename 	= jQuery(this).attr('data-n');



	    download_size = this.getAttribute("rel");
	    if (isNaN(download_size)) {
	        acc = download_size;
	        download_size = 4;
	        if (acc.length === 2) {
	            download_size = acc[1];
	            acc = "base64";
	        }
	    } else acc = "png";
	    data = {};
	    data["i" + id] = {
	        "id": 		id,
	        "keyword": 	kw,
	        "filename": filename,
	        "width": 	width
	    };
	    download_data = JSON.stringify(data);	 

	    download_type = acc;
	    singleDownload = true;
	    displayModal(true);
	});



	// Si no existe un color ya predefinido ponemos el negro
	if (typeof ls.color==='undefined' || ls.color=='')
	{
		ls.color = '#000000';
	}

		
});


function hidePngColors()
{
	if ( typeof document.documentMode!=='undefined' && (document.documentMode < 11) )
		{
			jQuery('#divChoosePngColor').hide();	
			changeSVGcolor('#000000');
		}
		else
		{
			changeSVGcolor(ls.color);	
		}
}

function hideBaseColors()
{
		
		if ( typeof document.documentMode!=='undefined'  )
		{
			jQuery('#divChooseBaseColor').hide();	

			changeSVGcolor('#000000');

		}
		else
		{
			changeSVGcolor(ls.color);
		}	
}

/**
* Reemplaza el svg por su contenido inline
*/
function svgInline()
{

	// Instancion las estructuras necesarias para trabajar
	
	var canvasSvg2Png = document.createElement("canvas");
	canvasSvg2Png.style.display = 'none';
	canvasSvg2Png.id = 'canvasSvg';

	var pngContanier = document.createElement("div");
	pngContanier.style.display = 'none';
	pngContanier.id = 'png-container';

	var divFavColors = $('.favColors');

	divFavColors.before(canvasSvg2Png);
	divFavColors.before(pngContanier);

	// Ponemos el color por defecto en el input
	document.getElementById('inputSelectPngColor').value = ls.color;
	document.getElementById('inputSelectPngColor').style.backgroundColor = ls.color;
	document.getElementById('inputSelectBaseColor').value = ls.color;
	document.getElementById('inputSelectBaseColor').style.backgroundColor = ls.color;	

	jQuery('.convertSvgInline').each(function(){ 
	 	var img 		= jQuery(this); 
	 	var imgID 		= img.attr('id'); 
	 	var imgClass 	= img.attr('class'); 
	 	var imgURL 		= img.attr('src'); 
	 	var dataId  	= img.attr('data-id');
	 	var dataKw 		= img.attr('data-kw');
	 	var widthImg	= 256;
	 	var scale 		= 1;

	 	$.ajax({
	 		global: false,
	 		url: imgURL,
	 		dataType: 'xml',
	 		success : function(data) { 
				// Get the SVG tag, ignore the rest var 
				svg = jQuery(data).find('svg'); 
			
				// Add replaced image's ID to the new SVG 
				if(typeof imgID !== 'undefined') 
				{ 
					svg = svg.attr('id', imgID); 
				} 
				// Add replaced image's classes to the new SVG 
				if(typeof imgClass !== 'undefined') 
				{ 
				 	svg = svg.attr('class', imgClass+' replaced-svg'); 

				 	var w 	= svg.attr('width');
				 	var h 	= svg.attr('height');

				 	if (typeof w === 'undefined' || w == '') w = '256px;';
				 	if (typeof h === 'undefined' || h == '') h = '256px;';


				 	w = w.substr(0,w.indexOf('px'));
				 	h = w.substr(0,h.indexOf('px'));
				 	scale 	= w/widthImg;
					h 		= parseInt(h/scale);		
					w 		= parseInt(w/scale);	

				 	svg.attr('width', w + 'px');
				 	svg.attr('height', h + 'px');
			 		if ( dataId != 'undefined' )
			 		{
			 			svg.attr('data-id',dataId );
						svg.attr('data-kw',dataKw );	
			 		}				 	

				} 
				// Remove any invalid XML tags as per http://validator.w3.org 
				svg = svg.removeAttr('xmlns:a'); 
				// Replace image with new SVG 
		 		img.replaceWith(svg); 


		 		// Recogemos el tamaño original del SVG, y lo asignamos al canvas

				var imgSource 	= document.getElementById('imgView');
				var rect 		= imgSource.getBoundingClientRect();

				var canvas 		= document.getElementById("canvasSvg");
				canvas.height 	= rect.height;
				canvas.width 	= rect.width;

		 	}
	 	});
	});	
}

/**
* Pinta la barra de colores favoritos
*/
function paintFavColors()
{
	var favColors 	= ['FFFFFF','F44336','E91E63','9C27B0','673AB7','3F51B5','2196F3','03A9F4','00BCD4','009688','4CAF50','8BC34A','CDDC39','FFEB3B','FFC107','FF9800','FF5722','795548','9E9E9E','607D8B','000000'];
	var gridFav = $(".favColors");

	for(id in favColors)
	{
		colorFavGrid = document.createElement("div");
    	colorFavGrid.className = "colorBox";
    	colorFavGrid.style.backgroundColor = '#'+favColors[id];
    	colorFavGrid.id = favColors[id];
    	
		gridFav.append(colorFavGrid);
	}  	
}
/**
* Cambia el color al SVG
*/
function changeInputcolor(color)
{
	ls.color = color;

	$$("#imgToCanvas").style.display 	= "none";
	$$("#imgView").style.display 		= "block";
	$$("#textIEbug").style.display 		= "none";	

	jQuery('.colorBox').removeClass('colorSelected');
	
	jQuery('#inputSelectBaseColor').addClass('colorSelected');
	jQuery('#inputSelectPngColor').addClass('colorSelected');
	
	$('#imgView path, #imgView polygon, #imgView line,#imgView polyline, #imgView circle, #imgView ellipse, #imgView rect').attr('style','');	
	$('#imgView').attr('fill',color);	
	
	
};

/**
* Cambia el color al SVG
*/
function changeSVGcolor(color)
{

	ls.color = color;

	$$("#imgToCanvas").style.display 	= "none";
	$$("#imgView").style.display 		= "block";
	$$("#textIEbug").style.display 		= "none";	

	jQuery('.colorBox, #inputSelectBaseColor').removeClass('colorSelected');
	jQuery('.colorBox, #inputSelectPngColor').removeClass('colorSelected');
	jQuery('#inputSelectBaseColor').val(color);	
	jQuery('#inputSelectPngColor').val(color);	

	$('#imgView path, #imgView polygon, #imgView line,#imgView polyline, #imgView circle, #imgView ellipse, #imgView rect').attr('style','');
	$('#imgView path, #imgView polygon, #imgView line,#imgView polyline, #imgView circle, #imgView ellipse, #imgView rect').attr('fill','');
	$('#imgView').attr('fill',color);	
	
};

/**
* Descarga el svg
*/
function svg2png()
{	

	var dd 			= JSON.parse(download_data);
	var key 		= Object.keys(dd);
	var index 		= key[0];
	var iconWidth 	= dd[key].width;
	var iconName 	= dd[key].filename;
	var iconType 	= dd[key].type;

	var imgSource 	= document.getElementById('imgView');

	imgSource.style.display ='block';

	var svgString 	= new XMLSerializer().serializeToString(imgSource);

	var canvas 		= document.getElementById("canvasSvg");
	canvas.height 	= iconWidth;
	canvas.width 	= iconWidth;

	var DOMURL 		= window.URL || window.webkitURL || window;
	
	var browser = detectBrowser();
	
	var svg;	

	var c = ls.color;
	var typeColor = 'Base64Color';
	if (download_type == 'png') typeColor = 'PngColor';

	_gaq.push(['_trackEvent', 'download', typeColor , c ]);


	if ( browser == 'Safari' ) 
	{
		svg	= new Blob([svgString], {type: "image/svg+xml"});
	}
	else
	{
		// Firefox OK, Chrome OK
		svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
	}

	var url 			= DOMURL.createObjectURL(svg);		

	//var pngImg 			= new Image();
	var pngImg = document.getElementById('imgToCanvas');

	if (browser == 'IE')
	{
		pngImg.onload = function() {
    
			if (download_type == "base64") 
			{ 		
				// Aqui no deberia de llegar
		    }

		    if (download_type == "png") 
		    {
				var width = 256;
				if (this.width > 256) {
					width = 512;
					jQuery('.zclip').css('top','657px');
				}
				else
				{
					jQuery('.zclip').css('top','401px');
				}
				
				$$("#divConvertSvg").style.height	= width+'px';
				$$("#divConvertSvg").style.width	= width+'px';
				$$("#imgToCanvas").style.display 	= "block";

				$$("#imgView").style.display 		= "none";
				$$("#textIEbug").style.display 		= "block";	
			}			
		}
		pngImg.style.display ='block';
	}
	else
	{
		pngImg.onload = function() {

			var ctx	= canvas.getContext("2d");

			ctx.drawImage(this, 0,0,this.width,this.height);	
			
			png	= canvas.toDataURL("image/png");

			document.getElementById('png-container').innerHTML = '<img src="'+png+'"/>';	

		    DOMURL.revokeObjectURL(png);	

			var png;			

			if (download_type == "base64") 
			{ 		
				var content = png.substr( png.indexOf(',')+1, png.length );


		        var b64css2 = b64css.replace("%%B64%%", content);        
		        var mime = "image/svg+xml";

		        b64css2 = b64css2.replace("%%MIME%%", 'image/png');
		        b64img2 = b64img.replace("%%B64%%", content);
		        
		        $$("#b64css").innerHTML = b64css2.replace(/%%SIZE%%/g, this.width);
		        $$("#b64Image").innerHTML = b64img2.replace("%%MIME%%", 'image/png');

		        $("#dialog-b64image").dialog("option", "title", lang.b64);
		        $("#dialog-b64image").dialog("open");

		       	$$("#svgVectorImg").style.display = "none";
		    }

		    if (download_type == "png") 
		    {
				$$("#imgToCanvas").style.display 			= "none";
				document.getElementById('imgForm').value 	= png;
		 		document.getElementById('imgName').value 	= iconName;

		 		document.getElementById('sendImg').submit();

		    }
		}

	}
		
	pngImg.onerror 		= msgError;	

	pngImg.src 			= url;		

	jQuery('#imgToCanvas').attr('height', iconWidth );
	jQuery('#imgToCanvas').attr('width', iconWidth );

	pngImg.type 		= iconType;
	pngImg.nameIcon		= iconName;
	pngImg.crossOrigin = 'anonymous';
	
	
};


/**
* Funcion para errores de eventos
*/
function msgError(message, lineno, filename)
{
	con( 'Error on ' + filename + ':' + lineno + '(' + message + ')' );
}

/**
* Debugger
*/
function con(msg)
{
	var debug = 1;
	if (debug == 1)	console.log(msg);
}


function detectBrowser() { 
    

    if(navigator.userAgent.indexOf("Chrome") != -1 ) 
    {
        return 'Chrome';
    }
    else if(navigator.userAgent.indexOf("Opera") != -1 )
    {
      	return 'Opera';
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
        return 'Firefox';
    }
    else if ( typeof document.documentMode!=='undefined' && (document.documentMode > 10) ) //IF IE > 10
    {
        return 'IE'; 
    }
    else if(navigator.userAgent.indexOf("Safari") != -1 ) 
    {
        return 'Safari';
    }
    else 
    {
        return navigator.userAgent;
    }
}
