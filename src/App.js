import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  const options = [
    {
      name: "Нижний регистр",
      value: "abcdefghijklmnopqrstuvwxyz",
    },
    {
      name: "Верний регистр",
      value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    {
      name: "Цифры",
      value: "0123456789",
    },
    {
      name: "Символы",
      value: "!@#$%^&*()",
    },
  ];
  /* Результат генерации */
  const [password, setPassword] = useState("");
  /* Длина пароля */
  const [lengthPassword, setLengthPassword] = useState(8);
  /* Выбранные опции */
  const [checkedOptions, setCheckedOptions] = useState(
    new Array(options.length).fill(false)
  );
  /* Строка с выбранными опциями для генератора */
  const [strOptions, setStrOptions] = useState("");
  /* Проверка опций / Активация кнопки генерации */
  const [disable, setDisable] = useState(true);
  /* Уникальные значения */
  const [unique, setUnique] = useState(false);
  /* Сообщения */
  const [message, setMessage] = useState("");

  /* Обрабочик Checkbox */
  const handleCheckbox = (position) => {
    const updatedCheckedOptions = checkedOptions.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedOptions(updatedCheckedOptions);

    const updatedStrOptions = updatedCheckedOptions.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + options[index].value;
        }
        return sum;
      },
      ""
    );
    setStrOptions(updatedStrOptions);
  };

  /* Обрабочик длины пароля */
  function handleLengthPassword(event) {
    setLengthPassword(event.target.value);
  }
  /* Обрабочик уникальных символов */
  function handleUnique() {
    setUnique(!unique);
  }

  function alertMassage(string) {
    lengthPassword > string.length
      ? setMessage(`Сделать длиннее ${string.length} символов не получится`)
      : setMessage("");
  }

  /* Функция генерации простого пароля */
  function generationSimple(string) {
    let passwordGeneration = [];
    for (var i = 0; i < lengthPassword; ++i) {
      passwordGeneration += string.charAt(
        Math.floor(Math.random() * string.length)
      );
    }
    setPassword(passwordGeneration);
  }
  /* Функция генерации пароля с неповторяющимися символами */
  function generationUnique(string) {
    let passwordGeneration = [];
    for (
      let counter = 0;
      counter <
      (lengthPassword < string.length ? lengthPassword : string.length);
      counter++
    ) {
      let item;
      do {
        item = string.charAt(Math.floor(Math.random() * string.length));
      } while (passwordGeneration.includes(item));
      passwordGeneration.push(item);
    }
    setPassword(passwordGeneration.join(""));
    alertMassage(string);
  }

  /* Функция обработки выбора режима для генерации пароля */
  const generation = (string) =>
    unique ? generationUnique(string) : generationSimple(string);

  /* Функция копирования пароля в буфер обмена */
  function copyPassword(password) {
    navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    setDisable(checkedOptions.every((option) => option === false));
    setMessage("");
  }, [checkedOptions, lengthPassword]);

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>Генератор паролей</h1>
      <p className={styles.password} id="password">
        {password}{" "}
      </p>
      <span className={styles.message}>{message}</span>

      <Button
        type={"button"}
        styles={styles.copy}
        title={"Копировать"}
        disabled={!password}
        onClick={() => copyPassword(password)}
        text={"Копировать"}
      />

      <div className={styles.slider}>
        <Input
          type={"range"}
          id={"length"}
          name={"length"}
          value={lengthPassword}
          onChange={handleLengthPassword}
          min={"1"}
          max={"50"}
        />
        <label className={styles.input_label} htmlFor="length">
          Длина пароля&nbsp;
          <span className={styles.input_label_span}>{lengthPassword}</span>
        </label>
      </div>

      <div className={styles.input_unique}>
        <Input
          type={"checkbox"}
          id={"unique"}
          name={"unique"}
          value={unique}
          onChange={handleUnique}
        />
        <label className={styles.input_unique_label} htmlFor="unique"></label>
        <span className={styles.input_unique_span}>Символы не повторяются</span>
      </div>

      <ul className={styles.options_list}>
        {options.map(({ name }, index) => {
          return (
            <li key={index}>
              <div className={styles.options_list_item}>
                <Input
                  styles={styles.checkbox}
                  type={"checkbox"}
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  checked={checkedOptions[index]}
                  onChange={() => handleCheckbox(index)}
                />
                <label
                  className={styles.checkbox_label}
                  htmlFor={`custom-checkbox-${index}`}
                >
                  {name}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <Button
        type={"button"}
        styles={styles.create}
        title={"Создать"}
        disabled={disable}
        onClick={() => generation(strOptions)}
        text={"Создать"}
      />
    </article>
  );
}
export default App;
