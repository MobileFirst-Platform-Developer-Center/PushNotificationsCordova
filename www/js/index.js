var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){
    //MFP APIs should only be called within wlCommonInit() or after it has been called, to ensure that the APIs have loaded properly
}

document.addEventListener('deviceready', function() {
    MFPPush.initialize(function(successResponse) {
            alert("Successfully intialized");
            MFPPush.registerNotificationsCallback(notificationReceived);
    }, function(failureResponse) {
            alert("Failed to initialize");
    });
}, false);

function isPushSupported() {
    MFPPush.isPushSupported(function(successResponse) {
        alert("Push Supported: " + successResponse);
    }, function(failureResponse) {
        alert("Failed to get push support status");
    });
}

var notificationReceived = function(message) {
    alert(JSON.stringify(message));
};

function registerDevice() {
    // Optional parameter, but must follow this format
    var settings = {
    ios: {
        alert: true,
        badge: true,
        sound: true
    }
    };

    MFPPush.registerDevice(settings, null,
                           function(successResponse) {
                           alert("Successfully registered");
                           enableButtons();
                           },
                           function(failureResponse) {
                           alert("Failed to register");
                           }
                           );

}

function getTags() {
    MFPPush.getTags(function(tags) {
                    alert(JSON.stringify(tags));
                    },
                    function(){
                    alert("Failed to get tags");
                    }
                    );
}

function getSubscriptions() {
    MFPPush.getSubscriptions(function(subscriptions) {
                             alert(JSON.stringify(subscriptions));
                             },
                             function(){
                             alert("Failed to get subscriptions");
                             }
                             );
}

function subscribe() {
    var tags = ['sample-tag1','sample-tag2']
    MFPPush.subscribe(tags,
                      function(tags) {
                      alert("Subscribed successfully");
                      },
                      function(){
                      alert("Failed to subscribe");
                      }
                      );
}

function unsubscribe() {
    var tags = ['sample-tag1','sample-tag2']
    MFPPush.unsubscribe(tags,
                        function(tags) {
                        alert("Unsubscribed successfully");
                        },
                        function(){
                        alert("Failed to unsubscribe");
                        }
                        );
}

function unregisterDevice() {
    MFPPush.unregisterDevice(function(successResponse) {
                             alert("Unregistered successfully");
                             disableButtons();
                             },
                             function(){
                             alert("Failed to unregister");
                             }
                             );
}

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