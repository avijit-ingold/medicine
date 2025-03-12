import React, { useState, useEffect, useContext } from 'react';
import styles from './CategoryPageComponent.module.css';
import { GenericApiContext } from '../../context/GenericApiContext';
import HeaderImage from '../../../src/assets/images/Medical/header_image.png';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Product from '../Product/Product';
import { ChevronDown, ChevronExpand, Sliders, } from 'react-bootstrap-icons';
import FilterCollapsible from '../FilterCollapsible/FilterCollapsible';
import ProductSecond from '../ProductSecond/ProductSecond';

const CategoryPageComponent = ({ id, loading, parent }) => {
  const [categoryDetails, setCategoryDetails] = useState();
  const [filter, setFilters] = useState();
  const [selectedFilter, setSelectedFilter] = useState();

  const context = useContext(GenericApiContext);

  const filterOptions = [
    {
      "title": "Lorem Ipsum",
      "options": [
        { "id": 1, "label": "Lorem ipsum" },
        { "id": 2, "label": "Lorem ipsum" },
        { "id": 3, "label": "Lorem ipsum" },
        { "id": 4, "label": "Lorem ipsum" },
        { "id": 5, "label": "Lorem ipsum" }
      ]
    },
    {
      "title": "Lorem Ipsum",
      "options": [
        { "id": 6, "label": "Lorem ipsum" },
        { "id": 7, "label": "Lorem ipsum" },
        { "id": 8, "label": "Lorem ipsum" },
        { "id": 9, "label": "Lorem ipsum" },
        { "id": 10, "label": "Lorem ipsum" }
      ]
    },
    {
      "title": "Lorem Ipsum",
      "options": [
        { "id": 11, "label": "Lorem ipsum" },
        { "id": 12, "label": "Lorem ipsum" },
        { "id": 13, "label": "Lorem ipsum" },
        { "id": 14, "label": "Lorem ipsum" },
        { "id": 15, "label": "Lorem ipsum" }
      ]
    },
    {
      "title": "Lorem Ipsum",
      "options": [
        { "id": 16, "label": "Lorem ipsum" },
        { "id": 17, "label": "Lorem ipsum" },
        { "id": 18, "label": "Lorem ipsum" },
        { "id": 19, "label": "Lorem ipsum" },
        { "id": 20, "label": "Lorem ipsum" }
      ]
    }
  ]

  useEffect(() => {
    if (parent === 'category') {
      const getCategoryProducts = () => {
        const loginDetails = sessionStorage.getItem('loginDetails') ? JSON.parse(sessionStorage.getItem('loginDetails')) : null
        if(loginDetails){
          const url = `b2c/getProductsByCategory?customerid=${loginDetails.id}&categoryId=${id}&pagesize=10&pagenum=1`
          context.getGetData(url, `categoryDetails`);
        }else{
          const url = `b2c/getProductsByCategory?customerid=&categoryId=${id}&pagesize=10&pagenum=1`
          context.getGetData(url, `categoryDetails`);
        }

      }
      getCategoryProducts();
    }
    if (parent === 'brand') {
      const getBrandProducts = () => {
        const url = `products/brand/${id}?page=1`
        context.getGetData(url, `categoryDetails`);

        const brandFilterUrl = 'filter/brands'
        context.getGetData(brandFilterUrl, `filter`)
      }
      getBrandProducts();
    }
  }, [id, parent])

  useEffect(() => {
    if (context.filterData) {
      if (context.filterData.data.data) {
        setFilters(context.filterData.data.data)
      }
    }
  }, [context.filterData])

  useEffect(() => {
    if (context.getCategoryDetails) {
      if (context.getCategoryDetails.data) {
        setCategoryDetails(context.getCategoryDetails.data)
      }
    }
  }, [context.getCategoryDetails])


  return (
    <div className={styles.product_page}>
      <div className={styles.productList_header}>
        <div className={styles.header_image_container}>
          <img src={HeaderImage} className={styles.header_image} />
        </div>
        <div className={styles.header_text_container}>
          <p className={styles.header_main_text}>Lorem Ipsum Dolor Sit Amet</p>
          <p className={styles.header_text_description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
        </div>
      </div>
      <div className={styles.filterSection_container + ' container'}>
        <span className={styles.breadCrumb_section}>Lorem Ipsum &nbsp; &nbsp;  &gt; &nbsp; &nbsp; Lorem Ipsum  &nbsp; &nbsp; &gt; &nbsp; &nbsp;  Lorem Ipsum</span>
        <div className={styles.filter_icon_container}>
          <span><Sliders /> Filters <ChevronDown size={10} /></span>
          <span><ChevronExpand /> Sort</span>
        </div>
        <div className={styles.filter_container}>
          {
            filter && filter.map((ele, id) => {
              return (
                <div key={id} className={selectedFilter == id ? styles.single_selected_filter : styles.single_filter} onClick={() => setSelectedFilter(id)}>
                  {ele.name}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.productFilter_Section}>
        <div className={styles.productFilter_list_container}>
          {filterOptions && filterOptions.map((ele) => {
            return (
              <FilterCollapsible options={ele} />
            )
          })}
        </div>
        <div className={styles.product_list_container}>
          {
            categoryDetails && categoryDetails.map((ele, id) => {
              return (
                <ProductSecond key={id} productObject={ele} parent={'CategoryPage'} />
              )
            })
          }
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <div className={styles.showMore_container}>
          Show More
        </div>
      </div>
    </div>
  )
};

export default CategoryPageComponent;
