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
                            <td style="vertical-align:middle;">
                            <a href="modal" data-toggle="modal" 
                            data-target="#modalmap" data-fecha="${data[index].Fecha}" data-rg="${data[index].RefGeografica}"
                            data-mag="${mg}" data-profu="${data[index].Profundidad}" 
                            data-lat="${data[index].Latitud}" data-long="${data[index].Longitud}"
                            href='javascript:;' 
                            onclick="getmapDetails(this);" 
                            role="button" style="vertical-align:middle; align:left;">
                            <font size=4>
                            ${data[index].Fecha}
                            </font>
                          </a> </td>
                           
                            
                           
                          <td style="vertical-align:middle;"><font size=4>${data[index].RefGeografica}</td>
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
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="margin-left: -20px; margin-right: -20px;">
        <a class="navbar-brand active" href="index.html">Ultimos Sismos</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" 
            data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
            aria-label="Toggle navigation">
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
    <div class="text-center">
     <img src="assests/img/chiletiembla.gif" class="rounded" alt="Chile Tiembla">
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
    document.getElementById("profundi").innerHTML=(profund)+` KM`
    
    let mapgoo = document.getElementById("mapa")
    mapgoo.innerHTML = `
    <div class="overlay" onclick="style.pointerEvents='none'" style="pointer-events: none;"></div>

    <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9246.031384335518!2d-5.862734799999997!3d54.5950456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xea73ef4e907baa09!2sJonny+Jordan+Freelance+Web+Design!5e0!3m2!1sen!2suk!4v1476298973059" width="100%" height="350" frameborder="0" style="border:0" allowfullscreen="">
    </iframe></p>
    `;
    
  }
 

