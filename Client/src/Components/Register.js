import { useForm } from "react-hook-form";
import { useEffect, useRef, useState , useMemo} from "react";
import Dropzone from "react-dropzone";
import { useNavigate, Link } from "react-router-dom";
import "../Stylesheet/Register.css";
import FileBase from "react-file-base64"
import Select from 'react-select'
import countryList from 'react-select-country-list'

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [files, setFiles] = useState("");
  const [picErr, setPicErr] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])



  const password = useRef("");
  password.current = watch("password");

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const validation = {
    firstName: {
      required: {
        value: true,
        message: "Enter firstName",
      },
    },
    lastName: {
      required: {
        value: true,
        message: "Enter lastName",
      },
    },
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
      minLength: {
        value: 6,
        message: "Your password should contain atleast 6 characters",
      },
    },
    confirm: {
      required: {
        value: true,
        message: "Confirm Password",
      },
      minLength: {
        value: 6,
        message: "Your password should contain atleast 6 characters",
      },
      validate: (value) => {
        if (value !== password.current) {
          return "The passwords doesn't match";
        }
      },
    },
    // location: {
    //   required: {
    //     value: true,
    //     message: "Enter location",
    //   },
    // },
    occupation: {
      required: {
        value: true,
        message: "Enter occupation",
      },
    },
    picture: {
      required: {
        value: true,
        message: "Enter picture",
      },
    },
  };

  const changeHandler = value => {
    setValue(value)
  }

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
      <section className="sec">
        <div className="main">
          <h2>Sign Up</h2>
          <form
            onSubmit={handleSubmit(async (data, e) => {
              e.preventDefault();
              if (files) {
                const regData = new FormData();
                regData.append("firstName", data.firstName);
                regData.append("lastName", data.lastName);
                regData.append("email", data.email);
                regData.append("password", data.password);
                regData.append("location", value.label);
                regData.append("occupation", data.occupation);
                regData.append("file", files);

                const res = await fetch("https://smoggy-lamb-waders.cyclic.cloud/auth/register", {
                  method: "POST",
                  body: regData,
                });

                const dataSaved = await res.json();

                if (res.ok) {
                  alert("Registered Successfully");
                  navigate("/");
                } else {
                  alert("Registration failed");
                }
              } else {
                return setPicErr(true);
              }
            })}
          >
            <div className="input">
              {/* <label htmlFor="firstName">firstName</label> */}
              <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter firstName"
                {...register("firstName", validation.firstName)}
              />
              <br />
              <p className="errormsg">
                {errors.firstName && errors.firstName.message}
              </p>
            </div>
            <div className="input">
              {/* <label htmlFor="lastName">lastName</label> */}
              <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter lastName"
                {...register("lastName", validation.lastName)}
              />
              <br />
              <p className="errormsg">
                {errors.lastName && errors.lastName.message}
              </p>
            </div>
            <div className="input">
              {/* <label htmlFor="email">Email</label> */}
              <br />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                {...register("email", validation.email)}
              />
              <br />
              <p className="errormsg">{errors.email && errors.email.message}</p>
            </div>
            <div className="input">
              {/* <label htmlFor="password">Password</label> */}
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                {...register("password", validation.password)}
              />
              <br />
              <p className="errormsg">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="input">
              {/* <label htmlFor="password">Password</label> */}
              <br />
              <input
                type="password"
                id="confirm"
                name="confirm"
                placeholder="Confirm Password"
                {...register("confirm", validation.confirm)}
              />
              <br />
              <p className="errormsg">
                {errors.confirm && errors.confirm.message}
              </p>
            </div>
            <div className="input" style={{marginBottom:"0px"}}>
              {/* <label htmlFor="location">location</label> */}
              <br />
              <Select options={options} value={value} onChange={changeHandler} placeholder="Select Country" className="country" />
              <br />
              
            </div>
            <div className="input" style={{marginTop:"-10px", marginBottom: "30px"}}>
              {/* <label htmlFor="occupation">occupation</label> */}
              <br />
              <input
                type="text"
                id="occupation"
                name="occupation"
                placeholder="Enter occupation"
                {...register("occupation", validation.occupation)}
              />
              <br />
              <p className="errormsg">
                {errors.occupation && errors.occupation.message}
              </p>
            </div>
            <div className="dropzone">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  // setFormFields({ ...formFields, fileUploads: base64 })
                  setFiles(base64)
                }
              />
              {picErr && <p className="errormsg">Upload Profile Picture</p>}
            </div>
            <div className="btnGroup">
              <div>
                <button type="submit" id="submitBtn" className="btns">
                  Submit
                </button>
              </div>
              <div>
                <button type="reset" id="clearBtn" className="btns">
                  Reset
                </button>
              </div>
            </div>
          </form>
          <p>
            Existing user? <Link to="/">Click here to login</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;
