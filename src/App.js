import { useState, useEffect } from "react";
import "./index.css";
// import styles from "./App.module.css";
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
  const [lengthPassword, setLengthPassword] = useState(10);
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
  /* Выбор первого символа */
  const [firstSymbol, setFirstSymbol] = useState("");
  /* Выбранный символ */
  const [checkedRadio, setCheckedRadio] = useState(
    new Array(options.length).fill(false)
  );
  // Проверка количества выбранных опций для генерации пароля
  let optionTrue = checkedOptions.filter((item) => item === true).length <= 1;

  // Обрабочик выбора первого символа
  function handleFirstSymbol(event) {
    setCheckedRadio(checkedRadio.fill(false));
    setFirstSymbol(event.target.value);
    const updatedCheckedRadio = checkedRadio.map((item, index) =>
      index === +event.target.id ? !item : item
    );
    setCheckedRadio(updatedCheckedRadio);
  }

  // Обрабочик опций для генерации пароля
  const handleOption = (position) => {
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

  // Обрабочик длины пароля
  function handleLengthPassword(event) {
    setLengthPassword(event.target.value);
  }
  // Обрабочик уникальных символов
  function handleUnique() {
    setUnique(!unique);
  }

  function alertMassage(string) {
    lengthPassword > string.length
      ? setMessage(`Сделать длиннее ${string.length} символов не получится`)
      : setMessage("");
  }

  // Генерация простого пароля
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
  // Цикл подбора уникального символа
  function uniqueSymbolCycle(arr, str) {
    let item;
    do {
      item = str.charAt(Math.floor(Math.random() * str.length));
    } while (arr.includes(item));
    arr.push(item);
    return arr;
  }
  // Генерация пароля с неповторяющимися символами
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
        uniqueSymbolCycle(passwordGeneration, string);
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
        uniqueSymbolCycle(passwordGeneration, string);
      }
      setPassword(passwordGeneration.join(""));
      alertMassage(string);
    }
  }

  // Обработки выбора режима для генерации пароля
  const generation = (string) =>
    unique ? generationUnique(string) : generationSimple(string);

  // Копирование пароля в буфер обмена
  function copyPassword(password) {
    navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    setDisable(checkedOptions.every((option) => option === false));

    if (optionTrue) {
      setCheckedRadio(checkedRadio.fill(false));
      setFirstSymbol("");
    }
    setMessage("");
  }, [checkedOptions, optionTrue, checkedRadio, lengthPassword]);

  return (
    <article className="container">
      <h1 className="title">Генератор паролей</h1>
      <p className="password" id="password">
        {password}{" "}
      </p>
      <span className="message">{message}</span>

      <Button
        type={"button"}
        styles="copy"
        title={"Копировать"}
        disabled={!password}
        onClick={() => copyPassword(password)}
        text={"Копировать"}
      />

      <div className="password__length">
        <label className="password__length_label" htmlFor="length">
          Длина пароля&nbsp;
          <span className="password__length_span">{lengthPassword}</span>
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

      <ul className="options__list">
        {options.map(({ name }, index) => {
          return (
            <li key={index} className="options__list_item">
              <Input
                type={"checkbox"}
                id={`option-${index}`}
                name={name}
                value={name}
                checked={checkedOptions[index]}
                onChange={() => handleOption(index)}
              />
              <label htmlFor={`option-${index}`}>{name}</label>
            </li>
          );
        })}
      </ul>
      <div className="unique__symbol">
        <Input
          type={"checkbox"}
          id={"unique"}
          name={"unique"}
          value={unique}
          onChange={handleUnique}
        />
        <label className="unique__symbol_label" htmlFor="unique"></label>
        <span className="unique__symbol_span">Символы не повторяются</span>
      </div>
      <div className="first__symbol">
        Первый символ
        <ul className="first__symbol_list">
          {options.map(({ shortName }, index) => {
            return (
              <li key={index}>
                <Input
                  type={"radio"}
                  name={"radio2"}
                  id={index}
                  value={options[index].value}
                  checked={checkedRadio[index] && checkedOptions[index]}
                  disabled={optionTrue || !checkedOptions[index]}
                  onChange={handleFirstSymbol}
                />
                <label className="first__symbol_label" htmlFor={index}>
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
              checked={firstSymbol === "" || optionTrue}
              onChange={handleFirstSymbol}
            />
            <label className="first__symbol_label" htmlFor="4">
              Любой
            </label>
          </li>
        </ul>
      </div>
      <Button
        type={"button"}
        styles="create"
        title={"Создать"}
        disabled={disable}
        onClick={() => generation(strOptions)}
        text={"Создать"}
      />
    </article>
  );
}
export default App;
