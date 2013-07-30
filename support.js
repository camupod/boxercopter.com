BoxerCopter.support = (function () {
    'use strict';

    var support = {};
    support.svg = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
    support.transform  = getVendorCSSPropertyName('transform');
    support.transition = getVendorCSSPropertyName('transition');

    // Helper function to get the proper vendor property name.
    // (`transition` => `WebkitTransition`)
    function getVendorCSSPropertyName(prop) {
        var testDiv = document.createElement('div');
        // Handle unprefixed versions (FF16+, for example)
        if (prop in testDiv.style) {
            return prop;
        }

        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        if (prop in testDiv.style) {
            return prop;
        }

        for (var i=0; i<prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in testDiv.style) {
                return uncamel(vendorProp);
            }
        }

        return false;
    }

    // ### uncamel(str)
    // Converts a camelcase string to a dasherized string.
    // (`marginLeft` => `margin-left`)
    function uncamel(str) {
        return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
    }

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller
    // fixes from Paul Irish and Tino Zijdel
    var raf, caf;
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !raf; ++x) {
            raf = window[vendors[x]+'RequestAnimationFrame'];
            caf = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }
        if (!raf)
            raf = function(callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!caf)
            caf = function(id) {
                clearTimeout(id);
            };
    }());
    support.requestAnimationFrame = function () {
        return raf.apply(window, arguments);
    };
    support.cancelAnimationFrame = function () {
        return caf.apply(window, arguments);
    };

    return support;
})();
