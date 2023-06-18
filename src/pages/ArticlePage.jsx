import React, { useState, useEffect } from "react";
import ExampleArticle from "../assets/ex_article.png";
import { database } from "../config/index";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const getData = () => {
    const dbRef = ref(database, "articles");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        data.push({
          key: key,
          value: value,
        });
      });
      console.log(data);
      setArticles(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="bg-[#F3FFF4] p-4">
        <h2 className="font-bold text-center text-[#1C9509] text-2xl sm:text-3xl md:text-4xl my-4">
          Artikel
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.map((item, index) => (
            <div key={index + 1} className="p-4 bg-white rounded-md shadow">
              <img
                src={item.value.articleUrlImg}
                alt=""
                className="w-full mx-auto rounded-md h-52"
              />
              <Link to={`/article/${item.key}`} className="font-bold">
                {item.value.articleTitle}
              </Link>
              <p className="text-justify">
                {item.value.articleDescription.slice(0, 200)}...
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage;
