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

}

module.exports = new Validators()
