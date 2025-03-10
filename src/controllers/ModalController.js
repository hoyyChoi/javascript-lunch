import Form from "../components/Form/Form.js";
import InputForm from "../components/Form/InputForm.js";
import SelectForm from "../components/Form/SelectForm.js";
import TextareaForm from "../components/Form/TextareaForm.js";
import ListItem from "../components/ListItem.js";
import Modal from "../components/Modal.js";
import Title from "../components/Title.js";
import { SELECT_CATEGORY, SELECT_DISTANCE } from "../contants.js";
import EventHandler from "./EventHandler.js";

// const MODAL_FORM_PROPERTY = [
//   { form: "select", id: "category", formComponent: () => SelectForm("category", SELECT_CATEGORY), required: true },
//   { form: "input", id: "name", formComponent: () => InputForm("text", "name", true), required: true },
//   {
//     form: "select",
//     id: "distance",
//     formComponent: () => SelectForm("distance", SELECT_DISTANCE),
//     required: true,
//   },
//   {
//     form: "textarea",
//     id: "description",
//     formComponent: () => TextareaForm("description"),
//     notice: "메뉴 등 추가 정보를 입력해 주세요.",
//   },
//   {
//     form: "input",
//     id: "link",
//     formComponent: () => InputForm("text", "link"),
//     notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
//   },
// ];

const MODAL_TITLE = { type: "modal", text: "새로운 음식점" };

const MODAL_FORM_PROPERTY = [
  { label: "카테고리", type: "select", name: "category", options: SELECT_CATEGORY, required: true },
  { label: "이름", type: "input", name: "name", inputType: "text", required: true },
  { label: "거리(도보 이동 시간)", type: "select", name: "distance", options: SELECT_DISTANCE, required: true },
  { label: "설명", type: "textarea", name: "description", notice: "메뉴 등 추가 정보를 입력해 주세요." },
  {
    label: "참고 링크",
    type: "input",
    name: "link",
    inputType: "text",
    notice: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
  },
];

const MODAL_BUTTONS_PROPERTY = [
  { type: "button", stylingBased: "secondary", text: "취소하기" },
  { type: "submit", stylingBased: "primary", text: "등록하기" },
];

export function ModalController(mainElement, { listElement, restaurantList }) {
  const titleElement = Title(MODAL_TITLE);
  const formElement = Form(MODAL_FORM_PROPERTY, MODAL_BUTTONS_PROPERTY);
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

export default ModalController;
