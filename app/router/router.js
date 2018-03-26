function RouterState() {

    this.go = function (stateName) {
        window.history.pushState(stateName, '', '/#/' + stateName);
    };

    this.onChangeBrowserHistory = function(callback){
        window.onpopstate = function(event){
            var state = event.state;
            callback(state);
        };
    };

};