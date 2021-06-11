const TAB_NAME = 'tab';
const HIDDEN_CSS = 'hidden';
const SHOWN_CSS = 'shown';

const createTab = (item, index) => {
  const tab = document.createElement('div');
  tab.dataset.orderId = index;
  tab.dataset.name = TAB_NAME;
  tab.innerText = item.name;

  tab.classList.add('tab');

  if (index === 0) {
    tab.classList.add('active');
  }

  return tab;
}

const createDescription = (item, index) => {
  const description = document.createElement('div');
  description.dataset.orderId = index;
  description.innerText = item.description;

  description.classList.add('description', HIDDEN_CSS);

  if (index === 0) {
    description.classList.add(SHOWN_CSS);
  }

  return description;
}

const toggleCss = (orderId, elem, cssClass) => {
  elem.classList.remove(cssClass);
  if (orderId === elem.dataset.orderId) {
    elem.classList.add(cssClass);
  }
}

const changeTab = (orderId, tabs,descriptions) => {
  tabs.forEach((tab) => toggleCss(orderId, tab, 'active'));
  descriptions.forEach((description) => toggleCss(orderId, description, SHOWN_CSS));
};

export const createTabsComponent = (data) => {
  const component = document.createElement('div');
  const tabWrapper = document.createElement('div');
  const descriptionWrapper = document.createElement('div');
  const tabs = data.map(createTab);
  const descriptions = data.map(createDescription);

  tabWrapper.classList.add('tab-wrapper');
  descriptionWrapper.classList.add('description-wrapper');

  tabWrapper.append(...tabs);
  descriptionWrapper.append(...descriptions);

  component.append(tabWrapper, descriptionWrapper);

  component.addEventListener('click', (event) => {
    if (event.target.dataset.name === TAB_NAME) {
      const clickedTabIndex = event.target.dataset.orderId;
      changeTab(clickedTabIndex, tabs, descriptions);
    }
  });

  return component;
}