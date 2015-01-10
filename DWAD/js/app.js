(function () {
    var app = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },

        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener("deviceready", this.onDeviceReady, false);
            document.addEventListener("pause", this.onPause, false);
            document.addEventListener("resume", this.onResume, false);
            document.addEventListener("online", this.onOnline, false);
            document.addEventListener("offline", this.onOffline, false);
        },

        bindDeviceSpecificEvents: function () {
            if (device.isAndroid() || device.isWindowsPhone()) {
                document.addEventListener("backbutton", this.onBackButton, false);

                if (device.isAndroid()) {
                    document.addEventListener("menubutton", this.onMenuButton, false);
                    document.addEventListener("searchbutton", this.onSearchButton, false);
                }
            }
        },

        // Triggered when the device/app is ready/loaded
        onDeviceReady: function () {
            console.info("APP EVENT: App ready.");

            // applies device specific extensions, available only when the app is ready
            app.applyExtensions();

            // bind device specific events, needs access to the "device" object
            app.bindDeviceSpecificEvents();

            // hide the splashscreen
            navigator.splashscreen.hide();
        },

        // Triggered when the app is sent to the background, e.g. a phonecall interuption or the user swaps to another app
        onPause: function () {
            console.info("APP EVENT: App pausing...");
        },

        // Triggered when the app is resumed from the paused state
        onResume: function () {
            console.info("APP EVENT: App resumed.");
        },

        // Triggered when the search button on the device is pressed
        onOnline: function () {
            console.info("APP EVENT: Connected to the internet.");
        },

        // Triggered when the search button on the device is pressed
        onOffline: function () {
            console.info("APP EVENT: Disconnected from the internet!");
        },

        // Android and Windows Phone only*
        // Triggered when the back button on the device is pressed
        onBackButton: function () {
            console.info("APP EVENT: Back button pressed.");
        },

        // Android only*
        // Triggered when the menu button on the device is pressed
        onMenuButton: function () {
            console.info("APP EVENT: Menu button pressed.");
        },

        // Android only*
        // Triggered when the search button on the device is pressed
        onSearchButton: function () {
            console.info("APP EVENT: Search button pressed.");
        },

        applyExtensions: function () {
            // global extensions and helpers
            device.platforms = {
                android: "Android",
                ios: "iOS",
                wp: "Win32NT"
            };

            // device extensions
            device.isAndroid = function () {
                return device.platform === device.platforms.android;
            };

            device.isIOS = function () {
                return device.platform === device.platforms.ios;
            };

            device.isWindowsPhone = function () {
                return device.platform === device.platforms.wp;
            };
        }
    };

    // initialize the app
    app.initialize();
}());
