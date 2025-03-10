import ButtonsForm from "./ButtonsForm.js";
import FormItem from "./FormItem.js";

function Form(formsProperty, buttonsProperty) {
  const formElement = document.createElement("form");

  formsProperty.forEach((formProperty) => {
    formElement.appendChild(FormItem(formProperty));
  });
  formElement.appendChild(ButtonsForm(buttonsProperty));

  return formElement;
}

export default Form;
