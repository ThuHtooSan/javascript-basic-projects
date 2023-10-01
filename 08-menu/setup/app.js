const menu = [
  {
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  { 
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    title: "bison steak",
    category: "dinner",
    price: 22.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  }
];

const filterContainer = document.querySelector('#filter-container');
const menuContainer = document.querySelector('#menu-container');

function createFilterBtns() {
  // collect unique categories
  const categories = menu.reduce((result, { category }) => {
    if (!result.includes(category)) {
      result.push(category);
    }
    return result;
  }, ['all']);

  // clear buttons
  filterContainer.innerHTML = "";

  // append buttons to filter container
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.classList.add('filter-btn');
    btn.textContent = category;
    btn.addEventListener('click', () => displayMenuItem(category));

    filterContainer.appendChild(btn);
  });
}

function displayMenuItem(category) {
  let menuItems;
  
  menuItems = category === "all"
    ? menu
    : menu.filter(menuItem => menuItem.category === category);

  const itemElems = menuItems.map(menuItem => 
    `<section class="menu-item">
      <div class="image-container">
        <img src=${menuItem.img} alt=${menuItem.title}/>
      </div>
      <div class="content">
        <div class="name">${menuItem.title}</div>
        <p class="description">${menuItem.desc}</p>
        <p class="price">$${menuItem.price}</p>
      </div>
    </section>`
  );

  menuContainer.innerHTML = itemElems.join('');
}

document.addEventListener('DOMContentLoaded', () => {
  displayMenuItem('all');
  createFilterBtns();
})

