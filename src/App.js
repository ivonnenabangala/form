import React, { useReducer, useState } from 'react';
import './App.css';

const formReducer = (state, event) => {
  if(event.reset) {
    return {
      firstname: '',
      lastname: '',
      email: '',
      gender: '',
      address: '',
      bio: '',
    }
  }
 return {
   ...state,
   [event.name]: event.value
 }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    console.log(event.target.elements.firstname.value)
    console.log(event.target.elements.lastname.value)
    console.log(event.target.elements.email.value)
    console.log(event.target.elements.gender.value)
    console.log(event.target.elements.address.value)
    console.log(event.target.elements.bio.value)


    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 4000);
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return(
    <div className="wrapper">
    <h1>Fill the form below</h1>
    {submitting &&
     <div>
       You are submitting the following:
       <ul>
         {Object.entries(formData).map(([name, value]) => (
           <li key={name}><strong>{name}</strong>:{value.toString()}</li>
         ))}
       </ul>
     </div>
    }
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <p>First Name</p>
          <input placeholder='First Name' name="firstname" onChange={handleChange} value={formData.firstname || ''} required/>
        </label>
        <label>
          <p>Last Name</p>
          <input placeholder='Last Name' name="lastname" onChange={handleChange} value={formData.lastname || ''} required/>
        </label>
        <label>
          <p>Email</p>
          <input type= "text" placeholder='example@gmail.com' name="email" onChange={handleChange} value={formData.email || ''} required/>
        </label>
        <label>
           <p>Gender</p>
           <select name="gender" onChange={handleChange} value={formData.gender || ''} required>
               <option value="">Please select your gender</option>
               <option value="male">Female</option>
               <option value="male">Male</option>
               <option value="transgender">Transgender</option>
               <option value="null">Prefer not to say</option>
           </select>
         </label>
         <label>
          <p>Address</p>
          <input placeholder="Postal address" name="address" onChange={handleChange} value={formData.address || ''} required/>
        </label>
        <label>
          <p>Bio</p>
          <textarea placeholder="300 words" rows="4" cols="50" name="bio" onChange={handleChange} value={formData.bio || ''} required/>
        </label>
      </fieldset>
      <button style={{width: "64px"}} type="submit">Submit</button>
    </form>
  </div>
  )
}

export default App;