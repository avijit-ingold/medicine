import React, { useState } from 'react';
import { motion } from "framer-motion";
import styles from './ProductDetailFAQ.module.css';
import { Plus, Dash } from 'react-bootstrap-icons';


const AccordionItem = ({ title, content, content2, isList }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <div
        className={styles.acordianTitle + " w-full text-left p-2 font-semibold flex justify-between items-center"}
        onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}
      >
        {title}
        <span>{isOpen ? <Dash size={30} /> : <Plus size={30} />}</span>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 text-gray-700">
          <p className={styles.faq_para}>{content}</p>
          <ul className="list-disc pl-5">
            {content2.map((item, index) => (
              <li  key={index} className={`${styles.faq_list}` + ' ' + (index === 0 || index === 4 ? "font-bold" : "")}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const ProductDetailFAQ = () => {

  const items = [
    {
      title: "Lorem Ipsum",
      content:
        "Pellentesque a eleifend dignissim consequat nunc convallis fermentum augue. Vivamus sit molestie in orci pretium commodo elit dolor. Fringilla venenatis dui in; ac faucibus penatibus lectus. Vitae etiam rhoncus sapien neque mattis sociosqu. Quam nisi faucibus ultrices pellentesque dictum tellus eu. Adipiscing scelerisque condimentum mi litora eleifend. Cras phasellus maecenas ridiculus lacus convallis sed libero.",
      content2: [
        "Lobortis enim ipsum congue ac penatibus urna, Lobortis tristique faucibus.",
        "Vestibulum egestas dictumst egestas sem adipiscing mi urna ex vehicula.",
        "Dictum mi pretium porttitor suscipit phasellus laoreet.",
        "Vivamus sit molestie in orci pretium commodo elit dolor.",
        "Quam nisi faucibus ultrices pellentesque dictum tellus eu adipiscing scelerisque.",
      ],
    },
    {
      title: "Lorem Ipsum",
      content:
        "Pellentesque a eleifend dignissim consequat nunc convallis fermentum augue. Vivamus sit molestie in orci pretium commodo elit dolor. Fringilla venenatis dui in; ac faucibus penatibus lectus. Vitae etiam rhoncus sapien neque mattis sociosqu. Quam nisi faucibus ultrices pellentesque dictum tellus eu. Adipiscing scelerisque condimentum mi litora eleifend. Cras phasellus maecenas ridiculus lacus convallis sed libero.",
      content2: [
        "Lobortis enim ipsum congue ac penatibus urna, Lobortis tristique faucibus.",
        "Vestibulum egestas dictumst egestas sem adipiscing mi urna ex vehicula.",
        "Dictum mi pretium porttitor suscipit phasellus laoreet.",
        "Vivamus sit molestie in orci pretium commodo elit dolor.",
        "Quam nisi faucibus ultrices pellentesque dictum tellus eu adipiscing scelerisque.",
      ],
    },
    {
      title: "Lorem Ipsum",
      content:
        "Pellentesque a eleifend dignissim consequat nunc convallis fermentum augue. Vivamus sit molestie in orci pretium commodo elit dolor. Fringilla venenatis dui in; ac faucibus penatibus lectus. Vitae etiam rhoncus sapien neque mattis sociosqu. Quam nisi faucibus ultrices pellentesque dictum tellus eu. Adipiscing scelerisque condimentum mi litora eleifend. Cras phasellus maecenas ridiculus lacus convallis sed libero.",
      content2: [
        "Lobortis enim ipsum congue ac penatibus urna, Lobortis tristique faucibus.",
        "Vestibulum egestas dictumst egestas sem adipiscing mi urna ex vehicula.",
        "Dictum mi pretium porttitor suscipit phasellus laoreet.",
        "Vivamus sit molestie in orci pretium commodo elit dolor.",
        "Quam nisi faucibus ultrices pellentesque dictum tellus eu adipiscing scelerisque.",
      ],
    },
    {
      title: "Lorem Ipsum",
      content:
        "Pellentesque a eleifend dignissim consequat nunc convallis fermentum augue. Vivamus sit molestie in orci pretium commodo elit dolor. Fringilla venenatis dui in; ac faucibus penatibus lectus. Vitae etiam rhoncus sapien neque mattis sociosqu. Quam nisi faucibus ultrices pellentesque dictum tellus eu. Adipiscing scelerisque condimentum mi litora eleifend. Cras phasellus maecenas ridiculus lacus convallis sed libero.",
      content2: [
        "Lobortis enim ipsum congue ac penatibus urna, Lobortis tristique faucibus.",
        "Vestibulum egestas dictumst egestas sem adipiscing mi urna ex vehicula.",
        "Dictum mi pretium porttitor suscipit phasellus laoreet.",
        "Vivamus sit molestie in orci pretium commodo elit dolor.",
        "Quam nisi faucibus ultrices pellentesque dictum tellus eu adipiscing scelerisque.",
      ],
    },
    {
      title: "Lorem Ipsum",
      content:
        "Pellentesque a eleifend dignissim consequat nunc convallis fermentum augue. Vivamus sit molestie in orci pretium commodo elit dolor. Fringilla venenatis dui in; ac faucibus penatibus lectus. Vitae etiam rhoncus sapien neque mattis sociosqu. Quam nisi faucibus ultrices pellentesque dictum tellus eu. Adipiscing scelerisque condimentum mi litora eleifend. Cras phasellus maecenas ridiculus lacus convallis sed libero.",
      content2: [
        "Lobortis enim ipsum congue ac penatibus urna, Lobortis tristique faucibus.",
        "Vestibulum egestas dictumst egestas sem adipiscing mi urna ex vehicula.",
        "Dictum mi pretium porttitor suscipit phasellus laoreet.",
        "Vivamus sit molestie in orci pretium commodo elit dolor.",
        "Quam nisi faucibus ultrices pellentesque dictum tellus eu adipiscing scelerisque.",
      ],
    },
  ];

  return (
    <div className={styles.productFaq + " max-w-2xl mx-auto"}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content2={item.content2}
          content={item.content}
          isList={item.isList}
        />
      ))}
    </div>
  )
};


export default ProductDetailFAQ;
