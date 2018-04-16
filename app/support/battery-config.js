(function () {
    'use strict';

    // Battery Status: https://whatwebcando.today/battery-status.html

    if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {

        var batteryPromise;
        var batteryStatusIcon = $('#battery-status');

        if ('getBattery' in navigator) {
            batteryPromise = navigator.getBattery();
        } else {
            batteryPromise = Promise.resolve(navigator.battery);
        }

        batteryPromise.then(function (battery) {
            loadBatteryStatus(battery);
            battery.addEventListener('chargingchange', function () {
                setBatteryTitle(this);
            });
            battery.addEventListener('levelchange', function () {
                loadBatteryStatus(this)
            });
        });
    }

    function loadBatteryStatus(battery) {
        removeClassByRegexMatch(batteryStatusIcon, /\S*battery-\S*/g);

        switch (true) {
            case battery.level > 0 && battery.level <= 0.2:
                batteryStatusIcon.addClass('fa-battery-empty battery-red');
                break;
            case battery.level > 0.2 && battery.level <= 0.4:
                batteryStatusIcon.addClass('fa-battery-quarter battery-red');
                break;
            case battery.level > 0.4 && battery.level <= 0.5:
                batteryStatusIcon.addClass('fa-battery-half');
                break;
            case battery.level > 0.5 && battery.level <= 0.9:
                batteryStatusIcon.addClass('fa-battery-three-quarters');
                break;
            case battery.level > 0.9 && battery.level <= 0.99:
                batteryStatusIcon.addClass('fa-battery-full');
                break;
            default:
                batteryStatusIcon.addClass('fa-battery-full battery-green')
                break;
        }

        setBatteryTitle(battery);
    };

    function setBatteryTitle(battery) {
        var charging = battery.charging ? 'Charging' : 'Discharging';
        batteryStatusIcon.attr('title', battery.level * 100 + '% ' + charging);
    };

    function removeClassByRegexMatch(element, regex) {
        element.removeClass(function (i, c) {
            var matches = c.match(regex);
            return matches ? matches.join(' ') : false;
        });
    };
})();