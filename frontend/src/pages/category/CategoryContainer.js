import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import _ from "lodash";

//import components
import CategoryPresenter from "./CategoryPresenter";

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getData = async () => {
      const index = (currentPage - 1) * limit;

      if (location.pathname.includes("/all")) {
        const allProducts = props.product;
        setCount(allProducts.length);
        const list = _(allProducts).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }

      if (location.pathname.includes("/bakery")) {
        const bakeryProducts = props.product.filter(
          (p) => p.category1.id === 100
        );
        setCount(bakeryProducts.length);
        const list = _(bakeryProducts).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }

      if (location.pathname.includes("/beverages")) {
        const beverageProducts = props.product.filter(
          (p) => p.category1.id === 200
        );
        setCount(beverageProducts.length);
        const list = _(beverageProducts).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }

      if (location.pathname.includes("/snacks")) {
        const snackProducts = props.product.filter(
          (p) => p.category1.id === 300
        );
        setCount(snackProducts.length);
        const list = _(snackProducts).slice(index).take(limit).value();
        setProducts({ products: list, path: id });
      }
    };

    getData();
  }, [currentPage, id, location.pathname, props.product, props.proudct]);

  return (
    <CategoryPresenter
      {...products}
      count={count}
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      limit={limit}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.products.products,
  };
};

export default connect(mapStateToProps, null)(CategoryContainer);
