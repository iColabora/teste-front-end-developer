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

    this.initializeField = function(field, properties) {
        if (properties.select) {
            $elField = $el.find('select[name="'+field+'"]');
        } else {
            $elField = $el.find('input[name="'+field+'"]');
        }

        $fields[field] = {
            el: $elField,
            properties: properties,
            status: properties.rules ? false : true
        }
        
        if (properties.rules) {
            $fields[field].validator = new Validator($elField, properties.rules);
        }

         this.createEvents($fields[field]);

        if (properties.isDate) {
            this.startDatepicker($fields[field]);
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

    this.startDatepicker = function(field) {
        var $this = this;

        field.el.datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR',
            orientation: 'bottom left'
        }).on('changeDate', function(e) {
            if (field.validator) {
                $this.validateField(field);
            }

            $this.verifySubmitEnaled();
   
            if (field.properties) {
                field.properties.onChangeDate(e);
            }
        });
    };

    this.createEvents = function(field) {
        var $this = this;

        field.el.on('keyup', function(e) {
            if (field.validator) {
                $this.validateField($fields[$(this).attr('name')]);
            }

            if (field.properties.keyUp) {
                field.properties.keyUp(e, field);
            }

            $this.verifySubmitEnaled();
        });
    }

    this.verifySubmitEnaled = function() {
        if (this.allValidate()) {
            this.enableBtnSubmit();
        } else {
            this.disableBtnSubmit();
        }
    }

    this.validateField = function(field) {
        field.validator.validate(function(rule, status) {
            field.status = status;

            var formGroup = field.el.parent();

            if (field.properties.hasLoading) {
                formGroup = formGroup.parent();
            }

            formGroup.find('.validator-errors span').removeClass('show');

            if (!status) {
                formGroup.find('.validator-errors span[data-error="'+rule.name+'"]').addClass('show');
                formGroup.addClass('has-error');
            } else {
                formGroup.removeClass('has-error').addClass('has-success');
            }
        });
    }

    this.validateAllFields = function() {
        for (var i in $fields) {
            if ($fields[i].validator) {
                this.validateField($fields[i]);
            } else {
                console.log(i);
            }
        }
    }

    this.allValidate = function() {
        for (var i in $fields) {
            if (!$fields[i].status) {
                return false;
            }
        }

        return true;
    }

    this.setValue = function(fields) {
        for (var i in fields) {
            if ($fields[i]) {
                if ($fields[i].properties.select) {
                    $fields[i].el.val(fields[i]);
                } else {
                    if ($fields[i].properties.isDate) {
                        $fields[i].el.datepicker('update', this.getDate(fields[i]));
                        this.validateField($fields[i]);
                    } else {
                        $fields[i].el.attr('value', fields[i]);
                    }
                }
            }
        }
    }

    this.getDate = function(date) {
        var dateSplit = date.split('-');
        return new Date(dateSplit[2], dateSplit[1], dateSplit[0]);
    }

    this.setEnabled = function(fields) {
        for (var i in fields) {
            if ($fields[fields[i]]) {
                $fields[fields[i]].el.removeAttr('disabled');
            }
        }
    }

    this.setAllEnabled = function() {
        for (var i in $fields) {
            $fields[i].el.removeAttr('disabled');
        }
    }

    this.setDisabled = function(fields) {
        for (var i in fields) {
            if ($fields[fields[i]]) {
                $fields[fields[i]].el.attr('disabled', 'disabled');
            }
        }
    }

    this.enableBtnSubmit = function() {
        this.btnSubmit.removeAttr('disabled');
    }

    this.disableBtnSubmit = function() {
        this.btnSubmit.attr('disabled', 'disabled');
    }

    this.get = function(field) {
        return $fields[field].el.val();
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
            ret[i] = $fields[i].el.val();
        }

        return ret;
    }

    this.showLoading = function(field) {
        $fields[field].el.parent().find('.image-loading').addClass('show fadeIn');
    }

    this.hideLoading = function(field) {
        $fields[field].el.parent().find('.image-loading').removeClass('fadeIn show');
    }

    /**
     * Initialize
     */
    this.init = function() {
        this.initializeFields();
    };

    this.init();
}