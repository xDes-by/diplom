var list = $('.main-rotate-circle .mrc-item');
var rotateElement = document.querySelector('.bg-rotate');
var big_circle = document.querySelector('.main-rotate-circle');
var blur_circle = document.querySelector('.blur-rotate-circle');
var length = $('.right-menu .sub-mrc').length - 1;
var rotate = 0;
var arrayColor = ['#F5C069', '#82B9BA', '#C47EAA', '#9989D0'];
var position = 0;

$('#next').on('click', function(){
    rotate = rotate + 360 / list.length;
    position = position + 1 >= arrayColor.length ? 0 : position + 1;
    console.log("aa")
    nextitem();
    blocknext();
});

function nextitem(){
    rotateElement.style.transform = 'rotate('+rotate+'deg)';
    big_circle.style.transform = 'rotate('+rotate+'deg)';
    blur_circle.style.transform = 'rotate('+(rotate-20)+'deg)';
    rotateElement.style.backgroundColor = arrayColor[position];

    document.getElementById('next').style.pointerEvents = 'none';
    big_circle.classList.add('mrc-item-blur');
    setTimeout(function(){
        document.getElementById('next').style.pointerEvents = 'unset';
        big_circle.classList.remove('mrc-item-blur');
    }, 1000)
}

$('#back').on('click', function(){
    rotate = rotate - 360 / list.length;
    position = position < 0 ? arrayColor.length -1 : position - 1;
    backitem();
    blockprev();
});

function backitem(){
    rotateElement.style.transform = 'rotate('+rotate+'deg)';
    big_circle.style.transform = 'rotate('+rotate+'deg)';
    blur_circle.style.transform = 'rotate('+(rotate-20)+'deg)';
    rotateElement.style.backgroundColor = arrayColor[position];

    document.getElementById('back').style.pointerEvents = 'none';
    big_circle.classList.add('mrc-item-blur');
    setTimeout(function(){
        document.getElementById('back').style.pointerEvents = 'unset';
        big_circle.classList.remove('mrc-item-blur');
    }, 1000)
}

//////////////////////////////////MAIN PAGE BLOCK SWIPE////////////////////////////////////

$(document).ready(function() {
    $('.right-menu .sub-mrc').eq(0).addClass('active').fadeIn(1000);
});

function blocknext() {
    $('.right-menu .sub-mrc').each(function(index) {
        if($(this).hasClass('active') && index != length) {
            $(this).removeClass('active').fadeOut(1000).next('.sub-mrc').addClass('active').delay(1000).fadeIn(1000);
            return false;
        } else if (index == length) {
            $(this).removeClass('active').fadeOut(1000);
            $('.right-menu .sub-mrc').eq(0).addClass('active').delay(1000).fadeIn(1000);
            return false;
        }
    });
};

function blockprev() {
    $('.right-menu .sub-mrc').each(function(index) {
        if($(this).hasClass('active') && index != 0) {
            $(this).removeClass('active').fadeOut(1000).prev('.sub-mrc').addClass('active').delay(1000).fadeIn(1000);
            return false;
        } else if ($(this).hasClass('active') && index == 0) {
            $(this).removeClass('active').fadeOut(1000);
            $('.right-menu .sub-mrc').eq(3).addClass('active').delay(1000).fadeIn(1000);
            return false;
        }
    });
};

//////////////////////////////////TEST////////////////////////////////////

$('#checkbox').click(function() {
    if ($('#checkbox').is(':checked')){
        console.log("1")
    } else {
        console.log("0")
    }
});


//////////////////////////////////AJAX////////////////////////////////////

$(document).ready(function() {
    const forms = $('form[name=filter]');
    forms.on( "submit", function( event ) {
        console.log("a")
        event.preventDefault();
        url = this.action;
        params = new URLSearchParams(new FormData(this)).toString();
        ajax_send(url, params);
    });
});

function ajax_send(url, params){
    $.ajax({
        url: url,
        data: params,
        type: "GET",
        success: (data) => {
          console.log(data)
          render_page(data)
        },
        error: (error) => {
          console.log(error);
        }
      });

};

function render_page(data){
    template = Hogan.compile(html);
    output = template.render(data);
    const div = document.querySelector('.products-container');
    div.innerHTML = output;
}

var html = '\
{{#products}}\
    <div class="product-item-cart">\
        <img class="img-item-cart" src="/media/{{ image }}" alt="">\
        <b>{{name}}</b> \
        <p>{{description}}</p>\
        <b>{{price }} </b>\
    </div>\
{{/products}}'

///////////////////////////