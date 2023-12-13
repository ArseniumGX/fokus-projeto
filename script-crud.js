const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");

const storage = localStorage.getItem("tarefas");
const tarefas = storage ? JSON.parse(storage) : [];

btnAdicionarTarefa.addEventListener("click", () =>
	formAdicionarTarefa.classList.toggle("hidden")
);

formAdicionarTarefa.addEventListener("submit", (e) => {
	e.preventDefault();
	const tarefa = {
		descricao: textArea.value
	};
	tarefas.push(tarefa);
	localStorage.setItem("tarefas", JSON.stringify(tarefas));
});
