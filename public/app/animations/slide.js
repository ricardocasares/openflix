'use strict';
angular
	.module('openflix')
	.animation('.slide', slideEffect);

    function slideEffect() {
        var NG_HIDE_CLASS = 'ng-hide';
        return {
            beforeAddClass: function(element, className, done) {
                if (className === NG_HIDE_CLASS) {
                    // element.slideUp(done);
                    element.slideUp(done);
                }
            },
            removeClass: function(element, className, done) {
                if (className === NG_HIDE_CLASS) {
                    element.hide().slideDown(done);
                }
            }
        };
    }