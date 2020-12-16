if (document.getElementById("cabeceraYNavbar")){
    addHeader()
}


function GetSismos() {
    $.ajax({
        type:"GET",
        url: `https://api.gael.cl/general/public/sismos`
        
        }).done(function(data){
            
            var tabla = document.getElementById("sismos");
            for (let index = 0; index < data.length; index++){
            
                var mg = (parseFloat(data[index].Magnitud)).toFixed(1);
                let cadenaMagnitud="";
                if (mg < 4) {
                    cadenaMagnitud=`<td style="vertical-align:middle;" align="center"><font size=5>${mg}</font></td>`
                    } 
                    else {
                    if (mg >= 4 && mg < 6) {
                        cadenaMagnitud= `<td style="vertical-align:middle; color:yellow;" align="center" class="fs-1"><font size=5>${mg}</font></td>`
                    } 
                        else {
                            cadenaMagnitud= `<td style="vertical-align:middle; color:red;" align="center" class="fs-1"><font size=5>${mg}</font></td>`
                        }
                    } 


                tabla.innerHTML += `
                        <tr>
                            <td style="vertical-align:middle;">${data[index].Fecha} </a></td>
                            
                            <td style="vertical-align:middle; margin-right" align="center">

                            <a class="btn btn-primary btn-sm m-1 pt-1 pb-1" data-toggle="modal" 
                            data-target="#modalmap" data-fecha="${data[index].Fecha}" data-rg="${data[index].RefGeografica}"
                            data-mag="${mg}" data-profu="${data[index].Profundidad}" 
                            data-lat="${data[index].Latitud}" data-long="${data[index].Longitud}"
                            href='javascript:;' 
                            onclick="getmapDetails(this);" 
                            role="button" style="vertical-align:middle; align:left;">
                            mapa
                          </a> </td>
                          <td style="vertical-align:middle;">${data[index].RefGeografica}</td>
                            ${cadenaMagnitud}
                            <td style="vertical-align:middle;" align="center" class="text-center priority-4" >${data[index].Profundidad}</td>
                            <td style="vertical-align:middle;" align="center" class="text-center priority-5" >${data[index].Latitud}</td>
                            <td style="vertical-align:middle;" align="center" class="text-center priority-5" >${data[index].Longitud}</td>
                        </tr>
                        `
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
                    <a class="nav-link" href="preparacion.html">Chile Tiembla y estoy preparado ;)</a>
                </li>
                
            </ul>
        </div>
    </nav>      
    <div>
     <img src="assests/img/chiletiembla.gif" class="img-fluid" alt="Chile Tiembla">
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
                src="https://maps.google.com/maps?z=7&t=m&q=loc:${lat}+${long}&output=embed" 
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
        </div>
        <style>.mapouter{position:relative;text-align:right;height:360;width:280px;}.gmap_canvas 
        {overflow:hidden;background:none!important;height:360px;width:280px;}</style>
    </div>
    `;
}

