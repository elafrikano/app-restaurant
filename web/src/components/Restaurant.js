import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";

function Restaurant(props) {
  const {
    name,
    logo,
    link,
    ratingScore,
    deliveryTimeMaxMinutes,
    allCategories
  } = props.info;
  return (
    <Col lg="3" className="px-1">
      <Card className="shadow-lg mb-2">
        <a
          href={`https://www.pedidosya.com.uy/restaurantes/montevideo/${link}`}
          target="_blank"
          rel={name}
          style={{ width: "100%" }}
        >
          <img
            src={`https://img.pystatic.com/restaurants/${logo}`}
            className="card-img-top"
            alt="..."
            style={{ width: "100%" }}
          />
        </a>
        <Card.Body className="p-2">
          <Row className="no-gutters align-items-center">
            <Col lg={true}>
              <a
                href={`https://www.pedidosya.com.uy/restaurantes/montevideo/${link}`}
                style={{ width: 50 }}
                target="_blank"
                rel={name}
                className="h6 font-weight-bold text-primary mb-1"
              >
                {name}
              </a>
              <Badge variant="warning float-right">
                &#x2605; {ratingScore}
              </Badge>
              <div className="mb-0 text-xs text-gray-800">
                Tiempo de Entrega: mins {deliveryTimeMaxMinutes}
              </div>
              <div className="text-xs">
                {allCategories.replace(/,/g, " · ")}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Restaurant;
