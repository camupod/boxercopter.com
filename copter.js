BoxerCopter.copter = (function () {
    'use strict';
    var MAX_ROTATION_DEGREES = 30;
    var MOVE_DURATION = 3000;
    return {
        init: function (el) {
            this.el = el;
            this.elRotation = el.querySelector('.logo-rotation');
            this.elX = el.querySelector('.logo-x');
            this.lastX = this.lastY = this.spinTime = this.moveTime = 0;
            this.frameID = this.timeoutID = null;
            this.flying = false;
        },
        fly: function () {
            console.log('flying')
            var x, y, sx, sy,
                self = this,
                now = new Date().getTime(),
                rotation = MAX_ROTATION_DEGREES;

            if (now - this.spinTime > 30) {
                if (this.elX.className.indexOf('flipped') === -1) {
                    this.elX.classList.add('flipped');
                } else {
                    this.elX.classList.remove('flipped');
                }
                this.spinTime = now;
            } else if (now - this.moveTime > MOVE_DURATION) {
                x = Math.random() * (window.innerWidth - this.el.clientWidth);
                y = Math.random() * (window.innerHeight - this.el.clientHeight);
                sx = sy = 0.6 + Math.random() * 0.4;
                rotation *= (x - this.lastX) / window.innerWidth;
                this.el.style[BoxerCopter.support.transform] = 'translate('+x+'px,'+y+'px) scale('+sx+','+sy+')';
                if (x < this.lastX) {
                    sx = -sx;
                }
                this.elRotation.style[BoxerCopter.support.transform] = 'rotate('+rotation+'deg) scale('+(sx/sy)+',1)';
                this.lastX = x;
                this.lastY = y;
                this.moveTime = now;
            }
            this.frameID = BoxerCopter.support.requestAnimationFrame(function () {
                self.fly();
            });
        },
        start: function () {
            var self = this;
            clearTimeout(this.timeoutID);
            this.el.classList.add('copter');
            this.flying = true;
            this.timeoutID = setTimeout(function () {
                self.el.classList.add('flying');
                self.fly();
            }, 500);
        },
        stop: function () {
            clearTimeout(this.timeoutID);
            this.el.classList.remove('copter');
            this.el.classList.remove('flying');
            BoxerCopter.support.cancelAnimationFrame(this.frameID);
            this.flying = false;
        },
        toggle: function () {
            if (this.flying) {
                this.stop();
            } else {
                this.start();
            }
        }
    };
})();
