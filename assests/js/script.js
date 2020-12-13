addHeader()

function GetSismos() {
    $.ajax({
        type:"GET",
        url: `https://api.gael.cl/general/public/sismos`
        
        }).done(function(data){
            
            var tabla = document.getElementById("sismos");
            for (let index = 0; index < data.length; index++){
            
                var mg = parseFloat(data[index].Magnitud);
                
                if (mg < 4) {
                    tabla.innerHTML += `
                        <tr>
                            <td>${data[index].Fecha} </a></td>
                            <td>${data[index].RefGeografica}</td>
                            <td class="text-center"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" 
                            data-target="#modalmap" data-fecha="${data[index].Fecha}" data-rg="${data[index].RefGeografica}"
                            data-mag="${mg}" data-profu="${data[index].Profundidad}" 
                            data-lat="${data[index].Latitud}" data-long="${data[index].Longitud}"
                            onclick="getmapDetails(this)">Mapa</button>

                           
                          </td>

                            <td class="text-center">${mg}</td>
                            <td class="text-center">${data[index].Profundidad}</td>
                            <td class="text-center">${data[index].Latitud}</td>
                            <td class="text-center">${data[index].Longitud}</td>
                        </tr>
                        `
                }
                else {
                    if (mg >= 4 && mg <= 7) {
                        tabla.innerHTML += `
                        <tr>
                            <td>${data[index].Fecha} </a></td>
                            <td>${data[index].RefGeografica}</td>
                            <td class="text-center"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" 
                            data-target="#modalmap" data-fecha="${data[index].Fecha}" data-rg="${data[index].RefGeografica}"
                            data-mag="${mg}" data-profu="${data[index].Profundidad}" 
                            data-lat="${data[index].Latitud}" data-long="${data[index].Longitud}"
                            onclick="getmapDetails(this)">Mapa</button>

                           
                          </td>

                            <td class="text-center" style="color:yellow;">${data[index].Magnitud}</td>
                            <td class="text-center">${data[index].Profundidad}</td>
                            <td class="text-center">${data[index].Latitud}</td>
                            <td class="text-center">${data[index].Longitud}</td>
                        </tr>
                                `
                    }
                    else {
                        tabla.innerHTML += `
                        <tr>
                            <td>${data[index].Fecha} </a></td>
                            <td>${data[index].RefGeografica}</td>
                            <td class="text-center"><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" 
                            data-target="#modalmap" data-fecha="${data[index].Fecha}" data-rg="${data[index].RefGeografica}"
                            data-mag="${mg}" data-profu="${data[index].Profundidad}" 
                            data-lat="${data[index].Latitud}" data-long="${data[index].Longitud}"
                            onclick="getmapDetails(this)">Mapa</button>

                           
                          </td>

                          <td class="text-center" style="color:red;">${data[index].Magnitud}</td>
                            <td class="text-center">${data[index].Profundidad}</td>
                            <td class="text-center">${data[index].Latitud}</td>
                            <td class="text-center">${data[index].Longitud}</td>
                        </tr>
                                `
                        }
                    }
                }
        }).fail(function(error){
                            alert("Entró en el Fail de la llamada AJAX")
                            console.log(error);
        })
                        
    }

    if (document.getElementById("sismos")){
        GetSismos()
    }



  function addHeader() {
    let header = document.getElementById("cabeceraYNavbar")
    header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <a class="navbar-brand active" href="index.html">Ultimos Sismos</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="preparacion.html">°Preparacion para el proximo Terremoto</a>
                </li>
                
            </ul>
        </div>
    </nav>      
    
    <div class="container">
        <div class="row">
            <div class=" col1 col-12 col-sm-12 col-md-12">
                <img src="assests/img/chileTiembla.gif" class="rounded mx-auto d-block" alt="Chile Tiembla">
            </div>  
        </div>
    </div>
    `;
  }
  
 function getmapDetails(element){
    let magnitud = element.getAttribute("data-mag");
    let rg = element.getAttribute("data-rg");
    let lat = element.getAttribute("data-lat");
    let long = element.getAttribute("data-long");
    let fyh=element.getAttribute("data-fecha");
    let profund=element.getAttribute("data-profu");
  
    document.getElementById("ModalmaplLabel").innerHTML=(rg);
    document.getElementById("ModalmaplLabel2").innerHTML=(magnitud);
    document.getElementById("fecyhor").innerHTML=(fyh);
    document.getElementById("profundi").innerHTML=(profund)+` KM`;

    let mapgoo = document.getElementById("mapa")
    mapgoo.innerHTML = `
    <div class="mapouter">
        <div class="gmap_canvas">
            <iframe  height="360" width="280" id="gmap_canvas" 
                src="http://maps.google.com/maps?z=5&t=m&q=loc:${lat}+${long}&output=embed" 
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
        </div>
        <style>.mapouter{position:relative;text-align:right;height:360;width:280px;}.gmap_canvas 
        {overflow:hidden;background:none!important;height:360px;width:280px;}</style>
    </div>
    `;
}
