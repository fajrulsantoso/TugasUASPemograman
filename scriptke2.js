// const belum_selesai = "belum_selesai";
// const selesai = "selesai";

const inputForm = document.getElementById("inputBook");
window.addEventListener("load", function () {
  refresh();
});

// menampilkan data
function refresh() {
    fetch("https://apem.webakb.com/rest/tampilsemuapgw.php", {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    // Handle success
    .then((response) => response.json()) //convert to json
    .then((isiData) => {
      isiData.data.forEach((post) => {
        console.log(post);
        const inputBookIsComplete = post.isComplete;
       
        const idBook = post.kode_buku;

        const judulBuku = document.createElement("h1");
        judulBuku.innerHTML = post.nama;

        const penulisBuku = document.createElement("p");
        penulisBuku.innerHTML += post.penulis;

        const jenisBuku = document.createElement("p");
        jenisBuku.innerHTML += post.jenis;

        const tahunBuku = document.createElement("p");
        tahunBuku.innerHTML += post.tahun;

        const untukButton = aksiTambahbutton(inputBookIsComplete, idBook);
        untukButton.classList.add("action");

        const textContainer = document.createElement("article");
        textContainer.setAttribute("id", idBook);
        textContainer.classList.add("book_item");

        textContainer.append (judulBuku, penulisBuku, jenisBuku, tahunBuku, untukButton);
        if (inputBookIsComplete==1) {
          document.getElementById("selesai").append(textContainer);
        } else {
          document.getElementById("belum_selesai").append(textContainer);
        }
      });
    }) // print data to console
    .catch((err) => console.log(err)); // Catch errors
}

//tambah data
document.addEventListener("DOMContentLoaded", function () {
    inputForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const idBook = +new Date();
        const inputBookTitle = document.getElementById("inputBookTitle").value;
        const inputBookAuthor = document.getElementById("inputBookAuthor").value;
         const inputBookJenis = document.getElementById("inputBookJenis").value;
        const inputBookYear = document.getElementById("inputBookYear").value;
        const inputBookIsComplete = document.getElementById(
            "inputBookIsComplete"
        ).checked;
        let status = 0;
        if (inputBookIsComplete == true) {
            status = 1;
        } else {
            status = 0;
        }
        
        fetch("https://apem.webakb.com/rest/tambahpgw.php", {
            method: "POST",
            mode: "cors",
            body:
                "kode_buku=" +
                idBook +
                "&nama=" +
                inputBookTitle +
                 "&jenis=" +
                 inputBookJenis +
                "&penulis=" +
                inputBookAuthor +
                "&tahun=" +
                inputBookYear +
                "&isComplete=" +
                status,
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded" },
        }).then((response) => {
            window.location.reload();
        });
    });
  });

