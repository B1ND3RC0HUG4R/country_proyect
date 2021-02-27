//Funcion para listar los paises por criterio de busqueda
function type_text(value1){
    document.getElementById("result_list").innerHTML= "";
    document.getElementById("out_search").innerHTML= "";
    if(value1.length>=3){
        var request = "https://restcountries.eu/rest/v2/name/"+value1;
        fetch(request)
        .then(function(response) {
            return response.json();
        }).then(function(result) {
            var salida = "";
            if(!result["status"]){
                for (const prop in result) {
                    salida += `<div id='lista'> ${result[prop]["name"]}</div><br/>`
                }
            }else{
                salida = "<div id='lista'>Ups! Not found results. </div>";
            }
            document.getElementById("result_list").innerHTML= salida;
        })
    }
}
//Funcion para mostrar la información de los paises
function show_result(){
    document.getElementById("out_search").innerHTML= "";
    var variable = document.getElementById("search").value;
    if(variable == ""){
        alert("¡Please add information to start the search!");
    }else{
        var request = "https://restcountries.eu/rest/v2/name/"+variable;
        fetch(request)
            .then(function(response) {
                return response.json();
            }).then(function(result) {
                var out_search = lenguage = money = "";
                console.log(result)
                if(!result["status"]){
                    for (const prop in result) {
                        for(const propl in result[prop]["languages"]){
                            lenguage += result[prop]["languages"][propl]["name"] + "|";
                        }
                        for(const prop2 in result[prop]["currencies"]){
                            money += result[prop]["currencies"][prop2]["name"] + "|";
                        }
                        out_search += `<div id='out_list'>
                                <ul id='list_country'>
                                    <li id="separador"> Pa&iacute;s: ${result[prop]["name"]} </li> 
                                    <li id="separador"> Regi&oacute;n: ${result[prop]["region"]} </li>
                                    <li id="separador"> Moneda: ${money} </li>
                                    <li id="separador"> Idioma: ${lenguage} </li>
                                    <li id="separador"> Poblaci&oacute;n: ${result[prop]["population"]} </li>
                                </ul>
                            </div><br/>`
                    }
                }else{
                    out_search = "<div id='out_list_error'>Ups! Not found results. </div>";
                }
                document.getElementById("out_search").innerHTML= out_search;
            })
    }
}