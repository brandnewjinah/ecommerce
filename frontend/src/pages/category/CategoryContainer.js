import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

//import components
import CategoryPresenter from "./CategoryPresenter";

//redux
import { connect } from "react-redux";

const CategoryContainer = (props) => {
  let { id } = useParams();
  const limit = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState();
  const [products, setProducts] = useState({});

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getData = async () => {
      setCount(props.product.length);
      const index = (currentPage - 1) * limit;
      const list = _(props.product).slice(index).take(limit).value();
      setProducts({ products: list, path: id });
    };

    getData();
  }, [currentPage, id, props.product, props.proudct]);

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
