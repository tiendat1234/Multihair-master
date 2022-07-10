import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "./style/home.css";
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Multihair</title>
      </Helmet>
      <div className="jumbotron jumbotron-fluid mb-0">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-10 col-lg-6"></div>
          </div>
        </div>
      </div>

      <h1 className="tit-cen">Sản Phẩm Nổi Bật</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <div id="about">
        <div className="container">
          <div className="row mg-40">
            <div className="col-xs-12 col-md-6 cen">
              {" "}
              <img
                src="images/thumb.jpg"
                className="img-responsive im-w"
                alt=""
              />{" "}
            </div>
            <div className="col-xs-12 col-md-6 cen">
              <div className="about-text">
                <h2>About Us</h2>
                <p className="f">
                  Tsubaki là dầu gội đầu Nhật Bản rất được ưa chuộng tại thị
                  trường Việt Nam hiện nay. Dầu gội Tsubaki là một sản phẩm
                  thuộc thương hiệu Shiseido rất nổi tiếng nên người tiêu dùng
                  có thể hoàn toàn tin tưởng vào chất lượng sản phẩm này đem
                  tới. Với việc sử dụng nguyên liệu từ thiên nhiên, dầu gội
                  Tsubaki có rất nhiều công dụng từ làm sạch, dưỡng ẩm cho da
                  đầu, phục hồi tóc hư tổn tới ngăn ngừa rụng tóc một cách hiệu
                  quả chỉ sau thời gian ngắn sử dụng. Tùy vào loại dầu gội
                  Tsubaki mà bạn có thể lựa chọn cho mình một công dụng phù hợp
                  hay mùi hương yêu thích với bản thân để cùng đồng hành trong
                  công cuộc chăm sóc tóc hàng ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeScreen;
