import selector from "./selector.js";
import message from "./message.js";
import github from "./github.js";
import repo from "./repo.js";

const MOCK_DATA = false;

window.addEventListener('load', async (e) => {
    message.waiting();
    repo.hide();
    selector.fetch(selectedLanguage => {
        message.loading();
        github.loadRandomRepository(selectedLanguage, MOCK_DATA)
            .then(repositotory => {
                message.none();
                repo.fetch(repositotory);
            })
            .catch(e => {
                message.fail();
                repo.hide();
            });
    });
});