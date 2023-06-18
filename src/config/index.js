import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as rtdbRef, set, get } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAO7njJ7q4p3EwBxX9gPIevRNmZwwrSdxE",
  authDomain: "sehati-51810.firebaseapp.com",
  databaseURL: "https://sehati-51810-default-rtdb.firebaseio.com",
  projectId: "sehati-51810",
  storageBucket: "sehati-51810.appspot.com",
  messagingSenderId: "220502512063",
  appId: "1:220502512063:web:aad930e66862197b66910a",
  measurementId: "G-0T2R0MDF2K",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const database = getDatabase(app);

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const storageRef = ref(storage, `profilePhotos/${user.uid}`);
  const userRef = rtdbRef(database, `users/${user.uid}`);

  try {
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      const { email } = user;
      const { displayName, photoFile } = additionalData;

      await set(userRef, {
        displayName,
        email,
        createdAt: new Date().toISOString(),
      });

      if (photoFile) {
        const fileSnapshot = await uploadBytes(storageRef, photoFile);
        const photoURL = await getDownloadURL(fileSnapshot.ref);

        await updateProfile(auth.currentUser, {
          photoURL,
        });
      }
    }
  } catch (error) {
    console.log("Error creating user", error);
  }
};
