const regExpForEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/;
const regExpForPhone = /\+380 \(\d\d\) \d\d\d-\d\d-\d\d/;

const defineAgeFromBirthday = birthday => {
  const dateOfBirthday = new Date(birthday);
  const currentYear = new Date().getFullYear();
  const birthdayYear = dateOfBirthday.getFullYear();
  const years = currentYear - birthdayYear;
  const currentBirthday = new Date(dateOfBirthday).setFullYear(currentYear);
  const age = currentBirthday <= new Date() ? years : years - 1;
  return age;
};

export const setMaskForPhone = string => {
  const mask = '+380 (XX) XXX-XX-XX';
  const enteredDigits = string.replace(/\+380|\D/g, '');
  let i = 0;
  const newString = mask
    .replace(/(X)/g, char => {
      return i < enteredDigits.length ? enteredDigits[i++] : '';
    })
    // .replace(/(\+(\d)*)*\D+(?!.)/g, '');
    .replace(/((?<!.)\+380)*\D+(?!.)/g, '');
  return newString;
};

const validationOnRegExp = (val, labelName, regExp) => {
  const isMatched = val.trim().match(regExp);
  const isValueValid = isMatched
    ? val.trim().match(regExp)[0] === val.trim()
    : false;
  return {
    isValueValid,
    errMessage: !isValueValid ? `Некоректний ${labelName}` : '',
  };
};

export const inputValidation = (val, inputName, labelName) => {
  let errMessage = '';
  let isValueValid = val.trim() !== '';

  if (!isValueValid)
    return {
      isValueValid,
      errMessage: `Введіть ${labelName}`,
    };

  if (inputName === 'email') {
    const regExp = regExpForEmail;
    ({isValueValid, errMessage} = validationOnRegExp(val, labelName, regExp));
    if (!isValueValid)
      return {
        isValueValid,
        errMessage,
      };
  }

  if (inputName === 'phone') {
    const regExp = regExpForPhone;
    ({isValueValid, errMessage} = validationOnRegExp(val, labelName, regExp));
    if (!isValueValid)
      return {
        isValueValid,
        errMessage,
      };
  }

  if (inputName === 'birthday') {
    const minAge = 14;
    const maxAge = 100;
    const dateValue = new Date(val);

    if (dateValue.getTime() > Date.now())
      return {
        isValueValid: false,
        errMessage: 'Дата народження більша за поточну дату',
      };
    const age = defineAgeFromBirthday(val);

    if (age < minAge)
      return {
        isValueValid: false,
        errMessage: 'Користувач молодшій за 14 років',
      };

    if (age >= maxAge)
      return {
        isValueValid: false,
        errMessage: 'Користувач старший за 100 років',
      };
  }

  return {
    isValueValid: true,
    errMessage,
  };
};
