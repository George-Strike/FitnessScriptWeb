import React, { Component } from 'react';
import { Row, Col } from 'antd';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <Row>
              <Col span={24}>
                  <div>
                      <h1>Welcome To Fitness Script!</h1>
                      <p>Here you can find recipies, create a workout planner or track your calories.</p>
                  </div>
              </Col>
          </Row>
    );
  }
}
