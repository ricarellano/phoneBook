import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'


const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}


function PhoneBookForm({ addEntryToPhoneBook }) {
    const [values, setValues] = useState({
    userFirstname: 'Coder',
    userLastname: 'Byte',
    userPhone: '8885559999'
  })

  const resetValues = () => {
    setValues({
      userFirstname: '',
      userLastname: '',
      userPhone: ''
    });
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addEntryToPhoneBook(values);
    resetValues();
  }

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        value= {values.userFirstname}
        onChange={handleChange}
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        value={values.userLastname}
        onChange={handleChange}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
        value={values.userPhone}
        onChange={handleChange}
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable(props) {
  const { contacts } = props;
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
       <tbody>
        {contacts.map(d => (
          <tr key={d.userPhone}>
           <td>{d.userFirstname}</td>
           <td>{d.userLastname}</td>
          <td>{d.userPhone}</td>
          </tr>

        ))}
 
    </tbody>
    </table>
  );
}

function Application(props) {
  const [contacts, setContacts] = useState([]);
  
  const addEntryToPhoneBook = (contact) => {
    setContacts([...contacts, contact].sort((a,b) => a.userLastname.toLowerCase() > b.userLastname.toLowerCase() ? 1 : -1))
  }
 
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable contacts={contacts}/>
    </section>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);

