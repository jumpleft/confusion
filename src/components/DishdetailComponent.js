import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,
        ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
            <Label htmlFor="rating" md={2}>Rating</Label>
            <Col md={10}>
                <Control.select model=".rating" name="rating" id="rating"
                  placeholder="rating"
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
          <Label htmlFor="author" md={2}>Your Name</Label>
          <Col md={10}>
              <Control.text model=".author" id="author" name="author"
                  placeholder="Your Name"
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
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}
               />
          </Col>
        </Row>
          <Row className="form-group">
              <Label htmlFor="comment" md={2}>Comment</Label>
              <Col md={10}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                      rows="6"
                      className="form-control" />
              </Col>
          </Row>
          <Row className="form-group">
              <Col md={{size:10, offset: 2}}>
                  <Button type="submit" color="primary">
                  Submit
                  </Button>
              </Col>
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
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                  <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                  <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
              </FadeTransform>
        </div>
      )

    }


    function RenderComments({deets, postComment, dishId}) {
        if (deets != null){
          console.log(deets)
          const commentsAndAuthorAndDate = deets.map((value) => {
              return(
                <Fade in>
                  <li key={value.id}>
                    <p>{value.comment}</p>
                    <p>--{value.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(value.date)))}</p>
                  </li>
                </Fade>
              );
          });

           return(
                <div className="col-12 col-md-5 m-1">
                  <h1>Comments</h1>
                  <ul className = "list-unstyled">
                    <Stagger in>
                      {commentsAndAuthorAndDate}
                    </Stagger>
                  </ul>
                  <CommentForm dishId={dishId} postComment={postComment} />
                </div>

            );
        }else {
          return(<div></div>);
        }
      }





  const  DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.disher != null) {

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
                  postComment={props.postComment}
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
