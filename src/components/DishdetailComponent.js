import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        console.log('Menu Component DishdetailComponent constructor is invoked');
    }

    renderComments(deets) {
        if (deets != null){
          console.log(deets)
          const commentsAndAuthorAndDate = deets.map((value) => {
              return(
                <li key={value.id}>
                  <p>{value.comment}</p>
                  <p>{value.author} , {value.date}</p>
              </li>
              );
          });

           return(
               <div className="col-12 col-md-5 m-1">
                  <div>
                    <h1>Comments</h1>
                    <ul className = "list-unstyled">
                      {commentsAndAuthorAndDate}
                    </ul>
                  </div>
              </div>
            );
        }else {
          return(<div></div>);
        }
      }





    render() {
      if (this.props.selectedDish != null){
        const dishdetails =(

        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={this.props.selectedDish.image} alt={this.props.selectedDish.name} />
            <CardBody>
                <CardTitle>{this.props.selectedDish.name}</CardTitle>
                <CardText>{this.props.selectedDish.description}</CardText>
              </CardBody>
          </Card>
        </div>
    );



      return(
        <div className="container">
          <div className="row">
              {dishdetails}
              {this.renderComments(this.props.selectedDish.comments)}
          </div>

        </div>
      )
    }else {
      return(<div></div>);
    }
  }
}


export default Dishdetails;
