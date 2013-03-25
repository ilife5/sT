/**
 * Created with IntelliJ IDEA.
 * User: jifeng.yao
 * Date: 13-3-21
 * Time: 下午5:05
 * To change this template use File | Settings | File Templates.
 */

/**
 * 将分析array中的节点，返回domtree，并将dom的名字绑定在相应的对象上
 */
(function () {
    var localObj;

    /**
     * @param obj
     * @param arr
     * treeBuild(obj, ["div#rootId.rootClass[rootName]", ["div#childId.childClass", ["child#grandsonId.grandsonClass", ...]]])
     */
    function build(arr, obj) {
        if(!arr || Object.prototype.toString.call(arr) !== "[object Array]") {
            throw new Error('The frist arguments must be array!');
        }
        if (obj) {
            localObj = obj;
        }
        return treeParse(arr);
    }

    function treeParse(tree) {
        var root = domParse(tree[0]), i = 1;
        if (tree.length > 1) {
            while (tree[i]) {
                domAppend(root, treeParse(tree[i]));
                i++;
            }
        }
        return root;
    }

    function domParse(string) {
        var dom,
            classArr = [];
        string.replace(/^\w+/,function (match) {
            //取出开始的节点名字初始化节点
            dom = document.createElement(match);
            return '';
        }).replace(/#(\w+)/,function () {
                if (arguments.length > 1) {
                    dom.id = arguments[1];
                }
                return '';
            }).replace(/\.(\w+)/g,function () {
                //将className暂时存储在classArr中
                if (arguments.length > 1) {
                    classArr.push(arguments[1]);
                }
                return '';
            }).replace(/\[(\w+)\]/, function () {
                if (arguments.length > 1) {
                    dom.setAttribute('data-name', arguments[1]);
                    if (localObj) {
                        localObj[dom.name] = dom;
                    }
                }
                return '';
            });
        //如果有className，将其赋值给dom.className
        if (classArr.length > 0) {
            dom.className = classArr.join(' ');
        }
        return dom;
    }

    function domAppend(root, child) {
        return root.appendChild(child);
    }

    if (typeof define === 'function') {
        define(function () {
                return {
                    buildTree:build
                };
            }
        );
    } else {
        window.buildTree = build;
    }
})();
