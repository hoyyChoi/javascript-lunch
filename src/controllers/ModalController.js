import Form from "../components/Form/Form.js";
import InputForm from "../components/Form/InputForm.js";
import SelectForm from "../components/Form/SelectForm.js";
import TextareaForm from "../components/Form/TextareaForm.js";
import ListItem from "../components/ListItem.js";
import Modal from "../components/Modal.js";
import Title from "../components/Title.js";
import { MODAL_FORM_CONFIG, MODAL_TITLE } from "../contants.js";
import EventHandler from "./EventHandler.js";

export function ModalController(mainElement, { listElement, restaurantList }) {
  const titleElement = Title(MODAL_TITLE);
  const formElement = Form(MODAL_FORM_CONFIG);
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
