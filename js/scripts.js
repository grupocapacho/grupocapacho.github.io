$(window).load(function () {

    resize();
    ponerEnMedio();
    navegar();
    portafolio();

    $('body').fadeTo('slow', 1, function () {
        $('#logo').fadeTo('slow', 1, function () {
            $('#nombre, #dmi').fadeTo('slow', 1, function () {
                $('nav').fadeTo('fast', 1);
            })
        })
    });

});

$(window).resize(function () {
    resize();
    ponerEnMedio();
    portafolio();
});

// Da la altura a las secciones
function resize() {
    $.each($('.seccion'), function (index, value) {
        if ($(value).height() < $(window).height())
            $(value).height($(window).height());
    })
};

// Alinea verticalmente los elementos
function ponerEnMedio() {
    jQuery('.seccion .container').vAlign();
};

(function (jQuery) {
    // VERTICALLY ALIGN FUNCTION
    jQuery.fn.vAlign = function () {
        return this.each(function (i) {
            var ah = jQuery(this).height();
            var ph = jQuery(this).parent().height();
            var mh = (ph - ah) / 2;
            jQuery(this).css('padding-top', mh);
        });
    };
})(jQuery);

//Navegación
function navegar() {
    $('.desplazar').on('click', function (e) {
        e.preventDefault();
        var $link = $(this);
        var anchor = $link.attr('href');
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top + 100
        }, 1500);
    });
};


//Portafolio

 
function portafolio() {

    jQuery(".proy-cont").on({
        mouseenter: function () {
            jQuery(this).find('.proy-blur').fadeIn('fast');
            jQuery(this).find('.proy-img').addClass('blur');
            jQuery(this).find('.proy-item').addClass('show');
        },
        mouseleave: function () {
            jQuery(this).find('.proy-blur').fadeOut();
            jQuery(this).find('.proy-img').removeClass('blur');
            jQuery(this).find('.proy-item').removeClass('show');
        }
    });
    
     
    if (!jQuery('.over-layer').css('mix-blend-mode')) {
        jQuery('.over-layer').addClass('no-blend');
        jQuery('#cot-layer').addClass('no-blend');
    }

};

    
