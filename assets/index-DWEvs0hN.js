var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _information, _restaurants;
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
function Header({ TITLE, LABEL }) {
  const headerElement = document.createElement("header");
  headerElement.classList.add("gnb");
  headerElement.innerHTML = `
    <h1 class="gnb__title text-title">${TITLE}</h1>
    <button type="button" class="gnb__button" aria-label=${LABEL}>
      <img src="./public/add-button.png" alt=${LABEL} />
    </button>
    `;
  return headerElement;
}
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
    distance: "1분 내",
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
const SELECT_CATEGORY = ["한식", "중식", "일식", "양식", "아시안", "기타"];
const SELECT_DISTANCE = ["5분 내", "10분 내", "15분 내", "20분 내", "30분 내"];
const MODAL_BUTTONS_PROPERTY = [
  { type: "button", stylingBased: "secondary", text: "취소하기" },
  { type: "submit", stylingBased: "primary", text: "등록하기" }
];
const EventHandler = {
  modalToggle: (element, formElement = null) => {
    if (formElement) formElement.reset();
    element.querySelector(".modal").classList.toggle("modal--open");
  },
  formDataParsing: (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    return values;
  }
};
function HeaderController(app) {
  app.prepend(Header(HEADER_CONTENTS));
  const modalButtonElement = app.querySelector("header button.gnb__button");
  modalButtonElement.addEventListener("click", () => EventHandler.modalToggle(app));
}
const CATRGORY_IMAGE_PATH = {
  한식: "./public/category-korean.png",
  중식: "./public/category-chinese.png",
  일식: "./public/category-japanese.png",
  양식: "./public/category-western.png",
  아시안: "./public/category-asian.png",
  기타: "./public/category-etc.png"
};
function ListItem({ category, name, distance, description }) {
  const listElement = document.createElement("li");
  listElement.classList.add("restaurant");
  listElement.innerHTML = `
    <div class="restaurant__category">
      <img src=${CATRGORY_IMAGE_PATH[category]} alt=${category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}</span>
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
  listItems.forEach((item) => {
    listElement.appendChild(ListItem(item.information));
  });
  return listElement;
}
class Restaurant {
  constructor({ category, name, distance, description = "", link = "" }) {
    __privateAdd(this, _information, {});
    __privateGet(this, _information).category = category;
    __privateGet(this, _information).name = name;
    __privateGet(this, _information).distance = distance;
    __privateGet(this, _information).description = description;
    __privateGet(this, _information).link = link;
  }
  get information() {
    return { ...__privateGet(this, _information) };
  }
}
_information = new WeakMap();
class RestaurantList {
  constructor(listItemContents) {
    __privateAdd(this, _restaurants);
    __privateSet(this, _restaurants, this.initialAddRestaurant(listItemContents));
  }
  initialAddRestaurant(listItemContents) {
    return listItemContents.map((listItemContent) => new Restaurant(listItemContent));
  }
  addRestaurant(restaurantInformation) {
    const newRestaurant = new Restaurant(restaurantInformation);
    __privateGet(this, _restaurants).push(newRestaurant);
    return newRestaurant;
  }
  get resaurants() {
    return [...__privateGet(this, _restaurants)];
  }
}
_restaurants = new WeakMap();
function ListController(listContainerElement) {
  const restaurantList = new RestaurantList(LIST_ITEM_CONTENTS);
  const listElement = List(restaurantList.resaurants);
  listContainerElement.appendChild(listElement);
  return { listElement, restaurantList };
}
function Button({ type, stylingBased, text }) {
  const buttonElement = document.createElement("button");
  buttonElement.type = type;
  buttonElement.innerText = text;
  buttonElement.className = `button button--${stylingBased} text-caption`;
  return buttonElement;
}
function ButtonsForm(buttonsProperty) {
  const buttonContainerElement = document.createElement("div");
  buttonContainerElement.classList.add("button-container");
  buttonsProperty.forEach((buttonProperty) => {
    buttonContainerElement.appendChild(Button(buttonProperty));
  });
  return buttonContainerElement;
}
function FormItem({ label, formComponent, notice = "", required = false }) {
  const formItemElement = document.createElement("div");
  formItemElement.classList.add("form-item");
  if (required) {
    formItemElement.classList.add("form-item--required");
  }
  formItemElement.innerHTML = `<label for="category text-caption">${label}</label>`;
  formItemElement.appendChild(formComponent());
  if (notice) formItemElement.innerHTML += `<span class="help-text text-caption">${notice}</span>`;
  return formItemElement;
}
function Form(formsProperty) {
  const formElement = document.createElement("form");
  formsProperty.forEach((formProperty) => {
    formElement.appendChild(FormItem(formProperty));
  });
  formElement.appendChild(ButtonsForm(MODAL_BUTTONS_PROPERTY));
  return formElement;
}
function InputForm(type, name, required = false) {
  const inputElement = document.createElement("input");
  inputElement.type = type;
  inputElement.name = name;
  inputElement.id = name;
  inputElement.required = required;
  return inputElement;
}
function SelectForm(name, selectItems) {
  const selectElement = document.createElement("select");
  selectElement.id = name;
  selectElement.name = name;
  selectElement.required = true;
  selectElement.innerHTML = `
    <option value="">선택해 주세요</option>
    ${selectItems.map((category) => `<option value="${category}">${category}</option>`).join("")}
    `;
  return selectElement;
}
function TextareaForm(name) {
  const textareaElement = document.createElement("textarea");
  textareaElement.name = name;
  textareaElement.id = name;
  textareaElement.cols = 30;
  textareaElement.rows = 5;
  return textareaElement;
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
function Title({ type = "default", text }) {
  const h2Element = document.createElement("h2");
  h2Element.classList.add("text-title");
  if (type === "modal") h2Element.classList.add("modal-title");
  h2Element.innerText = text;
  return h2Element;
}
const MODAL_FORM = [
  { label: "카테고리", formComponent: () => SelectForm("category", SELECT_CATEGORY), required: true },
  { label: "이름", formComponent: () => InputForm("text", "name", true), required: true },
  { label: "거리(도보 이동 시간)", formComponent: () => SelectForm("distance", SELECT_DISTANCE), required: true },
  { label: "설명", formComponent: () => TextareaForm("description"), notice: "메뉴 등 추가 정보를 입력해 주세요." },
  {
    label: "참고 링크",
    formComponent: () => InputForm("text", "link"),
    notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요."
  }
];
function ModalController(mainElement, { listElement, restaurantList }) {
  const titleElement = Title({ type: "modal", text: "새로운 음식점" });
  const formElement = Form(MODAL_FORM);
  const modalElement = Modal([titleElement, formElement]);
  const closeButtonElement = formElement.querySelector("button[type='button']");
  const modalBackdropElement = modalElement.querySelector(".modal-backdrop");
  closeButtonElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, formElement));
  modalBackdropElement.addEventListener("click", () => EventHandler.modalToggle(mainElement, formElement));
  formElement.addEventListener("submit", (event) => {
    const values = EventHandler.formDataParsing(event);
    const restaurant = restaurantList.addRestaurant(values);
    listElement.appendChild(ListItem(restaurant.information));
    EventHandler.modalToggle(mainElement, formElement);
  });
  mainElement.appendChild(modalElement);
}
function MainController() {
  const app = document.getElementById("app");
  const mainElement = app.querySelector("main");
  const listContainerElement = mainElement.querySelector(".restaurant-list-container");
  const { listElement, restaurantList } = ListController(listContainerElement);
  HeaderController(app);
  ModalController(mainElement, { listElement, restaurantList });
}
MainController();
