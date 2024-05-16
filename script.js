const zdj = {
    1: [
        'https://cdn.pixabay.com/photo/2016/12/05/11/39/fox-1883658_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/19/18/15/fox-5064828_960_720.jpg',
        'https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588_640.jpg',
        'https://cdn.pixabay.com/photo/2024/04/26/05/56/fox-8721196_640.png',
        'https://cdn.pixabay.com/photo/2020/11/06/23/59/fox-5719159_640.jpg',
        'https://cdn.pixabay.com/photo/2024/02/16/11/17/ai-generated-8577325_640.jpg',
        'https://cdn.pixabay.com/photo/2015/09/25/13/30/animal-957382_640.jpg',
        'https://cdn.pixabay.com/photo/2015/09/25/13/31/animal-957388_640.jpg',
    ],
    2: [
        'https://cdn.pixabay.com/photo/2017/09/29/13/30/cat-2799082_640.jpg',
        'https://cdn.pixabay.com/photo/2020/07/22/12/08/cats-eyes-5428855_640.jpg',
        'https://cdn.pixabay.com/photo/2016/02/12/20/15/lucky-cat-1196761_640.jpg',
        'https://cdn.pixabay.com/photo/2017/07/22/15/19/cat-2528930_640.jpg',
        'https://cdn.pixabay.com/photo/2020/05/19/16/32/cat-5191593_640.jpg',
        'https://cdn.pixabay.com/photo/2019/03/01/10/03/cat-4027636_640.jpg',
        'https://cdn.pixabay.com/photo/2017/04/04/14/29/cat-2201460_640.jpg',
        'https://cdn.pixabay.com/photo/2017/07/20/02/03/cat-2520988_640.jpg'
    ],
    3: [
        'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg',
        'https://cdn.pixabay.com/photo/2023/04/15/17/08/bernese-mountain-dog-7928156_640.jpg',
        'https://cdn.pixabay.com/photo/2023/09/19/12/34/dog-8262506_640.jpg',
        'https://cdn.pixabay.com/photo/2024/02/05/16/23/labrador-8554882_640.jpg',
        'https://cdn.pixabay.com/photo/2018/05/11/08/11/dog-3389729_640.jpg',
        'https://cdn.pixabay.com/photo/2015/07/09/19/32/dog-838281_640.jpg',
        'https://cdn.pixabay.com/photo/2016/01/05/17/51/maltese-1123016_640.jpg',
        'https://cdn.pixabay.com/photo/2020/03/28/16/03/dog-4977599_640.jpg'
    ]
}

const nazwy = ['Lisy', 'Koty', 'Psy'];
document.addEventListener("DOMContentLoaded", () => {
    let ktoreTeraz = 1;
    function wypelnijZdj() {
        for (let i = 0; i <= 3; i++) {
            let div = document.querySelectorAll('.maleZdj')[i];
            div.style.backgroundImage = `url(${zdj[ktoreTeraz][i]})`
        }
        for (let i = 4; i <= 7; i++) {
            let div = document.querySelectorAll('.duzeZdj')[i - 4];
            div.style.backgroundImage = `url(${zdj[ktoreTeraz][i]})`
        }
        document.getElementById("nazwa").innerHTML = nazwy[ktoreTeraz - 1]
    }
    
    wypelnijZdj();   

    let card = document.querySelector('.wszystkieZdj');
    let cardStartX = 0;
    let cardCurrentX = 0;

    function onStart(evt) {
        if (evt.touches) evt = evt.touches[0];
        cardStartX = evt.pageX - cardCurrentX;
        card.classList.add('no-hover');
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchmove', onMove);
        window.addEventListener('touchend', onEnd);
    }

    function onMove(evt) {
        if (evt.touches) evt = evt.touches[0];
        cardCurrentX = evt.pageX - cardStartX;
        card.style.transform = `translateX(${cardCurrentX}px) rotate(${cardCurrentX / 10}deg)`;
    }

    function onEnd(evt) {
        card.classList.remove('no-hover');
        if (Math.abs(cardCurrentX) > 150) { 
            card.style.transition = 'ease-out 0.5s';
            card.style.transform = `translateX(${cardCurrentX > 0 ? 500 : -500}px) rotate(${cardCurrentX > 0 ? 30 : -30}deg)`;

            ktoreTeraz = cardCurrentX > 0 ? ktoreTeraz + 1 : ktoreTeraz - 1;
            card.style.transform = `translateX(0px) rotate(0deg)`;
            cardCurrentX = 0;
            cardStartX = 0;
            if (ktoreTeraz > Object.keys(zdj).length) ktoreTeraz = 1;
            if (ktoreTeraz < 1) ktoreTeraz = Object.keys(zdj).length;
            wypelnijZdj();
        } else {
            card.style.transition = 'ease-out 0.5s';
            card.style.transform = `translateX(0px) rotate(0deg)`;
            cardCurrentX = 0;
        }
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
    }

    card.addEventListener('mousedown', onStart);
    card.addEventListener('touchstart', onStart);
});