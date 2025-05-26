const editarBtn = document.getElementById("editarBtn");
const turmasContainer = document.getElementById("turmasContainer");

let modoEdicaoAtivo = false;

editarBtn.addEventListener("click", () => {
  modoEdicaoAtivo = !modoEdicaoAtivo;

  if (modoEdicaoAtivo) {
    editarBtn.textContent = "salvar";
    ativarModoEdicao();
    adicionarBotaoAdicionar();
  } else {
    editarBtn.textContent = "editar";
    removerModoEdicao();
    removerBotaoAdicionar();
  }
});

function ativarModoEdicao() {
  const botoes = turmasContainer.querySelectorAll(".botao:not(#adicionarTurma)");

  botoes.forEach((botao) => {
    botao.addEventListener("click", editarTurma);
  });
}

function removerModoEdicao() {
  const botoes = turmasContainer.querySelectorAll(".botao:not(#adicionarTurma)");

  botoes.forEach((botao) => {
    botao.removeEventListener("click", editarTurma);
  });
}

function editarTurma(e) {
  const acao = prompt(
    `Você quer editar ou excluir a turma "${e.target.textContent}"?\nDigite:\nnão para editar\nsim para excluir`
  );

  if (acao === "não") {
    let novoNome = null;

    do {
      novoNome = prompt("Novo nome da turma:", e.target.textContent);
      if (novoNome === null) {
        return; // cancelou edição
      }
      novoNome = novoNome.trim();
      if (novoNome === "") {
        alert("O nome da turma não pode ser vazio.");
        continue;
      }

      // Verifica se já existe outro botão com esse nome (case insensitive), exceto ele mesmo
      const botoes = turmasContainer.querySelectorAll(".botao:not(#adicionarTurma)");
      let existe = false;
      for (const botao of botoes) {
        if (
          botao !== e.target &&
          botao.textContent.toLowerCase() === novoNome.toLowerCase()
        ) {
          alert("Já existe uma turma com esse nome.");
          existe = true;
          break;
        }
      }

      if (!existe) break; // nome válido, sai do loop
    } while (true);

    e.target.textContent = novoNome;
  } else if (acao === "sim") {
    const confirmar = confirm("Tem certeza que deseja excluir esta turma?");
    if (confirmar) {
      e.target.remove();
    }
  }
}

function adicionarBotaoAdicionar() {
  if (!document.getElementById("adicionarTurma")) {
    const btn = document.createElement("button");
    btn.id = "adicionarTurma";
    btn.className = "botao";
    btn.textContent = "+";

    btn.addEventListener("click", () => {
      let nome = null;

      do {
        nome = prompt("Nome da nova turma:");
        if (nome === null) {
          return; // usuário cancelou
        }
        nome = nome.trim();

        if (nome === "") {
          alert("O nome da turma não pode ser vazio.");
          continue;
        }

        const botoes = turmasContainer.querySelectorAll(".botao:not(#adicionarTurma)");
        let existe = false;
        for (const botao of botoes) {
          if (botao.textContent.toLowerCase() === nome.toLowerCase()) {
            alert("Já existe uma turma com esse nome.");
            existe = true;
            break;
          }
        }
        if (!existe) break; // nome válido
      } while (true);

      const novoBotao = document.createElement("button");
      novoBotao.className = "botao";
      novoBotao.textContent = nome;
      if (modoEdicaoAtivo) {
        novoBotao.addEventListener("click", editarTurma);
      }

      const editarBtn = document.getElementById("editarBtn");
      turmasContainer.insertBefore(novoBotao, editarBtn);
    });

    const editarBtn = document.getElementById("editarBtn");
    turmasContainer.insertBefore(btn, editarBtn);
  }
}

function removerBotaoAdicionar() {
  const botaoAdicionar = document.getElementById("adicionarTurma");
  if (botaoAdicionar) {
    botaoAdicionar.remove();
  }
}

