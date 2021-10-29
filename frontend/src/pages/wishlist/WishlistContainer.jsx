import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";

//components
import WishlistPresenter from "./WishlistPresenter";

//data
import { demoProducts } from "../../data/demoProducts";

//redux
import { connect } from "react-redux";

const CategoryContainer = (props) => {
  let { id } = useParams();
  let location = useLocation();
  const [products, setProducts] = useState({});

  //pagination
  const limit = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState();

  //subcategory
  const [subcat, setSubCat] = useState();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCatChange = (id) => {
    setSubCat(id);
  };

  useEffect(() => {
    const getData = () => {
      const index = (currentPage - 1) * limit;
      let allData = [...demoProducts, ...(props.products && props.products)];

      if (location.pathname.includes("/all")) {
        const products =
          subcat === 100 || subcat === 200 || subcat === 300
            ? allData.filter((p) => p.category1.id === subcat)
            : allData;
        setCount(products.length);
        const list = _(products).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }

      if (location.pathname.includes("/bakery")) {
        const bakeryProducts =
          subcat > 100 && subcat < 200
            ? allData.filter((p) => p.category2.id === subcat)
            : allData.filter((p) => p.category1.id === 100);
        setCount(bakeryProducts.length);
        const list = _(bakeryProducts).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }

      if (location.pathname.includes("/beverage")) {
        const bevProducts =
          subcat > 200 && subcat < 300
            ? allData.filter((p) => p.category2.id === subcat)
            : allData.filter((p) => p.category1.id === 200);
        setCount(bevProducts.length);
        const list = _(bevProducts).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }

      if (location.pathname.includes("/snacks")) {
        const snackProducts =
          subcat > 300 && subcat < 400
            ? allData.filter((p) => p.category2.id === subcat)
            : allData.filter((p) => p.category1.id === 300);
        setCount(snackProducts.length);
        const list = _(snackProducts).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }

      if (location.pathname.includes("/deli")) {
        const deliProducts =
          subcat > 400 && subcat < 500
            ? allData.filter((p) => p.category2.id === subcat)
            : allData.filter((p) => p.category1.id === 400);
        setCount(deliProducts.length);
        const list = _(deliProducts).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }
    };

    getData();
  }, [currentPage, id, location.pathname, props.products, subcat]);

  return (
    <WishlistPresenter
      {...products}
      count={count}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      handleCatChange={handleCatChange}
      limit={limit}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

export default connect(mapStateToProps, null)(CategoryContainer);
