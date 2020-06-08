import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Input, Label, FormGroup, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      isNavOpen: false,
      isOpen: false
    };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  toggleModal(onClick) {
    this.setState({ isOpen: !this.state.isOpen});

  }

  render() {
    return(

    <>
    <div>
      <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

    <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
      <ModalBody>
        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
          <Row className="form-group">
            <Label htmlFor="rating">Rating</Label>
            <Col md={10}>
                <Control.select name="rating" id="rating"
                  placeholder="Name"
                  className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="name" md={2}>Your Name</Label>
            <Col md={10}>
                <Control.text model=".name" id="name" name="name"
                    placeholder="Name"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                     />
                <Errors
                    className="text-danger"
                    model=".firstname"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
            </Col>
          </Row>
          <Row className="form-group">
              <Label htmlFor="comment" md={2}>Your comments</Label>
              <Col md={10}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                      rows="6"
                      className="form-control" />
              </Col>
          </Row>
          <Row className="form-group">
            <Button type="submit" value="submit" color="primary">Login</Button>
          </Row>
        </LocalForm>
      </ModalBody>
    </Modal>
    </div>
</>



  )};



}



    function RenderDish({dish}) {
      return (
        <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
        </div>
      )

    }


    function RenderComments({deets, addComment, dishId}) {
        if (deets != null){
          console.log(deets)
          const commentsAndAuthorAndDate = deets.map((value) => {
              return(
                <li key={value.id}>
                  <p>{value.comment}</p>
                  <p>--{value.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(value.date)))}</p>
                </li>
              );
          });

           return(
                <div className="col-12 col-md-5 m-1">
                  <h1>Comments</h1>
                  <ul className = "list-unstyled">
                    {commentsAndAuthorAndDate}
                  </ul>
                  <CommentForm dishId={dishId} addComment={addComment} />
                </div>

            );
        }else {
          return(<div></div>);
        }
      }





  const  DishDetail = (props) => {

      if (props.disher != null){

        return(
          <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.disher.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.disher.name}</h3>
                        <hr />
                    </div>
                </div>
            <div className="row">
                <RenderDish dish={props.disher}  />
                <RenderComments deets={props.comments}
                  addComment={props.addComment}
                  dishId={props.disher.id}
                />
            </div>
          </div>
        )
      }else {
        return(<div></div>);
      }
  }



export default DishDetail;
