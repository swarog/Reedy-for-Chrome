/**
 *
 */
(function(app) {
    var approvedNodes = ['#text', 'IMG'];

    function cleanUpTextAdvanced(text) {
        // TODO: figure out which of this text cleans is useful and remove the rest
        var NL = '~NL'+(+(new Date())+'').slice(-5)+'NL~';
        return text
            .trim()
            .replace(/\n|\r/gm, NL)
            .replace(/\s+/g, ' ')
            .replace(new RegExp('\\s*' + NL + '\\s*', 'g'), NL)                     // `      \n    `
            .replace(/‐/g, '-')                                                 // short dash will be replaced with minus
            .replace(/ \- /g, ' — ')                                            // replace minus between words with em dash
            .replace(/–|−|―/g, '—')                                             // there are 5 dash types. after the cleaning only 2 will remain: minus and em dash
            .replace(/[-|—]{2,}/g, '—')                                         // `--` | `------`
            .replace(new RegExp('( |^|' + NL + ')([([«]+) ', 'g'), '$1$2')          // `сюжет ( видео`
            .replace(new RegExp(' ([)\\].,!?;»]+)( |$|' + NL + ')', 'g'), '$1$2')   // `вставка ) отличный` | `конечно ...` | ` , ` | ` .\n`
            .replace(/\.{4,}/g, '...')                                         // `.......`
            .replace(/([!?]{3})[!?]+/g, '$1')                                   // `неужели!!!!!???!!?!?`
            .replace(new RegExp(NL, 'g'), '\n');
    }

    function generateContentNode($item) {
        var nodesList = [];
        // TODO: remove tag name hardcode
        if('IMG' == $item.nodeName) {
            nodesList.push(new app.ContentNode($item));
        } else if('#text' == $item.nodeName) {
           nodesList.push(new app.ContentNodeText($item));
        } else {
            throw TypeError("Unsupported content type");
        }
        return nodesList;
    }

    function parseNode($node, contentList) {
        // TODO: Looks not very good, maybe I should use something different from forEach method, may be something like NodeFilter
        if($node.childNodes == undefined) return contentList;
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