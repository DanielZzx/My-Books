function bookValidation(fileName, user) {
  const bookFile = user.book.file;
  if (fileName === bookFile) {
    console.log("Esse livro ja foi adicionado!");
  }
}
