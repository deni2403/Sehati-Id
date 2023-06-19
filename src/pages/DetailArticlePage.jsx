import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../config/index";
import { ref, onValue } from "firebase/database";
import Footer from "../components/Footer";

const DetailArticle = () => {
  const { id } = useParams();

  const [data, setData] = useState("");

  const getData = () => {
    const dbRef = ref(database, "articles");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        if (key === id) {
          data.push({
            key: key,
            value: value,
          });
        }
      });

      setData(data[0].value);
      console.log(data[0].value);
    });
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="p-4 flex flex-col items-center justify-center min-h-screen bg-[#F3FFF4]">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md">
          <img
            src={data.articleUrlImg}
            alt=""
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#1C9509] mb-4">
              {data.articleTitle}
            </h3>
            <p className="text-gray-800 text-justify">{data.articleDescription}</p>
            <a
              href={data.articleSource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-4"
            >
              Sumber: {data.articleSource}
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DetailArticle;