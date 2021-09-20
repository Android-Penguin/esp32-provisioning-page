var wifiDetails=document.getElementById("wifi-details");function wifiBox(e){"useWifi"==e.value?(wifiDetails.style.maxHeight="95px",wifiDetails.style.margin="0 0 5px 0",wifiDetails.style.borderStyle="solid"):(wifiDetails.style.maxHeight="1px",wifiDetails.style.margin="0",wifiDetails.style.borderStyle="none")}var networkConfig,staticIPBox=document.getElementById("static-ip-box");function staticConfigBox(e){"useDHCP"!=e.value?(staticIPBox.style.maxHeight="300px",staticIPBox.style.margin="0 0 5px 0",staticIPBox.style.borderStyle="solid"):(staticIPBox.style.maxHeight="1px",staticIPBox.style.margin="0",staticIPBox.style.borderStyle="none")}function displayMessage(e){document.getElementById("main-content").style.visibility="hidden",document.getElementById("confirm-text").innerHTML=e,document.getElementById("hidden-div").style.display="block",document.getElementById("hidden-div").style.visibility="visible"}async function updateValues(){for(item in await fetch(window.location.href+"config",{method:"get"}).then((function(e){return e.json()})).then((function(e){networkConfig=e})).catch((function(){networkConfig={}})),networkConfig)"hasEthernet"==item?0==networkConfig[item]&&(document.getElementById("ethernet-properties").style.display="none"):"useWifi"==item||"useEthernet"==item?null!==document.getElementById(item)&&1==networkConfig[item]&&(document.getElementById(item).checked=!0,wifiBox(document.getElementById(item))):"useDHCP"==item?null!==document.getElementById(item)&&(1==networkConfig[item]?(document.getElementById(item).checked=!0,staticConfigBox(document.getElementById(item))):(document.getElementById("useStaticIP").checked=!0,staticConfigBox(document.getElementById("useStaticIP")))):"wifiSSID"==item?null!==document.getElementById(item)&&(document.getElementById(item).value=networkConfig[item],""!==networkConfig[item]&&(document.getElementById("wifiPassword").placeholder="(unchanged)")):"wifiPassword"==item?document.getElementById(item):null!==document.getElementById(item)&&(document.getElementById(item).value=networkConfig[item])}document.getElementById("confirm").addEventListener("click",(function(e){for(item in e.preventDefault(),networkConfig)"hasEthernet"==item||("useEthernet"==item||"useDHCP"==item?null!==document.getElementById(item)&&(1==document.getElementById(item).checked?networkConfig[item]=1:networkConfig[item]=0):"useWifi"==item?(null!==document.getElementById(item)&&(1==document.getElementById(item).checked?(networkConfig[item]=1,null!==document.getElementById("wifiSSID")&&networkConfig.wifiSSID!=document.getElementById("wifiSSID").value&&(networkConfig.wifiSSID=document.getElementById("wifiSSID").value)):networkConfig[item]=0),null!==document.getElementById("wifiPassword")&&(""==document.getElementById("wifiPassword").value?delete networkConfig.wifiPassword:(networkConfig[item]=document.getElementById(item).value,networkConfig.wifiPassword=document.getElementById("wifiPassword").value))):"wifiSSID"==item||"wifiPassword"==item||null!==document.getElementById(item)&&(networkConfig[item]=document.getElementById(item).value));fetch(window.location.href+"config",{method:"post",body:JSON.stringify(networkConfig)}),displayMessage("Changes have been saved, disconnected from device.")})),document.getElementById("cancel").addEventListener("click",(function(e){e.preventDefault(),fetch(window.location.href+"config",{method:"post",body:{}}),displayMessage("No changes were made, disconnected from device.")}));var textFields=document.getElementsByClassName("text-field");for(item of textFields)item.addEventListener("keypress",enter_detector,!1),item.addEventListener("focus",click_detector,!1);function enter_detector(e){13!==e.keyCode&&13!==e.which||(e.preventDefault(),this.blur()),46!==e.keyCode&&46!==e.which||(e.preventDefault(),this.nextElementSibling.nextElementSibling.focus())}function click_detector(){this.select()}var isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,dots=document.getElementsByClassName("dot-box");if(isIOS)for(item of dots)item.classList.add("safari-dot");