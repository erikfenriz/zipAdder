const form = document.getElementById("zip");
const input = document.querySelector("input");
const uniquePlaces = new Set();
const liNode = document.getElementById('places').getElementsByTagName('li');
document.body.onclick = function () {
    input.placeholder = "enter zip code";
};

input.onclick = function (event) {
    event.stopPropagation();
    input.placeholder = "";
};

form.onsubmit = async event => {
    event.preventDefault();
    const zip = ((document.querySelector("input") || {}).value) || "";
    form.reset();
    fetch(`http://api.zippopotam.us/US/${zip}`)
        .then(handleErrors)
        .then(response => response.json())
        .then(data => {
            const city = Object.values(data.places[0]);
            uniquePlaces.add(`${city[0]}, ${city[3]}`);
            const list = Array.from(uniquePlaces);
            const comparison = Array.from(liNode);
            if (comparison[comparison.length - 1] === undefined
                || !(comparison[comparison.length - 1].textContent === list[list.length - 1])
            ) {
                const html = `<li>${list[list.length - 1]}</li>`;
                document.getElementById('places').insertAdjacentHTML('beforeend', html);
            } else {
                input.placeholder = "Not a unique value";
            }}).catch(function (error) {
        input.placeholder = error;
    });

    function handleErrors(request) {
        if (!request.ok) {
            throw Error(request.status);
        }
        return request;
    }
};