import React, { useEffect, useState } from 'react'
import { Button, Table, Row, Col, FormGroup, Input, Container } from 'reactstrap'
import axios from 'axios'

const Customer = () => {
    ////////////////////////////// variables ////////////////////////////////////////
    const [Name, setName] = useState("")
    const [City, setCity] = useState("")
    const [Age, setAge] = useState(0)
    const [data, setdata] = useState([])
    const [Search, setSearch] = useState("")
    const [wrapper, setwrapper] = useState("")
    ////////////////////////////// Submit Cancel refresh ///////////////////////////
    useEffect(() => {
      show_all()
    }, [data.length])
    
    const handleSubmit = event => {
        event.preventDefault();
        setwrapper()

        const alert = (message, type) => {
            setwrapper([`
                <div class="alert alert-${type} alert-dismissible" role="alert">
                   <div>${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            ])
   
        } 
                if (Name.length < 2) {
                alert("Name must be more than 2 letters", "danger")
            } else {if (City.length < 2) {
                alert("City must be more than 2 letters","danger")
            } else {if (Age < 2) {
                alert("Age must be more than 2 ","danger")
            } else {
                add()
                alert("The book has been successfully added","success")
            }
                
            }
                
            }
        }
    ///////////////////////////////  CRUD CUSTOMERS  ///////////////////////////////
    const MY_SERVER = 'https://pro-books.onrender.com'
    /////////////////////////////////// read //////////////////////////////////////
    const show_all = async () => {
        await axios.get(MY_SERVER + '/Customers').then((res) => setdata(res.data))
    }
    /////////////////////////////////// Search by name ///////////////////////////////////  
    const Search_customer = async (name) => {
        await axios.get(MY_SERVER + '/Customers').then((res) => setdata(res.data.filter(x=>x.Name.includes(name))))
    }
    //////////////////////////////////// create //////////////////////////////////
    const add = async () => {
        await axios.post(MY_SERVER + '/Customers/add', { Name, City, Age,"active":true  })
            .then((res) => console.log(res.data))
        await show_all()
        console.log(Name)
        console.log(City)
        console.log(Age)
    }
    //////////////////////////////// delete //////////////////////////////////////
    const del_item = async (id) => {
        await axios.delete(MY_SERVER + '/Customers/change/' + id)
        show_all()
    }
    ////////////////////////////////// update ////////////////////////////////////
    const upd=async(id)=>{
        await axios.put(MY_SERVER+'/Customers/change/'+id,{ Name, City, Age })
        show_all()
    }
    //////////////////////////////// built a display //////////////////////////////////////
    return (
<div>
            <Container>
            <h3>add Customer</h3>
                <Row>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            Search<Input defaultValue="" placeholder="Search" type="text" onChange={(e)=> setSearch(e.target.value)}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="Name" type="text" onChange={(e)=>setName(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="City" type="text" onChange={(e)=>setCity(e.target.value)}/>
                        </FormGroup>
                    </Col>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="Age" type="number" onChange={(e)=>setAge(e.target.value)}/>
                        </FormGroup>
                    </Col>
                </Row>
                <br/>
                <div style={{paddingLeft:"42%"}}>
                <Button color="success" onClick={()=> add()}>add Customer</Button>
                
                </div>
                <br/>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th>Name</th>
                            <th>City</th>
                            <th className="text-center">Age</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(x=> x.Name.includes(Search)).map((x, i) =>
                            <tr key={i}>
                                <td className="text-center">{x.id}</td>
                                <td>{x.Name}</td>
                                <td>{x.City}</td>
                                <td className="text-center">{x.Age}</td>
                                <td className="text-right">
                                    <Button className="btn-icon btn-simple" color="success" size="sm" onClick={() => upd(x.id)}>
                                        <i className="fa fa-edit"></i>
                                    </Button>{` `}
                                    <Button className="btn-icon btn-simple" color="danger" size="sm" onClick={() => del_item(x.id)}>
                                        <i className="fa fa-times" />
                                    </Button>{` `}
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </Container></div>
    )
}

export default Customer