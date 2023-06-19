import React, { useEffect, useState } from "react";
import DefaultProfile from "../assets/placeholder-image.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/index";
import { onValue, ref, set } from "firebase/database";
import { database } from "../config/index";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState({});
  const [photoURL, setPhotoURL] = useState("");

  const getData = (userId) => {
    const dbRef = ref(database, "users");
    onValue(dbRef, (snapshot) => {
      let data = [];
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;
        let value = childSnapshot.val();

        if (key === userId) {
          data.push({
            key: key,
            value: value,
          });
        }
      });

      setData(data[0]);
      console.log(data[0]);
    });
  };

  const checkUserLogin = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            const { uid: userId, photoURL } = user;
            setUserId(userId);
            setPhotoURL(photoURL);
            getData(userId);
            resolve(userId);
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
  }, []);

  const handleFieldChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      value: {
        ...prevData.value,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the database with the new field values
    const userId = auth.currentUser.uid;
    const dbRef = ref(database, `users/${userId}`);
    set(dbRef, data.value)
      .then(() => {
        console.log("Data updated successfully.");
      })
      .catch((error) => {
        console.log("Error updating data:", error);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 mt-6 mb-6">
          <div className="flex items-center justify-center mb-6">
            <img
              src={photoURL || DefaultProfile}
              alt=""
              className="rounded-full w-50 h-50"
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="displayName"
                className="text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                name="displayName"
                id="displayName"
                value={data.value?.displayName}
                onChange={(e) =>
                  handleFieldChange("displayName", e.target.value)
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="text-sm font-medium text-gray-700"
              >
                Jenis Kelamin
              </label>
              <select
                name="gender"
                id="gender"
                value={data.value?.gender}
                onChange={(e) => handleFieldChange("gender", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="birthdate"
                className="text-sm font-medium text-gray-700"
              >
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                value={data.value?.birthdate}
                onChange={(e) =>
                  handleFieldChange("birthdate", e.target.value)
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="text-sm font-medium text-gray-700"
              >
                Umur
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={data.value?.age}
                onChange={(e) => handleFieldChange("age", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Alamat
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={data.value?.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.value?.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;