const URL = 'https://api.thecatapi.com/v1';
const API_KEY = "live_EqRaN73INpyl7K63lSj0uhEQjCa1iiuAjTOnfmtQ9YIlpLPEvoIkUp1sFkOkd8qJ";

export function fetchBreeds() {
    return fetch(`${URL}/breeds?api_key=${API_KEY}`)
    .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
    });
}

export function fetchCatByBreed(breedId) {
    return fetch(`${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
    });   
}