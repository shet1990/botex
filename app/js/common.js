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

        fadeUpAnimate();
    });

    fadeUpAnimate();
    /* Конец */

    /* Портфолио */
    $("[data-fancybox='gallery']").fancybox({
        openEffect	: 'elastic',
        closeEffect	: 'elastic',
        loop        : true,
    });
    /* Конец */

    /* Модалки */
    $(".link__modal").fancybox({
        openEffect	: 'elastic',
        closeEffect	: 'elastic',
        type: 'inline',
        padding     : 0,
        margin      : 0,
        closeBtn    : false,
        fitToView	: false,
        width		: '100%',
        height		: '100%',
        autoSize	: false,
        closeClick	: false,
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

function fadeUpAnimate(){
    let animateScrollStart = 60;
    let animateScrollBottom = $(window).scrollTop() + $(window).height();
    let animateScrollBottomStart = animateScrollBottom - animateScrollStart;

    $('.fade__up').each(function () {
        var offSetTopAnimateBlock = $(this).offset().top;
        if (animateScrollBottomStart > offSetTopAnimateBlock) {
            $(this).addClass('animate');
        } else {
            $(this).removeClass('animate');
        }
    })
}

//Detect Closest Edge
function closestEdge(x,y,w,h) {
    var topEdgeDist = distMetric(x,y,w/2,0);
    var bottomEdgeDist = distMetric(x,y,w/2,h);
    var leftEdgeDist = distMetric(x,y,0,h/2);
    var rightEdgeDist = distMetric(x,y,w,h/2);
    var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
    switch (min) {
        case leftEdgeDist:
            return "left";
        case rightEdgeDist:
            return "right";
        case topEdgeDist:
            return "top";
        case bottomEdgeDist:
            return "bottom";
    }
}

//Detect Closest Edge
function closestEdge(x,y,w,h) {
    var topEdgeDist = distMetric(x,y,w/2,0);
    var bottomEdgeDist = distMetric(x,y,w/2,h);
    var leftEdgeDist = distMetric(x,y,0,h/2);
    var rightEdgeDist = distMetric(x,y,w,h/2);
    var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
    switch (min) {
        case leftEdgeDist:
            return "left";
        case rightEdgeDist:
            return "right";
        case topEdgeDist:
            return "top";
        case bottomEdgeDist:
            return "bottom";
    }
}

//Distance Formula
function distMetric(x,y,x2,y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
}


var boxes = document.querySelectorAll(".foto__cards");

for(var i = 0; i < boxes.length; i++){

    boxes[i].onmouseenter = function(e){
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var edge = closestEdge(x,y,this.clientWidth, this.clientHeight);
        var overlay = this.childNodes[1];
        var image = this.childNodes[0];
        console.log(edge);

        switch(edge){
            case "left":
                //tween overlay from the left
                overlay.style.top = "0%";
                overlay.style.left = "-100%";
                TweenMax.to(overlay, .5, {left: '0%'});
                TweenMax.to(image, .5, {scale: 1.2});
                break;
            case "right":
                overlay.style.top = "0%";
                overlay.style.left = "100%";
                //tween overlay from the right
                TweenMax.to(overlay, .5, {left: '0%'});
                TweenMax.to(image, .5, {scale: 1.2});
                break;
            case "top":
                overlay.style.top = "-100%";
                overlay.style.left = "0%";
                //tween overlay from the right
                TweenMax.to(overlay, .5, {top: '0%'});
                TweenMax.to(image, .5, {scale: 1.2});
                break;
            case "bottom":
                overlay.style.top = "100%";
                overlay.style.left = "0%";
                //tween overlay from the right
                TweenMax.to(overlay, .5, {top: '0%'});
                TweenMax.to(image, .5, {scale: 1.2});
                break;
        }
    };


    boxes[i].onmouseleave = function(e){
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var edge = closestEdge(x,y,this.clientWidth, this.clientHeight);
        var overlay = this.childNodes[1];
        var image = this.childNodes[0];

        switch(edge){
            case "left":
                TweenMax.to(overlay, .5, {left: '-100%'});
                TweenMax.to(image, .5, {scale: 1.0});
                break;
            case "right":
                TweenMax.to(overlay, .5, {left: '100%'});
                TweenMax.to(image, .5, {scale: 1.0});
                break;
            case "top":
                TweenMax.to(overlay, .5, {top: '-100%'});
                TweenMax.to(image, .5, {scale: 1.0});
                break;
            case "bottom":
                TweenMax.to(overlay, .5, {top: '100%'});
                TweenMax.to(image, .5, {scale: 1.0});
                break;
        }
    };
}





