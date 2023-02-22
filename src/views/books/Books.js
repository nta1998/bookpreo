import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, Table, Row, Col, FormGroup, Input, Container } from 'reactstrap'
import axios from 'axios'
const Books = () => {
    /////////////////////////// variables ///////////////////////////////////////    
    const [Name, setName] = useState("")
    const [Author, setAuthor] = useState("")
    const [Year_Published, setYear_Published] = useState("")
    const [Type, setType] = useState(1)
    const [data, setdata] = useState([])
    const [Search, setSearch] = useState("")
    const [selectedphoto, setselectedphoto] = useState();
    const handleFileChange = (event) => {
        setselectedphoto(event.target.files[0]);
      };
          //////////////////////// Submit Cancel refresh ///////////////////////////////////   
    useEffect(() => {
        show_all()
    }, [])

    ///////////////////////////////  CRUD BOOKS  ///////////////////////////////////////    
    const MY_SERVER = "https://pro-books.onrender.com"
    //////////////////////////////////// create //////////////////////////////////    
    const handleUpload = async () => {
        
        if (!selectedphoto) {
            const formData_no_img = new FormData();
            formData_no_img.append("Name", Name);
            formData_no_img.append("Author", Author);
            formData_no_img.append("Year_Published", Year_Published);
            formData_no_img.append("Type", Type);  
            
                const response = await axios.post(MY_SERVER + '/Books/add', formData_no_img, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                });
          show_all()

        }
        const formData = new FormData();
        formData.append('image', selectedphoto);
        formData.append("Name", Name);
        formData.append("Author", Author);
        formData.append("Year_Published", Year_Published);
        formData.append("Type", Type);  
        try {
          const response = await axios.post(MY_SERVER + '/Books/add', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          show_all()
        } catch (error) {
          console.error(error);
        }
      };
    
    const add = async () => {
        await axios.post(MY_SERVER + '/Books/add', { Name, Author, Year_Published, Type})
            .then((res) => console.log(res.data))
 
    }
    ///////////////////////////////////// read /////////////////////////////////    
    const show_all = async () => {
        await axios.get(MY_SERVER + '/Books/').then((res) => setdata(res.data))
    }
    ///////////////////////////////////// update /////////////////////////////////    
    const upd = async (id) => {
        await axios.put(MY_SERVER + '/Book/change/' + id, { Name, Author, Year_Published, Type })
        show_all()
     
    }
    ////////////////////////////////// delete ////////////////////////////////////    
    const del_item = async (id) => {
        await axios.delete(MY_SERVER + '/Book/change/' + id)
        await show_all()

    }
    return (
        <div>
            <Container>
                <h3>add book</h3>
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
                            <Input defaultValue="" placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="Author" type="text" onChange={(e) => setAuthor(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="Year Published" type="date" onChange={(e) => setYear_Published(e.target.value)} />
                        </FormGroup>
                    </Col>
                    <Col lg="3" sm="6">
                        <FormGroup>
                            <Input defaultValue="" placeholder="Type" type="select" onChange={(e) => setType(e.target.value)}>
                                <option value={1}>Horror</option>
                                <option value={2}>Action</option>
                                <option value={3}>Adventure</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col lg="3" sm="6">
                   Add image <hr/>  <input type="file" onChange={handleFileChange} style={{border:'solid' , borderColor:'blue'}}/>
                    </Col>
                </Row>
                <br />
                <div style={{ paddingLeft: "43%" }}>
                    <Button color="success" onClick={handleUpload}>add book</Button>

                </div>
                <br />
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th className="text-center">Year Published</th>
                            <th className="text-right">Type</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(x => x.Name.includes(Search)).map((x, i) =>
                            <tr key={i}>
                                <td className="text-center">{x.id}</td>
                                <td>{x.Name}</td>
                                <td>{x.Author}</td>
                                <td className="text-center">{x.Year_Published}</td>
                                <td className="text-right">{x.Type === 1 ? 'Horror' : x.Type === 2 ? 'Action' : 'Adventure'}</td>
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

export default Books