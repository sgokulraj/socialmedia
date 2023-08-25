import "../Stylesheet/Login.css";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../ReduxState/index";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const validation = {
    email: {
      required: {
        value: true,
        message: "Enter Email",
      },
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Enter valid Email address",
      },
    },
    password: {
      required: {
        value: true,
        message: "Enter Password",
      },
    },
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Test Credentials</Popover.Header>
      <Popover.Body>
        <p><strong>Email:</strong> gokul@test.com</p>
        <p><strong>Password:</strong> Gokul!123</p>
      </Popover.Body>
    </Popover>
  )


  return (
    <>
      <nav
        className="navbar bg-body-tertiary py-2 px-3 bg-dark "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 fs-3 loginTitle">SnapBook</span>
        </div>
      </nav>
      <div className="login">
        <div className="mainContainer">
          <h2>Login</h2>
          <form
            onSubmit={handleSubmit(async (data, e) => {
              e.preventDefault();
              const response = await fetch("https://smoggy-lamb-waders.cyclic.cloud/auth/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  email: data.email,
                  password: data.password,
                }),
              });

              // console.log(response);
              const dataSaved = await response.json();
              if (response.ok) {
                dispatch(
                  setLogin({
                    user: dataSaved.user,
                    token: dataSaved.token,
                  })
                );
                alert("Signin successfully!!!");
                navigate("/home");
              } else {
                alert("login failed");
              }
            })}
          >
            <div className="inputContainer">
              <label htmlFor="email"  style={{float:"left"}}>Email</label>
              <br />
              <input
                type="text"
                id="email"
                name="email"
                className="inputbox"
                placeholder="Enter valid email"
                {...register("email", validation.email)}
              />
              <br />
              <p className="errmsg">{errors.email && errors.email.message}</p>
            </div>
            <div className="inputContainer">
              <label htmlFor="password"  style={{float:"left"}}>Password</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                className="inputbox"
                placeholder="Enter Password"
                {...register("password", validation.password)}
              />
              <br />
              <p className="errmsg">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="btnContainer">
              <Button type="submit" variant="dark" id="submitBtn">
                Submit
              </Button>
              <Button type="reset" variant="dark" id="clearBtn">
                Reset
              </Button>
            </div>
          </form>
          <p className="newUserLink">New to SnapBook? <Link to="/register">Click here to Register</Link></p>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover} className="testCred">
            <Button variant="success">View Test Credentials</Button>
          </OverlayTrigger>
        </div>
      </div>
    </>
  );
}

export default Login;
