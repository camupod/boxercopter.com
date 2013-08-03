var BoxerCopter = {
    timeOfDay: function () {
        var now = new Date();
        var hours = now.getHours();
        if (hours >= 4 && hours < 10) {
            return 'morning';
        } else if (hours >= 10 && hours < 16) {
            return 'day';
        } else if (hours >= 16 && hours < 22) {
            return 'evening';
        } else {
            return 'night';
        }
    }
};
