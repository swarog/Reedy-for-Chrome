/**
 * Created by aleksandrfomin on 18/02/2017.
 */

(function(app) {
    app.ContentNode = function (node) {
        this.content = node;
    };
    app.ContentNode.prototype.getContent = function () {
        return this.content;
    }
})(window.reedy);