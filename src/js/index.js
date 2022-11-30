
window.addEventListener('DOMContentLoaded', function(){
'use strict';
    // появление и исчезновение модальных окон
const modal2 = document.querySelector('#reviews__form'); // модальное окно для отзывов
const modal1 = document.querySelector('.modal1');
const modal1Close = document.querySelectorAll('.modal1__close');
const buttonModal1 = document.querySelectorAll('.form');
buttonModal1.forEach(function(elem, index){
    elem.addEventListener('click', function(e){
        if(index != 2){
            modal1.classList.add('modal-appearance');
            modal1.classList.remove('modal-disappearance');
            modal1.style.visibility = 'visible';
        }
       
        if(index == 2){
            modal2.classList.add('modal-appearance');
            modal2.classList.remove('modal-disappearance');
            modal2.style.visibility = 'visible';
        }
})  
})
        

modal1Close.forEach(function(elem, index){
  elem.addEventListener('click', function(){
        modal1.classList.add('modal-disappearance');
        modal1.classList.remove('modal-appearance');
        modal1.querySelector('.feed-form').reset();
        if(index == 2){
            modal2.classList.add('modal-disappearance');
            modal2.classList.remove('modal-appearance');
            modal2.querySelector('.feed-form').reset();
        }
})
    
});

//бургер меню
const gamburger = document.querySelector('.gamburger');
const headerNav = document.querySelector('.header__nav');
const headerMenu = document.querySelector('.header__menu');
let sum = 0;
gamburger.addEventListener('click', ()=>{
   counter();
   gamburger.classList.toggle('gamburger-active');
   if(headerNav.classList.contains('header__nav-bottom') && sum == 2 ){
      headerNav.classList.add('header__nav-top');
      headerNav.classList.remove('header__nav-bottom');
      headerMenu.classList.add('header__menu-top');
      headerMenu.classList.remove('header__menu-bottom');
   }
   if(headerNav.classList.contains('header__nav-top') && sum == 1){
      headerNav.classList.add('header__nav-bottom');
      headerNav.classList.remove('header__nav-top');
      headerMenu.classList.add('header__menu-bottom');
      headerMenu.classList.remove('header__menu-top');
      }
    else{ headerNav.classList.add('header__nav-bottom');
          headerMenu.classList.add('header__menu-bottom');
          headerMenu.style.visibility = 'visible';
   }
    }
);
   
 function counter(){
    if(sum == 2){
        sum = 0;
    }
     return sum++;
 }
// галерея
const galleryWrapper = document.querySelector('.gallery__wrapper');
const galleryItem = document.querySelectorAll('.gallery__item');
const leftButton = document.querySelector('.gallery__next');
const rightButton = document.querySelector('.gallery__prev');
const galleryDots = document.querySelectorAll('.gallery__dots');
let step = 1;

let galleryWrapperWidth = ((galleryItem.length * 33.3)/ 100)* galleryWrapper.offsetWidth;
galleryWrapper.style.width = galleryWrapperWidth + 'px';
let galleryItemWidth = galleryWrapperWidth / galleryItem.length + 'px';

galleryItem.forEach(function(elem) {
  elem.style.width = galleryItemWidth;
})

function rightGallery1(){
   if(step < galleryItem.length-2){
       galleryWrapper.style.transform = `translateX(${step * (-16.5)}%)`;
       step++; 
   }}

function leftGallery1(){
   if(step > 0){
       step--;
       galleryWrapper.style.transform = `translateX(${step * (-16.5)}%)`;
   } 
}

rightButton.addEventListener('click', rightGallery1);

leftButton.addEventListener('click', leftGallery1);

// галерея, смена класса

function toggleGalleryRight(){
  for(let i = 0; i < galleryItem.length-1; i++){
     if(galleryItem[i].classList.contains('gallery__item-svape')){
        galleryItem[i + 1].classList.add('gallery__item-svape');
        galleryItem[i].classList.remove('gallery__item-svape');
        galleryDots.forEach(function(elem){
            elem.classList.remove('gallery__dots-svape');
        })
        galleryDots[i + 1].classList.add('gallery__dots-svape');
        break;
     }
  }  
}
function toggleGalleryLeft(){
    for(let i = 0; i <= galleryItem.length-1; i++){
       if(galleryItem[i].classList.contains('gallery__item-svape')){
          galleryItem[i - 1].classList.add('gallery__item-svape');
          galleryItem[i].classList.remove('gallery__item-svape');
          galleryDots.forEach(function(elem){
            elem.classList.remove('gallery__dots-svape');
        })
          galleryDots[i - 1].classList.add('gallery__dots-svape');
          break;
       }
    }  
  }

rightButton.addEventListener('click', toggleGalleryRight);
leftButton.addEventListener('click', toggleGalleryLeft);
// полная галерея
const galleryMax = document.querySelector('.max-wrapper');
const maxWrappeRight = galleryMax.querySelector('.max-wrapper__right');
const maxWrapperLeft = galleryMax.querySelector('.max-wrapper__left');
let indexZ;
let cloneArr = [];
galleryItem.forEach(function(elem){
    cloneArr.push(elem.cloneNode(true));
})

cloneArr.forEach(function(elem){
    elem.classList.add('max-wrapper-item');
    elem.classList.remove('gallery__item-svape');
    galleryMax.append(elem);
})
galleryItem.forEach(function(elem,index){
    elem.addEventListener('click', function(e){
        if(this == elem){
            galleryMax.style.display = 'block';
            indexZ = index;
            cloneArr[index].style.display = 'block'; 
        }    
    })
    }
)
maxWrapperLeft.addEventListener('click', galleryMaximalLeft);

function galleryMaximalLeft(){
   if(indexZ > 0){
     cloneArr[indexZ].style.display = 'none';
     let indexLeft = --indexZ;
     cloneArr[indexLeft].style.display = 'block';
   }
}

maxWrappeRight.addEventListener('click', galleryMaximalRight);

function galleryMaximalRight(){
    if(indexZ < cloneArr.length - 1){
        cloneArr[indexZ].style.display = 'none'
        let indexRight = ++indexZ;
        cloneArr[indexRight].style.display = 'block';
    }
}
galleryMax.addEventListener('click', function(e){
    if(galleryMax == e.target){
        galleryMax.style.display = 'none';
        cloneArr.forEach(function(elem){
            elem.style.display = 'none';
         })
    }   
})
// галерея дотсы
let indexZZ;
function galleryDotsRemove(){
    galleryDots.forEach(function(elem){
        elem.classList.remove('gallery__dots-svape');
    })
}
galleryDots.forEach(function(elem, index){
    elem.addEventListener('click', function(e){
      if(elem == e.target){
        galleryDotsRemove();
        elem.classList.add('gallery__dots-svape');
        indexZZ = index;
        galleryDotsToggle();
        galleryNavigation()
      }
    })
})

function galleryDotsToggle(){
    galleryItem.forEach(function(elem){
        elem.classList.remove('gallery__item-svape');
    })
    galleryItem[indexZZ].classList.add('gallery__item-svape');
}

function galleryNavigation(){
    if(indexZZ == 0){
       step = indexZZ + 1;
       leftGallery1();
     }
    if(indexZZ >= 1 || indexZZ >= galleryItem.length - 2){
        step = indexZZ - 1;
        rightGallery1();
    }
    if(indexZZ == galleryItem.length - 1){
        step = indexZZ - 2;
        rightGallery1();
    } 
} 
//слайдер - локации
const slider = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide');
let locationWidth = document.querySelector('.location').offsetWidth;
const locationLeft = document.querySelector('.location__left');
const locationRight = document.querySelector('.location__right');
let cloneI = document.querySelectorAll('.slider__item');//для расширенной галереи
let localItem = [];
let galleryMax2 = document.querySelector('#maxW');
let indexZZZ;// счетчик слайдов в расширенной галере
for(let i = 0; i < cloneI.length; i++){    // в пустую коллекцию клонируем элементы
    localItem[i] = cloneI[i].cloneNode(true);
}
let cloneLocation = []; 
for(let i = 0; i < slide.length; i++){ // удаляем элементы в слайде и создаем новый массив слайдов
    cloneLocation[i] = slide[i];
    slide[i].remove();
}
let step2 = 0; // номер слайда 
let position = 0; // позиция в слайде
function draw(){ // добавляем новый элемент слайда, сдвигаем их
    let clone = slide[step2].cloneNode(true);// создаем клон
    let g = clone.querySelectorAll('.slider__item');
    g.forEach(function(elem){
        elem.addEventListener('click', function(){
            galleryMax2.style.display = 'block';
            indexZZZ = this.dataset.max - 1;
            localItem[this.dataset.max - 1].style.display = 'block'
            console.log (localItem[this.dataset.max - 1])
        })
    })

   /* let cloneChildren = clone.children;// у клона создаем живую коллекцию Итемов
     for(let i = 0; i < cloneChildren.length; i++){ // перебираем эту коллекцию и добавляем событие расширенной галерии
        cloneChildren[i].addEventListener('click', function(e){
            galleryMax2.style.display = 'block';
            indexZZZ = i;
            localItem[cloneChildren[i].dataset.max - 1].style.display = 'block'; //используем дата атрибуты для определения индекса расширенной галереи
            console.log(localItem, cloneChildren)
      })
   }*/

    clone.style.left = position * locationWidth + 'px';
    slider.append(clone);
    if (step2 + 1 == slide.length){
        step2 = 0;
    }
    else{
        step2++;
    }
    position = 1;
}
draw(); draw();
function leftSlider(e){
   e.target.removeEventListener('click', leftSlider);
   let slide2 = document.querySelectorAll('.slide');
   let position2 = 0;
   for(let i = 0; i < slide2.length; i++){
      slide2[i].style.left = locationWidth * position2 - locationWidth + 'px';
      position2++;
   }
   setTimeout(function(){
    slide2[0].remove();
    draw();
    e.target.addEventListener('click', leftSlider);
   }, 600); 
}

locationLeft.addEventListener('click', leftSlider);
locationRight.addEventListener('click', leftSlider);
// максимальная галерея для локации
const buttonMaxLocationLeft = document.querySelector('#left');
const buttonMaxLocationRight = document.querySelector('#right');

localItem.forEach(function(elem){
    elem.classList.add('max-wrapper-item');
    galleryMax2.append(elem);
})

buttonMaxLocationLeft.addEventListener('click', leftZ);

function leftZ(){
   if(indexZZZ > 0){
     localItem[indexZZZ].style.display = 'none';
     let indexLeft = --indexZZZ;
     localItem[indexLeft].style.display = 'block';
   }
}

buttonMaxLocationRight.addEventListener('click', rightZ);

function rightZ(){
    if(indexZZZ < localItem.length - 1){
        localItem[indexZZZ].style.display = 'none'
        let indexRight = ++indexZZZ;
        localItem[indexRight].style.display = 'block';
    }
}
galleryMax2.addEventListener('click', function(e){
    if(galleryMax2 == e.target){
        galleryMax2.style.display = 'none';
        localItem.forEach(function(elem){
            elem.style.display = 'none';
         })
    }   
})
// модальное окно локации
const popapLocation = document.querySelector('#popap-location');
const buttonLocation = document.querySelector('#form2');
const modal1Close2 = document.querySelector('.modal__close2');
buttonLocation.addEventListener('click', function(){
    popapLocation.classList.add('modal-appearance');
    popapLocation.classList.remove('modal-disappearance');
    popapLocation.style.visibility = 'visible';
})

modal1Close2.addEventListener('click', function(){
    popapLocation.classList.add('modal-disappearance');
    popapLocation.classList.remove('modal-appearance'); 
    popapLocation.querySelector('.feed-form').reset();
});
// свайпер - локации на брекпоинте 650px
new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
        loop: true,
    },
   
)
const swiperSlide = document.querySelectorAll('.swiper-slide');
swiperSlide.forEach(function(elem, index){
   elem.addEventListener('click', function(){
   galleryMax2.style.display = 'block';
   localItem[index - 1].style.display = 'block';
   indexZZZ = index;
   })
})
// показ и скрытие текста
const openText = document.querySelectorAll('#show');
const closeText = document.querySelectorAll('#hide');
const info = document.querySelectorAll('.info');

openText.forEach(function(elem, index){
    elem.addEventListener('click', function(){
        info[index].querySelector('#info__navigation-none').style.display = 'none';
        info[index].querySelector('.info__text').classList.toggle('info-visible');
    })
})
closeText.forEach(function(elem, index){
    elem.addEventListener('click', function(e){
        info[index].querySelector('#info__navigation-none').style.display = 'flex';
        info[index].querySelector('.info__text').classList.toggle('info-visible');
    })
})
  

// модальное окно ретуши
const retouch = document.querySelectorAll('#retouch');
const popapPrice = document.querySelector('.price__popap')
const priceInput = popapPrice.querySelector('input');
const priceButton = document.querySelector('#sum');
const priceSum = document.querySelectorAll('.price__sum');
let priceIndex = 0;
retouch.forEach(function(elem, index){
    elem.addEventListener('click', function(){
        popapPrice.classList.add('modal-appearance');
        popapPrice.classList.remove('modal-disappearance');
        popapPrice.style.visibility = 'visible';
        priceIndex = index;
    })
})

priceButton.addEventListener('click', function(e){
    if(priceInput.validity.rangeOverflow){
        priceInput.setCustomValidity('Можно заказать до 99 ретушей для одного заказа'); 
        return false;
     }
    e.preventDefault();
    setTimeout(function(){
        if(!priceInput.validity.rangeOverflow){
            let priseSumText = priceSum[priceIndex].textContent.replace(/₽/g, '');
            let showSum = +priseSumText + priceInput.value * 250 + ' ₽';
            priceSum[priceIndex].textContent = showSum;
            popapPrice.classList.add('modal-disappearance');
            popapPrice.classList.remove('modal-appearance');
            priceInput.value = '';
        }
    }, 200)
})

// предварительный просмотр фото в input-file
const formFile = document.querySelector('#input-reviews');
let preview = document.createElement('img');
const formTextArea = document.querySelector('.form-textarea');
const reviewsForm = document.querySelector('#reviews__form');
const feedFormFile = reviewsForm.querySelector('.feed-form');
const reviewsFormWrapper = reviewsForm.querySelector('.modal1__wrapper');
formFile.addEventListener('change', (e)=>{
        let file = Array.from(e.target.files);
        file.forEach((elem)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                preview.src = reader.result;
            }
            if(elem){
                reader.readAsDataURL(elem);
            }
        })
appendImage(preview);
})


function appendImage(preview){
    let div = document.createElement('div');
    let closeFile = document.createElement('div');
    closeFile.innerHTML = `<svg width="32" class='form-file-close' height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clip-path="url(#clip0_85_588)">
    <path d="M15.9993 2.66699C8.63935 2.66699 2.66602 8.64033 2.66602 16.0003C2.66602 23.3603 8.63935 29.3337 15.9993 29.3337C23.3594 29.3337 29.3327 23.3603 29.3327 16.0003C29.3327 8.64033 23.3594 2.66699 15.9993 2.66699Z" fill="white"/>
    <path d="M10 10L22 22" stroke="#CBCBCB" stroke-width="2" stroke-linecap="round"/>
    <path d="M22 10L10 22" stroke="#CBCBCB" stroke-width="2" stroke-linecap="round"/>
    </g>
    <defs>
    <clipPath id="clip0_85_588">
    <rect width="32" height="32" fill="white"/>
    </clipPath>
    </defs>
    </svg>`;
    div.classList.add('form-preview');
    div.append(closeFile);
    div.append(preview);
    formTextArea.append(div);
    let divStyle = div.offsetHeight;
    areaMinHeaght(divStyle);
    closeImg(closeFile, div);
}
let formTextAreaHeight = formTextArea.offsetHeight;
let reviewsFormWrapperHeight = reviewsFormWrapper.offsetHeight;
let reviewsFeedFormHeight = feedFormFile.offsetHeight;

function areaMinHeaght(divtic){
    reviewsFormWrapper.style.height = reviewsFormWrapperHeight + divtic + 'px';
    feedFormFile.style.height = reviewsFeedFormHeight + divtic + 'px';
    formTextArea.style.height = formTextAreaHeight + divtic + 'px';
    reviewsForm.style.overflow = 'scroll';
}

function closeImg(closeFile, div){
   closeFile.addEventListener('click', function(){
      div.remove();
      closeFile.remove();
      reviewsFormWrapper.style.height = reviewsFormWrapperHeight + 'px';
      feedFormFile.style.height = reviewsFeedFormHeight + 'px';
      formTextArea.style.height = formTextAreaHeight + 'px';
      reviewsForm.style.overflow = 'visible';
   })
}
// валидация форм
const feedFormCollections = document.querySelectorAll('.feed-form');
const feedFormInputName = [];
feedFormCollections.forEach(function(elem){
    if(elem.name){
        feedFormInputName.push(elem.name);
    }
   
})
feedFormInputName.forEach(function(elem){
    elem.addEventListener('blur', function(){
        if(elem.validity.patternMismatch){
            this.setCustomValidity('Введите имя в формате: кириллица или латинские символы');
        }
    })
});
// отправка формы
const sent = document.querySelectorAll('.sent');
feedFormCollections.forEach(function(elem){
    elem.addEventListener('submit', async function(e){
        elem.querySelector(".button").addEventListener("click", function() {
        this.disabled = true;
      })
       e.preventDefault();
        let formD = new FormData(elem); 
        let response;
               response = await fetch('mailer/smart.php', {
               method: 'POST',
               body: formD,
          }
        )   
 if(response.ok){
    elem.querySelector(".button").addEventListener("click", function() {
    this.disabled = false;})
 }
 else if(response.ok == false){
    elem.querySelector(".button").addEventListener("click", function() {
        this.disabled = false;})
 }
      
  if(response.ok && elem.locations !== undefined){
        popapLocation.classList.add('modal-disappearance');
        popapLocation.classList.remove('modal-appearance');
        sent[1].classList.toggle('sent-hidden');
        setTimeout(function(){
        sent[1].classList.toggle('sent-hidden');
        console.log(1);
}, 2500);
    elem.reset();
    }

    else if (response.ok && elem.review !== undefined){
        reviewsForm.classList.add('modal-disappearance');
        reviewsForm.classList.remove('modal-appearance');
        sent[0].classList.toggle('sent-hidden');
        setTimeout(function(){
        sent[0].classList.toggle('sent-hidden');
}, 2500);
        const file = document.querySelector('.form-preview');
        elem.reset();
        file.innerHTML = '';
        reviewsFormWrapper.style.height = reviewsFormWrapperHeight + 'px';
        feedFormFile.style.height = reviewsFeedFormHeight + 'px';
        formTextArea.style.height = formTextAreaHeight + 'px';
        reviewsForm.style.overflow = 'visible';
     
    }

   else if(response.ok ){
        modal1.classList.add('modal-disappearance');
        modal1.classList.remove('modal-appearance');
        sent[1].classList.toggle('sent-hidden');
        setTimeout(function(){
        sent[1].classList.toggle('sent-hidden');
}, 2500);
        elem.reset();
    }
        })})


});