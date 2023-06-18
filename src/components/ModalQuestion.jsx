import React, { useState, useEffect } from "react";
import { database } from "../config";
import { set, ref, onValue } from "firebase/database";
import { uid } from "uid";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/index";

const ModalQuestion = ({ openModal, setOpenModal }) => {
  const [topic, setTopic] = useState("Gaya Hidup");
  const [title, setTitle] = useState("");
  const [detailQuestion, setDetailQuestion] = useState("");
  const [idUser, setIdUser] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [displayName, setDisplayName] = useState("");

  const handleNewQuestion = (e) => {
    e.preventDefault();
    const uuid = uid();
    const now = new Date().toISOString();

    try {
      set(ref(database, `/discussions/${uuid}`), {
        topic,
        title,
        detailQuestion,
        idUser,
        displayName,
        photoURL,
        createdAt: now,
        updatedAt: now,
        uuid,
      });
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = (filterIdUser) => {
    const dbRef = ref(database, "users");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        // Filter the data based on the provided idUser
        if (key === filterIdUser) {
          data.push({
            key: key,
            value: value,
          });
        }
      });

      setDisplayName(data[0]?.value?.displayName || "Aini");
    });
  };

  const checkUserLogin = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            const userUUID = user.uid;
            setPhotoURL(user.photoURL);
            setIdUser(userUUID);
            resolve(userUUID);
          } else {
            resolve(null);
          }
        },
        (error) => {
          console.log("Error checking user login:", error);
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    checkUserLogin();
    getData(idUser);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${
        openModal ? "flex" : "hidden"
      } justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => setOpenModal(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <form
              onSubmit={handleNewQuestion}
              className="flex flex-col space-y-4"
            >
              <div className="flex flex-col space-y-2">
                <label htmlFor="topic" className="font-semibold text-start">
                  Pilih Topik
                </label>
                <select
                  name="topic"
                  id="topic"
                  className="p-2 border-2 border-gray-300 rounded-md"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="Gaya Hidup">Gaya Hidup</option>
                  <option value="Diet">Diet</option>
                  <option value="Olahrag">Olahraga</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="font-semibold text-start">
                  Judul
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="p-2 border-2 border-gray-300 rounded-md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="detailQuestion"
                  className="font-semibold text-start"
                >
                  Detail Pertanyaan
                </label>
                <textarea
                  name="detailQuestion"
                  id="detailQuestion"
                  cols="30"
                  rows="10"
                  className="p-2 border-2 border-gray-300 rounded-md"
                  value={detailQuestion}
                  onChange={(e) => setDetailQuestion(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#00985B] text-white p-2 font-semibold rounded-md"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalQuestion;
