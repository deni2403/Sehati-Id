import React, { useState, useEffect } from "react";
import ModalQuestion from "../components/ModalQuestion";
import ImagePlaceholder from "../assets/placeholder-image.png";
import CardDiscussion from "../components/CardDiscussion";
import { database } from "../config";
import { ref, onValue } from "firebase/database";

const ForumPage = () => {
  const [openModalDiscussion, setOpenModalDiscussion] = useState(false);
  const [data, setData] = useState([]);
  const getData = () => {
    const dbRef = ref(database, "discussions");
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

      // Sort the data array by createdAt field in descending order
      data.sort(
        (a, b) => new Date(b.value.createdAt) - new Date(a.value.createdAt)
      );

      console.log(data);
      setData(data);
    });
  };

  const closeModal = () => {
    setOpenModalDiscussion(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <section className="p-4 lg:p-8">
        <h2 className="text-2xl font-bold">Forum</h2>
        <div className="flex flex-col mt-4 md:flex-row md:space-x-8">
          <div className="flex flex-col md:w-[30%]">
            <button
              onClick={() => setOpenModalDiscussion(true)}
              className="bg-[#00985B] text-white p-4 font-semibold"
            >
              Mulai Diskusi
            </button>
            <div>
              <h3 className="p-4 font-semibold text-center">Topik Diskusi</h3>
            </div>
          </div>
          <div className="md:w-[70%]">
            <h3 className="p-4 text-2xl border-b-[#00985B] border-b-2 ">
              Diskusi
            </h3>
            <div className="flex flex-col space-y-4">
              {data.map((item, index) => (
                <>
                  <CardDiscussion
                    id={item.value.uuid}
                    key={index + 1}
                    name={item.value.displayName}
                    question={item.value.title}
                    img={item.value.photoURL}
                    countComment="12"
                  />{" "}
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ModalQuestion
        openModal={openModalDiscussion}
        setOpenModal={closeModal}
      />
    </>
  );
};

export default ForumPage;
