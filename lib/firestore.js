import firebase, { firestore } from "./firebase";

const bookmarks = firestore.collection("bookmarks");

export async function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function addBookmark(uid, data) {
  await bookmarks.add({ uid, ...data });
}

export async function fetchBookmarks({ uid }) {
  const snapshots = await firestore
    .collection("bookmarks")
    .where("uid", "==", uid)
    .get();

  let bookmarks = [];
  snapshots.forEach((doc) => {
    if (doc.exists) {
      bookmarks.push({ id: doc.id, ...doc.data() });
    }
  });

  console.log(bookmarks);
  return bookmarks;
}
