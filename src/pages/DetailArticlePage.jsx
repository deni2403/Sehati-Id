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
      <section className="p-4 bg-[#F3FFF4]">
        <div className="flex flex-col w-full mx-auto space-y-4 md:w-96 lg:w-[450px]">
          <img
            src={data.articleUrlImg}
            alt=""
            className="w-full mx-auto rounded-md h-72"
          />
          <h3 className="font-bold">{data.articleTitle}</h3>
          <p className="font-medium text-justify text-gray-600">
            {data.articleDescription}
          </p>
          <a
            target="blank"
            href={data.articleSource}
            className="text-blue-600 underline cursor-pointer"
          >
            {" "}
            <span className="text-black no-underline">Sumber: </span>
            {data.articleSource}
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DetailArticle;
