const {body} = require('express-validator')

class Validators { 
  registrationValidator = () => { 
    return [ 
      body('email')
        .notEmpty()
        .withMessage('Введите почту.'),
      body('email')
        .isEmail()
        .withMessage('Некорректный формат почты.'),
      body('password')
        .notEmpty()
        .withMessage('Введите пароль.'),
      body('password')
        .isLength({min:4, max:20})
        .withMessage('Длинна пароля не может быть менее 4 и более 20 символов'),
      body('password')
        .matches(/^[A-Za-zА-Яа-я0-9!@#$%^&*]+$/)
        .withMessage('Пароль может содержать только символы ^[A-Za-zА-Яа-я0-9!@#$%^&*]+$.'),
      body('nickname')
        .notEmpty()
        .withMessage('Укажите ваше имя.'),
      body('nickname')
        .isLength({min:4, max:20})
        .withMessage('Длинна никнейма не может быть менее 4 и более 20 символов'),
      body('nickname')
        .matches(/^[A-Za-zА-Яа-я0-9]+$/)
        .withMessage('Никнейм может содержать только символы [A-Za-zА-Яа-я0-9].'),
    ]
  }
  loginValidator = () => { 
    return [ 
      body('email')
        .notEmpty()
        .withMessage('Введите почту.'),
      body('password')
        .notEmpty()
        .withMessage('Введите пароль.'),
    ]
  }
  addCardsValidator = () => { 
    return [ 
      body('inspectionDeadline')
        .notEmpty()
        .withMessage('Укажите срок проверки.'),
      body('responsibleWorker')
       .notEmpty()
       .withMessage('Назначьте ответственного работника.'),
      body('city')
       .notEmpty()
       .withMessage('Укажите город.'),
       body('city')
       .matches(/^[А-Яа-яЁё]+$/)       
       .withMessage('Город может содержать только кириллицу'),
      body('street')
        .notEmpty()
        .withMessage('Укажите улицу.'),
      body('street')
        .matches(/^[А-Яа-яЁё]+$/)       
        .withMessage('Улица может содержать только кириллицу'),
      body('home')
       .notEmpty()
       .withMessage('Укажите дом.'),
      body('home')
      .matches(/^[А-Яа-яЁё0-9]+$/)
      .withMessage('Дом может содержать только кириллицу и цифры 0-9'),
      body('homeType')
       .notEmpty()
       .withMessage('Укажите тип дома.'),
      body('homeType')
       .matches(/^[А-Яа-яЁё]+$/)       
       .withMessage('Улица может содержать только кириллицу'),
      body('category')
        .notEmpty()
        .withMessage('Укажите категорию.'),
      body('owner')
        .notEmpty()
        .withMessage('Укажите владельца дома.'),
      body('street')
        .matches(/^[А-Яа-яЁё]+$/)       
        .withMessage('поле "Владелец" может содержать только кириллицу'),
    ]
  }
  fillCardValidator = () => { 
    return [ 
      body('rooms')
        .notEmpty()
        .withMessage('Укажите количество комнат.'),
      body('rooms')
        .matches(/^[0-9]+$/)
        .withMessage('Количество комнат выражается числом.'),
      body('APIs')
        .notEmpty()
        .withMessage('Укажите количество извещателей.'),
      body('APIs')
        .matches(/^[0-9]+$/)
        .withMessage('Количество извещателей выражается числом.'),
      body('noBatteryAPIs')
        .notEmpty()
        .withMessage('Укажите количество извещателей без батареек.'),
      body('noBatteryAPIs')
        .matches(/^[0-9]+$/)
        .withMessage('Количество извещателей без батареек выражается числом.'),
      body('ovens')
        .notEmpty()
        .withMessage('Укажите количество печей.'),
      body('ovens')
        .matches(/^[0-9]+$/)
        .withMessage('Количество печей выражается числом.'),
      body('faultyOvens')
        .notEmpty()
        .withMessage('Укажите количество неисправных печей.'),
      body('faultyOvens')
        .matches(/^[0-9]+$/)
        .withMessage('Количество неисправных печей выражается числом.'),
      body('repairNeededOvens')
        .notEmpty()
        .withMessage('Укажите количество печей требующих ремонта.'),
      body('repairNeededOvens')
        .matches(/^[0-9]+$/)
        .withMessage('Количество печей, требующих ремонта выражается числом.'),
    ]
  }
  newNicknameValidator = () => { 
    return [ 
      body('newNickname')
        .notEmpty()
        .withMessage('Никнейм не может быть пустой строкой!'),
      body('newNickname')
      .matches(/^[A-Za-zА-Яа-я0-9()_]+$/)
      .withMessage('Никнейм может содержать только кириллицу, латынь и цифры 0-9'),
    ]
  }
  newEmailValidator = () => { 
    return [
      body('newEmail')
      .notEmpty()
      .withMessage('Почта не может быть пустой строкой!'),
    ]
  }
}

module.exports = new Validators()