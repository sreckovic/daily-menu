const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// window.on = function(name, fn) {
//   this.addEventListener(name, fn);
// };

// Storage Controler
const storageCtrl = (function() {
  // Public functions
  return {};
})();

const itemCtrl = (function() {
  // Item Constructor
  const item = function(id, name, desc) {
    this.id = id;
    this.name = name;
    this.desc = desc;
  };

  // State
  const state = {
    menus: [
      {
        id: 0,
        name: '3 Course Meal',
        items: [
          {
            id: 0,
            name: 'Salad',
            desc: 'Roasted Fig Salad - Spinach'
          },
          {
            id: 1,
            name: 'Entree',
            desc: '7/8 oz. New York Strip Steak with a Fig & Herb Butter'
          },
          {
            id: 2,
            name: 'Dessert',
            desc: 'Chocolate and Caramel Drizzled Bread Pudding'
          }
        ],
        currentItem: null
      },
      {
        id: 1,
        name: '5 Course Vegan Meal',
        items: [
          {
            id: 0,
            name: 'Seasonal Squash Casserole Soup',
            desc:
              'Roasted and pureed seasonal squash with cinnamon and nutmeg seasonings'
          },
          {
            id: 1,
            name: 'Stuffed Baby Portobello Mushroom Caps',
            desc:
              'Fresh baby portobello mushroom caps stuffed with roasted cherry tomatoes and vegan Italian herb cheese, topped with a balsamic glaze'
          },
          {
            id: 2,
            name: 'Chilled Mint and Cantaloupe Shooters',
            desc: ''
          },
          {
            id: 3,
            name: 'Roasted Tomato Pasta',
            desc: 'Tomato basil confit and zucchini pasta'
          },
          {
            id: 4,
            name: 'Fresh Baked Blueberry Crumble a la Mode',
            desc:
              'Fresh blueberries baked with a homemade almond meal crust, served with a scoop of So Delicious Coconut Milk Vanilla Bean Ice Cream'
          }
        ],
        currentItem: null
      }
    ],
    currentMenu: null,
    currentItems: []
  };

  return {
    addItem: function(name, desc) {
      let id;
      // Create ID
      if (state.currentItems.length > 0) {
        id = state.currentItems[state.currentItems.length - 1].id + 1;
      } else {
        id = 0;
      }

      // Create new item
      newItem = new item(id, name, desc);
      state.currentItems.push(newItem);
      return newItem;
    },
    getItems: function() {
      return state.menus;
    },
    getCurrentItems: function() {
      return state.currentItems;
    },
    logData: function() {
      return state;
    }
  };
})();

// UI Controler
const uiCtrl = (function() {
  const selectors = {
    itemNameInput: '#item-name',
    itemDescInput: '#item-desc',
    addItemBtn: '#add-item',
    createMenuBtn: '#create-menu',
    itemsList: '#items-list',
    itemList: '#item-list'
  };

  return {
    renderMenus: function(menus) {
      // Create menu list (menuList)
      let menuList = '';

      menus.forEach(function(menu) {
        let itemList = '';

        // Populate Meal/Food item list for current menu item
        menu.items.forEach(function(item) {
          itemList += `
          <li id="item-${item.id}" class="collection-item">${item.name}: ${
            item.desc
          }</li>
          `;
        });

        // Populate menu list (menuList)
        menuList += `
          <div id="menu-${menu.id}">
            <h4>${menu.name}</h4>
            <ul class="collection">${itemList}</ul>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil-alt"></i>
            </a>
          </div>
        `;

        // Render menu list (menuList) to DOM
        $(selectors.itemsList).innerHTML = menuList;
      });
    },
    addListItem: function(item) {
      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}:</strong>
        <em>${item.desc}</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil-alt"></i>
        </a>
      `;

      $(selectors.itemList).insertAdjacentElement('beforeend', li);
    },
    getItemInput: function() {
      return {
        name: $(selectors.itemNameInput).value,
        desc: $(selectors.itemDescInput).value
      };
    },
    getSelectors: function() {
      return selectors;
    },
    clearFlash: function() {
      $('.flash').remove();
    },
    flash: function(msg, type) {
      // Create flash element
      const flash = document.createElement('div');
      // Add class type if any
      flash.className = `flash lighten-1 ${type}`;
      // Add content
      flash.innerHTML = `
        <p>${msg}</p>
      `;
      // Get a reference to the element
      var ref = $('#item-name').parentNode;
      // Get a reference to the parent element
      var parentDiv = ref.parentNode;
      // Insert the new element into the DOM before reference
      parentDiv.insertBefore(flash, ref);
    },
    renderCreateMenuBtn: function(currentItems) {
      if (currentItems.length > 0) {
        $(selectors.createMenuBtn).disabled = false;
      } else {
        $(selectors.createMenuBtn).disabled = true;
      }
    },
    clearInputFields: function() {
      $(selectors.itemNameInput).value = '';
      $(selectors.itemDescInput).value = '';
    }
  };
})();

// App Controler
const appCtrl = (function(storageCtrl, itemCtrl, uiCtrl) {
  const loadEventListeners = function() {
    const uiSelectors = uiCtrl.getSelectors();

    // Add item button event
    $(uiSelectors.addItemBtn).addEventListener('click', itemAddSubmit);
  };

  const itemAddSubmit = function(e) {
    // Get from input from uiCtrl
    const input = uiCtrl.getItemInput();
    // Check for name and desc
    if (input.name !== '' && input.desc !== '') {
      // Add item
      const newItem = itemCtrl.addItem(input.name, input.desc);
      // Add item to UI list
      uiCtrl.addListItem(newItem);
      // Clear fields
      uiCtrl.clearInputFields();
      // Show flash
      uiCtrl.flash('New menu item added.', 'green');
      // Remove flash after 3 sec
      setTimeout(uiCtrl.clearFlash, 3000);
    } else {
      // Show flash
      uiCtrl.flash('Please input both item name and description.', 'grey');
      // Remove flash after 3 sec
      setTimeout(uiCtrl.clearFlash, 3000);
    }

    // Render 'Create Menu' submit button
    const currentItems = itemCtrl.getCurrentItems();
    uiCtrl.renderCreateMenuBtn(currentItems);

    e.preventDefault();
  };

  return {
    init: function() {
      // Fetch items from state
      const items = itemCtrl.getItems();
      // Render items list
      uiCtrl.renderMenus(items);
      // Load event listeners
      loadEventListeners();
    }
  };
})(storageCtrl, itemCtrl, uiCtrl);

appCtrl.init();
