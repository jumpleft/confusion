import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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


    function RenderComments({deets}) {
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
                <RenderDish dish={props.disher}  />
                <RenderComments deets={props.disher.comments} />
            </div>
          </div>
        )
      }else {
        return(<div></div>);
      }
  }



export default DishDetail;
