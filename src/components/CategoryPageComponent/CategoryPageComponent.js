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
import { Link } from 'react-router-dom';
import Layer1 from '../../assets/images/Medical/Layer 2.png'
import Layer2 from '../../assets/images/Medical/Layer 5.png'
import Layer3 from '../../assets/images/Medical/Layer 6.png'
import Layer4 from '../../assets/images/Medical/Layer 7.png'
import Layer5 from '../../assets/images/Medical/Layer 8.png'
import Layer6 from '../../assets/images/Medical/Layer 10.png'
import Layer7 from '../../assets/images/Medical/Layer 12.png'
import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown } from "lucide-react";

const CategoryPageComponent = ({ id, loading, parent }) => {
  const [categoryDetails, setCategoryDetails] = useState();
  const [filter, setFilters] = useState();
  const [selectedFilter, setSelectedFilter] = useState();
  const [sortOption, setSortOption] = useState("Product Name");
  const [sortBy, setSortBy] = useState("name");
  const [open, setOpen] = useState(false);

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

  const image = [Layer1, Layer2, Layer3, Layer4, Layer5, Layer6, Layer7]

  const handleSortChange = (param) => {
    if (param == 'h_l') {
      const sortedProducts = categoryDetails.sort((a, b) => (b.special_price ? parseFloat(b.special_price) : parseFloat(b.price)) - (a.special_price ? parseFloat(a.special_price) : parseFloat(a.price)));
      setCategoryDetails(sortedProducts)
    } else if (param == 'l_h') {
      const sortedProducts = categoryDetails.sort((a, b) => (a.special_price ? parseFloat(a.special_price) : parseFloat(a.price)) - (b.special_price ? parseFloat(b.special_price) : parseFloat(b.price)));
      setCategoryDetails(sortedProducts)
    } else {
      const sortedProducts = [...categoryDetails].sort((a, b) =>
        a.name.localeCompare(b.name)
      );


      console.log(sortedProducts)
      setCategoryDetails(sortedProducts)
    }

  };


  useEffect(() => {
    if (parent === 'category') {
      const getCategoryProducts = () => {
        const loginDetails = sessionStorage.getItem('loginDetails') ? JSON.parse(sessionStorage.getItem('loginDetails')) : null
        if (loginDetails) {
          const url = `b2c/getProductsByCategory?customerid=${loginDetails.id}&categoryId=${id}&pagesize=10&pagenum=1`
          context.getGetData(url, `categoryDetails`);
        } else {
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
        <nav aria-label="breadcrumb">
          <ol className={"breadcrumb " + styles.custom_breadcrumb}>
            <li className={styles.breadcrumb_item}>
              <Link to="/" className="text-primary text-decoration-none">Home</Link>
            </li>
            <li className={styles.breadcrumb_item + " active text-grey"} aria-current="page">
              {
                parent == 'category' ? (<>Category</>) : (<>Brand</>)
              }
            </li>
          </ol>
        </nav>
        {/* <span className={styles.breadCrumb_section}>Lorem Ipsum &nbsp; &nbsp;  &gt; &nbsp; &nbsp; Lorem Ipsum  &nbsp; &nbsp; &gt; &nbsp; &nbsp;  Lorem Ipsum</span> */}
        <div className={styles.filter_icon_container + ' mt-3'}>
          <span><Sliders /> Filters <ChevronDown size={10} /></span>
          {/* <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="-1">Sort By</option>
              <option value="h_l">Price - High to Low</option>
              <option value="l_h">Price - Low to High</option>
              <option value="name">Product Name</option>
            </select>
          </div> */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className={"flex items-center gap-2 p-2 " + styles.sortButton}
            >
              Sort by: {sortOption ? sortOption : ''} <ChevronExpand className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={"absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg list-none " + styles.sortingContainer}
                >
                  <li
                    onClick={() => { setSortOption("Price - High to Low"); setOpen(false); handleSortChange('h_l') }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    Price - High to Low
                  </li>
                  <li
                    onClick={() => { setSortOption("Price - Low to High"); setOpen(false); handleSortChange("l_h") }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    Price - Low to High
                  </li>
                  <li
                    onClick={() => { setSortOption("Product Name"); setOpen(false); handleSortChange("name") }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    Product Name
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
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
          {filterOptions && filterOptions.map((ele, id) => {
            return (
              <FilterCollapsible key={id} options={ele} />
            )
          })}
        </div>
        <div className={styles.product_list_container}>
          {
            categoryDetails && categoryDetails.map((ele, id) => {
              return (
                <ProductSecond key={id} productObject={ele} parent={'CategoryPage'} images={image[id]} />
              )
            })
          }
        </div>
      </div>
      {/* <div className='d-flex justify-content-center'>
        <div className={styles.showMore_container}>
          Show More
        </div>
      </div> */}
    </div>
  )
};

export default CategoryPageComponent;
