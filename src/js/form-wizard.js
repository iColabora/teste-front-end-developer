var FormWizard = function(el, fields) {

    /**
     * Properties
     */
    var $el = $(el),
        $fields = [];

    /**
     * Treat fields
     */
    var _initializeFields = function() {
        for (var i in fields) {
            _initializeField(i, fields[i]);
        }
    };

    var _initializeField = function(field, properties) {
        $elField = $el.find('input[name="'+field+'"]');
        $fields[field] = {
            el: $elField
        }
        
        if (properties.rules) {
            $fields[field].el.attr('data-toggle', 'tooltip');
            $fields[field].el.attr('data-placement', 'top');
            $fields[field].validator = new Validator($elField, properties.rules);
        }

         _createEvents($fields[field]);

        if (properties.isDate) {
            _startDatepicker($fields[field]);
        }

        if (properties.mask) {
            _startMask($fields[field], properties.mask);
        }
    };

    var _startMask = function(field, mask) {
        field.el.mask(mask);
    };

    var _startDatepicker = function(field) {
        field.el.datepicker({
            format: 'dd/mm/yyyy',
            language: "pt-BR"
        });
    };

    var _createEvents = function(field) {
        field.el.on('keyup', function() {
            _validateField($fields[$(this).attr('name')]);
        });
    }

    var _validateField = function(field) {
        field.validator.validate(function(rule, status) {
            if (!status) {
                field.el.attr('title', rule.name);
                field.el.tooltip('show');
                field.tooltip = true;
            } else {
                if (field.tooltip) {
                    field.tooltip = false;
                    field.el.tooltip('destroy');   
                }
            }
        });
    }

    /**
     * Initialize
     */
    this.init = function() {
        _initializeFields();
    };

    this.init();
}