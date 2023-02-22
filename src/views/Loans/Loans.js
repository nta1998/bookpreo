import React, { useEffect, useState } from 'react'
import { Button, Table, Row, Col, FormGroup, Input, Container } from 'reactstrap'
import axios from 'axios'
const Loans = () => {
    ////////////////////////////// variables /////////////////////////////////////////
    const [date_input, setdate_input] = useState("")
    const [data, setdata] = useState([])
    const [customerid, setcustomerid] = useState(1)
    const [booktype, setbooktype] = useState([])
    const [cos_id, setcos_id] = useState([])
    const [book_id, setbook_id] = useState([])
    const [dayleft, setdayleft] = useState(0)
    const [Search, setSearch] = useState([])
    const [date_Return, setdate_Return] = useState("")
    ///////////////////////// A function that adds days to a date //////////////////    
    const addDays = (date, days) => {
        console.log(date, days)
        const result = new Date(date);
        result.setDate(result.getDate() + parseInt(days));
        let year = result.getFullYear()
        let day = result.getDate()
        let month = (result.getMonth() + 1)
        setdate_Return(`${year}-${month}-${day}`)
    }
    
    ////////////////////////////////Sep type checker//////////////////////////////////////  
    const type_2 = (event) => {
        if (+event.target.value[0] === 1) {
            setdayleft(10)
        }
        if (+event.target.value[0] === 2) {
            setdayleft(5)

        }
        if (+event.target.value[0] === 3) {
            setdayleft(2)

        }
        setbooktype(event.target.value[2])
    }
    //////////////////////////////////Checking the difference dates////////////////////////////////////      
    const diff = (date) => {
        var date1 = new Date(date)
        var date2 = new Date()
        var Difference_In_Time = date2.getTime() - date1.getTime()
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
        return Difference_In_Days
    }
    /////////////////////////////  CRUD LOANS  /////////////////////////////////////////  
    const MY_SERVER = 'https://pro-books.onrender.com'
    /////////////////////////////////// read ///////////////////////////////////  
    const show_all = async () => {
        await axios.get(MY_SERVER + '/Loans').then((res) => setdata(res.data))

    }
    ////////////////////////////////read//////////////////////////////////////  
    const Coustomers_id = () => {
        axios.get(MY_SERVER + '/Customers').then((res) => setcos_id(res.data))
    }
    /////////////////////////////////read/////////////////////////////////////  
    const Books_id = async () => {
        await axios.get(MY_SERVER + '/Books/').then((res) => setbook_id(res.data))
    }

    //////////////////////////////////read////////////////////////////////////  

    //////////////////////////////////// create //////////////////////////////////     
    const add = async () => {
        addDays(date_input, dayleft)
        console.log({ "Loandate": date_input, "Returndate": date_Return, "customers_id": customerid, "BookID": book_id[0].id, "returned": false })
        await axios.post(MY_SERVER + '/Loans/add', { "Loandate": date_input, "Returndate": date_Return, "customers_id": customerid, "BookID": book_id[0].id, "returned": false }).then(res => console.log(res))
        show_all()
    }
    ///////////////////////////////////// delete /////////////////////////////////     
    const del_item = async (id) => {
        console.log(id)
        await axios.delete(MY_SERVER + '/Loans/change/' + id)
        show_all()

    }
    ////////////////////////////////// update ////////////////////////////////////      
    const upd = async (id) => {
        addDays(date_input, dayleft)
        await axios.put(MY_SERVER + '/Loans/change/' + id, { 'Loandate': date_input, 'Returndate': date_Return, 'customers_id': customerid, 'BookID': book_id[0].id })
    }
    //////////////////////////////////////////////////////////////////////     
    useEffect(() => {
        Coustomers_id()
        Books_id()
        show_all()
    }, [data.length])

    return (
        <div>
            {date_Return}
            <Container>
                <h3>add Loans</h3>
                <Row style={{paddingLeft:'40%'}}>
                    <Col lg="5" sm="11">
                        <div id="carouselExampleCaptions" className="carousel slide" >
                            <div className="carousel-indicators">
                                {book_id.map((book,i) => <button key={i} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={i} className={"active"}></button>)}
                            </div>
                            <div className="carousel-inner">
                                {book_id.map((img, index) => <div key={index} className={index===1? "carousel-item active":'carousel-item'}>
                                <h5>{img.Name}</h5>
                                    <img src={MY_SERVER +img.image} className="d-block w-100" alt="book img"></img>
                        
                                </div>)}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" style={{color:'black'}}>
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" style={{color:'black'}}>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </Col><br/>
                    </Row>
                    <Row>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            Search<Input defaultValue="" placeholder="Search" type="text" onChange={(e) => setSearch(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="Book Name" type="select" onMouseOver={(e) => type_2(e)} onClick={(e) => type_2(e)}>
                                {book_id.map((book, i) => <option key={i} value={[book.Type, book.id]}>{book.Name}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="Customer Name" type="select" onMouseOver={(e) => setcustomerid(e.target.value)} onClick={(e) => setcustomerid(e.target.value)}>
                                {cos_id.map((pr, i) => <option key={i} value={pr.id}>{pr.Name}</option>)}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="Londate" type="date" onChange={(e) => setdate_input(e.target.value)} onMouseMove={()=> addDays(date_input, dayleft)} onMouseOver={()=> addDays(date_input, dayleft)} onClick={()=> addDays(date_input, dayleft)}/>
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <div style={{ paddingLeft: "43%" }}>
                    <Button color="success" onClick={() => add()}>add Loan</Button>
                </div>
                <br />
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th>Customer name</th>
                            <th>Book name</th>
                            <th className="text-center">Loandate</th>
                            <th className="text-right">Returndate</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((x, i) =>
                            <tr key={i}>
                                <td className="text-center">{x.id}</td>
                                <td>{x.customers_id}</td>
                                <td>{x.BookID}</td>
                                <td className="text-center">{x.Loandate}</td>
                                <td className="text-right">{x.Returndate}</td>
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

export default Loans