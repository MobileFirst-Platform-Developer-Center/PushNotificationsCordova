IBM MobileFirst Platform Foundation
===
## PushNotificationsCordova
A sample application demonstrating use of push notifications in Cordova applications.

### Tutorials
https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/notifications/

### Usage

1. From a **Command-line**, navigate to the project's root folder.
2. Add a platform using the `cordova platform add` command.
3. Register the application by running the command: `mfpdev app register`.
4. Add new scope-mapping element `push.mobileclient`.
5. Via the MobileFirst Operations Console, setup the MobileFirst Server with either GCM details or APNS certificate, and add tags.
6. Run the application by running the `cordova run` command.

Notes:

* iOS: Must be tested on physical devices.
* iOS: The BundleID must relate to an AppID configured with push notifications.
* Android: The certificate must be uploaded via the MobileFirst Operations Console.
* Android: Emulator must have Google APIs to test push notifications.

### Supported Levels
IBM MobileFirst Platform Foundation 8.0

### License
Copyright 2016 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
att
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
