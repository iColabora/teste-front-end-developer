angular.module('app').service('Res', ['$rootScope', function ($rootScope) {
    var scope = $rootScope
    scope._scripts = scope._scripts || []
    scope._styles = scope._styles || []
    scope._rawScripts = scope._rawScripts || []
    scope._rawStyles = scope._rawStyles || []

    return {
        style: function (inp) {
            var hrefs = []
            if (typeof inp === 'string') {
                hrefs.push(inp)
            } else {
                hrefs = inp
            }

            scope._styles = []
            for (var i in hrefs) {
                console.log('styling page with ' + hrefs[i])
                var style = document.createElement('link')
                if (!/^https?\:\/\//.test(hrefs[i])) {
                    style.type = 'text/css'
                }
                style.href = hrefs[i]
                style.rel = 'stylesheet'

                if (scope._rawStyles === undefined) {
                    scope._rawStyles = []
                }
                scope._rawStyles.push([hrefs[i], style])
                scope._styles.push(document.head.appendChild(style))

                scope.$on('$destroy', this.clean_styles)
            }
        },

        clean_styles: function () {
            var removables = []
            for (var key in scope._rawStyles) {
                console.log('deleting style ' + scope._rawStyles[key][0])
                scope._styles[key].parentNode.removeChild(scope._rawStyles[key][1])
                removables.push(key)
            }

            scope._styles = scope._styles.filter(function (v) { return (removables.indexOf(v) !== -1)? true: false })
            scope._rawStyles = scope._rawStyles.filter(function (v) { return (removables.indexOf(v) !== -1)? true: false })
        },

        script: function (inp) {
            var hrefs = []
            if (typeof inp === 'string') {
                hrefs.push(inp)
            } else {
                hrefs = inp
            }

            scope._scripts = []
            for (var i in hrefs) {
                console.log('loading javascript: ' + hrefs[i])
                var script = document.createElement('script')
                if (!/^https?\:\/\//.test(hrefs[i])) {
                    script.type = 'text/javascript'
                }
                script.src = hrefs[i]

                if (scope._rawScripts === undefined) {
                    scope._rawScripts = []
                }
                scope._rawScripts.push([hrefs[i], script])
                scope._scripts.push(document.head.appendChild(script))

                scope.$on('$destroy', this.clean_scripts)
            }
        },

        clean_scripts: function () {
            var removables = []
            for (var key in scope._rawScripts) {
                console.log('deleting script ' + scope._rawScripts[key][0])
                scope._scripts[key].parentNode.removeChild(scope._rawScripts[key][1])
                removables.push(key)
            }

            scope._scripts = scope._scripts.filter(function (v) { return (removables.indexOf(v) !== -1)? true: false })
            scope._rawScripts = scope._rawScripts.filter(function (v) { return (removables.indexOf(v) !== -1)? true: false })
        }

    }
}])