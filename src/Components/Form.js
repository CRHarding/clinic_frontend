import React from 'react';

const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input 
        type="text" 
        name="zip" 
        placeholder={props.placeholder} 
        onChange={props.onChange} 
        value={props.formData.zip} 
      />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Form;