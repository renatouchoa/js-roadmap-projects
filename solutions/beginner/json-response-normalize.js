function getPublishedArticles(response) {
    return response.data.filter(article => article.status === 'published');
}

function toArticleSummary(article) {
    return {
        id: article.id,
        title: article.title,
        authorName: article.author.name,
        views: article.stats.views,
    };
}

function normalizeArticles(response) {
    return getPublishedArticles(response).map(article => toArticleSummary(article));
}


// Sample checks...

const apiResponse = {
    data: [
        {
            id: 'a1',
            title: 'Learning JavaScript',
            status: 'published',
            author: { name: 'Ava Stone' },
            stats: { views: 1200 },
        },
        {
            id: 'a2',
            title: 'Draft Notes',
            status: 'draft',
            author: { name: 'Noah Kim' },
            stats: { views: 50 },
        },
        {
            id: 'a3',
            title: 'Async Basics',
            status: 'published',
            author: { name: 'Mina Patel' },
            stats: { views: 900 },
        },
    ],
    meta: {
        total: 3,
    },
};

console.log(normalizeArticles(apiResponse));
console.log(getPublishedArticles(apiResponse).length);
console.log(toArticleSummary(apiResponse.data[0]));

// Expected output:

/*

[
  { id: "a1", title: "Learning JavaScript", authorName: "Ava Stone", views: 1200 },
  { id: "a3", title: "Async Basics", authorName: "Mina Patel", views: 900 }
]
2
{ id: "a1", title: "Learning JavaScript", authorName: "Ava Stone", views: 1200 }

*/