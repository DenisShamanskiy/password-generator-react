import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  const options = [
    {
      name: "Нижний регистр",
      shortName: "abc",
      value: "abcdefghijklmnopqrstuvwxyz",
    },
    {
      name: "Верний регистр",
      shortName: "ABC",
      value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    {
      name: "Цифры",
      shortName: "123",
      value: "0123456789",
    },
    {
      name: "Символы",
      shortName: "@#$",
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
  console.log(checkedOptions);

  /* Строка с выбранными опциями для генератора */
  const [strOptions, setStrOptions] = useState("");
  /* Проверка опций / Активация кнопки генерации */
  const [disable, setDisable] = useState(true);
  /* Уникальные значения */
  const [unique, setUnique] = useState(false);
  /* Сообщения */
  const [message, setMessage] = useState("");
  /* Выбор первого символа */
  const [firstSymbol, setFirstSymbol] = useState("");
  /* Выбранный символ */
  const [checkedRadio, setCheckedRadio] = useState(
    new Array(options.length).fill(false)
  );

  /* Обрабочик выбора первого символа */
  function handleFirstSymbol(event) {
    setCheckedRadio(checkedRadio.fill(false));
    setFirstSymbol(event.target.value);
    const updatedCheckedRadio = checkedRadio.map((item, index) =>
      index === +event.target.id ? !item : item
    );
    setCheckedRadio(updatedCheckedRadio);
  }

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

    if (checkedRadio[position] === true && checkedOptions[position] === true) {
      setFirstSymbol("");
      setCheckedRadio(checkedRadio.fill(false));
    }
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
    if (firstSymbol ? true : false) {
      let a = firstSymbol.charAt(
        Math.floor(Math.random() * firstSymbol.length)
      );
      for (var i = 0; i < lengthPassword - 1; ++i) {
        passwordGeneration += string.charAt(
          Math.floor(Math.random() * string.length)
        );
      }
      setPassword(a + passwordGeneration);
    } else {
      for (var j = 0; j < lengthPassword; ++j) {
        passwordGeneration += string.charAt(
          Math.floor(Math.random() * string.length)
        );
      }
      setPassword(passwordGeneration);
    }
  }
  /* Функция генерации пароля с неповторяющимися символами */
  function generationUnique(string) {
    let passwordGeneration = [];
    if (firstSymbol ? true : false) {
      passwordGeneration.push(
        firstSymbol.charAt(Math.floor(Math.random() * firstSymbol.length))
      );
      for (
        let counter = 0;
        counter <
        (lengthPassword < string.length
          ? lengthPassword - 1
          : string.length - 1);
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
    } else {
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
  }

  /* Функция обработки выбора режима для генерации пароля */
  const generation = (string) =>
    unique ? generationUnique(string) : generationSimple(string);

  /* Функция копирования пароля в буфер обмена */
  function copyPassword(password) {
    navigator.clipboard.writeText(password);
  }
  let test = checkedOptions.filter((number) => number === true);
  useEffect(() => {
    setDisable(checkedOptions.every((option) => option === false));

    if (test.length <= 1) {
      setCheckedRadio(checkedRadio.fill(false));
      setFirstSymbol("");
    }
    setMessage("");
  }, [checkedOptions, test.length, checkedRadio, lengthPassword]);

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
        <label className={styles.input_label} htmlFor="length">
          Длина пароля&nbsp;
          <span className={styles.input_label_span}>{lengthPassword}</span>
        </label>
        <Input
          type={"range"}
          id={"length"}
          name={"length"}
          value={lengthPassword}
          onChange={handleLengthPassword}
          min={"1"}
          max={"50"}
        />
      </div>

      <ul className={styles.options_list}>
        {options.map(({ name }, index) => {
          return (
            <li key={index} className={styles.options_list_item}>
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
            </li>
          );
        })}
      </ul>
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
      <div className={styles.wrapperFirstSymbol}>
        Первый символ
        <ul className={styles.listFirstSymbol}>
          {options.map(({ shortName }, index) => {
            return (
              <li key={index}>
                <Input
                  type={"radio"}
                  name={"radio2"}
                  id={index}
                  value={options[index].value}
                  checked={checkedRadio[index] && checkedOptions[index]}
                  disabled={test.length <= 1 || !checkedOptions[index]}
                  onChange={handleFirstSymbol}
                />
                <label className={styles.firstSymbolLabel} htmlFor={index}>
                  {shortName}
                </label>
              </li>
            );
          })}
          <li>
            <Input
              type="radio"
              id="4"
              name="radio2"
              value=""
              checked={firstSymbol === "" || test.length <= 1}
              onChange={handleFirstSymbol}
            />
            <label className={styles.firstSymbolLabel} htmlFor="4">
              Любой
            </label>
          </li>
        </ul>
      </div>
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
