(function(app) {
    app.ContentNode = function (node) {
        this.content = this.extractContent(node);
        this.complexity = this.parseComplexity(this.content);
    };

    app.ContentNode.prototype.extractContent = function (node) {
        return node;
    }

    app.ContentNode.prototype.parseComplexity = function (content) {
        return null;
    }

    app.ContentNode.prototype.getContent = function () {
        return this.content;
    }

    app.ContentNode.prototype.getComplexity = function () {
        return this.complexity;
    }
})(window.reedy);