$(function() {

    /* Анимация гамбургера */
    $('.my_hamburger').click(function(){
        //Появление
        if(!$(this).hasClass('is-active')){
            $(this).addClass('is-active');
            $('.head__menu').addClass('is-active');
            $('body').addClass('fixed');
        } else {
            //Скрытие
            $(this).removeClass('is-active');
            $('.head__menu').removeClass('is-active');
            $('body').removeClass('fixed');
        }
    });
    /* Конец */

    /* Всплывающие блоки + кнопка вверх */

    $('#arrow__up').on('click', function () {
        $('body,html').animate({scrollTop: 0}, 1000);
    });

    $(window).on('scroll', function (e) {
        //Изменяем фон хедера в зависимости от фона
        let header = $('#header').height();
        if ((header - 200) < $(window).scrollTop()) {
            $('#arrow__up').addClass('animate');
        } else {
            $('#arrow__up').removeClass('animate');
        }

        let animateScrollStart = 60;
        let animateScrollBottom = $(window).scrollTop() + $(window).height();
        let animateScrollBottomStart = animateScrollBottom - animateScrollStart;

        $('.fade__up, .fade__right').each(function () {
            var offSetTopAnimateBlock = $(this).offset().top;
            if (animateScrollBottomStart > offSetTopAnimateBlock) {
                $(this).addClass('animate');
            } else {
                $(this).removeClass('animate');
            }
        })
    });
    /* Конец */

    /* Портфолио */
    $(".fancy").fancybox({
        padding     : 0,
        openEffect	: 'elastic',
        closeEffect	: 'elastic'
    });
    /* Конец */

    /* Слайдер */
    if($('div').hasClass('blog__list')){
        $('.blog__list').slick({
            infinite: false,
            loop: true,
            dots: true,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 680,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        })
    }

    if($('div').hasClass('review__list')){
        $('.review__list').slick({
            infinite: false,
            loop: true,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        })
    }
    /* Конец */

})
