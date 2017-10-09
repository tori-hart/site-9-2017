;(function ($) {
  'use strict';
  var $body    = $('html, body'), // Define jQuery collection
      content  = $('#main').smoothState({
        onStart : {
          duration: 500,
          render: function () {
            content.toggleAnimationClass('is-exiting');

            // Scroll user to the top
            $body.animate({ 'scrollTop': 0 });

          }
        }
      }).data('smoothState');
})(jQuery);

(function($) {
  $.fn.scalem = function(oOptions) {
    var maxwidth = 5000;
    var oSettings = $.extend({
        ratio: 0.9,        // Scale ratio (1 = 100%)
        reference: null, // Text will scale relative to this element
        styles: ''       // List of styles to scale (useful for buttons)
      }, oOptions),
      updateStyles = function(o, e) {
        var $o = $(o),
          $oP = $o.parent(),
          // Create clone to get true text width
          $o2 = $o.clone().css({
            'width': 'auto',
            'display': 'none',
            'white-space': 'nowrap'
          }),
          // If data attribute exists, use that instead
          $ref = $(o.getAttribute('data-scale-reference') || oSettings.reference),
          // Array of styles to scale
          aStyles = ('' + (o.getAttribute('data-scale-styles') || oSettings.styles)).split(' '),
          // Scale ratio
          nRatio = Math.max(parseFloat(o.getAttribute('data-scale-ratio') || oSettings.ratio), 0),
          // Reference width (set to parent width by default)
          nRefWidth = ($ref.length) ? $ref.width() : $oP.width(),
          nTargetWidth,
          // Text width
          nTextWidth;
        // Validate ratio
        if (isNaN(nRatio)) nRatio = 1;
        // Account for scrollbar?
        if ($oP[0].scrollHeight>$oP.height()) nRefWidth -= 17;
        nTargetWidth = nRefWidth * nRatio;
        // Append clone to body to get inline width
        $o2.appendTo('body');
        nTextWidth = $o2.width();
        // Exit if something doesn't look right
        if (nTargetWidth===0 || nTextWidth===nRefWidth) {
          $o2.remove();
          return;
        }
        // Scale the text! (6px is minimum font size to get accurate ratio)
        for (var i=Math.round((6/$o2.css('font-size', '6px').width())*nTargetWidth), o2=$o2[0]; i<nTargetWidth; ++i) {
          // Update font-size using native method for better performance
          // (see http://jsperf.com/style-vs-csstext-vs-setattribute)
          o2.style.fontSize = i + 'px';
          if ($o2.width() / nRefWidth > nRatio) {
            if (i > maxwidth ) {
              i = maxwidth;
            }
            $o.css('font-size', (i-1) + 'px');
            $o.css('line-height', (i-1) + 'px');
            break;
          }
        }
        // Clean up
        $o2.remove();
        // Scale additional styles
        if (aStyles[0]) {
          var nScale = $o.width() / nTextWidth,
            oStyles = {};
          for (var i=0, imax=aStyles.length; i<imax; ++i) {
            if (!aStyles[i]) continue;
            oStyles[aStyles[i]] = ((aStyles[i]==='width') ? nTargetWidth : Math.round(parseFloat($o.css(aStyles[i])) * nScale)) + 'px';
          }
          $o.css(oStyles);
        }
      };
    return this.each(function() {
      // This scope is required for the resize handler
      var o = this;
      // Set font size on load
      updateStyles(o);
      // Update CSS styles upon resize
      $(window).resize(function(e) {
        updateStyles(o, e);
      });
    });
  };
}(jQuery));

jQuery(document).ready(function($) {
    $('.auto-size').scalem();

});

jQuery(document).ready(function($) {
  $current_page = $('.section--animated').attr('id')
  $nav_id = '#'+$current_page+'nav'
  $($nav_id).addClass('active');

});
