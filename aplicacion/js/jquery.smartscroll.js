/*!
 * jQuery smartscroll plugin 
 * Original author: @responsivewemmobile
 * Version 1.0 2013-01-16
 * Further changes, comments: @responsivewemmobile.com
 */
;(function ( $, window, document, undefined ) {
    
    var pluginName = 'smartscroll',
	    defaults = {
	    	section: '.section', //default section class
	        anchor: '.scroll', //default main navigation link class
	        fullscreen: false, //enable fullscreen sections
            onefull: false,
	        activelink: 'active', //class to set selected link menu
            nav: true,
            controls: true,
	        totop: true, //enable the scroll to top anchor
            speed: 500,
            totopspeed: 1000
	    };

	/* global vars */
	timeline = []; //array containing the menu anchor
	offsets = []; //array with the offset of each section from the top
	current = null;

    function Plugin( element, options ) {
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
    	var _self = this;
    	
        _self.sizeSection();
        _self.generateNavigationTimeline();    	
    	var indicator = this.closestSection($(window).scrollTop());
    	_self.setControlLinks(indicator);
    	_self.navSelect(timeline[indicator]);
    	_self.toTopAnchor();

        //bind all .scroll class with click for a smart scroll
        $(_self.options.anchor).each(function(){
        	$(this).bind('click', function(event) {
				event.preventDefault();
				_self.goToSection(this.href);
			});
        });

        //hide or show main navigation 
        if(!_self.options.nav) {
            $('.smartscroll-nav').css({display: 'none'});
        }

        //bind resize ecent
        $(window).bind('resize', function() {
            _self.sizeSection();
            _self.sizeSection();
            _self.generateNavigationTimeline();     
            var indicator = _self.closestSection($(window).scrollTop());
            _self.setControlLinks(indicator);
            _self.navSelect(timeline[indicator]);
            _self.toTopAnchor();
        });

        //bind scroll event to highlight the corresponding section
        $(window).bind('scroll', function() {
			//Calls the function to retrieve the closest section to top and and highlight it
			var indicator = _self.closestSection($(window).scrollTop());
			_self.setControlLinks(indicator);
			_self.navSelect(timeline[indicator]);	
			
			//show or hide the scroll to top button depending on the position from top
			if ($(this).scrollTop() > 300) {
				$('a.smartscroll-totop').stop().animate({opacity: 1}, 100);
			} else {
				$('a.smartscroll-totop').stop().animate({opacity: 0}, 100);
			}
		});
    };

    //enable or disable to top anchor
    Plugin.prototype.toTopAnchor = function () {
    	if(this.options.totop) {
    		$('a.smartscroll-totop').css({opacity: 0});
    		this.backToTop();
    	}
    	else $('a.smartscroll-totop').css({display: 'none'});
    }

   	//animate scroll to top
    Plugin.prototype.backToTop = function () {
        var _self = this;
    	$('a.smartscroll-totop').bind('click', function(){
    		$("html, body").stop().animate({ scrollTop: 0 }, _self.options.totopspeed);
    		return false;
    	});
    }

    //animate scroll to clicked section
    Plugin.prototype.goToSection = function (url) {
    	var _self = this;
		var parts = url.split("#");
        var trgt = parts[1];

        var target_offset = $("#"+trgt).offset();
        var target_top = target_offset.top;

    	$('html, body').stop().animate({scrollTop:target_top}, _self.options.speed);
    }

    //get the closest sectin to top
    Plugin.prototype.closestSection = function (currentPos) {
		y = currentPos; //the current position of scroll passed from the scroll event.
        var controls = []; //new array to contain abs values of distance.

        $.each(offsets, function(){
        	controls.push(Math.abs(this - y));       
            //stores the abs value of the distance from current scroll position to
            //offsetTop of each section.
        })
        min = Math.min.apply( Math, controls ); //which abs value is smallest?

        return $.inArray(min, controls); //returns the array index of lowest abs value.
    }

    Plugin.prototype.setControlLinks = function (indicator) {
        if(this.options.controls) {
        	if(indicator == 0) {
        		$('.smartscroll-controls > a.next').attr('href', timeline[indicator+1]);
        		$('.smartscroll-controls > a.prev').stop().animate({opacity: 0}, 100);
        	} else if(indicator == timeline.length-1) {
        		$('.smartscroll-controls > a.prev').attr('href', timeline[indicator-1]);
        		$('.smartscroll-controls > a.next').stop().animate({opacity: 0}, 100);
        	} else {
        		$('.smartscroll-controls > a.next').stop().animate({opacity: 1}, 100);
        		$('.smartscroll-controls > a.prev').stop().animate({opacity: 1}, 100);
        		$('.smartscroll-controls > a.next').attr('href', timeline[indicator+1]);
        		$('.smartscroll-controls > a.prev').attr('href', timeline[indicator-1]);
        	}
        } else {
            $('.smartscroll-controls').css({display: 'none'});
        }
    }

    //get all navigation sections and offsets from the top
    Plugin.prototype.generateNavigationTimeline = function () {
		$(this.options.section).each(function(index) {
			timeline[index] = '#'+$(this).attr('id');
			offsets[index] = Math.round($(this).position().top);
		})
	}

	//make each section fullscreen
	Plugin.prototype.sizeSection = function () {
        if(this.options.fullscreen) {
    	   $(this.options.section).css({'min-width': $(window).width(), 'min-height': $(window).height()});
        }

        $('.thisfull').css({'min-width': $(window).width(), 'min-height': $(window).height()});
        
    }

    //select the navigation link closer to top
    Plugin.prototype.navSelect = function (selector) {
    	$(this.options.anchor).parent().removeClass(this.options.activelink);
    	$('.smartscroll-nav a[href="'+selector+'"]'+this.options.anchor).parent().addClass(this.options.activelink);
    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document ); 