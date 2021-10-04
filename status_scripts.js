/*Update values*/
var  temperature_values;
async function updateValues() {
    await fetch(window.location.href + 'values', {
        method: 'get'
    })
    .then( function(response) {
        return(response.json());
    })
    .then( function(responseData) {
        temperature_values = responseData;
        var elements = [];
        do {
            elements = document.getElementsByClassName("large-text");
            if(elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }

        } while(elements.length > 0);
        
        for (item of temperature_values) {
            var h2 = document.createElement("h2");
            h2.classList.add("large-text");
            h2.innerHTML = item.name + ": " + item.value;
            document.getElementById("main-content").appendChild(h2);
        }
    })
    .catch( function() {
        document.getElementById("error").style.display = "block";
    });
}
window.setInterval(() => {
    updateValues();
}, 5000);