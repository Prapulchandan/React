import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Modal, ModalHeader, ModalBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Row, Col ,
    Label, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
    
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(
            <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader className="font-weight-bold" toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="rating" >Rating</Label><br/>
                                <Control.select className="custom-select" model=".rating" 
                                    id="rating" name="rating" defaultValue="1">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="3">4</option>
                                    <option value="3">5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="author" >Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col >
                            <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="12"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col >
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}
function RenderDish({dish}) {
    console.log("dishRender=\n");
    console.log(dish);
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle><strong>{dish.name}</strong></CardTitle>
                    <CardText>{dish.description}</CardText>
                    
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}

function RenderComments({comments}) {
    if (comments == null){
        comments =  (
            <div></div>
        );
    } else {
        comments = comments.map( person =>  {
            let dt = (new Date(person.date)).toString().split(" ").slice(1,4).
                map((v,ix) =>{
                    if(ix==1) return v+",";
                    else return v;
                });
            dt = dt.join(" ");
            return (
                <div>
                    <div className="m-2">{person.comment}</div>
                    <div className="m-2">-- {person.author}, {dt}</div>
                </div>
            );
        });
    }
    return comments;
}

const DishDetail = (props) => {
    if(props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments} />
                        <CommentForm/>
                    </div>
                </div>
            </div>
        );
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;