var FormWizard = function(el, fields, submitCallback) {

    /**
     * Properties
     */
    var $el = $(el),
        $fields = [];

    /**
     * Treat fields
     */
    this.initializeFields = function() {
        var $this = this;
        for (var i in fields) {
            this.initializeField(i, fields[i]);
        }

        this.btnSubmit = $el.find('.btn-submit');
        this.btnSubmit.click(function() {
            if ($this.allValidate()) {
                submitCallback();
            }
        });
    };

    this.reloadElements = function() {
        for (var i in fields) {
            fields[i].el = $();
        }
    }

    this.reload = function() {
        $fields = [];

        for (var i in fields) {
            this.initializeField(i, fields[i]);
        }
        
        this.validateAllFields();
    }

    this.initializeField = function(field, properties) {
        if (properties.select) {
            $elField = $el.find('select[data-field="'+field+'"]');
        } else {
            $elField = $el.find('input[data-field="'+field+'"], textarea[data-field="'+field+'"]');
        }

        $fields[field] = {
            els: [],
            properties: properties
        }

        for (var i = 0; i < $elField.length; i++) {
            var el = $($elField[i]);
            el.attr('data-index', i);
            
            $fields[field].els.push({
                el: el,
                status: properties.rules ? false : true,
                validator: properties.rules ? new Validator(el, properties.rules) : null
            });
        }

        if (properties.isDate) {
            this.startDatepicker($fields[field]);
        }

        if (properties.mask) {
            _startMask($fields[field], properties.mask, properties.onCompleteMask);
        }

        this.createEvents($fields[field]);
    };

    var _startMask = function(field, mask, onComplete) {
        var options =  {
            onComplete: onComplete ? onComplete : function() {}
        };

        for (var i in field.els) {
            field.els[i].el.mask(mask, options);
        }
    };

    this.startDatepicker = function(field) {
        var $this = this;

        for (var i in field.els) {
            field.els[i].el.datepicker({
                format: 'dd/mm/yyyy',
                language: 'pt-BR',
                orientation: 'bottom left'
            }).on('changeDate', function(e) {
                if (field.els[i].validator) {
                    $this.validateField(field.els[i]);
                }

                $this.verifySubmitEnabled();
    
                if (field.properties) {
                    field.properties.onChangeDate(e);
                }
            });
        }
    };

    this.createEvents = function(field) {
        var $this = this;

        for (var i in field.els) {
            if (field.els[i].el.is('input')) {
                field.els[i].el.on('keyup', function(e) {
                    var f = $fields[$(this).data('field')].els[$(this).data('index')];

                    if (f.validator) {
                        $this.validateField(f, field);
                    }

                    if (field.properties.keyUp) {
                        field.properties.keyUp(e, f);
                    }

                    $this.verifySubmitEnabled();
                });
            } else {
                field.els[i].el.on('change', function(e) {
                    console.log('change');
                    var f = $fields[$(this).data('field')].els[$(this).data('index')];

                    if (f.validator) {
                        $this.validateField(f, field);
                    }

                    if (field.properties.keyUp) {
                        field.properties.keyUp(e, f);
                    }

                    $this.verifySubmitEnabled();
                });
            }
        }
    }

    this.verifySubmitEnabled = function() {
        if (this.allValidate()) {
            this.enableBtnSubmit();
        } else {
            this.disableBtnSubmit();
        }
    }

    this.validateField = function(field, fieldProperties) {
        $this = this;

        field.validator.validate(function(rule, status) {
            field.status = status;
            $this.validateFieldElement(field.el, fieldProperties.properties, rule, status);
        });
    }

    this.validateFieldElement = function(el, properties, rule, status) {
        var formGroup = el.parent();

        if (properties.hasLoading) {
            formGroup = formGroup.parent();
        }

        formGroup.find('.validator-errors span').removeClass('show');

        if (!status) {
            formGroup.find('.validator-errors span[data-error="'+rule.name+'"]').addClass('show');
            formGroup.addClass('has-error');
        } else {
            formGroup.removeClass('has-error').addClass('has-success');
        }
    }

    this.validateAllFields = function() {
        for (var i in $fields) {

            for (var y in $fields[i].els) {
                var field = $fields[i];
                var fieldEl = $fields[i].els[y];
                if (fieldEl.validator) {
                    this.validateField(fieldEl, field);
                } else {
                    console.log("No validator ", i);
                }
            }
        }
    }

    this.allValidate = function() {
        for (var i in $fields) {
            for (var y in $fields[i].els) {
                if (!$fields[i].els[y].status) {
                    return false;
                }
            }
        }

        return true;
    }

    this.setValue = function(fields) {
        for (var i in fields) {
            if ($fields[i]) {
                if ($fields[i].properties.select) {
                    $fields[i].els[0].el.val(fields[i]);
                } else {
                    if ($fields[i].properties.isDate) {
                        $fields[i].els[0].el.datepicker('update', this.getDate(fields[i]));
                        this.validateField($fields[i].els[0], $fields[i]);
                    } else {
                        $fields[i].els[0].el.attr('value', fields[i]);
                    }
                }
            }
        }
    }

    this.getDate = function(date) {
        var dateSplit = date.split('-');
        return new Date(dateSplit[2], dateSplit[1], dateSplit[0]);
    }

    this.setEnabled = function(field, index) {
        if (Array.isArray(field)) {
            for (var i in field) {
                if ($fields[field[i]]) {
                    $fields[field[i]].els[0].el.removeAttr('disabled');
                }
            }
        } else {
            $fields[field].els[index].el.removeAttr('disabled');
        }
    }

    this.setAllEnabled = function() {
        for (var i in $fields) {
            for (var y in $fields[i].els) {
                this.setEnabled(i, y);
            }   
        }
    }

    this.setDisabled = function(field, index) {
        if (Array.isArray(field)) {
            for (var i in field) {
                if ($fields[field[i]]) {
                    $fields[field[i]].els[0].el.attr('disabled', 'disabled');
                }
            }
        } else {
            $fields[field].els[index].el.attr('disabled', 'disabled');
        }
    }

    this.enableBtnSubmit = function() {
        this.btnSubmit.removeAttr('disabled');
    }

    this.disableBtnSubmit = function() {
        this.btnSubmit.attr('disabled', 'disabled');
    }

    this.get = function(field) {
        var ret = [];

        for (var i in $fields[field].els) {
            ret.push($fields[field].els[i].el.val());
        }

        return ret.length == 1 ? ret[0] : ret;
    };

    this.unmask = function(field) {
        return $fields[field].el.unmask();
    }

    this.getCleanValue = function(field) {
        return $fields[field].el.cleanVal();
    }
    

    this.getAll = function() {
        var ret = {};

        for (var i in $fields) {
            ret[i] = $fields[i].els[0].el.val();
        }

        return ret;
    }

    this.showLoading = function(field, index) {
        $fields[field].els[index].el.parent().find('.image-loading').addClass('show fadeIn');
    }

    this.hideLoading = function(field, index) {
        $fields[field].els[index].el.parent().find('.image-loading').removeClass('fadeIn show');
    }

    /**
     * Initialize
     */
    this.init = function() {
        $el.on('submit', function(evt) {
            evt.preventDefault();
        });
        this.initializeFields();
    };

    this.init();
}