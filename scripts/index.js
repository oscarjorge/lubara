
$(document).ready(function () {
    $('body').scrollspy({ target: '#navbar-scrollspy' })
    new WOW().init();

    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
    function animate() {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 800) {
                $(this).css("visibility", "visible");

                $(this).addClass($(this).closest(".bloque").data("animatedclass"));
            }


        });
    }
    animate();
    $(window).scroll(function () {
        animate();
    });
    $(".rotate").click(function () {
        $(this).toggleClass("down");
        $(this).closest('.bloque-servicio').find('.contenido-subbloque').toggle({
            duration: 700
        });
    });

    $("form").validate({
        rules: {
            nombre: {
                required: true
            },
            mail: {
                required: true,
                email: true
            },
            asunto: {
                required: true
            },
            mensaje: {
                required: true
            }
        },
        errorPlacement: function (error, element) {
            // Don't show error
        }
    });
});

function sendMail(nombre, mail, asunto, mensaje) {
    

    if ($("form").valid()) {
        $('#btnEnviar>i').toggleClass('fa-paper-plane-o fa-spinner fa-pulse');
        $('#sobre').toggleClass('fa-envelope fa-envelope-open');
        var parametros = {
            "Nombre": nombre,
            "Email": mail,
            "Asunto": asunto,
            "Mensaje": mensaje,
        };
        $.ajax({
            data: parametros,
            url: 'http://apiescribano.antonioescribano.es/api/contacto/EnviarMailComentarioLubara',
            type: 'POST',

            success: function (response) {
                $('#btnEnviar').removeClass('btn-danger');
                $("form")[0].reset();
                $("i.prefix, label").removeClass('active');
                var options =  {
                    content: "El mensaje se ha enviado correctamente",
                }
                $.snackbar(options);
                console.log(response);
            },
            error:function(){
                $('#btnEnviar').addClass('btn-danger'); 
                var options =  {
                    content: "Ha ocurrido un error y no se ha podido enviar el mensaje.",
                }
                $.snackbar(options);
            },
            complete:function(){
                setTimeout(function(){ 
                    $('#btnEnviar>i').toggleClass('fa-paper-plane-o fa-spinner fa-pulse');
                    $('#sobre').toggleClass('fa-envelope fa-envelope-open');
                }, 1500);
            }
        });

    }

}