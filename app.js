// Storage Controler
const storageCtrl = (function() {
  // Public functions
  return {};
})();

const itemCtrl = (function() {
  // Item Constructor
  const item = function(id, name) {
    this.id = id;
    this.name = name;
    this.desc = desc;
  };

  // State
  const state = {
    menus: [
      {
        id: 0,
        name: 'Opcija 1',
        items: [
          {
            id: 0,
            name: 'Corba',
            desc: 'Krem corba od sremusa i sargarepe'
          },
          {
            id: 1,
            name: 'Rizoto Al Verde',
            desc:
              'Prolecni rizoto Al Verde sa piletinom, prazilukom, spanatom, gorgonzolom, svezim zacinskim biljem i pestom od bosiljka'
          },
          {
            id: 2,
            name: 'Salata',
            desc: 'Miks zelenih salata sa ceri paradajizom i semenkicama'
          }
        ],
        currentItem: null
      },
      {
        id: 1,
        name: 'Opcija 2',
        items: [
          {
            id: 0,
            name: 'Corba',
            desc: 'Krem corba od sremusa i sargarepe'
          },
          {
            id: 1,
            name: 'Grasak',
            desc:
              'Grasak sa piletinom i integralnim knedlicama i svezom mirodjijom na belo'
          },
          { id: 2, name: 'Salata', desc: 'Miks zelenih salata' },
          { id: 3, name: 'Hleb', desc: '' }
        ],
        currentItem: null
      }
    ],
    currentMenu: null
  };

  return {
    getItems: function() {
      return state.menus;
    }
  };
})();

// UI Controler
const uiCtrl = (function() {
  const selectors = {
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
            <h3>${menu.name}:</h3>
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
    getSelectors: function() {
      return uiSelectors;
    }
  };
})();

// App Controler
const appCtrl = (function(storageCtrl, itemCtrl, uiCtrl) {
  return {
    init: function() {
      console.log('init');

      // Fetch items from state
      const items = itemCtrl.getItems();

      // Render items list
      uiCtrl.renderMenus(items);
    }
  };
})(storageCtrl, itemCtrl, uiCtrl);

appCtrl.init();
