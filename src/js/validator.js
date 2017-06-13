var Validator = function (field, rulesValidate){
    
    var rules = {
        required: function(opt) {
            if (field.is("select")) {
                return field.val() != '-1' && field.val() != '' && field.val() != null && field.val() != 'null';
            } else if (field.is("input") || field.is("textarea")) {
                return field.val().length > 0;
            }
        },
        max: function(opt) {
            return field.val().length <= opt;
        },
        min: function(opt) {
            return field.val().length >= opt;
        }
    };

    var rulesFields = [];

    var init = function() {
        var opts = rulesValidate.split('|');
        for (var i in opts) {
            var sub = opts[i].split(':');
            rulesFields[sub[0]] = {
                name: sub[0],
                opt: sub[1]
            };
        }
    }

    this.validate = function(callback) {
        for (var i in rulesFields) {
            var rule = rulesFields[i];

            if (!(rules[rule.name] && rules[rule.name](rule.opt))) {
                callback(rule, false);
                return;
            }
        }

        callback({}, true);
    }

    init();

}