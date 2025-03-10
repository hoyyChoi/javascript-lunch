import InputForm from "./InputForm.js";
import SelectForm from "./SelectForm.js";
import TextareaForm from "./TextareaForm.js";

function FormItem({ label, type, name, options, inputType = "text", notice = "", required = false }) {
  const formItemElement = document.createElement("div");
  formItemElement.classList.add("form-item");

  if (required) {
    formItemElement.classList.add("form-item--required");
  }

  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", name);
  labelElement.textContent = matchLabel[name];
  formItemElement.appendChild(labelElement);

  const formComponent = matchFormComponent({ type, name, options, inputType, required });
  formItemElement.appendChild(formComponent);

  if (notice) {
    const noticeElement = document.createElement("span");
    noticeElement.classList.add("help-text");
    noticeElement.textContent = notice;
    formItemElement.appendChild(noticeElement);
  }

  return formItemElement;
}

export default FormItem;

const matchLabel = {
  category: "카테고리",
  name: "이름",
  distance: "거리(도보 이동 시간)",
  description: "설명",
  link: "참고 링크",
};
function matchFormComponent({ type, name, options, inputType, required }) {
  if (type === "select") {
    return SelectForm(name, options);
  }
  if (type === "textarea") {
    return TextareaForm(name);
  }
  return InputForm(inputType, name, required);
}
