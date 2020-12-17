var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    dotsElem = document.getElementsByClassName('dotItem'),
    // dots = document.getElementsByClassName('dots')[0],
    dot0 = document.getElementById('dot0'),
    dot1 = document.getElementById('dot1'),
    dot2 = document.getElementById('dot2'),
    dot3 = document.getElementById('dot3'),
    dot4 = document.getElementById('dot4');

function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    // clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // mouse events
    items.onmousedown = dragStart;

    // touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchmove', dragAction);
    items.addEventListener('touchend', dragEnd);

    // click events - and DOTS
    prev.addEventListener('click', function () {
        shiftSlide(-1);
        //dots dir -1
        dotActiveLast()
    });
    next.addEventListener('click', function () {
        shiftSlide(1);
        //dots dir 1
        dotActive()
    });


    // transition events
    items.addEventListener('transitionend', checkIndex);

    function dragStart (e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction (e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd () {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
                //dots dir swipes 1
                dotActive()

            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
                //dots dir swipes -1
                dotActiveLast()
            }
        };

        allowShift = false;
    }

    function checkIndex (){
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }


    // making dot active /else- if "index gon' be > length", go to FIRST slide/
    function dotActive() {
        for (let i = 0; i < dotsElem.length; i++) {
            if (index >=0 && index < dotsElem.length){
                dotsElem[i].classList.remove('active');
            } else {
                dotsElem[i].classList.remove('active');
                dotsElem[0].classList.add('active');            // active first sl
            }
        }
        if (index >= 0 && index < dotsElem.length) {
            dotsElem[index].classList.add('active');
        }
    }

    // making dot active /else- if "index gon' be< 0", go to LAST slide/
    function dotActiveLast() {
        for (let i = 0; i < dotsElem.length; i++) {
            if (index >=0 && index < dotsElem.length){
                dotsElem[i].classList.remove('active');
            } else {
                dotsElem[i].classList.remove('active');
                dotsElem[dotsElem.length - 1].classList.add('active'); // active last sl
            }
        }
        if (index >= 0 && index < dotsElem.length) {
            dotsElem[index].classList.add('active');
        }
    }

    // dot eventListeners, changing slides & active dots.
    //this can be in one eventListener.
    dot0.addEventListener('click',function () {
        items.style.left = (-slideSize) + "px";
        index = 0;

        dotActive()
    });
    dot1.addEventListener('click',function () {
        items.style.left = (-slideSize*2) + "px";
        index = 1;

        dotActive()
    });
    dot2.addEventListener('click',function () {
        items.style.left = (-slideSize*3) + "px";
        index = 2;

        dotActive()
    });
    dot3.addEventListener('click',function () {
        items.style.left = (-slideSize*4) + "px";
        index = 3;

        dotActive()
    });
    dot4.addEventListener('click',function () {
        items.style.left = (-slideSize*5) + "px";
        index = 4;

        dotActive()
    });

}

slide(slider, sliderItems, prev, next);

