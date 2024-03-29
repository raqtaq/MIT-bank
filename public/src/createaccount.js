import React from "react";
import { Container, Card, Button, InputGroup, Alert } from "react-bootstrap";
// import { UserContext } from "./context";

// function CreateAccount(){
//   const [show, setShow]         = React.useState(true);
//   const [status, setStatus]     = React.useState('');
//   const [name, setName]         = React.useState('');
//   const [email, setEmail]       = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const validEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // Validating Email

//   const ctx = React.useContext(UserContext);

//   function validate(field, label){
//       if (!field) { // Validate all fields are filled.
//         setStatus(<Alert variant="danger">All fields are required (name, email and password.)</Alert>);
//         setTimeout(() => setStatus(''),3000);
//         return false;
//       }

//       if (!email.match(validEmail)) { // Validate email format is valid.
//         setStatus(<Alert variant="danger">Please, enter a valid email.</Alert>);
//         setTimeout(() => setStatus(''), 5000);
//         return false;
//       }

//       if (password.length < 8) { // Validate password is atl least 8 characters long
//         setStatus(<Alert variant="danger">The password must be at least 8 characters.</Alert>);
//         setTimeout(() => setStatus(''),3000);
//         return false;
//       }

//       return true;
//   }

//   function handleCreate(){
//     if (!validate(name,     'name'))     return;
//     if (!validate(email,    'email'))    return;
//     if (!validate(password, 'password')) return;

//     ctx.users.push({name,email,password,balance:100});
//     setShow(false);
//   }

//   function clearForm(){
//     setName('');
//     setEmail('');
//     setPassword('');
//     setShow(true);
//   }

//   return (
//     <div>
//       <h1>Join Looybi's Bank</h1>
//     <Container  className="Container">
//     <Card>
//     <Card.Header as="h3">Create your client account.</Card.Header>
//           <Card.Body>
//           {status}
//       {show ? (
//               <>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text  className="input-label">Name</InputGroup.Text>
//                 <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} />
//               </InputGroup>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text className="input-label">em@il</InputGroup.Text>
//               <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
//               </InputGroup>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text  className="input-label">Password</InputGroup.Text>
//               <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
//               </InputGroup>
//               <Button variant="dark" id="createIt" type="submit" onClick={handleCreate}>Create your account</Button>
//               </>
//             ):(
//               <>
//               <Alert variant="success">Your account has been created.</Alert>
//               <Button variant="dark" type="submit" onClick={clearForm}>Create another account</Button>
//               </>
//             )}
//         </Card.Body>
//     </Card>
//     </Container>
//     </div>
//   )
// }


function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (<>
    {/* <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ?
        <CreateForm setShow={setShow}/> :
        <CreateMsg setShow={setShow}/>}
    /> */}

    <div>
    <h1>Create account</h1>
    <Container  className="Container">
      <Card>
        <Card.Body>
          {show ? <CreateForm setShow={setShow} setStatus={setStatus}/> : <CreateMsg setShow={setShow} setStatus={setStatus}/>}
        </Card.Body>
      </Card>
    </Container>
</div>
  </>)
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    console.log(name,email,password);
    const url = `http://localhost:3003/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();
        console.log(data);
    })();
    props.setShow(false);
  }

  return (<>

    Name<br/>
    <input type="input"
      className="form-control"
      placeholder="Enter name"
      value={name}
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password"
      className="form-control"
      placeholder="Enter password"
      value={password}
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit"
      className="btn btn-light"
      onClick={handle}>Create Account</button>

  </>);
}

export default CreateAccount;