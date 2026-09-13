class Github {

    async loadRandomRepository(language, mockData) {
        let totalRepositories = await this.countRepositories(language, mockData);
        totalRepositories = totalRepositories > 1000 ? 1000 : totalRepositories;
        const randomRepositoryIndex = Math.floor(Math.random() * totalRepositories) + 1;
        let url = encodeURI(`https://api.github.com/search/repositories?q=language:${language}&per_page=1&page=${randomRepositoryIndex}`);
        if (mockData) {
            url = encodeURI('./js/mock_data/github.json');
        }
        return fetch(url)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o repositório aleatório.');
                }
                return (await response.json()).items[0];
            });
    }

    async countRepositories(language, mockData) {
        let url = encodeURI('./js/mock_data/github_count.json');
        if (!mockData) {
            url = encodeURI(`https://api.github.com/search/repositories?q=language:${language}&per_page=1`);
        }
        const data = await fetch(url)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Erro ao computar a quantidade de repositórios.');
                }
                return await response.json();
            });
        return data.total_count;
    }
}

export default new Github();