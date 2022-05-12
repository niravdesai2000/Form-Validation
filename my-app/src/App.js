import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import './Form.css';

var count = '';
function App() {
  const [Name, newName] = useState('');
  const [Email, newEmail] = useState(' ');
  const [Age, newAge] = useState(' ');
  const [Mobile, newMobile] = useState(' ');
  const [list, newlist] = useState([]);
  const [search, newsearch] = useState([]);
  const value1 = { Name, Email, Age, Mobile };
  const [newid, editnewid] = useState('');
  const [btn, setbtn] = useState(true);
  const [btn1, setbtn1] = useState(true);



  let schema = yup.object().shape({
    Name: yup.string().required('Enter Your Name'),
    Email: yup.string().email().required('Enter Your Email'),
    Age: yup.number().required('Enter Your Age').positive().integer(),
    Mobile: yup.number().positive().integer().required('Enter Your Mobile No')
  });
  const submitForm = (e) => {
    e.preventDefault();
    if (count == '' || count == 0) {
      newlist([...list, value1]);
    }
    else {
      list.map((elem, index) => {
        if (newid == index) {
          elem.Name = value1.Name;
          elem.Email = value1.Email;
          elem.Age = value1.Age;
          elem.Mobile = value1.Mobile;
          count = 0;
          setbtn(true);
          setbtn1(true);

        }
        return elem;
      })
    }
    newName(" ");
    newEmail(" ");
    newAge(" ");
    newMobile(" ");
  }
  const del = (id) => {
    const newdellist = list.filter((elem, index) => {
      return index !== id;
    });
    newlist(newdellist);
  }
  const insert = (id) => {
    count++;
    editnewid(id);
    newName(list[id].Name);
    newEmail(list[id].Email);
    newAge(list[id].Age);
    newMobile(list[id].Mobile);
    // setbtn(false);
    // setbtn1(false);
    // console.log(values);



  }

  return (
    <div className="App">



      <Formik
        initialValues={{
          Name: '',
          Age: '',
          Email: '',
          Mobile: ''
        }}
        validationSchema={schema}

        onSubmit={(values, { resetForm }) => {
          // same shape as initial values
          console.log(values);
          newName(values.Name);
          newEmail(values.Email);
          newAge(values.Age);
          newMobile(values.Mobile);
          newlist([...list, values]);
          resetForm({ values: '' });


        }}
      >
        {({ errors, touched, values }) => (
          <Form  >
            <br></br><br></br> <span>Name</span>
            <Field name="Name" autoComplete='off' value={values.Name} />
            {errors.Name && touched.Name ? (<div>{errors.Name}</div>) : null}
            <br></br><br></br>  <span>Gmail</span>
            <Field name="Email" autoComplete='off' value={values.Email} />
            {errors.Email && touched.Email ? (<div>{errors.Email}</div>) : null}
            <br></br><br></br> <span>Age</span>
            <Field name="Age" type='number' value={values.Age} />
            {errors.Age && touched.Age ? <div>{errors.Age}</div> : null}
            <br></br><br></br> <span>Mobile No.</span>
            <Field name="Mobile" type='number' value={values.Mobile} />
            {errors.Mobile && touched.Mobile ? <div>{errors.Mobile}</div> : null}<br></br><br></br>
            <button type='submit'  >Submit</button>
          </Form>
        )}
      </Formik>
      <table>
        <tr className='color111'>
          <td>Name</td>
          <td>Email</td>
          <td>Age</td>
          <td>Mobile</td>
          <td>Edit</td>
          
          <td>Delete</td>
        </tr>
        {
          list.map((a, index) => {
            return (
              <tr key={index}>

                <td>{a.Name}</td>
                <td>{a.Email}</td>
                <td>{a.Age}</td>
                <td>{a.Mobile}</td>
                {btn1 ? <td><button onClick={() => insert(index)} className='color1'>Edit</button></td> : ''}
                {btn1 ? <td><button onClick={() => del(index)} className='color'>Delete</button></td> : ''}
              </tr>
            )
          })
        }
      </table>
      <div className='margin111'><input type='text' className='width' value={search} onChange={(e) => { newsearch(e.target.value) }} placeholder='Search any Data...'></input></div>
      <table>
        {
          list.map((m) => {
            if (m.Name == search || m.Email == search || m.Age == search || m.Mobile == search) {

              return (
                <tr>

                  <td>{m.Name}</td>
                  <td>{m.Email}</td>
                  <td>{m.Age}</td>
                  <td>{m.Mobile}</td>
                </tr>)
            }
          })
        }
      </table>













      {/* <form onSubmit={submitForm}>
        <div className='p'><span>Name</span><br></br><input type="text" value={Name} onChange={(e) =>{ newName(e.target.value)}} required   placeholder='Enter Your Name...'></input></div>
        <div className='p'><span>Gmail</span><br></br><input type="email"  value={Email}onChange={(e) =>{ newEmail(e.target.value)}} required ></input></div>
        <div className='p'><span>Age</span><br></br><input type="number"  min='1' max='100' value={Age}onChange={(e) =>{ newAge(e.target.value)}} required id='three'></input></div>
        <div className='p'><span>Mobile No.</span><br></br><input type="text" className='margin' style={{pattern :"{0-9}[10]"}}  value={Mobile} onChange={(e) =>{ newMobile(e.target.value)}} required id='four'></input></div>
        {
         btn?<div className='p'><button type="submit">submit</button></div>:<div className='p'><button type="submit" className='color1'>update</button></div>
        }
      </form>
      <table>
        <tr className='color111'>
          <td>Name</td>
          <td>Email</td>
          <td>Age</td>
          <td>Mobile</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
        {
          list.map((a,index)=>{
            return(
              <tr key={index}>
               
                <td>{a.Name}</td>
                <td>{a.Email}</td>
                <td>{a.Age}</td>
                <td>{a.Mobile}</td>
                {btn1?<td><button onClick={()=>insert(index)} className='color1'>Edit</button></td>:''}
                {btn1?<td><button onClick={()=>del(index)} className='color'>Delete</button></td>: ''}
                </tr>
            )
          })
        }
      </table>
      <div className='margin111'><input type='text' className='width' value={search} onChange={(e)=>{newsearch(e.target.value)}} placeholder='Search any Data...'></input></div>
      <table>
        {
          list.map((m,index)=>{
            if(m.Name==search || m.Email==search || m.Age==search || m.Mobile==search)
            {
             
              return(
              <tr>
                
              <td>{m.Name}</td>
              <td>{m.Email}</td>
              <td>{m.Age}</td>
               <td>{m.Mobile}</td>
            </tr>)
            }
          })
        }
      </table> */}
    </div>
  );
}



// const App = () =>{
//   const clock=new Date().toLocaleTimeString();
//   const[time,newTime]=useState(clock);
//   const click=()=>{
//   const clock1=new Date().toLocaleTimeString();
//   newTime(clock1);
//   }
//   setInterval(click,1000);
//   return(
//     <>
//     <h1>{time}</h1>
//     </>
//   )
// }










// var count='';
// function App() {
//   const[Name,newName] = useState({
//     fName:'',
//     fEmail:'',
//     fAge:'',
//     fMobile:''
//   });

//   const changeValue=(e)=>{

//       const value=e.target.value;
//       const name=e.target.name;
//       newName((p)=>{
//         return{
//           ...p,
//           [name]:value,
//         }

//       })

//   }

//   // const[list,newlist]=useState([]);
//   // const[search,newsearch]=useState([]);
//   // const [newid,editnewid]=useState('');
//   // const value1={Name,Email,Age,Mobile};
//   // const[btn,setbtn]=useState(true);
//   // const[btn1,setbtn1]=useState(true);
//   // const submitForm=(e)=>{
//   //   e.preventDefault();
//   //   if(count=='' || count==0)
//   //   {
//   //   newlist([...list,value1]);
//   //   }
//   //   else{
//   //     list.map((elem,index)=>{
//   //       if(newid==index)
//   //       { 
//   //         elem.Name=value1.Name;
//   //         elem.Email=value1.Email;
//   //         elem.Age=value1.Age;
//   //         elem.Mobile=value1.Mobile;
//   //         count=0;
//   //         setbtn(true);
//   //         setbtn1(true);

//   //       }
//   //     return elem;
//   //     })
//   //   }
//   //   newName(" "); 
//   //   newEmail(" ");
//   //   newAge(" ");
//   //   newMobile(" ");
//   // }
//   // const del=(id)=>{
//   //   const newdellist= list.filter((elem,index)=>{
//   //     return index!==id;
//   //   });
//   //   newlist(newdellist);
//   // }
//   // const insert=(id)=>{
//   //   count++;
//   //   editnewid(id);
//   //   newName(list[id].Name);
//   //   newEmail(list[id].Email);
//   //   newAge(list[id].Age);
//   //   newMobile(list[id].Mobile);
//   //   setbtn(false);
//   //   setbtn1(false);
//   // }
//   return (
//     <div className="App">
//       <form >
//         <h1>{Name.fName}<br></br>{Name.fEmail}<br/>{Name.fAge}<br/>{Name.fMobile}</h1>
//         <div className='p'><span>Name</span><br></br><input type="text" name='fName' value={Name.fName} onChange={changeValue} required   placeholder='Enter Your Name...'></input></div>
//         <div className='p'><span>Gmail</span><br></br><input type="email" name='fEmail'  value={Name.fEmail}onChange={changeValue} required ></input></div>
//         <div className='p'><span>Age</span><br></br><input type="number"  min='1' max='100' name='fAge' value={Name.fAge}onChange={changeValue} required id='three'></input></div>
//         <div className='p'><span>Mobile No.</span><br></br><input type="text" className='margin' style={{pattern :"{0-9}[10]"}} name='fMobile' value={Name.fMobile} onChange={changeValue} required id='four'></input></div>
//         {/* {
//          btn?<div className='p'><button type="submit">submit</button></div>:<div className='p'><button type="submit" className='color1'>update</button></div>
//         } */}
//       </form>
//       {/* <table>
//         <tr className='color111'>
//           <td>Name</td>
//           <td>Email</td>
//           <td>Age</td>
//           <td>Mobile</td>
//           <td>Edit</td>
//           <td>Delete</td>
//         </tr>
//         {
//           list.map((a,index)=>{
//             return(
//               <tr key={index}>

//                 <td>{a.Name}</td>
//                 <td>{a.Email}</td>
//                 <td>{a.Age}</td>
//                 <td>{a.Mobile}</td>
//                 {btn1?<td><button onClick={()=>insert(index)} className='color1'>Edit</button></td>:''}
//                 {btn1?<td><button onClick={()=>del(index)} className='color'>Delete</button></td>: ''}
//                 </tr>
//             )
//           })
//         }
//       </table>
//       <div className='margin111'><input type='text' className='width' value={search} onChange={(e)=>{newsearch(e.target.value)}} placeholder='Search any Data...'></input></div>
//       <table>
//         {
//           list.map((m,index)=>{
//             if(m.Name==search || m.Email==search || m.Age==search || m.Mobile==search)
//             {

//               return(
//               <tr>

//               <td>{m.Name}</td>
//               <td>{m.Email}</td>
//               <td>{m.Age}</td>
//                <td>{m.Mobile}</td>
//             </tr>)
//             }
//           })
//         }
//       </table> */}
//     </div>
//   );
// }
export default App;
