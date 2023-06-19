import React, { useState, useEffect } from "react";
import ModalQuestion from "../components/ModalQuestion";
import ImagePlaceholder from "../assets/placeholder-image.png";
import CardDiscussion from "../components/CardDiscussion";
import { database } from "../config";
import { ref, onValue } from "firebase/database";
import Footer from "../components/Footer";

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
        <h2 className="text-3xl font-bold mb-6">Forum</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <button
              onClick={() => setOpenModalDiscussion(true)}
              className="bg-[#00985B] text-white px-6 py-3 rounded-full font-semibold mb-6 hover:bg-[#008249] transition-colors"
            >
              Mulai Diskusi
            </button>
            <div className="bg-white rounded-lg p-4 shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Filter Diskusi</h3>
              <div>
                <select
                  value={selectedOption}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded-md shadow-sm"
                >
                  <option value="">All</option>
                  <option value="Gaya Hidup">Gaya Hidup</option>
                  <option value="Diet">Diet</option>
                  <option value="Olahraga">Olahraga</option>
                </select>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Diskusi Terbaru</h3>
            {data.length === 0 ? (
              <p className="text-gray-600">Tidak ada diskusi yang tersedia.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {data.map((item, index) => (
                  <CardDiscussion
                    id={item.value.uuid}
                    key={index + 1}
                    name={item.value.displayName}
                    question={item.value.title}
                    photoURL={item.value.photoURL || ImagePlaceholder}
                    countComment={commentsCount[item.key] || 0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <ModalQuestion
        openModal={openModalDiscussion}
        setOpenModal={closeModal}
      />
      <Footer />
    </>
  );
};

export default ForumPage;