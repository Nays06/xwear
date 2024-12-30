import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const LoginWindow = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [authErrorMail, setAuthErrorMail] = useState('');
  const [authErrorPass, setAuthErrorPass] = useState('');

  let allUsersMailsAndPasswords = []
  JSON.parse(localStorage.getItem("xwear_users"))?.forEach((user) => {
    allUsersMailsAndPasswords.push({id: user.id, login: user.login, pas: user.password})
  })

  const onSubmit = (data) => {
    setAuthErrorMail("")
    setAuthErrorPass("")

    const user = allUsersMailsAndPasswords.find(u => u.login === data.login);
    

    if (!user) {
      setAuthErrorMail("Пользователь с таким email не найден");
      return;
    }

    if (user.pas !== data.password) {
      setAuthErrorPass("Неверный пароль");
      return;
    }
    
    reset()
    localStorage.setItem("xwear_currentUserID", user.id)
    navigate('/')
  };

  return (
    <div className="logReg-window">
      <div className="logReg-window-title">Войти</div>

      <form className="mt20" onSubmit={handleSubmit(onSubmit)}>
        <div className="logReg-window-input">
          <input
            type="email"
            placeholder="Email адрес"
            {...register("login", {
              required: "Поле не должно быть пустым.",
              minLength: { value: 5, message: "Минимум 5 символов" },
              maxLength: { value: 25, message: "Максимум 25 символов" },
            })}
          />

          <div className="logReg-error_message">
            {errors?.login?.message || authErrorMail}
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
            {errors?.password?.message || authErrorPass}
          </div>
        </div>

        <div className="df w100p aic jcsb mt10">
          <label className="df aic">
            <input type="checkbox" {...register("rememberMe")} />
            Запомнить
          </label>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/search?q=Что+делать+если+я+забыл+пароль%3F&"
          >
            Забыли пароль?
          </a>
        </div>

        <div className="df w100p jcc mt40">
          <button type="submit" className="logReg-window-but">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
