const login = () => {
  formLogin.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const body = {
      user: userLogin.value,
      password: passwordLogin.value,
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw Error(errorData.message);
        }
        return response.json({});
      })
      .then(async (data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("error ao tentar logar", error.message);
      });
  });
};

login();
