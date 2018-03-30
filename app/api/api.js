function NewsAPI() {

    var API = 'https://newsapi.org/v2/';
    var ENDPOINT_HEADLINES = 'top-headlines';
    var ENDPOINT_EVERYTHING = 'everything';
    var API_KEY = 'c5a59e6e745f45849e2e56af4efad07d';

    this.getNews = function (category) {
        var url = API + ENDPOINT_HEADLINES;
        return $.get(url, {
            'country': 'br',
            'apiKey': API_KEY,
            'category': category
        });
    }

    this.getNewsWithSearch = function (search) {
        var url = API + ENDPOINT_EVERYTHING;
        return $.get(url, {
            'apiKey': API_KEY,
            'q': search
        });
    }
};