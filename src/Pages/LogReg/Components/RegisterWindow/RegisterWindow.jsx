import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const RegisterWindow = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  let allUsersMails = [];
  JSON.parse(localStorage.getItem("xwear_users"))?.forEach((user) => {
    allUsersMails.push(user.login);
  });

  const onSubmit = (data) => {
    delete data.confirmPassword;
    if (!localStorage.getItem("xwear_users")) {
      data.id = 1;
      localStorage.setItem("xwear_users", JSON.stringify([data]));
      localStorage.setItem("xwear_currentUserID", data.id);
    } else {
      let allUsers = JSON.parse(localStorage.getItem("xwear_users"));
      data.id = allUsers.length + 1;
      allUsers.push(data);
      localStorage.setItem("xwear_users", JSON.stringify(allUsers));
      localStorage.setItem("xwear_currentUserID", data.id);
    }
    reset();
    navigate("/");
  };

  const password = watch("password");

  return (
    <div className="logReg-window">
      <div className="logReg-window-title">Регистрация</div>

      <form className="mt20" onSubmit={handleSubmit(onSubmit)}>
        <div className="logReg-window-input">
          <input
            type="email"
            placeholder="Логин"
            {...register("login", {
              required: "Поле не должно быть пустым.",
              minLength: { value: 5, message: "Минимум 5 символов" },
              maxLength: { value: 25, message: "Максимум 25 символов" },
              validate: (value) =>
                allUsersMails.includes(value)
                  ? "Пользователь с такой почтой уже есть!"
                  : true,
            })}
          />
          <div className="logReg-error_message">
            {errors.login && errors.login.message}
          </div>
        </div>

        <div className="logReg-window-input">
          <input
            type="password"
            placeholder="Пароль"
            {...register("password", {
              required: "Поле не должно быть пустым.",
              minLength: { value: 8, message: "Минимум 8 символов" },
              maxLength: { value: 20, message: "Максимум 20 символов" },
            })}
          />
          <div className="logReg-error_message">
            {errors.password && errors.password.message}
          </div>
        </div>

        <div className="logReg-window-input">
          <input
            type="password"
            placeholder="Подтвердите пароль"
            {...register("confirmPassword", {
              required: "Поле не должно быть пустым.",
              minLength: { value: 8, message: "Минимум 8 символов" },
              maxLength: { value: 20, message: "Максимум 20 символов" },
              validate: (value) => value === password || "Пароли не совпадают.",
            })}
          />
          <div className="logReg-error_message">
            {errors.confirmPassword && errors.confirmPassword.message}
          </div>
        </div>
        <div className="df w100p jcc">
          <button type="submit" className="logReg-window-but mt40">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};
