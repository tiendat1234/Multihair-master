import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import "../components/product.css";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Xin Lỗi, Sản Phẩm Đã Hết Hàng");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="card-dcr ">
      <Link className="of-h" to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top ofv "
          alt={product.name}
        />
      </Link>
      <Card.Body className="post-content">
        <Link className="text-dcr" to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button className="al-ct" variant="light" disabled>
            Hết Hàng
          </Button>
        ) : (
          <Button className="al-ct" onClick={() => addToCartHandler(product)}>
            Thêm Vào Giỏ Hàng
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
