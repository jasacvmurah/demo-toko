!function(a, b) {
    "object" == typeof exports && "object" == typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define("Siema", [], b) : "object" == typeof exports ? exports.Siema = b() : a.Siema = b();
}("undefined" != typeof self ? self : this, function() {
    return function(a) {
        function b(d) {
            if (c[d]) return c[d].exports;
            var e = c[d] = {
                i: d,
                l: !1,
                exports: {}
            };
            return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports;
        }
        var c = {};
        return b.m = a, b.c = c, b.d = function(a, c, d) {
            b.o(a, c) || Object.defineProperty(a, c, {
                configurable: !1,
                enumerable: !0,
                get: d
            });
        }, b.n = function(a) {
            var c = a && a.__esModule ? function() {
                return a.default;
            } : function() {
                return a;
            };
            return b.d(c, "a", c), c;
        }, b.o = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b);
        }, b.p = "", b(b.s = 0);
    }([ function(a, b, c) {
        "use strict";
        function d(a, b) {
            if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(b, "__esModule", {
            value: !0
        });
        var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
            return typeof a;
        } : function(a) {
            return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
        }, f = function() {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), 
                    Object.defineProperty(a, d.key, d);
                }
            }
            return function(b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b;
            };
        }(), g = function() {
            function a(b) {
                var c = this;
                if (d(this, a), this.config = a.mergeSettings(b), this.selector = "string" == typeof this.config.selector ? document.querySelector(this.config.selector) : this.config.selector, 
                null === this.selector) throw new Error("Something wrong with your selector 😭");
                this.resolveSlidesNumber(), this.selectorWidth = this.selector.offsetWidth, this.innerElements = [].slice.call(this.selector.children), 
                this.currentSlide = this.config.loop ? this.config.startIndex % this.innerElements.length : Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.perPage)), 
                this.transformProperty = a.webkitOrNot(), [ "resizeHandler", "touchstartHandler", "touchendHandler", "touchmoveHandler", "mousedownHandler", "mouseupHandler", "mouseleaveHandler", "mousemoveHandler", "clickHandler" ].forEach(function(a) {
                    c[a] = c[a].bind(c);
                }), this.init();
            }
            return f(a, [ {
                key: "attachEvents",
                value: function() {
                    window.addEventListener("resize", this.resizeHandler), this.config.draggable && (this.pointerDown = !1, 
                    this.drag = {
                        startX: 0,
                        endX: 0,
                        startY: 0,
                        letItGo: null,
                        preventClick: !1
                    }, this.selector.addEventListener("touchstart", this.touchstartHandler), this.selector.addEventListener("touchend", this.touchendHandler), 
                    this.selector.addEventListener("touchmove", this.touchmoveHandler), this.selector.addEventListener("mousedown", this.mousedownHandler), 
                    this.selector.addEventListener("mouseup", this.mouseupHandler), this.selector.addEventListener("mouseleave", this.mouseleaveHandler), 
                    this.selector.addEventListener("mousemove", this.mousemoveHandler), this.selector.addEventListener("click", this.clickHandler));
                }
            }, {
                key: "detachEvents",
                value: function() {
                    window.removeEventListener("resize", this.resizeHandler), this.selector.removeEventListener("touchstart", this.touchstartHandler), 
                    this.selector.removeEventListener("touchend", this.touchendHandler), this.selector.removeEventListener("touchmove", this.touchmoveHandler), 
                    this.selector.removeEventListener("mousedown", this.mousedownHandler), this.selector.removeEventListener("mouseup", this.mouseupHandler), 
                    this.selector.removeEventListener("mouseleave", this.mouseleaveHandler), this.selector.removeEventListener("mousemove", this.mousemoveHandler), 
                    this.selector.removeEventListener("click", this.clickHandler);
                }
            }, {
                key: "init",
                value: function() {
                    this.attachEvents(), this.selector.style.overflow = "hidden", this.selector.style.direction = this.config.rtl ? "rtl" : "ltr", 
                    this.buildSliderFrame(), this.config.onInit.call(this);
                }
            }, {
                key: "buildSliderFrame",
                value: function() {
                    var a = this.selectorWidth / this.perPage, b = this.config.loop ? this.innerElements.length + 2 * this.perPage : this.innerElements.length;
                    this.sliderFrame = document.createElement("div"), this.sliderFrame.style.width = a * b + "px", 
                    this.enableTransition(), this.config.draggable && (this.selector.style.cursor = "-webkit-grab");
                    var c = document.createDocumentFragment();
                    if (this.config.loop) for (var d = this.innerElements.length - this.perPage; d < this.innerElements.length; d++) {
                        var e = this.buildSliderFrameItem(this.innerElements[d].cloneNode(!0));
                        c.appendChild(e);
                    }
                    for (var f = 0; f < this.innerElements.length; f++) {
                        var g = this.buildSliderFrameItem(this.innerElements[f]);
                        c.appendChild(g);
                    }
                    if (this.config.loop) for (var h = 0; h < this.perPage; h++) {
                        var i = this.buildSliderFrameItem(this.innerElements[h].cloneNode(!0));
                        c.appendChild(i);
                    }
                    this.sliderFrame.appendChild(c), this.selector.innerHTML = "", this.selector.appendChild(this.sliderFrame), 
                    this.slideToCurrent();
                }
            }, {
                key: "buildSliderFrameItem",
                value: function(a) {
                    var b = document.createElement("div");
                    return b.style.cssFloat = this.config.rtl ? "right" : "left", b.style.float = this.config.rtl ? "right" : "left", 
                    b.style.width = (this.config.loop ? 100 / (this.innerElements.length + 2 * this.perPage) : 100 / this.innerElements.length) + "%", 
                    b.appendChild(a), b;
                }
            }, {
                key: "resolveSlidesNumber",
                value: function() {
                    if ("number" == typeof this.config.perPage) this.perPage = this.config.perPage; else if ("object" === e(this.config.perPage)) {
                        this.perPage = 1;
                        for (var a in this.config.perPage) window.innerWidth >= a && (this.perPage = this.config.perPage[a]);
                    }
                }
            }, {
                key: "prev",
                value: function() {
                    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, b = arguments[1];
                    if (!(this.innerElements.length <= this.perPage)) {
                        var c = this.currentSlide;
                        if (this.config.loop) if (this.currentSlide - a < 0) {
                            this.disableTransition();
                            var d = this.currentSlide + this.innerElements.length, e = this.perPage, f = d + e, g = (this.config.rtl ? 1 : -1) * f * (this.selectorWidth / this.perPage), h = this.config.draggable ? this.drag.endX - this.drag.startX : 0;
                            this.sliderFrame.style[this.transformProperty] = "translate3d(" + (g + h) + "px, 0, 0)", 
                            this.currentSlide = d - a;
                        } else this.currentSlide = this.currentSlide - a; else this.currentSlide = Math.max(this.currentSlide - a, 0);
                        c !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.config.onChange.call(this), 
                        b && b.call(this));
                    }
                }
            }, {
                key: "next",
                value: function() {
                    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, b = arguments[1];
                    if (!(this.innerElements.length <= this.perPage)) {
                        var c = this.currentSlide;
                        if (this.config.loop) if (this.currentSlide + a > this.innerElements.length - this.perPage) {
                            this.disableTransition();
                            var d = this.currentSlide - this.innerElements.length, e = this.perPage, f = d + e, g = (this.config.rtl ? 1 : -1) * f * (this.selectorWidth / this.perPage), h = this.config.draggable ? this.drag.endX - this.drag.startX : 0;
                            this.sliderFrame.style[this.transformProperty] = "translate3d(" + (g + h) + "px, 0, 0)", 
                            this.currentSlide = d + a;
                        } else this.currentSlide = this.currentSlide + a; else this.currentSlide = Math.min(this.currentSlide + a, this.innerElements.length - this.perPage);
                        c !== this.currentSlide && (this.slideToCurrent(this.config.loop), this.config.onChange.call(this), 
                        b && b.call(this));
                    }
                }
            }, {
                key: "disableTransition",
                value: function() {
                    this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, this.sliderFrame.style.transition = "all 0ms " + this.config.easing;
                }
            }, {
                key: "enableTransition",
                value: function() {
                    this.sliderFrame.style.webkitTransition = "all " + this.config.duration + "ms " + this.config.easing, 
                    this.sliderFrame.style.transition = "all " + this.config.duration + "ms " + this.config.easing;
                }
            }, {
                key: "goTo",
                value: function(a, b) {
                    if (!(this.innerElements.length <= this.perPage)) {
                        var c = this.currentSlide;
                        this.currentSlide = this.config.loop ? a % this.innerElements.length : Math.min(Math.max(a, 0), this.innerElements.length - this.perPage), 
                        c !== this.currentSlide && (this.slideToCurrent(), this.config.onChange.call(this), 
                        b && b.call(this));
                    }
                }
            }, {
                key: "slideToCurrent",
                value: function(a) {
                    var b = this, c = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide, d = (this.config.rtl ? 1 : -1) * c * (this.selectorWidth / this.perPage);
                    a ? requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            b.enableTransition(), b.sliderFrame.style[b.transformProperty] = "translate3d(" + d + "px, 0, 0)";
                        });
                    }) : this.sliderFrame.style[this.transformProperty] = "translate3d(" + d + "px, 0, 0)";
                }
            }, {
                key: "updateAfterDrag",
                value: function() {
                    var a = (this.config.rtl ? -1 : 1) * (this.drag.endX - this.drag.startX), b = Math.abs(a), c = this.config.multipleDrag ? Math.ceil(b / (this.selectorWidth / this.perPage)) : 1, d = a > 0 && this.currentSlide - c < 0, e = a < 0 && this.currentSlide + c > this.innerElements.length - this.perPage;
                    a > 0 && b > this.config.threshold && this.innerElements.length > this.perPage ? this.prev(c) : a < 0 && b > this.config.threshold && this.innerElements.length > this.perPage && this.next(c), 
                    this.slideToCurrent(d || e);
                }
            }, {
                key: "resizeHandler",
                value: function() {
                    this.resolveSlidesNumber(), this.currentSlide + this.perPage > this.innerElements.length && (this.currentSlide = this.innerElements.length <= this.perPage ? 0 : this.innerElements.length - this.perPage), 
                    this.selectorWidth = this.selector.offsetWidth, this.buildSliderFrame();
                }
            }, {
                key: "clearDrag",
                value: function() {
                    this.drag = {
                        startX: 0,
                        endX: 0,
                        startY: 0,
                        letItGo: null,
                        preventClick: this.drag.preventClick
                    };
                }
            }, {
                key: "touchstartHandler",
                value: function(a) {
                    -1 !== [ "TEXTAREA", "OPTION", "INPUT", "SELECT" ].indexOf(a.target.nodeName) || (a.stopPropagation(), 
                    this.pointerDown = !0, this.drag.startX = a.touches[0].pageX, this.drag.startY = a.touches[0].pageY);
                }
            }, {
                key: "touchendHandler",
                value: function(a) {
                    a.stopPropagation(), this.pointerDown = !1, this.enableTransition(), this.drag.endX && this.updateAfterDrag(), 
                    this.clearDrag();
                }
            }, {
                key: "touchmoveHandler",
                value: function(a) {
                    if (a.stopPropagation(), null === this.drag.letItGo && (this.drag.letItGo = Math.abs(this.drag.startY - a.touches[0].pageY) < Math.abs(this.drag.startX - a.touches[0].pageX)), 
                    this.pointerDown && this.drag.letItGo) {
                        a.preventDefault(), this.drag.endX = a.touches[0].pageX, this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, 
                        this.sliderFrame.style.transition = "all 0ms " + this.config.easing;
                        var b = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide, c = b * (this.selectorWidth / this.perPage), d = this.drag.endX - this.drag.startX, e = this.config.rtl ? c + d : c - d;
                        this.sliderFrame.style[this.transformProperty] = "translate3d(" + (this.config.rtl ? 1 : -1) * e + "px, 0, 0)";
                    }
                }
            }, {
                key: "mousedownHandler",
                value: function(a) {
                    -1 !== [ "TEXTAREA", "OPTION", "INPUT", "SELECT" ].indexOf(a.target.nodeName) || (a.preventDefault(), 
                    a.stopPropagation(), this.pointerDown = !0, this.drag.startX = a.pageX);
                }
            }, {
                key: "mouseupHandler",
                value: function(a) {
                    a.stopPropagation(), this.pointerDown = !1, this.selector.style.cursor = "-webkit-grab", 
                    this.enableTransition(), this.drag.endX && this.updateAfterDrag(), this.clearDrag();
                }
            }, {
                key: "mousemoveHandler",
                value: function(a) {
                    if (a.preventDefault(), this.pointerDown) {
                        "A" === a.target.nodeName && (this.drag.preventClick = !0), this.drag.endX = a.pageX, 
                        this.selector.style.cursor = "-webkit-grabbing", this.sliderFrame.style.webkitTransition = "all 0ms " + this.config.easing, 
                        this.sliderFrame.style.transition = "all 0ms " + this.config.easing;
                        var b = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide, c = b * (this.selectorWidth / this.perPage), d = this.drag.endX - this.drag.startX, e = this.config.rtl ? c + d : c - d;
                        this.sliderFrame.style[this.transformProperty] = "translate3d(" + (this.config.rtl ? 1 : -1) * e + "px, 0, 0)";
                    }
                }
            }, {
                key: "mouseleaveHandler",
                value: function(a) {
                    this.pointerDown && (this.pointerDown = !1, this.selector.style.cursor = "-webkit-grab", 
                    this.drag.endX = a.pageX, this.drag.preventClick = !1, this.enableTransition(), 
                    this.updateAfterDrag(), this.clearDrag());
                }
            }, {
                key: "clickHandler",
                value: function(a) {
                    this.drag.preventClick && a.preventDefault(), this.drag.preventClick = !1;
                }
            }, {
                key: "remove",
                value: function(a, b) {
                    if (a < 0 || a >= this.innerElements.length) throw new Error("Item to remove doesn't exist 😭");
                    var c = a < this.currentSlide, d = this.currentSlide + this.perPage - 1 === a;
                    (c || d) && this.currentSlide--, this.innerElements.splice(a, 1), this.buildSliderFrame(), 
                    b && b.call(this);
                }
            }, {
                key: "insert",
                value: function(a, b, c) {
                    if (b < 0 || b > this.innerElements.length + 1) throw new Error("Unable to inset it at this index");
                    if (-1 !== this.innerElements.indexOf(a)) throw new Error("The same item in a carousel? Really?");
                    var d = b <= this.currentSlide > 0 && this.innerElements.length;
                    this.currentSlide = d ? this.currentSlide + 1 : this.currentSlide, this.innerElements.splice(b, 0, a), 
                    this.buildSliderFrame(), c && c.call(this);
                }
            }, {
                key: "prepend",
                value: function(a, b) {
                    this.insert(a, 0), b && b.call(this);
                }
            }, {
                key: "append",
                value: function(a, b) {
                    this.insert(a, this.innerElements.length + 1), b && b.call(this);
                }
            }, {
                key: "destroy",
                value: function() {
                    var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], b = arguments[1];
                    if (this.detachEvents(), this.selector.style.cursor = "auto", a) {
                        for (var c = document.createDocumentFragment(), d = 0; d < this.innerElements.length; d++) c.appendChild(this.innerElements[d]);
                        this.selector.innerHTML = "", this.selector.appendChild(c), this.selector.removeAttribute("style");
                    }
                    b && b.call(this);
                }
            } ], [ {
                key: "mergeSettings",
                value: function(a) {
                    var b = {
                        selector: ".siema",
                        duration: 200,
                        easing: "ease-out",
                        perPage: 1,
                        startIndex: 0,
                        draggable: !0,
                        multipleDrag: !0,
                        threshold: 20,
                        loop: !1,
                        rtl: !1,
                        onInit: function() {},
                        onChange: function() {}
                    }, c = a;
                    for (var d in c) b[d] = c[d];
                    return b;
                }
            }, {
                key: "webkitOrNot",
                value: function() {
                    return "string" == typeof document.documentElement.style.transform ? "transform" : "WebkitTransform";
                }
            } ]), a;
        }();
        b.default = g, a.exports = b.default;
    } ]);
});
//]]>
