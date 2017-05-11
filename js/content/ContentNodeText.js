/**
 * Created by aleksandrfomin on 04/03/2017.
 */

(function(app) {
    app.ContentNodeText = function ($item) {
        app.ContentNode.apply(this, arguments);
    };

    app.ContentNodeText.prototype = Object.create(app.ContentNode.prototype);
    app.ContentNodeText.prototype.constructor = app.ContentNodeText;
    app.ContentNodeText.prototype.extractContent = function ($node) {
        return $node.textContent;
    }
    app.ContentNodeText.prototype.parseComplexity = function (content) {
        return app.advancedParser(content);
    }
})(window.reedy);