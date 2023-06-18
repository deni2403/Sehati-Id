import React, { useState, useEffect } from "react";
import ModalQuestion from "../components/ModalQuestion";
import ImagePlaceholder from "../assets/placeholder-image.png";
import CardDiscussion from "../components/CardDiscussion";
import { database } from "../config";
import { ref, onValue } from "firebase/database";

const ForumPage = () => {
  const [openModalDiscussion, setOpenModalDiscussion] = useState(false);
  const [data, setData] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const [selectedOption, setSelectedOption] = useState("");

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

      // Filter the data array based on the selected option
      if (selectedOption !== "") {
        data = data.filter((item) => item.value.topic === selectedOption);
      }

      setData(data);
    });
  };

  const getCommentsCount = (discussionId) => {
    const dbRef = ref(database, "comment-discussions");
    onValue(dbRef, (snapshot) => {
      let count = 0;
      snapshot.forEach((childSnapshot) => {
        let value = childSnapshot.val();

        if (value.idDiscussion === discussionId) {
          count++;
        }
      });

      setCommentsCount((prevState) => ({
        ...prevState,
        [discussionId]: count,
      }));
    });
  };

  const closeModal = () => {
    setOpenModalDiscussion(false);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    getData();
  }, [selectedOption]);

  useEffect(() => {
    data.forEach((item) => {
      getCommentsCount(item.key);
    });
  }, [data]);

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
              <div className="w-full">
                <select
                  value={selectedOption}
                  onChange={handleChange}
                  className="w-full p-4 font-bold"
                >
                  <option value="">All</option>
                  <option value="Gaya Hidup">Gaya Hidup</option>
                  <option value="Diet">Diet</option>
                  <option value="Olahraga">Olahraga</option>
                </select>
              </div>
            </div>
          </div>
          <div className="md:w-[70%]">
            <h3 className="p-4 text-2xl border-b-[#00985B] border-b-2 ">
              Diskusi
            </h3>
            <div className="flex flex-col space-y-4">
              {data.map((item, index) => (
                <CardDiscussion
                  id={item.value.uuid}
                  key={index + 1}
                  name={item.value.displayName}
                  question={item.value.title}
                  img={item.value.photoURL}
                  countComment={commentsCount[item.key] || 0}
                />
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
