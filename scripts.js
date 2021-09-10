/*Wifi details*/
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

/*Static IP config*/
var staticIPBox = document.getElementById("static-ip-box");
function staticConfigBox(radioButton) {
    if(radioButton.value!="useDHCP") {
        staticIPBox.style.maxHeight = "300px";
        staticIPBox.style.margin = "0 0 5px 0";
        staticIPBox.style.borderStyle = "solid";
    } else {
        staticIPBox.style.maxHeight = "1px";
        staticIPBox.style.margin = "0";
        staticIPBox.style.borderStyle = "none";
    }
}
/*Update values*/
var networkConfig;
function updateValues() {
    fetch(window.location.href + 'config', {
        method: 'get'
    })
    .then( function(response) {
        return(response.json());
    })
    .then( function(responseData) {
        networkConfig = responseData;
    })
    .catch( function() {
        networkConfig = {};
    });
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
                    document.getElementById("wifiPassword").placeholder = "(unchanged)";
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
/*Submit form*/
document.getElementById("confirm").addEventListener("click", function(event){
    event.preventDefault();
    for (item in networkConfig) {
        if(item == "hasEthernet") {

        } else if(item == "useEthernet" || item == "useDHCP") {
            if(document.getElementById(item) !== null) {
                if(document.getElementById(item).checked == true) {
                    networkConfig[item] = 1;
                } else {
                    networkConfig[item] = 0;
                }
            }
        } else if(item == "useWifi") {
            if(document.getElementById(item) !== null) {
                if(document.getElementById(item).checked == true) {
                    networkConfig[item] = 1;
                    /*Update wifi SSID if wifi is true*/
                    if(document.getElementById("wifiSSID") !== null) {
                        console.log(networkConfig["wifiSSID"]);
                        if(networkConfig["wifiSSID"] != document.getElementById("wifiSSID").value) {
                            networkConfig["wifiSSID"] = document.getElementById("wifiSSID").value;
                        }
                        console.log(networkConfig["wifiSSID"]);
                    }
                } else {
                    networkConfig[item] = 0;
                }
            }
            /*Update password regardless of wifi settings*/
            if(document.getElementById("wifiPassword") !== null) {
                console.log(networkConfig["wifiPassword"]);
                if(document.getElementById("wifiPassword").value == "") {
                    delete networkConfig["wifiPassword"];
                    console.log("item deleted");
                } else {
                    networkConfig[item] = document.getElementById(item).value;
                    console.log("item modified");
                    networkConfig["wifiPassword"] = document.getElementById("wifiPassword").value;
                }
                console.log(networkConfig["wifiPassword"]);
            }
        } else if(item == "wifiSSID") {
        } else if(item == "wifiPassword") {
        } else {
            if(document.getElementById(item) !== null) {
                networkConfig[item] = document.getElementById(item).value;
            }
        }
    }
    fetch(window.location.href + 'config', {
            method: 'post',
            body: JSON.stringify(networkConfig),
    })
    .then(function (response) {
        console.log('config response:', response);
        return(response.json());
    })
    .then(function (responseData) {
        console.log('config response data:', JSON.stringify(responseData));
        window.alert(responseData.result);
    })
    .catch(function (error) {
        console.log('config response error:', JSON.stringify(error));
        window.alert("An error has occurred, please try again.");
    });
    }
);

/*Cancel changes*/
document.getElementById("cancel").addEventListener("click", function(event){
    event.preventDefault();
    window.alert("No changes were made, disconnected from device.");
    fetch(window.location.href + 'config', {
        method: 'post',
        body: {},
    });
});

/*Prevent enter key*/
var textFields = document.getElementsByClassName("text-field");
for(item of textFields) {
    item.addEventListener('keypress',enter_detector,false);
    item.addEventListener('focus',click_detector,false);
}
function enter_detector(e) {
    console.log(e.keyCode);
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        this.blur();
    }
    if (e.keyCode === 46 || e.which === 46) {
        e.preventDefault();
        this.nextElementSibling.nextElementSibling.focus();
    }
}
function click_detector() {
    this.select();
}
/*Annoying fix for safari*/
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var dots = document.getElementsByClassName("dot-box");
if (isIOS) {
    for (item of dots) {
        item.classList.add("safari-dot");
    }
}