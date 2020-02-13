import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onBlur"
  });

  const onSubmit = data => {
    // This only updates the local state. Replaced this with a response from a server
    // setData(data);
    postReqRes(data);
  };

//   XHR Implementation rather than bringing in Axios

//   const xhr = new XMLHttpRequest()

//   Add event listener for when the server sends a resopnse
//   xhr.addEventListener('load', () => {
//     console.log(xhr.responseText)
//   })

//   Tell xhr we will be making a POST 
//   xhr.open('POST', 'https://reqres.in/api/users')

  const postReqRes = data => {
    console.log(data)
    // xhr.send(JSON.stringify({
    //   "name": "morpheus",
    //   "job": "leader"
    // }))
    axios.post('https://reqres.in/api/users', data) 
    // Made the success call a function to handle data, and to also update the form to the correct state
      .then(res => updateData(res.data))
      .catch(err => console.log(err))
  }

  // This sets the local state to have to res.data, and also resets the form fields to their initial state
  const updateData = data => {
    console.log(data)
    setData(data)
    reset({
      name: '',
      lastName: '',
      email: '',
      message: ''
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form-element">
        <div data-testid="name-element">
          <label htmlFor="first-name">First Name*</label>
          <input
            id="first-name"
            name="first-name"
            ref={register({ required: true })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div data-testid="last-element">
          <label htmlFor="last-name">Last Name*</label>
          <input
            id="last-name"
            name="last-name"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div data-testid="email-element">
          <label htmlFor="email">
            Email*
          </label>
          <input id="email" name="email" ref={register({ required: true })} />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div data-testid="message-element">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" ref={register({ required: false })} />
        </div>
        {/* This data is empty on app load, then when the user makes a post request it will update on success */}
        {data && (
          <pre style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input id="submit" type="submit" data-testid="input-element"/>
      </form>
    </div>
  );
};

export default ContactForm;