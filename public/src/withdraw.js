import React, { useState } from "react";
import { Container, Card, Button, InputGroup, Alert } from "react-bootstrap";
import { UserContext } from "./context";




// function Deposit(){
//   const [show, setShow]         = React.useState(true);
//   const [status, setStatus]     = React.useState('');
//   const [amountDep, setAmount]  = React.useState('');
//   const ctx = React.useContext(UserContext);

//   function validate(field){
//     if (!field) {
//       setStatus(<Alert variant="danger">Enter the amount you would like to withdraw.</Alert>);
//       setTimeout(() => setStatus(''),5000);
//       return false;
//     }
//     if (amountDep <= 0) {
//       setStatus(<Alert variant="danger">The value to withdraw should not be less than $0</Alert>);
//       setTimeout(() => setStatus(''),5000);
//       return false;
//     }
//     return true;
// }

// function withdrawMoney(){
//   console.log(amountDep);
//   if (!validate(amountDep, status))     return;
//   ctx.users[0].balance = Number(ctx.users[0].balance) - Number(amountDep);

//   setShow(false);
// }

// function clearForm(){
//   setAmount('');
//   setShow(true);
// }
//   return (
//     <div>
//       <h1>Withdraw</h1>
//       <Container  className="Container">
//         <Card>
//           <Card.Header as="h3">{`Your balance is: $` + ctx.users[0].balance}</Card.Header>
//           <Card.Body>
//           {status}
//           {show ? (
//                   <>
//             <Card.Text>
//             {`How much you'd like to withdraw?: $` + amountDep }
//             </Card.Text>
//               <InputGroup className="mb-3">
//                 <InputGroup.Text>$</InputGroup.Text>
//                 <input type="number" min="0" className="form-control" id="amountDep" placeholder="$0000" value={amountDep} onChange={e => setAmount(e.currentTarget.value)} />
//                 <InputGroup.Text>.00</InputGroup.Text>
//               </InputGroup>
//             <Button variant="dark"  type="submit" onClick={withdrawMoney} disabled={!amountDep}>Withdraw money</Button>
//                   </>
//                 ):(
//                   <>
//                   <Alert variant="success">Your withdraw of ${amountDep} has been debited.</Alert>
//                   <Button variant="dark"  type="submit" onClick={clearForm}>Make another withdrawal</Button>
//                   </>
//                 )}
//           </Card.Body>
//         </Card>
//       </Container>
//   </div>
//   )
// }


function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    // <Card
    //   bgcolor="success"
    //   header="Withdraw"
    //   status={status}
    //   body={show ?
    //     <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
    //     <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    // />
    <div>
        <h1>Withdraw</h1>
        <Container  className="Container">
          <Card>
            <Card.Body>
              {show ? <WithdrawForm setShow={setShow} setStatus={setStatus}/> : <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
            </Card.Body>
          </Card>
        </Container>
    </div>
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit"
      className="btn btn-light"
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`http://localhost:3003/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }


  return(<>

    Email<br/>
    <input type="input"
      className="form-control"
      placeholder="Enter email"
      value={email}
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number"
      className="form-control"
      placeholder="Enter amount"
      value={amount}
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit"
      className="btn btn-light"
      onClick={handle}>
        Withdraw
    </button>

  </>);
}


export default Withdraw;