import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Badge, Breadcrumb, Alert } from "react-bootstrap";
import { FaArrowLeft, FaCartPlus, FaHeart, FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import api from "../services/api";
import { formatPrice, assetUrl } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        // Chuẩn hóa dữ liệu giống ProductsPage
        setProduct({
          id: data.id,
          name: data.title || data.name,
          image: data.image
            ? assetUrl(data.image)
            : `https://picsum.photos/seed/${data.id}/600/400`,
          price: data.price,
          description: data.description,
          category: data.category
        });
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality
    alert(isFavorite ? "Đã xóa khỏi danh sách yêu thích!" : "Đã thêm vào danh sách yêu thích!");
  };

  const handleBackToProducts = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-3">Đang tải thông tin sản phẩm...</p>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Lỗi!</Alert.Heading>
          <p>{error || "Không tìm thấy sản phẩm"}</p>
          <Button variant="outline-danger" onClick={handleBackToProducts}>
            <FaArrowLeft className="me-2" />
            Quay lại danh sách sản phẩm
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item onClick={handleBackToProducts} style={{ cursor: 'pointer' }}>
          Sản phẩm
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.category}</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        {/* Hình ảnh sản phẩm */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.name}
              style={{ 
                height: "400px", 
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
          </Card>
        </Col>

        {/* Thông tin sản phẩm */}
        <Col lg={6}>
          <div className="mb-3">
            <Badge bg="secondary" className="mb-2">{product.category}</Badge>
            <h2 className="mb-3">{product.name}</h2>
            
            {/* Đánh giá */}
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <div className="me-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < 4 ? "text-warning" : "text-muted"} 
                      size={16}
                    />
                  ))}
                </div>
                <span className="text-muted">(4.0/5.0)</span>
              </div>
            </div>

            {/* Giá */}
            <div className="mb-4">
              <h3 className="text-primary mb-0">{formatPrice(product.price)}</h3>
              <small className="text-muted">Giá đã bao gồm thuế</small>
            </div>

            {/* Mô tả */}
            <div className="mb-4">
              <h6>Mô tả sản phẩm:</h6>
              <p className="text-muted">{product.description}</p>
            </div>

            {/* Các nút tương tác */}
            <div className="d-grid gap-2 mb-4">
              <Button 
                variant="success" 
                size="lg"
                onClick={handleAddToCart}
                className="d-flex align-items-center justify-content-center"
              >
                <FaCartPlus className="me-2" />
                Thêm vào giỏ hàng
              </Button>
              
              <Button 
                variant={isFavorite ? "danger" : "outline-danger"}
                size="lg"
                onClick={handleToggleFavorite}
                className="d-flex align-items-center justify-content-center"
              >
                <FaHeart className="me-2" />
                {isFavorite ? "Đã yêu thích" : "Yêu thích"}
              </Button>
            </div>

            {/* Thông tin bổ sung */}
            <div className="border-top pt-4">
              <h6 className="mb-3">Thông tin bổ sung:</h6>
              <div className="row text-center">
                <Col xs={4}>
                  <div className="d-flex flex-column align-items-center">
                    <FaTruck className="text-primary mb-2" size={24} />
                    <small className="text-muted">Miễn phí vận chuyển</small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="d-flex flex-column align-items-center">
                    <FaShieldAlt className="text-primary mb-2" size={24} />
                    <small className="text-muted">Bảo hành chính hãng</small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="d-flex flex-column align-items-center">
                    <FaUndo className="text-primary mb-2" size={24} />
                    <small className="text-muted">Đổi trả 30 ngày</small>
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Nút quay lại */}
      <div className="text-center mt-5">
        <Button 
          variant="outline-secondary" 
          onClick={handleBackToProducts}
          className="d-flex align-items-center mx-auto"
        >
          <FaArrowLeft className="me-2" />
          Quay lại danh sách sản phẩm
        </Button>
      </div>
    </Container>
  );
}
