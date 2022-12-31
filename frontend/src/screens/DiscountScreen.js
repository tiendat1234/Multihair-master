import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        discounts: action.payload,
        loading: false,
      };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
export default function DiscountScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [
    { loading, error, discounts, loadingCreate, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/discounts`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);
  const createHandler = async () => {
    if (window.confirm("Bạn Có Chắc Chắn Muốn Tạo?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "/api/discounts",
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success("Mã Giảm Giá Được Tạo Thành Công");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/discounts/${data.discount._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (discount) => {
    if (window.confirm("Bạn Có Chắc Chắn Muốn Xóa Không?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`/api/discounts/${discount._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("Mã Giảm giá Xóa Thành Công !!");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Mã Giảm Giá</title>
      </Helmet>
      <Row>
        <Col>
          <h1>Mã Giảm Giá</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              Tạo Mới Mã Giảm Giá
            </Button>
          </div>
        </Col>
      </Row>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TÊN</th>
              <th>% GIẢM GIÁ</th>
              <th>SỐ LƯỢNG</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount._id}>
                <td>{discount._id}</td>
                <td>{discount.name}</td>
                <td>{discount.number}</td>
                <td>{discount.quantity}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/admin/discounts/${discount._id}`);
                    }}
                  >
                    Tùy Chọn
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteHandler(discount)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
