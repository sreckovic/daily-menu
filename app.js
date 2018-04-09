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
    itemsList: '#items-list'
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
        document.querySelector(selectors.itemsList).innerHTML = menuList;
      });
    },
    getItemInput: function() {
      return {
        name: document.querySelector(selectors.itemNameInput).value,
        desc: document.querySelector(selectors.itemDescInput).value
      };
    },
    getSelectors: function() {
      return selectors;
    }
  };
})();

// App Controler
const appCtrl = (function(storageCtrl, itemCtrl, uiCtrl) {
  const loadEventListeners = function() {
    const uiSelectors = uiCtrl.getSelectors();

    // Add item button event
    document
      .querySelector(uiSelectors.addItemBtn)
      .addEventListener('click', itemAddSubmit);
  };

  const itemAddSubmit = function(e) {
    // Get from input from uiCtrl
    const input = uiCtrl.getItemInput();
    // Check for name and desc
    if (input.name !== '' && input.desc !== '') {
      // Add item
      const newItem = itemCtrl.addItem(input.name, input.desc);
      // Add item to UI list
      // uiCtrl.addListItem(newItem);
      // Clear fields
      // uiCtrl.clearInput();
    }

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
