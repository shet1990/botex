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

})
