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
        if (properties.select) {
            $elField = $el.find('select[name="'+field+'"]');
        } else {
            $elField = $el.find('input[name="'+field+'"]');
        }

        $fields[field] = {
            el: $elField,
            properties: properties
        }
        
        if (properties.rules) {
            $fields[field].validator = new Validator($elField, properties.rules);
        }

         _createEvents($fields[field]);

        if (properties.isDate) {
            _startDatepicker($fields[field]);
        }

        if (properties.mask) {
            _startMask($fields[field], properties.mask, properties.onCompleteMask);
        }
    };

    var _startMask = function(field, mask, onComplete) {
        var options =  {
            onComplete: onComplete ? onComplete : function() {}
        };
        field.el.mask(mask, options);
    };

    var _startDatepicker = function(field) {
        field.el.datepicker({
            format: 'dd/mm/yyyy',
            language: "pt-BR"
        });
    };

    var _createEvents = function(field) {
        field.el.on('keyup', function() {
            if (field.validator) {
                _validateField($fields[$(this).attr('name')]);
            }
        });
    }

    var _validateField = function(field) {
        field.validator.validate(function(rule, status) {
            var formGroup = field.el.parent();

            formGroup.find('.validator-errors span').removeClass('show');

            if (!status) {
                formGroup.find('.validator-errors span[data-error="'+rule.name+'"]').addClass('show');
                formGroup.addClass('has-error');
            } else {
                formGroup.removeClass('has-error').addClass('has-success');
            }
        });
    }

    this.setValue = function(fields) {
        for (var i in fields) {
            if ($fields[i]) {
                if ($fields[i].properties.select) {
                    $fields[i].el.val(fields[i]);
                } else {
                    $fields[i].el.attr('value', fields[i]);
                }
            }
        }
    }

    this.setEnabled = function(fields) {
        for (var i in fields) {
            if ($fields[fields[i]]) {
                $fields[fields[i]].el.removeAttr('disabled');
            }
        }
    }

    this.setDisabled = function(fields) {
        for (var i in fields) {
            if ($fields[fields[i]]) {
                $fields[fields[i]].el.attr('disabled', 'disabled');
            }
        }
    }

    /**
     * Initialize
     */
    this.init = function() {
        _initializeFields();
    };

    this.init();
}