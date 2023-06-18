import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database } from "../config";
import { onValue, ref, set } from "firebase/database";
import { uid } from "uid";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/index";

const DetailForumPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const [idUser, setIdUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [dataComment, setDataComment] = useState([]);

  const getDataDiscussions = () => {
    const dbRef = ref(database, "discussions");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        if (key === id) {
          data.push({
            key: key,
            value: value,
          });
        }
      });

      setData(data[0]?.value || null);
    });
  };

  const getComment = (filterIdDiscussion) => {
    const dbRef = ref(database, "comment-discussions");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        if (value.idDiscussion === filterIdDiscussion) {
          data.push({
            key: key,
            value: value,
          });
        }
      });
      data.sort(
        (a, b) => new Date(b.value.createdAt) - new Date(a.value.createdAt)
      );
      setDataComment(data);
    });
  };

  const handleNewComment = (e) => {
    e.preventDefault();
    const uuid = uid();
    const now = new Date().toISOString();

    try {
      set(ref(database, `/comment-discussions/${uuid}`), {
        idDiscussion: id,
        photoURL,
        displayName,
        comment,
        createdAt: now,
        updatedAt: now,
        uuid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDataUser = (filterIdUser) => {
    const dbRef = ref(database, "users");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();

        if (key === filterIdUser) {
          data.push({
            key: key,
            value: value,
          });
        }
      });

      setDisplayName(data[0]?.value?.displayName);
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
    getDataDiscussions();
    getDataUser(idUser);
    getComment(id);
  }, [id, idUser]);

  return (
    <section className="p-4 lg:p-8">
      <h2 className="text-2xl font-bold">Forum</h2>
      {data && (
        <div className="flex space-x-4 ">
          <img src={data.photoURL} alt="" className="w-20 h-20 rounded-full" />
          <div>
            <h3 className="text-[#0E8CD3]">{data.displayName}</h3>
            <p className="font-semibold text-justify">{data.title}</p>
          </div>
        </div>
      )}
      <div>
        <form onSubmit={handleNewComment}>
          <div className="flex flex-col">
            <label htmlFor="">Beri Komentar</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="w-full p-2 mt-2 bg-white">
            Kirim
          </button>
        </form>
      </div>
    </section>
  );
};

export default DetailForumPage;
