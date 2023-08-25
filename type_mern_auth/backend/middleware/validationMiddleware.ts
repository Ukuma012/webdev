import { body } from "express-validator";

const validationValidation = () => {
  return [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 4 }).withMessage("passwordはもっと長いほうがいいよ"),
  ];
};

const registerValidation = () => {
  return [body("name").isLength({ min: 4 }).withMessage("もっと長い名前にしなよ")];
};

export { validationValidation, registerValidation };