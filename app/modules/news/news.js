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

        var cardContainer = $('<div>').addClass('col-sm-6 col-md-6 col-lg-4 mt-4');
        var card = $('<div>').addClass('card card-inverse card-info');

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
                        .addClass('card-img-top')
                );
            } else {
                return card.append(
                    $('<img>')
                        .attr('data-src', '/assets/img/noimage.png')
                        .attr('alt', article.title)
                        .addClass('card-img-top')
                );
            }
            return card;
        }

        function addBodyTitle(card) {
            return card.append(
                $('<div>')
                    .addClass('card-block')
                    .append($('<h5>').addClass('card-title mt-3').append(article.title))
            );
        }

        function addBodyActions(card) {
            return card.append(
                $('<div>')
                    .addClass('card-footer row')
                    .append($('<h6>').addClass('card-text col-6 col-sm-6 col-lg-6')
                    .append(moment(article.publishedAt).fromNow()))
                    .append($('<button>').append('Read Article').addClass('btn btn-danger col-6 col-sm-6 col-lg-6 btn-sm').attr('type', 'button'))
                    .click(function () {
                        window.open(article.url, '_blank');
                    })
            );
        }

    };

    initializeNews();

})();