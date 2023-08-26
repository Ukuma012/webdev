import { body } from "express-validator";

const registerValidation = () => {
  return [body("name").isLength({ min: 4 }).withMessage("もっと長い名前にしなよ")];
};

export { registerValidation };
