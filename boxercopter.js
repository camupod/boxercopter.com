Clouds = {
    SCALE_MIN: 0.3,
    SCALE_MAX: 1.25,
    SPEED_MIN: 10,
    SPEED_MAX: 30,
    Y_MIN: 0,
    Y_MAX: 200,

    lastSpawnTime: 0,

    clouds: [],
    randomNum: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    addCloud: function(startVisible) {
        var c = {};
        c.scale = Clouds.randomNum(Clouds.SCALE_MIN, Clouds.SCALE_MAX);
        c.speed = Clouds.randomInt(Clouds.SPEED_MIN, Clouds.SPEED_MAX);
        c.y = Clouds.randomInt(Clouds.Y_MIN, Clouds.Y_MAX);

        if (startVisible) {
            c.x = Clouds.randomNum(0, window.innerWidth);

            // if on right half of the window, move left and the inverse
            c.direction = c.x > window.innerWidth/2 ? "left" : "right";
        } else {
            c.direction = Math.random() > 0.5 ? "left" : "right";

            if (c.direction === "left") {
                // just off the screen to the right
                c.x = window.innerWidth;
            } else {
                // just off the screen to the left
                c.x = -250 * c.scale;
            }
        }

        var elem = document.createElement('div');
        elem.classList.add('cloud');
        elem.style['top'] = c.y + 'px';
        elem.style['left'] = c.x + 'px';

        if (c.direction === "left") {
            c.finalX = (250 * c.scale) + c.x
            c.transform = 'rotateY(180deg) scale('+c.scale+')';
        } else {
            c.finalX = (window.innerWidth - c.x);
            c.transform = 'rotateY(0deg) scale('+c.scale+')';
        }

        elem.style['-webkit-transform'] = c.transform;
        document.body.appendChild(elem);
        c.elem = elem;
        Clouds.clouds.push(c);

        (function(cloud) {
            webkitRequestAnimationFrame(function() {Clouds.startCloud(cloud)});
        })(c);
    },
    startCloud: function(cloud) {
        cloud.startTime = new Date().getTime();
        var seconds = cloud.speed/cloud.scale^2;
        cloud.elem.style['-webkit-transition'] = 'all ' + seconds + 's linear';
        cloud.elem.style['-webkit-transform'] = cloud.transform + ' translateX('+cloud.finalX/cloud.scale+'px)';
    },
    respawn: function() {
        var cloud, i, now = new Date().getTime();

        for (i = Clouds.clouds.length - 1; i >= 0; i--) {
            cloud = Clouds.clouds[i];
            if (now - cloud.startTime > 30 * 1000) {
                cloud.elem.parentNode.removeChild(cloud.elem);
                Clouds.clouds.splice(i, 1);
            }
        }

        if (now - Clouds.lastSpawnTime > 3 * 1000) {
            Clouds.addCloud(false);
            Clouds.lastSpawnTime = now;
        }

        setTimeout(Clouds.respawn, 1000);
    },
    startAnimation: function() {
        for (var n = 0; n < 6; n++) {
            Clouds.addCloud(true);
        }
        setTimeout(Clouds.respawn, 1000);
    }
}
Clouds.startAnimation();
