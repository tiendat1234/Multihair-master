import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container ">
        <div className="row txt-dcr">
          <div className="col-sm-12 col-md-6 ">
            <h6>About</h6>
            <p className="text-justify">
              Công ty TNHH Mỹ Phẩm Shiseido Việt Nam
              <br /> ĐC: Tầng 27, số 5 Công Trường Mê Linh, Phường Bến Nghé,
              Quận 1, HCM
              <br /> ĐT: 028 35 208 673 – Hotline: 028 66 833 412
              <br /> Email: tsubaki.vietnam@scv.shiseido.vn
            </p>
          </div>

          <div className="col-xs-6 col-md-3 txt-dcr">
            <h6>Các Phương Tiện Truyền Thông Khác</h6>
            <ul className="footer-links">
              <li>
                <Link className="txt-dcr" to="/">
                  Facebook
                </Link>
              </li>
              <li>
                <Link className="txt-dcr" to="/">
                  Instagram
                </Link>
              </li>
              <li>
                <Link className="txt-dcr" to="/">
                  Shopee
                </Link>
              </li>
              <li>
                <Link className="txt-dcr" to="/">
                  Lazada
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Đường Dẫn</h6>
            <ul className="footer-links">
              <li>
                <Link className="txt-dcr" to="#">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link className="txt-dcr" to="/">
                  Liên Hệ Với Chúng Tôi
                </Link>
              </li>
              <li>
                <Link className="txt-dcr" to="/">
                  Đóng góp
                </Link>
              </li>
              <li>
                <Link className="txt-dcr" to="/">
                  Điều Khoản Bảo Mật
                </Link>
              </li>
              <li>
                <Link className="txt-dcr" to="/">
                  Bản Đồ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Made with &hearts; by Multihair</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
