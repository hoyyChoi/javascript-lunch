import ButtonsForm from "./ButtonsForm.js";
import FormItem from "./FormItem.js";

function Form({ fields, buttons }) {
  const formElement = document.createElement("form");

  fields.forEach((formProperty) => {
    formElement.appendChild(FormItem(formProperty));
  });
  formElement.appendChild(ButtonsForm(buttons));

  return formElement;
}

export default Form;
