const inputUser = document.getElementById("input-user");
const inputPassword = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-confirm");
const buttonSubmit = document.getElementById("submitButton");
const elementError = document.getElementById("errorMessage");
const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");
const userLogin = document.querySelector(".login-user");
const passwordLogin = document.querySelector(".login-password");

const verify = () => {
  inputUser.addEventListener("input", () => {
    buttonSubmit.disabled = inputUser.value.trim() === "";
  });
};

/* 
  Crição de usuario 
*/
const register = () => {
  formRegister.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const body = {
      user: inputUser.value,
      password: inputPassword.value,
      confirmPassword: confirmPassword.value,
    };

    fetch("/register", {
      // fetch forma comum de enviar dados do front para back

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), //envia os dados do body como JSON
    })
      .then(async (response) => {
        //response e a resposta do servidor ex: 200 ou 404
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message); //lança um erro direto para o catch
        }
        //converte a resposta para json
        return response.json();
      })
      .then((data) => {
        //data é o resultado do response (informacao dentro de response)
        console.log(data);
        localStorage.setItem("userId", data.userId);
        window.location.href = "/books";
      })
      .catch((error) => {
        elementError.textContent = error.message;
        console.error("Erro ao tentar registrar!", error.message);
      });
  });
};

verify();
register();
