// Wifi details
var wifiDetails = document.getElementById("wifi-details");
function wifiBox(radioButton) {
    if(radioButton.value=="useWifi") {
        wifiDetails.style.maxHeight = "95px";
        wifiDetails.style.margin = "0 0 5px 0";
        wifiDetails.style.borderStyle = "solid";
    } else {
        wifiDetails.style.maxHeight = "1px";
        wifiDetails.style.margin = "0";
        wifiDetails.style.borderStyle = "none";
    }
}

// Static IP config
var staticIPBox = document.getElementById("static-ip-box");
function staticConfigBox(radioButton) {
    if(radioButton.value!="useDHCP") {
        staticIPBox.style.maxHeight = "150px";
        staticIPBox.style.margin = "0 0 5px 0";
        staticIPBox.style.borderStyle = "solid";
    } else {
        staticIPBox.style.maxHeight = "1px";
        staticIPBox.style.margin = "0";
        staticIPBox.style.borderStyle = "none";
    }
}

// Update values
function updateValues() {
    for (item in networkConfig) {
        if(item == "hasEthernet") {
            if(networkConfig[item] == 0) {
                document.getElementById("ethernet-properties").style.display = "none";
            }
        } else if(item == "useWifi" || item == "useEthernet") {
            if(document.getElementById(item) !== null) {
                if(networkConfig[item] == 1) {
                    document.getElementById(item).checked = true;
                    wifiBox(document.getElementById(item));
                }
            }
        } else if(item == "useDHCP") {
            if(document.getElementById(item) !== null) {
                if(networkConfig[item] == 1) {
                    document.getElementById(item).checked = true;
                    staticConfigBox(document.getElementById(item));
                } else {
                    document.getElementById("useStaticIP").checked = true;
                    staticConfigBox(document.getElementById("useStaticIP"));
                }
            }
        } else if(item == "wifiSSID") {
            if(document.getElementById(item) !== null) {
                document.getElementById(item).value = networkConfig[item];
                if(networkConfig[item] !== "") {
                    document.getElementById("wifiPassword").placeholder = "(unchanged)"
                }
            }
        } else if(item == "wifiPassword") {
            if(document.getElementById(item) !== null) {
            }
        } else {
            console.log(document.getElementById(item));
            if(document.getElementById(item) !== null) {
                document.getElementById(item).value = networkConfig[item];
            }
        }
    }
}

// Submit form
document.getElementById("confirm").addEventListener("click", function(event){
    event.preventDefault();
    for (item in networkConfig) {
        if(item == "hasEthernet") {

        } else if(item == "useWifi" || item == "useEthernet" || item == "useDHCP") {
            if(document.getElementById(item) !== null) {
                if(document.getElementById(item).checked == true) {
                    networkConfig[item] = 1;
                } else {
                    networkConfig[item] = 0;
                }
            }
        } else if(item == "wifiSSID") {
            if(document.getElementById(item) !== null) {
                if(networkConfig[item] != document.getElementById(item).value) {
                    networkConfig[item] = document.getElementById(item).value;
                }
            }
        } else if(item == "wifiPassword") {
            if(document.getElementById(item) !== null) {
                console.log(networkConfig[item]);
                if(document.getElementById(item).value == "") {
                    delete networkConfig[item];
                    console.log("item deleted");
                } else {
                    networkConfig[item] = document.getElementById(item).value;
                    console.log("item modified");
                }
                console.log(networkConfig[item]);
            }
        } else {
            if(document.getElementById(item) !== null) {
                networkConfig[item] = document.getElementById(item).value;
            }
        }
    }
    // TODO - will all fields alway be in object? Script assumes that they are there and sets them accordingly.
});

// Cancel changes
document.getElementById("cancel").addEventListener("click", function(event){
    event.preventDefault();
});

// Prevent enter key
var textFields = document.getElementsByClassName("text-field");
for(item of textFields) {
    item.addEventListener('keypress',enter_detector,false);
}
function enter_detector(e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        this.blur();
    }
}