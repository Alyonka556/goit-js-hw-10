import { fetchBreeds, fetchCatByBreed } from "./js/cat-api"; 
import { selectEl, catInfo, loader, error } from "./js/refs";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



let arrBreedsId = [];



fetchBreeds()
.then(data => {
    for (let i = 0; i < data.length; i++) {
        arrBreedsId.push({text: data[i].name, value: data[i].id});

    }

    arrBreedsId.unshift({text: 'Choise a cat', value: 'placeholder'})



    new SlimSelect({
        select: selectEl,
        data: arrBreedsId,
    });
    })

    
.catch(onFetchError)
.finally(() => {
    loader.classList.add('is-hidden');
});

selectEl.addEventListener('change', onSelectBreed);



function onSelectBreed(event) {

    loader.classList.replace('is-hidden', 'loader');
    selectEl.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    

    const breedId = event.currentTarget.value;

    if(breedId === 'placeholder') {
        return;
    }


    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selectEl.classList.remove('is-hidden');

        const { url, breeds } = data[0];
        
        catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        catInfo.classList.remove('is-hidden');

    })
    .catch(onFetchError)
    .finally(() => {
        loader.classList.add('is-hidden');
    })
};

function onFetchError(error) {
    selectEl.classList.add('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};