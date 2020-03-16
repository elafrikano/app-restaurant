import React, { Component } from "react";
import qs from "qs";

import { Container, Row, Col } from "react-bootstrap";

import NavApp from "../../components/NavApp";
import Restaurant from "../../components/Restaurant";
import MapContainer from "../map/MapContainer";

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
      point: {},
      lastSearchs: {}
    };
  }

  async componentDidMount() {
    const response = await getUserInfo();
    if (response.status === 200) {
      const { data } = response;
      this.setState({ user: data });
      this.getUrlPoint();
      this.getUserPoint();
    }
  }

  getUrlPoint() {
    const pointUrl = qs.parse(window.location.search.substr(1));

    if (!isNaN(pointUrl.lat) && !isNaN(pointUrl.lng)) {
      this.setState({ point: pointUrl });
      this.getRestaurants();
    }
  }

  getUserPoint() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const point = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({ point });
      });
    }
  }

  async getRestaurants() {
    const { point, user } = this.state;
    const lastSearchs = { ...this.state.lastSearchs };
    const { handleOpenLoading, handleCloseLoading } = this.props;
    let resultMemo = this.getLastSearch(point);
    handleOpenLoading();
    if (!resultMemo) {
      const resRestaurants = await getRestaurtans({
        country: user.country.id || 1,
        ...point
      });

      if (resRestaurants.status === 200) {
        const { data: dataRes } = resRestaurants;
        let restaurants = this.filterRestaurants(dataRes.data);

        restaurants = this.sortRestaurants(restaurants);
        lastSearchs[`${point.lat}${point.lng}`] = {};
        lastSearchs[`${point.lat}${point.lng}`].time = Date.now();
        lastSearchs[`${point.lat}${point.lng}`].result = restaurants;
        this.setState({ restaurants, lastSearchs });
      }
    } else {
      let restaurants = lastSearchs[`${point.lat}${point.lng}`].result;
      this.setState({ restaurants });
    }
    handleCloseLoading();
  }

  getLastSearch(point) {
    const { lastSearchs } = this.state;
    let ret = false;
    if (lastSearchs[`${point.lat}${point.lng}`]) {
      ret = Date.now() - lastSearchs[`${point.lat}${point.lng}`].time <= 60000;
    }
    return ret;
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

  centerMoved = (_, map) => {
    const point = {
      lat: map.center.lat(),
      lng: map.center.lng()
    };
    this.setState({ point });
    this.getRestaurants();
  };

  render() {
    const { restaurants, initalPoint, user, point } = this.state;
    const renderRestaurants =
      Array.isArray(restaurants) && restaurants.length ? true : false;
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavApp user={user} logout={this.props.logout}></NavApp>
          <Container fluid>
            <Row>
              {!renderRestaurants && (
                <Col lg="12" className="mb-2">
                  <div className="text-center text-gray-900">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Hace click o desplázate en el mapa para buscar.
                    </h6>
                  </div>
                </Col>
              )}
              <Col
                lg={
                  !renderRestaurants
                    ? { span: 8, offset: 2 }
                    : { span: 4, offset: 0 }
                }
                style={{ height: 500 }}
              >
                <MapContainer
                  initialCenter={initalPoint}
                  onMapClicked={this.onMapClicked}
                  center={point}
                  markers={restaurants}
                  onDragend={this.centerMoved}
                ></MapContainer>
              </Col>
              <Col
                lg={!renderRestaurants ? { span: 6, offset: 3 } : { span: 8 }}
              >
                {renderRestaurants && (
                  <Row>
                    {restaurants.map((restaurant, index) => (
                      <Restaurant info={restaurant} key={index}></Restaurant>
                    ))}
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Search;
