var app = app || {},
    $viewContainer = $("#view-container");

(function () {
    app = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },

        options: {
            transitionFadeTimeMiliseconds: 300
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

            // load css and js specific for a current platform
            app.loadPlatformSpecificOptions();

            // hide the splashscreen
            navigator.splashscreen.hide();

            // init the base controlller
            initBaseController();
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
            alert("Back pressed!");
            console.info("APP EVENT: Back button pressed.");

            if (app.navigationHistory.length > 0) {
                app.navigationHistory.pop();
                app.navigateTo(app.navigationHistory.last(), false);
            } else {
                // exits the app if the user confirms true
                confirm("Želite li sigurno izaæi?") && navigator.app.exitApp();
            }
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

        loadPlatformSpecificOptions: function () {
            $("head").append("<link rel='stylesheet' type='text/css' href='css/platform_specific/{0}.min.css' />".format(device.platform));
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

            app.views = {
                bestbuy:        "dwad-bestbuy",
                program:        "dwad-program",
                menu:           "main-menu",
                locations:      "restaurant-locations",
                rpartners:      "restaurant-partners",
                wpartners:      "wine-partners"
            };

            app.navigationHistory = [];
        },

        navigateTo: function (viewName, pushToNavigationHistory) {
            // clear the view container DOM
            $viewContainer.fadeOut(app.options.transitionFadeTimeMiliseconds/2, function () {

                $($viewContainer.children()).remove();

                // load the new view html
                $.get("views/{0}-view.html".format(viewName), function (html) {
                    console.info("APP INFO: View '{0}-view.html' loaded.".format(viewName));
                    $viewContainer.append(html);

                    // load the new controller js
                    $.get("js/controllers/{0}-controller.js".format(viewName), function (js) {
                        console.info("APP INFO: Controller '{0}-controller.js' loaded.".format(viewName));
                    });

                    pushToNavigationHistory && app.navigationHistory.push(viewName);
                    $viewContainer.fadeIn(app.options.transitionFadeTimeMiliseconds / 2);
                });
            });
        },

        navigateBack: function(){
            this.onBackButton();
        }
    };

    // initialize the app
    app.initialize();
}());
