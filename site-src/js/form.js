console.log("Hello!!!");

function ajaxSuccess() {
    console.log('success');
}
const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    data[element.name] = element.value;
    return data;

}, {});


function postData(url = '', data = {}, form = '') {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => {
            console.log(response);
            let feedbackArea = document.querySelector('.feedback');
            feedbackArea.classList.add(`${status = 200 ? "success" : "failure"}`);
            feedbackArea.innerHTML = `<p class="success">${status = 200 ? "We've got it added to the list!" : "Something went wrong"}`
            form.reset();
            console.log(response.body);

        }); // parses JSON response into native Javascript objects 
}
(() => {
    const form = document.querySelector('.sign-up');
    form.addEventListener('submit', e => {
        const form = e.currentTarget;
        e.preventDefault();
        const formData = formToJSON(form.elements);
        postData(form.action, formData, form);
    });

})();