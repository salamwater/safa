import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref as dbRef, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

const firebaseConfig = {
  // your config here
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

const gallery = document.getElementById('gallery');
const imageFileInput = document.getElementById('image-file');
const uploadImageBtn = document.getElementById('upload-image-btn');

uploadImageBtn.addEventListener('click', async () => {
  const file = imageFileInput.files[0];
  if (!file) {
    alert('Please select an image first!');
    return;
  }

  const storageReference = storageRef(storage, 'images/' + Date.now() + '-' + file.name);
  await uploadBytes(storageReference, file);
  const downloadURL = await getDownloadURL(storageReference);

  const newImageRef = push(dbRef(database, 'images'));
  set(newImageRef, { url: downloadURL });

  alert('Image uploaded successfully!');
  imageFileInput.value = ''; // Clear input
});

// Display gallery images
function loadGallery() {
  const imagesRef = dbRef(database, 'images');
  onValue(imagesRef, (snapshot) => {
    gallery.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
      const imageData = childSnapshot.val();
      const imageKey = childSnapshot.key;
      
      const img = document.createElement('img');
      img.src = imageData.url;
      img.style.display = 'none'; // Hide initially
      gallery.appendChild(img);

      if (isAdmin) {
        const delBtn = document.createElement('button');
        delBtn.innerText = "Delete";
        delBtn.onclick = () => deleteImage(imageKey, imageData.url);
        gallery.appendChild(delBtn);
      }
    });
  });
}

// Delete Image
async function deleteImage(key, url) {
  if (confirm("Delete this image?")) {
    // Delete from Database
    await remove(dbRef(database, 'images/' + key));
    
    // Delete from Storage
    const fileRef = storageRef(storage, getPathFromURL(url));
    await deleteObject(fileRef);

    alert('Image deleted successfully!');
  }
}

// Helper: Extract path from URL
function getPathFromURL(url) {
  const base = "https://firebasestorage.googleapis.com/v0/b/";
  const parts = url.replace(base, "").split("?")[0].split("/");
  return decodeURIComponent(parts.slice(1).join("/"));
}

// Load gallery
let isAdmin = false;
loadGallery();

// Admin access (tap footer 5 times + password)
const footer = document.getElementById('footer');
let tapCount = 0;

footer.addEventListener('click', () => {
  tapCount++;
  if (tapCount >= 5) {
    const password = prompt("Enter admin password:");
    if (password === "654321") {
      document.getElementById('admin-panel').classList.remove('hidden');
      isAdmin = true;
      loadGallery();
    } else {
      alert('Wrong password!');
    }
    tapCount = 0;
  }
});

// Submit Rating
window.submitRating = function (stars) {
  const ratingsRef = dbRef(database, 'ratings');
  push(ratingsRef, { rating: stars });
  alert('Thanks for your rating!');
};
