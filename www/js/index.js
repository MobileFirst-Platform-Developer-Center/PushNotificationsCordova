/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

// Default tags if "Get Tags" is not clicked first
var tags = ['sample-tag1','sample-tag2'];

// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){
    var userLoginChallengeHandler = UserLoginChallengeHandler();
    //MFP APIs should only be called within wlCommonInit() or after it has been called, to ensure that the APIs have loaded properly
    
    MFPPush.initialize(
       function(successResponse) {
        WL.Logger.debug("Successfully intialized");
        MFPPush.registerNotificationsCallback(notificationReceived);
    }, function(failureResponse) {
        alert("Failed to initialize");
    });

    //add event listeners for click on buttons
    document.getElementById("isPushSupported").addEventListener("click", isPushSupported);
    document.getElementById("registerDevice").addEventListener("click", registerDevice);
    document.getElementById("getTags").addEventListener("click", getTags);
    document.getElementById("subscribe").addEventListener("click", subscribe);
    document.getElementById("getsubscriptions").addEventListener("click", getSubscriptions);
    document.getElementById("unsubscribe").addEventListener("click", unsubscribe);
    document.getElementById("unregister").addEventListener("click", unregisterDevice);
}

function isPushSupported() {
    MFPPush.isPushSupported(
        function(successResponse) {
            alert("Push Supported: " + successResponse);
        }, function(failureResponse) {
            alert("Failed to get push support status");
        }
    );
}

/*
* NOTE: in the code below MFPPush API calls are wrapped with "WLAuthorizationManager.obtainAccessToken("push.mobileclient")".
* This is due to a defect in the current release of the product. 
*/

function registerDevice() {
    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        MFPPush.registerDevice(
            {"phoneNumber":""}, // workaround due to a defect in the current release of the product. An empty "phoneNumber" property must be passed at this time.
            function(successResponse) {
                alert("Successfully registered");
                enableButtons();    
            }, 
            function(failureResponse) {
                alert("Failed to register");
                console.log("Failed to register device:" + JSON.stringify(failureResponse));
            }
        )
    );
}

function getTags() {
    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        MFPPush.getTags(
           function(newTags) {
                tags = newTags;
                alert(JSON.stringify(tags));
           },
           function(failureResponse){
                alert("Failed to get tags");
                console.log("Failed to get tags:" + JSON.stringify(failureResponse));
           }
        )
    );
}

function getSubscriptions() {
    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        MFPPush.getSubscriptions(
            function(subscriptions) {
                alert(JSON.stringify(subscriptions));
             },
            function(failureResponse){
                alert("Failed to get subscriptions");
                console.log("Failed to get subscriptions:" + JSON.stringify(failureResponse));
            }
        )
    );
}

function subscribe() {
    //tags = ['sample-tag1','sample-tag2'];
    
    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        MFPPush.subscribe(
            tags,
            function(tags) {
                alert("Subscribed successfully");
            },function(failureResponse){
                alert("Failed to subscribe");
                console.log("Failed to subscribe:" + JSON.stringify(failureResponse));
            }
        )
    );
}

function unsubscribe() {
    //tags = ['sample-tag1','sample-tag2'];

    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        MFPPush.unsubscribe(
            tags,
            function(tags) {
                alert("Unsubscribed successfully");
            },
            function(failureResponse){
                alert("Failed to unsubscribe");
                console.log("Failed to unsubscribe:" + JSON.stringify(failureResponse));
            }
        )
    );
}

function unregisterDevice() {
    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        MFPPush.unregisterDevice(
            function(successResponse) {
               alert("Unregistered successfully");
               disableButtons();
           },
           function(failureResponse){
               alert("Failed to unregister");
               console.log("Failed to unregister:" + JSON.stringify(failureResponse));
           }
        )
    );
}

var notificationReceived = function(message) {
    alert (JSON.stringify(message));
};

function enableButtons() {
    document.getElementById("subscribe").disabled = false;
    document.getElementById("getsubscriptions").disabled = false;
    document.getElementById("unsubscribe").disabled = false;
    document.getElementById("unregister").disabled = false;
}

function disableButtons(){
    document.getElementById("subscribe").disabled = true;
    document.getElementById("getsubscriptions").disabled = true;
    document.getElementById("unsubscribe").disabled = true;
    document.getElementById("unregister").disabled = true;
}

function showLoginDiv() {
    document.getElementById('protectedDiv').style.display = 'none';
    document.getElementById('statusMsg').innerHTML = "";
    document.getElementById('loginDiv').style.display = 'block';
}

function showProtectedDiv() {
    document.getElementById('loginDiv').style.display = 'none';
    document.getElementById('protectedDiv').style.display = 'block';
}
