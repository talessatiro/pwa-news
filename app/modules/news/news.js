(function () {
    'use strict';

    var search = null;
    var newsAPI = new NewsAPI();
    var router = new RouterState();

    function initializeNews() {
        // Set function callback
        router.onChangeBrowserHistory(activeMenu);

        // Load category
        var splitedUrl = window.location.href.split('/');
        var category = splitedUrl[splitedUrl.length - 1];
        activeMenu(category);
    }

    $('.menu-list li').click(function () {
        var listElement = $(this);
        var state = listElement.find('a').data('state');
        router.go(state);
        activeMenu(state);
    });

    $("#search").keypress(function (event) {
        if (event.which == 13) {
            var search = $(this).val();
            if (search) {
                newsAPI.getNewsWithSearch(search).then(success);
            } else {
                newsAPI.getNews().then(success);
            }
        }
    });

    function activeMenu(category) {
        search = null;
        var identifier = category ? category : 'headline';
        $("#search").val('');
        $('li.active').removeClass('active');
        $('#' + identifier).addClass('active');
        newsAPI.getNews(category).then(success);
    }

    function success(data) {
        var divNews = $('#news');
        divNews.empty();
        for (var i = 0; i < data.articles.length; ++i) {
            divNews.append(getNewsHtml(data.articles[i]));
        }
        initLazyLoadingImg();
    }

    function initLazyLoadingImg(){
        // To initialize all elements matching img[data-src]
        $(window).lazyLoadXT();
    }


    function getNewsHtml(article) {

        var cardContainer = $('<div>').addClass('col-xm-12 col-sm-6 col-md-4 col-lg-3 my-2');
        var card = $('<div>').addClass('card');

        card = addImage(card);
        card = addBodyTitle(card);
        card = addBodyActions(card);

        return cardContainer.append(card);

        function addImage(card) {
            if (article.urlToImage) {
                return card.append(
                    $('<img>')
                        .attr('data-src', article.urlToImage)
                        .attr('alt', article.title)
                        .attr('width', 100)
                        .attr('height', 170)
                        .addClass('card-img-top')
                );
            } else {
                return card.append(
                    $('<img>')
                        .attr('data-src', '/assets/img/noimage.png')
                        .attr('alt', article.title)
                        .attr('width', 100)
                        .attr('height', 170)
                        .addClass('card-img-top')
                );
            }
            return card;
        }

        function addBodyTitle(card) {
            return card.append(
                $('<div>')
                    .addClass('card-body pt-3 pl-3 pr-3 pb-5')
                    .append($('<h5>').addClass('card-title mt-2 mb-3').append(article.title))
                    .append($('<h6>').addClass('card-subtitle mb-2 text-muted')
                        .append(moment(article.publishedAt).fromNow()))
                    .append($('<p>').addClass('card-text hidden-md-down').append(article.description))
            );
        }

        function addBodyActions(card) {
            return card.append(
                $('<div>')
                    .addClass('card-body center-link mx-auto')
                    .append($('<button>').append('Read Article').addClass('btn btn-link read-article-button').attr('type', 'button'))
                    .click(function () {
                        window.open(article.url, '_blank');
                    })
            );
        }

    };

    initializeNews();

})();