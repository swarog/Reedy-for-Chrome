/**
 *
 */
(function(app) {
    var approvedNodes = ['#text', 'IMG'];

    function generateContentNode($item) {
        var nodesList = [];
        // TODO: remove tag name hardcode
        if('IMG' == $item.nodeName) {
            nodesList.push(new app.ContentNode($item));
        } else if('#text' == $item.nodeName) {
            $item.textContent.split(" ").forEach(function (word) {
               nodesList.push(new app.ContentNode(word));
            });
        } else {
            throw TypeError("Unsupported content type");
        }
        return nodesList;
    }

    function parseNode($node, contentList) {
        // TODO: Looks not very good, maybe I should use something different from forEach method, may be something like NodeFilter
        $node.childNodes.forEach(function (item) {
            if(approvedNodes.indexOf(item.nodeName) > -1) {
                generateContentNode(item).forEach(function (contentNode) {
                    contentList.push(contentNode);
                });
            } else if (item.childElementCount > 0) {
                parseNode(item, contentList);
            }
        });
        return contentList;
    }
    app.ContentParser = function ($contentNode) {
        return parseNode($contentNode, []);
    }
})(window.reedy);