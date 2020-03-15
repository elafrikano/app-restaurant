import React, { Component } from "react";
import qs from "qs";

import { Container, Row, Col } from "react-bootstrap";

import NavApp from "../../components/NavApp";
import MapContainer from "../map/MapContainer";
import Restaurant from "../../components/Restaurant";

import { getUserInfo } from "../../models/userModel";
import { getRestaurtans } from "../../models/restaurantModel";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      user: {},
      initalPoint: {
        lat: -34.900335,
        lng: -56.1702457
      },
      point: {}
    };
  }

  async componentDidMount() {
    const response = await getUserInfo();

    if (response.status === 200) {
      const { data } = response;

      this.setState({ user: data });
    }

    this.getUrlPoint();
  }

  getUrlPoint() {
    const pointUrl = qs.parse(window.location.search.substr(1));

    if (!isNaN(pointUrl.lat) && !isNaN(pointUrl.lng)) {
      this.setState({ point: pointUrl });
      this.getRestaurants();
    }
  }

  async getRestaurants() {
    const { point, user } = this.state;
    const resRestaurants = await getRestaurtans({
      country: user.country.id || 1,
      ...point
    });
    if (resRestaurants.status === 200) {
      const { data: dataRes } = resRestaurants;
      let restaurants = this.filterRestaurants(dataRes.data);

      restaurants = this.sortRestaurants(restaurants);
      console.log(restaurants[0]);
      this.setState({ restaurants });
    }
  }

  sortRestaurants(restaurants) {
    return restaurants.sort(
      (resA, resB) => resB.ratingScore - resA.ratingScore
    );
  }

  filterRestaurants(restaurants) {
    return restaurants.filter(res => res.opened);
  }

  onMapClicked = (_, __, clickEvent) => {
    const point = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };
    this.setState({ point });
    this.getRestaurants();
  };

  render() {
    const { restaurants, initalPoint, user, point } = this.state;
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavApp user={user} logout={this.props.logout}></NavApp>
          <Container fluid>
            <Row>
              <Col lg="4" style={{ height: 500 }}>
                <MapContainer
                  initialCenter={initalPoint}
                  onMapClicked={this.onMapClicked}
                  center={point}
                  markers={restaurants}
                ></MapContainer>
              </Col>
              <Col lg="8">
                <Row>
                  {restaurants.map((restaurant, index) => (
                    <Restaurant info={restaurant} key={index}></Restaurant>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Search;
