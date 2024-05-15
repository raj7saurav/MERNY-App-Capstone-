import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

function HomePage() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Footer />
    </div>
  );
}

export default HomePage;
