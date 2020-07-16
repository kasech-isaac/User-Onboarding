import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

// **** yup js library ****
const fromSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be valide email adress")
    .required("Email is required"),
    Password: yup.string().required("required"),
    edication: yup.string().required("required"),
  term: yup.boolean().oneOf([true], "please agree to term and condition")
});


export default function Form() {

// **** form state ****
    const [forms, setForms] = useState({
        name: "",
        email: "",
        password: "",
        edication:"",
        term: false
      });
   
// **** error state ****
      const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        edication:"",
        term: ""
      });

      const validate = (e) => {
        yup.reach(fromSchema, e.target.name)
        .validate(e.target.value)
        .then(valid =>{
          setErrorState({
            ...errorState,
            [e.target.name]:""
          })
        })
        .catch( err=>{
          console.log(err.errors)
          setErrorState({
            ...errorState,
            [e.target.name]:err.errors[0]
          })
        })
    
        }

// **** onsubmit ****
      const thOnSubmit = e => {
        e.preventDefault();
       
        axios
        .post("https://reqres.in/api/users", forms)
        .then(response => console.log(response))
        .catch(err => console.log(err));
      };
// **** onchange ****
      const theOnChange = e => {
        e.persist();
        if (e.target.name === "email") {
            validate(e);
          }
          let value =
          e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForms({ ...forms, [e.target.name]: value });
      };
// **** form  ****
      return(
        <form className="form" onSubmit={thOnSubmit}>
              <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={forms.name}
          onChange={theOnChange}
        />
         {errorState.name.length > 0 ? <p className='error'>{errorState.name}</p> : null}
      </label>

      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={forms.email}
          onChange={theOnChange }
        />
        {errorState.email.length > 0 ? <p className="error">{errorState.email}</p>
        : null}
      </label>

      <label htmlFor="password">
      Password:
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={forms.password}
          onChange={theOnChange }
        />
         {errorState.password.length > 0 ? <p className="error">{errorState.password}</p>
        : null}
      </label>

<label htmlFor="edication">
      Edication:
  <select 
         name="edication"
          id="edication"
          onChange={theOnChange }
          >
          <option value="">--What is your highst edication--</option>
          <option value="GED">GED</option>
          <option value="HighSchool Diploma">HighSchool Diploma</option>
          <option value="Some Collage">Collage</option>    
         </select>
         {errorState.edication.length > 0 ? <p className="error">{errorState.edication}</p>
        : null}
        </label>
     
      <label htmlFor="term">
        <input
          type="checkbox"
          id="term"
          name="term"
          checked={forms.term}
          onChange={theOnChange}
        />
        Terms & Service
      </label>
      <button type="submit">Submit</button>
</form>
      )
}
