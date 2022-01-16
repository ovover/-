function loadItems(){
    //Fetch the items from the JSON file
    return fetch('/data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

function displayItems(items){
    const container = document.querySelector('.itemsUl');
    const test = items.map(item => createHTMLString(item)).join('');
    container.innerHTML = test;
    // container.innerHTML = items.map(item => createHTMLString(item));
}
function createHTMLString(item){
    return `
    <li class="itemLi">
        <img src="${item.image}" alt="${item.type}" class="itemImg">
        <span class="itemText">${item.gender}, ${item.size}</span>
    </li>
    `;
} 

function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click' , () => displayItems(items));
    buttons.addEventListener('click' , event => onButtonClick(event, items));
}

function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if(!key || !value ) return;

    const filtered = items.filter(item => item[key] === value);
    console.log(filtered);
    displayItems(filtered);
}

//main
loadItems()
.then(items => {
    // console.log(items);
    displayItems(items);
    setEventListeners(items);
})
.catch(console.log);

