var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _restaurants, _filteredRestaurants;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const HEADER_CONTENTS = {
  TITLE: "점심 뭐 먹지",
  LABEL: "음식점 추가"
};
const LIST_ITEM_CONTENTS = [
  {
    category: "한식",
    name: "피양콩할마니",
    distance: "10분 내",
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다."
  },
  {
    category: "중식",
    name: "친친",
    distance: "5분 내",
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를 펼쳐갑니다."
  },
  {
    category: "일식",
    name: "잇쇼우",
    distance: "10분 내",
    description: "잇쇼우는 정통 자가제면 사누끼 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 신념으로 모든 음식에 최선을 다하는 잇쇼우는 고객 한분 한분께 최선을 다하겠습니다."
  },
  {
    category: "양식",
    name: "이태리키친",
    distance: "20분 내",
    description: "늘 변화를 추구하는 이태리키친입니다."
  },
  {
    category: "아시안",
    name: "호아빈 삼성점",
    distance: "15분 내",
    description: "푸짐한 양에 국물이 일품인 쌀국수."
  },
  {
    category: "기타",
    name: "도스타코스 선릉점",
    distance: "5분 내",
    description: "멕시칸 캐주얼 그릴."
  }
];
class Restaurant {
  constructor({ category, name, distance, description = "", link = "", favoriteStar = false }) {
    __publicField(this, "restaurant");
    this.restaurant = { category, name, distance, description, link, favoriteStar };
  }
  toggleFavorite() {
    this.restaurant.favoriteStar = !this.restaurant.favoriteStar;
  }
}
class RestaurantList {
  constructor(listItemContents) {
    __privateAdd(this, _restaurants, []);
    __privateAdd(this, _filteredRestaurants, []);
    this.loadRestaurants(listItemContents);
  }
  // 로컬 스토리지에서 데이터 불러오기
  loadRestaurants(listItemContents) {
    const storedRestaurants = localStorage.getItem("restaurants");
    if (storedRestaurants) {
      __privateSet(this, _restaurants, JSON.parse(storedRestaurants).map(
        ({ restaurant }) => new Restaurant(restaurant)
      ));
    } else {
      __privateSet(this, _restaurants, listItemContents.map((listItemContent) => new Restaurant(listItemContent)));
      this.updateLocalStorage();
    }
  }
  // 로컬스토리지 업데이트
  updateLocalStorage() {
    localStorage.setItem("restaurants", JSON.stringify(__privateGet(this, _restaurants)));
  }
  // 음식점 이름을 바탕으로 인스턴스 찾기
  getRestaurantByName(restaurantName) {
    return __privateGet(this, _restaurants).find(
      ({ restaurant }) => restaurant.name === restaurantName
    );
  }
  // 음식점 추가하기
  addRestaurant(restaurant) {
    const newRestaurant = new Restaurant(restaurant);
    __privateGet(this, _restaurants).push(newRestaurant);
    __privateSet(this, _filteredRestaurants, [...__privateGet(this, _restaurants)]);
    this.updateLocalStorage();
  }
  // 음식점 삭제하기
  removeRestaurant(restaurantName) {
    __privateSet(this, _restaurants, __privateGet(this, _restaurants).filter(
      ({ restaurant }) => restaurant.name !== restaurantName
    ));
    this.updateLocalStorage();
  }
  // 좋아한 음식점 리스트 구하기
  getFavoriteRestaurants() {
    return __privateGet(this, _restaurants).filter(({ restaurant }) => restaurant.favoriteStar);
  }
  // 카테고리 필터링
  filterByCategory(category) {
    if (category === "전체") {
      __privateSet(this, _filteredRestaurants, [...__privateGet(this, _restaurants)]);
    } else {
      __privateSet(this, _filteredRestaurants, __privateGet(this, _restaurants).filter(
        ({ restaurant }) => restaurant.category === category
      ));
    }
  }
  // 정렬 필터링
  sortByOption(sortOption) {
    if (sortOption === "이름순") {
      __privateGet(this, _filteredRestaurants).sort(
        (a, b) => a.restaurant.name.localeCompare(b.restaurant.name)
      );
    } else if (sortOption === "거리순") {
      __privateGet(this, _filteredRestaurants).sort((a, b) => {
        var _a, _b;
        const distanceA = parseInt(((_a = a.restaurant.distance.match(/\d+/)) == null ? void 0 : _a[0]) || "0");
        const distanceB = parseInt(((_b = b.restaurant.distance.match(/\d+/)) == null ? void 0 : _b[0]) || "0");
        if (distanceA === distanceB) return a.restaurant.name.localeCompare(b.restaurant.name);
        return distanceA - distanceB;
      });
    }
  }
  // 카테고리 + 정렬
  filterAndSort(category, sortOption) {
    this.filterByCategory(category);
    this.sortByOption(sortOption);
    return [...__privateGet(this, _filteredRestaurants)];
  }
}
_restaurants = new WeakMap();
_filteredRestaurants = new WeakMap();
function favoriteEventHandler({ mainElement, restaurantList, updateFavoriteListView }) {
  mainElement.addEventListener("click", (event) => {
    const target = event.target;
    const starElement = target.closest(".favorite-star");
    if (!starElement) return;
    starElement.classList.toggle("active");
    const restaurantName = starElement.dataset.name || "";
    const restaurant = restaurantList.getRestaurantByName(restaurantName);
    if (restaurant) {
      restaurant.toggleFavorite();
      restaurantList.updateLocalStorage();
      updateFavoriteListView();
    }
  });
}
const EventHandler = {
  modalToggle: (element, formElement = null) => {
    if (formElement) formElement.reset();
    element.classList.toggle("modal--open");
  },
  formDataParsing: (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    return values;
  }
};
function listItemOpenEventHandler(mainElement, DetailModalController2) {
  mainElement.addEventListener("click", (event) => {
    const target = event.target;
    if (target.closest(".favorite-star")) return;
    const restaurantElement = target.closest("li.restaurant");
    if (!restaurantElement) return;
    const restaurantName = restaurantElement.dataset.name || "";
    const modalElement = DetailModalController2(restaurantName);
    mainElement.appendChild(modalElement);
    EventHandler.modalToggle(modalElement);
  });
}
function CategorySortFilterEventHandler({
  categoryFilterElement,
  sortingFilterElement,
  updateListView
}) {
  categoryFilterElement.addEventListener("change", () => {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  });
  sortingFilterElement.addEventListener("change", () => {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  });
}
function SelectField({ name, id = "", options, defaultOption = "", required = false, className = "" }) {
  const selectElement = document.createElement("select");
  selectElement.id = name;
  if (id) selectElement.id = id;
  selectElement.name = name;
  selectElement.required = required;
  if (className) selectElement.classList.add(className);
  if (defaultOption) {
    selectElement.innerHTML = `
    <option value="">${defaultOption}</option>
    ${options.map((option) => `<option value="${option}">${option}</option>`).join("")}
    `;
  } else {
    selectElement.innerHTML = options.map((option) => `<option value="${option}">${option}</option>`).join("");
  }
  return selectElement;
}
function CategorySortFilterWrapper(CATEGORY_SORT_FILTER_DATA2) {
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("restaurant-filter-container");
  CATEGORY_SORT_FILTER_DATA2.forEach((data) => {
    sectionElement.appendChild(SelectField(data));
  });
  return sectionElement;
}
const SELECT_CATEGORY_MODAL = ["한식", "중식", "일식", "양식", "아시안", "기타"];
const SELECT_DISTANCE = ["5분 내", "10분 내", "15분 내", "20분 내", "30분 내"];
const SELECT_CATEGORY = ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"];
const SELECT_SORTING = ["이름순", "거리순"];
const CATRGORY_IMAGE_PATH = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png"
};
const CATEGORY_SORT_FILTER_DATA = [
  { name: "category", id: "category-filter", options: SELECT_CATEGORY, className: "restaurant-filter" },
  { name: "sorting", id: "sorting-filter", options: SELECT_SORTING, className: "restaurant-filter" }
];
function createCategorySortFilterView() {
  const categorySortFilterContainerElement = CategorySortFilterWrapper(CATEGORY_SORT_FILTER_DATA);
  return categorySortFilterContainerElement;
}
function CategorySortFilterController(updateListView) {
  const categorySortFilterContainerElement = createCategorySortFilterView();
  const categoryFilterElement = categorySortFilterContainerElement.querySelector(
    "#category-filter"
  );
  const sortingFilterElement = categorySortFilterContainerElement.querySelector("#sorting-filter");
  CategorySortFilterEventHandler({ categoryFilterElement, sortingFilterElement, updateListView });
  function updateCategorySortListView() {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  }
  return { categorySortFilterContainerElement, updateCategorySortListView };
}
function DetailModalEventHandler({
  modalElement,
  restaurantList,
  restaurantName,
  updateCategorySortListView,
  updateFavoriteListView
}) {
  const deleteButtonElement = modalElement.querySelector("button[type='submit']");
  const closeButtonElement = modalElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");
  deleteButtonElement.addEventListener("click", () => {
    restaurantList.removeRestaurant(restaurantName);
    updateCategorySortListView();
    updateFavoriteListView();
    EventHandler.modalToggle(modalElement);
  });
  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
}
function Button({ type, stylingBased, text }) {
  const buttonElement = document.createElement("button");
  buttonElement.type = type;
  buttonElement.innerText = text;
  buttonElement.className = `button button--${stylingBased} text-caption`;
  return buttonElement;
}
function DetailItem({ category, name, distance, description, link, favoriteStar }) {
  const divElement = document.createElement("div");
  divElement.classList.add("detail-restaurant");
  divElement.innerHTML = /*html*/
  `
  <div class="restaurant__category__star mb-16">
      <div class="restaurant__category">
        <img src=${CATRGORY_IMAGE_PATH[category]} alt=${category} class="category-icon" />
      </div>
      <div
      class="favorite-star ${favoriteStar && "active"}"}
      data-name="${name}"
      >
      </div>
  </div>
   <h3 class="restaurant__name text-title mb-16">${name}</h3>
   <span class="restaurant__distance text-body mb-16">캠퍼스부터 ${distance}</span>
   <p class="restaurant__description text-body mb-16">
     ${description}
   </p>
   <a class="restaurant__link text-body mb-16"
   href=${link} target="_blank">
     ${link}
   </a>

`;
  return divElement;
}
function ButtonsForm(buttonItems) {
  const buttonContainerElement = document.createElement("div");
  buttonContainerElement.classList.add("button-container");
  buttonItems.forEach((buttonItem) => {
    buttonContainerElement.appendChild(buttonItem);
  });
  return buttonContainerElement;
}
function Modal(innerComponents) {
  const modalElement = document.createElement("div");
  const modalBackdropElement = document.createElement("div");
  const modalContainerElement = document.createElement("div");
  modalElement.classList.add("modal");
  modalBackdropElement.classList.add("modal-backdrop");
  modalContainerElement.classList.add("modal-container");
  innerComponents.forEach((component) => {
    modalContainerElement.appendChild(component);
  });
  modalElement.appendChild(modalBackdropElement);
  modalElement.appendChild(modalContainerElement);
  return modalElement;
}
const DETAIL_MODAL_BUTTONS = [
  { type: "submit", stylingBased: "secondary", text: "삭제하기" },
  { type: "button", stylingBased: "primary", text: "닫기" }
];
function createDetailModalView(restaurant) {
  const detailItemElement = DetailItem(restaurant);
  const formButtons = DETAIL_MODAL_BUTTONS.map((buttonData) => Button(buttonData));
  const buttonsFormElement = ButtonsForm(formButtons);
  const modalElement = Modal([detailItemElement, buttonsFormElement]);
  return modalElement;
}
function DetailModalController({
  restaurantName,
  restaurantList,
  updateCategorySortListView,
  updateFavoriteListView
}) {
  var _a;
  const restaurant = (_a = restaurantList.getRestaurantByName(restaurantName)) == null ? void 0 : _a.restaurant;
  const modalElement = createDetailModalView(restaurant);
  DetailModalEventHandler({
    modalElement,
    restaurantList,
    restaurantName,
    updateCategorySortListView,
    updateFavoriteListView
  });
  return modalElement;
}
function ListItem({ category, name, distance, description, favoriteStar }) {
  const listElement = document.createElement("li");
  listElement.dataset.name = name;
  listElement.classList.add("restaurant");
  listElement.innerHTML = /*html*/
  `
    <div class="restaurant__category">
      <img src=${CATRGORY_IMAGE_PATH[category]} alt=${category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <div class="restaurant__top">
        <div>
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}</span>
        </div>
        <div 
          class="favorite-star ${favoriteStar && "active"}"}
          data-name="${name}"
        ></div>
      </div>
      <p class="restaurant__description text-body">
        ${description}
      </p>
    </div>
    `;
  return listElement;
}
function List(listItems) {
  const listElement = document.createElement("ul");
  listElement.classList.add("restaurant-list");
  listElement.classList.add("restaurant-list-container");
  listItems.forEach((item) => {
    listElement.appendChild(ListItem(item.restaurant));
  });
  return listElement;
}
function createFavoriteListView(restaurantList) {
  let favoriteListElement = List(restaurantList.getFavoriteRestaurants());
  function updateFavoriteListView() {
    const favoriteRestaurants = restaurantList.getFavoriteRestaurants();
    favoriteListElement.innerHTML = "";
    favoriteRestaurants.forEach(({ restaurant }) => {
      favoriteListElement.appendChild(ListItem(restaurant));
    });
  }
  return { favoriteListElement, updateFavoriteListView };
}
function FavoriteListController(restaurantList) {
  const { favoriteListElement, updateFavoriteListView } = createFavoriteListView(restaurantList);
  return { favoriteListElement, updateFavoriteListView };
}
function HeaderEventHandler(headerElement, modalElement) {
  const modalButtonElement = headerElement.querySelector("button.gnb__button");
  if (modalButtonElement) {
    modalButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement));
  }
}
function Header({ TITLE, LABEL }) {
  const headerElement = document.createElement("header");
  headerElement.classList.add("gnb");
  headerElement.innerHTML = `
    <h1 class="gnb__title text-title">${TITLE}</h1>
    <button type="button" class="gnb__button" aria-label=${LABEL}>
      <img src="./add-button.png" alt=${LABEL} />
    </button>
    `;
  return headerElement;
}
function createHeaderView() {
  return Header(HEADER_CONTENTS);
}
function HeaderController(modalElement) {
  const headerElement = createHeaderView();
  HeaderEventHandler(headerElement, modalElement);
  return headerElement;
}
function createListView(restaurantList) {
  let listElement = List(restaurantList.filterAndSort("전체", "이름순"));
  function updateListView(category, sortOption) {
    const filteredRestaurants = restaurantList.filterAndSort(category, sortOption);
    listElement.innerHTML = "";
    filteredRestaurants.forEach(({ restaurant }) => {
      listElement.appendChild(ListItem(restaurant));
    });
  }
  return { listElement, updateListView };
}
function ListController(restaurantList) {
  const { listElement, updateListView } = createListView(restaurantList);
  return { listElement, updateListView };
}
function ModalEventHandler({
  modalElement,
  formElement,
  updateCategorySortListView,
  restaurantList
}) {
  const closeButtonElement = formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");
  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(modalElement, formElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(modalElement, formElement));
  formElement.addEventListener("submit", (event) => {
    const formData = EventHandler.formDataParsing(event);
    const restaurantData = {
      category: String(formData["category"]),
      name: String(formData["name"]),
      distance: String(formData["distance"]),
      description: String(formData["description"] || ""),
      link: String(formData["link"] || ""),
      favoriteStar: false
    };
    restaurantList.addRestaurant(restaurantData);
    updateCategorySortListView();
    EventHandler.modalToggle(modalElement, formElement);
  });
}
function Title({ type = "default", text }) {
  const h2Element = document.createElement("h2");
  h2Element.classList.add("text-title");
  if (type === "modal") h2Element.classList.add("modal-title");
  h2Element.innerText = text;
  return h2Element;
}
function Form(formItems, buttonsFormItems) {
  const formElement = document.createElement("form");
  formItems.forEach((formItem) => {
    formElement.appendChild(formItem);
  });
  formElement.appendChild(buttonsFormItems);
  return formElement;
}
const MODAL_TITLE = { type: "modal", text: "새로운 음식점" };
const MODAL_FORM_CONFIG = {
  fields: [
    {
      label: "카테고리",
      type: "select",
      name: "category",
      options: SELECT_CATEGORY_MODAL,
      defaultOption: "선택해주세요",
      required: true
    },
    { label: "이름", type: "input", name: "name", inputType: "text", required: true },
    {
      label: "거리(도보 이동 시간)",
      type: "select",
      name: "distance",
      options: SELECT_DISTANCE,
      defaultOption: "선택해주세요",
      required: true
    },
    { label: "설명", type: "textarea", name: "description", notice: "메뉴 등 추가 정보를 입력해 주세요." },
    {
      label: "참고 링크",
      type: "input",
      name: "link",
      inputType: "text",
      notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요."
    }
  ],
  buttons: [
    { type: "button", stylingBased: "secondary", text: "취소하기" },
    { type: "submit", stylingBased: "primary", text: "등록하기" }
  ]
};
function FormItem({ label, name, fieldComponent, notice = "", required = false }) {
  const formItemElement = document.createElement("div");
  formItemElement.classList.add("form-item");
  if (required) {
    formItemElement.classList.add("form-item--required");
  }
  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", name);
  labelElement.textContent = label;
  formItemElement.appendChild(labelElement);
  formItemElement.appendChild(fieldComponent);
  if (notice) {
    const noticeElement = document.createElement("span");
    noticeElement.classList.add("help-text");
    noticeElement.textContent = notice;
    formItemElement.appendChild(noticeElement);
  }
  return formItemElement;
}
function InputField({ inputType, name, required = false }) {
  const inputElement = document.createElement("input");
  inputElement.type = inputType;
  inputElement.name = name;
  inputElement.id = name;
  inputElement.required = required;
  return inputElement;
}
function TextareaField(name) {
  const textareaElement = document.createElement("textarea");
  textareaElement.name = name;
  textareaElement.id = name;
  textareaElement.cols = 30;
  textareaElement.rows = 5;
  return textareaElement;
}
function generateFormItems(MODAL_FORM_CONFIG2) {
  const { fields, buttons } = MODAL_FORM_CONFIG2;
  const formItems = fields.map(({ notice, ...fieldData }) => {
    const fieldComponent = matchFieldComponent(fieldData);
    return FormItem({ ...fieldData, fieldComponent, notice });
  });
  const formButtons = buttons.map((buttonData) => Button(buttonData));
  return { formItems, buttonsFormItems: ButtonsForm(formButtons) };
}
function matchFieldComponent({ type, name, inputType, options, defaultOption, required }) {
  switch (type) {
    case "select":
      return SelectField({ name, options, defaultOption, required });
    case "input":
      return InputField({ inputType, name, required });
    case "textarea":
      return TextareaField(name);
    default:
      console.error(`지원하지 않는 필드 타입입니다: "${type}"`);
  }
}
function createModalView() {
  const titleElement = Title(MODAL_TITLE);
  const { formItems, buttonsFormItems } = generateFormItems(MODAL_FORM_CONFIG);
  const formElement = Form(formItems, buttonsFormItems);
  const modalElement = Modal([titleElement, formElement]);
  return { modalElement, formElement };
}
function ModalController({ updateCategorySortListView, restaurantList }) {
  const { modalElement, formElement } = createModalView();
  ModalEventHandler({ modalElement, formElement, updateCategorySortListView, restaurantList });
  return modalElement;
}
function TabEventHandler(tabContainerElement, mainElement, tabActionsUpdateListView) {
  tabContainerElement.addEventListener("click", (event) => {
    const target = event.target;
    const clickedTab = target.closest(".restaurant-tab");
    if (clickedTab.classList.contains("active")) return;
    tabContainerElement.querySelectorAll(".restaurant-tab").forEach((tab) => tab.classList.remove("active"));
    clickedTab.classList.add("active");
    const tabId = clickedTab.id;
    const targetContainer = mainElement.querySelector(`.${tabId}-list-container`);
    mainElement.querySelectorAll(".list-container").forEach((container) => container.classList.remove("active"));
    targetContainer.classList.add("active");
    if (tabActionsUpdateListView[tabId]) {
      tabActionsUpdateListView[tabId]();
    }
  });
}
function Tab(id, text) {
  const tabElement = document.createElement("div");
  tabElement.classList.add("restaurant-tab");
  tabElement.id = id;
  tabElement.textContent = text;
  return tabElement;
}
function TabWrapper(TAB_DATA2) {
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("restaurant-tab-container");
  TAB_DATA2.forEach(({ id, text }) => {
    sectionElement.appendChild(Tab(id, text));
  });
  return sectionElement;
}
const TAB_DATA = [
  { id: "all-restaurant", text: "모든 음식점" },
  { id: "favorite-restaurant", text: "자주 가는 음식점" }
];
function createTabView() {
  const tabContainerElement = TabWrapper(TAB_DATA);
  const allRestaurantTab = tabContainerElement.querySelector("#all-restaurant");
  allRestaurantTab.classList.add("active");
  return tabContainerElement;
}
function TabController({ mainElement, updateCategorySortListView, updateFavoriteListView }) {
  const tabContainerElement = createTabView();
  const tabActionsUpdateListView = {
    "all-restaurant": updateCategorySortListView,
    "favorite-restaurant": updateFavoriteListView
  };
  TabEventHandler(tabContainerElement, mainElement, tabActionsUpdateListView);
  return tabContainerElement;
}
function MainController() {
  const app = document.getElementById("app");
  if (!app) throw new Error("app 요소를 찾을 수 없습니다.");
  const mainElement = app.querySelector("main");
  if (!mainElement) throw new Error("main 요소를 찾을 수 없습니다.");
  const allListContainerElement = mainElement.querySelector(".all-restaurant-list-container");
  const favoriteListContainerElement = mainElement.querySelector(".favorite-restaurant-list-container");
  if (!allListContainerElement || !favoriteListContainerElement)
    throw new Error("list-container 요소를 찾을 수 없습니다.");
  const restaurantList = new RestaurantList(LIST_ITEM_CONTENTS);
  const { listElement, updateListView } = ListController(restaurantList);
  const { favoriteListElement, updateFavoriteListView } = FavoriteListController(restaurantList);
  const { categorySortFilterContainerElement, updateCategorySortListView } = CategorySortFilterController(updateListView);
  const modalElement = ModalController({
    updateCategorySortListView,
    restaurantList
  });
  const tabContainerElement = TabController({ mainElement, updateCategorySortListView, updateFavoriteListView });
  const headerElement = HeaderController(modalElement);
  app.prepend(headerElement);
  mainElement.prepend(tabContainerElement);
  mainElement.appendChild(modalElement);
  allListContainerElement.appendChild(categorySortFilterContainerElement);
  allListContainerElement.appendChild(listElement);
  favoriteListContainerElement.appendChild(favoriteListElement);
  favoriteEventHandler({ mainElement, restaurantList, updateFavoriteListView });
  listItemOpenEventHandler(
    mainElement,
    (restaurantName) => DetailModalController({
      restaurantName,
      restaurantList,
      updateCategorySortListView,
      updateFavoriteListView
    })
  );
}
MainController();
