import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Đăng Nhập</Col>
      <Col className={props.step2 ? "active" : ""}>Vận Chuyển</Col>
      <Col className={props.step3 ? "active" : ""}>Thanh Toán</Col>
      <Col className={props.step4 ? "active" : ""}>Đặt Hàng</Col>
    </Row>
  );
}
