const book = document.getElementById("input-pdf");
const form = document.querySelector(".add-books");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const file = book.files[0];

  const formData = new FormData();
  formData.append("pdf", file);
  formData.append("owner", localStorage.getItem("userId"));

  fetch("/books", {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderPdfThumbnail(file, data.book.pdfPath);
    })
    .catch((error) => {
      console.error("Erro ao enviar livro!", error.message);
    });
});

function renderPdfThumbnail(file, savedFileName) {
  const fileUrl = URL.createObjectURL(file); //cria um link temporarario
  const loadingTask = pdfjsLib.getDocument(fileUrl);
  loadingTask.promise.then((pdf) => {
    pdf.getPage(1).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page
        .render({
          canvasContext: context,
          viewport: viewport,
        })
        .promise.then(() => {
          const img = document.createElement("img");
          img.src = canvas.toDataURL("image/png");
          img.style.width = "150px";
          img.style.cursor = "pointer";
          img.style.margin = "10px";

          img.addEventListener("click", () => {
            window.open(`/uploads/${savedFileName}`, "_blank");
          });
          document.querySelector(".my-books").appendChild(img);
        });
    });
  });
}
