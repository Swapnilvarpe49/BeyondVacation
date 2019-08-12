var mobileNoPattern = /^[7-9]*$/;
var emailIdPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//var carRegistrationNoPattern = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/g //MH 01 OP 1111
var carRegistrationNoPattern = /^[A-Z]{2}[0-9]{4}$/;
var specialCharactersPattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/;
var hyphenSeperatedDateFormatPattern = /[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
var DatePattern = /Date\(([^)]+)\)/;

//test
var Common = {

    GetDateDiffInMonth: function (fn_day, fn_month, fn_year) {

        fn_month = (parseInt(fn_month) - 1)

        var date1 = new Date(fn_year, fn_month, fn_day);
        var date2 = new Date();
        // var date2 = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        //date2.setMonth(date2.getMonth() + 1);

        var diffYears = date2.getFullYear() - date1.getFullYear();
        var diffMonths = date2.getMonth() - date1.getMonth();
        var diffDays = date2.getDate() - date1.getDate();

        var months = (diffYears * 12 + diffMonths);
        if (diffDays > 0) {
            months += '.' + diffDays;
        } else if (diffDays < 0) {
            months--;
            months += '.' + (new Date(date2.getFullYear(), date2.getMonth(), 0).getDate() + diffDays);
        }

        // alert(months);

        var a = months;

        return a.toString().split(".")[0];

    },

    GetDateCompare: function (Date1, Date2) {


        var firstValue = Date1.split('-');
        var secondValue = Date2.split('-');

        // Year          month              day
        var firstDate = new Date(firstValue[2], (firstValue[1] - 1), firstValue[0]);
        //firstDate.setFullYear(firstValue[0], (firstValue[1] - 1), firstValue[2]);

        //var first = firstDate.getDate(firstValue[0], (firstValue[1] - 1), firstValue[2]);
        var secondDate = new Date(secondValue[2], (secondValue[1] - 1), secondValue[0]);
        //secondDate.setFullYear(secondValue[0], (secondValue[1] - 1), secondValue[2]);

        if (firstDate < secondDate) {

            return -1;
        }
        else if (firstDate.getTime() == secondDate.getTime()) {
            return 0;
        }
        else {
            return 1;
        }

    },

    NumberSeparator: function (x) {

        x = Math.round(x);

        x = x.toString();
        var afterPoint = '';
        if (x.indexOf('.') > 0)
            afterPoint = x.substring(x.indexOf('.'), x.length);
        x = Math.floor(x);
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;

        return res;

    },

    GetIndex: function (array, element) {
        return array.indexOf(element);
    },

    IsNull: function (element) {
        if (element === null || element === undefined)
            return "";
        return element;
    },

    TwoDigitDateFormat: function (n) {
        var ret = n > 9 ? "" + n : "0" + n;
        //return parseInt(n);
        return ret;
    },

    IsValidEmailAddress: function (emailAddress) {
        //var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return emailIdPattern.test(emailAddress);
    },

    ValidateFullName: function (id) {

        if (/\w+\s+\w+/.test($("#" + id + "").val()))
            return true;
        else
            return false;
    },

    Round: function (val) {
        return Math.round(val);
    },
    IsControlEmpty: function (control) {
        //control = $(control).val().trim();
        control = $(control).val();
        return (control == "" || control == null);
    },
    ValidateEmptyFields: function (controlsToValidate) {
        
        var isValid = true, setFocus = true;
        for (var index = 0; index < controlsToValidate.length; index++) {
            var control = $(controlsToValidate[index]).prop('control');
            var errorMessage = $(controlsToValidate[index]).prop('errorMessage');
            var lblControl = $(controlsToValidate[index]).prop('lblControl');
            if (Common.IsControlEmpty(control)) {
                isValid = false;
                $(lblControl).text(errorMessage);
                if (setFocus) {

                    setFocus = false;
                    if ($(control).is("input"))
                        $(control).focus();
                    else if ($(control).is("select"))
                        $(control).focus().select();
                    else
                        IgCommon.SetIgcomboFocus(control);
                }

            }
            else
                $(lblControl).text("");

        }
        return isValid;
    },
    ValidateEmptyFieldsCollapse: function (controlsToValidate) {
        
        var isValid = true, setFocus = true;
        for (var index = 0; index < controlsToValidate.length; index++) {
            var control = $(controlsToValidate[index]).prop('control');
            var errorMessage = $(controlsToValidate[index]).prop('errorMessage');
            var lblControl = $(controlsToValidate[index]).prop('lblControl');
            if (Common.IsControlEmpty(control)) {
                isValid = false;
                $(lblControl).text(errorMessage);
                if (setFocus) {
                    setFocus = false;

                    var openedBlock = $('.content').children().not('.collapsed-box');
                    $(openedBlock).addClass('collapsed-box');
                    $(openedBlock).find('.box-body').css('display', 'none');
                    var childMinusIcon = $(openedBlock).find('.fa-minus');
                    $(childMinusIcon).removeClass('fa-minus');
                    $(childMinusIcon).addClass('fa-plus');

                    var parentBlock = $(control).closest('.jarviswidget');
                    $(parentBlock).removeClass('collapsed-box');
                    $(parentBlock).find('.box-body').css('display', 'block');
                    var parentPlusIcon = $(parentBlock).find('.fa-plus');
                    $(parentPlusIcon).removeClass('fa-plus');
                    $(parentPlusIcon).addClass('fa-minus');

                    if ($(control).is("input"))
                        $(control).focus();
                    else if ($(control).is("select"))
                        $(control).focus().select();
                    else
                        IgCommon.SetIgcomboFocus(control);
                }

            }
            else
                $(lblControl).text("");

        }
        return isValid;
    },
    DateAdd: function (fn_day, fn_month, fn_year, no, type) {
        var date1 = new Date(fn_year, fn_month - 1, fn_day);
        if (type == 'd' || type == 'D')
            date1.setDate(date1.getDate() + no);
        else if (type == 'm' || type == 'M')
            date1.setMonth(date1.getMonth() + no);
        else
            date1.setYear(date1.getFullYear() + no);

        return date1;
    },
    DateSubstract: function (fn_day, fn_month, fn_year, no, type) {
        var date1 = new Date(fn_year, fn_month - 1, fn_day);

        if (type == 'd' || type == 'D')
            date1.setDate(date1.getDate() - no);
        else if (type == 'm' || type == 'M')
            date1.setMonth(date1.getMonth() - no);
        else
            date1.setYear(date1.getFullYear() - no);

        return date1;
    },

    BlockSpecialCharacters: function (id) {
        var yourInput = $(id).val();
        re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
            var no_spl_char = yourInput.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/, '');
            $(id).val(no_spl_char);
        }
    },

    AjaxPostRequestError: function (requiredFields) {

        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: requiredFields.url,
            headers: requiredFields.header,
            data: JSON.stringify(requiredFields.data),
            dataType: "json",
            success: requiredFields.successFunction,
            error: requiredFields.errorFunction
        });
    },

    AjaxPostRequest: function (action_URL, Data, Successfn) {
        $.ajax({
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            url: action_URL,
            headers: requiredFields.header,
            data: Data,
            dataType: "json",
            success: Successfn,
            error: function (data) {
                console.log(data);
                return data;
            }
        });
    },

    AjaxPostFile: function (requiredFields) {
        
        $.ajax({
            type: "POST",
            url: requiredFields.url,
            headers: requiredFields.header,
            data: requiredFields.data,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: requiredFields.onSuccess,
            error: requiredFields.onError
        });
    },
    ContainsOnlyAphabets: function (control) {
        debugger
        var alphabetsOnlyRegex = /^[ A-Za-z]*$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    ContainsAphabetsWithSpecialChar: function (control) {
        var alphabetsOnlyRegex = /^[A-Za-z & -]*$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    ValidateMobileNumber: function (control) {
        var alphabetsOnlyRegex = /^[0-9]{10,11}$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    ValidateIFSCcode: function (control) {
        
        var alphabetsOnlyRegex = /^[A-Za-z]{4}\d{7}$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    GenerateCheckboxList: function (tableId, data) {
        var row = '<ul class="abc">';
        for (var index = 0; index < data.length; index++) {

            var checkbox = '<input type="checkbox" id=' + data[index].Key + '></input>';
            var label = data[index].Value;

            row += '<li><div class="checkbox">' + checkbox + '<label for=' + data[index].Key + '>' + label + '</label></div></li>';
            //row += '<td>' + label + '</td>';
        }
        row += '</ul>';
        $(tableId).append(row);
    },
    GenerateRadioButtonList: function (tableId, data, name) {

        var apppstring = "", checkitem = false;
        for (var index = 0; index < data.length; index++) {

            if (checkitem) {
                apppstring = apppstring + '<input  type="radio" name=' + name + '  value="' + data[index].Key + '"  id="' + data[index].Key + '">        <label class="control-label" >' + data[index].Value + ' </label>     </input>';
            }
            else {
                checkitem = true;
                apppstring = apppstring + '<input checked="checked"  type="radio" name=' + name + '  value="' + data[index].Key + '"  id="' + data[index].Key + '">        <label class="control-label" >' + data[index].Value + ' </label>     </input>';
            }
        }

        $(tableId).append(apppstring);
    },
    GetSelectedCheckboxIdList: function (tableId) {
        var checkboxCount = $(tableId).find('input');
        var checkedElementsIds = [];
        for (var index = 0; index < checkboxCount.length; index++) {
            var marker = $($(checkboxCount[index]));

            if ($(marker).is(':checked'))
                checkedElementsIds.push($(marker).attr('id'));
        }
        return (checkedElementsIds);
    },
    CheckPanNo: function (id) {

        var panNo = $('#' + id).val();

        if (panNo != "") {

            var panNoValue = panNo;

            var panPat = /^([A-Z]{5})(\d{4})([A-Z]{1})$/;
            if (panNoValue.search(panPat) == -1) {
                //alert("Invalid Pan No");
                //$('#' + id).val("");
                //$('#' + id).focus();
                return false;
            }
        }
    },
    CheckGSTNo: function (id) {

        var GSTNo = $('#' + id).val();

        if (GSTNo != "") {

            var GSTNoValue = GSTNo;
            //  var panPat = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
            var GSTNoPat = /^([0-9]){2}([A-Z]){5}([0-9]){4}([A-Z]){1}([0-9]){1}([A-Z]){1}([A-Z0-9]){1}?$/;
            if (GSTNo.search(GSTNoPat) == -1) {
                //alert("Invalid GST No");
                //$('#' + id).val("");
                //$('#' + id).focus();
                return false;
            }
        }
    },
    CheckTANNo: function (value) {
        
        if (value != "") {

            var TANNoValue = value;
            //var panPat = /^([A-Z]){4}?$/;
            var TANNoValuePat = /^([A-Z]){4}([0-9]){5}([A-Z]){1}?$/;
            if (TANNoValue.search(TANNoValuePat) == -1) {
                return false;
            }
        }
    },
    CheckARNno: function (value) {

        if (value != "") {

            var ARNnoValue = value;
            //var panPat = /^([A-Z]){4}?$/;
            var ARNnoPat = /^([A-Z]){2}([0-9]){13}?$/;
            if (ARNnoValue.search(ARNnoPat) == -1) {
                return false;
            }
        }
    },
    CheckAadharCardNo: function (control) {
        var alphabetsOnlyRegex = /^([0-9]){12}?$/;
        if ($(control).val() != "")
            return alphabetsOnlyRegex.test($(control).val());
        else
            return true;
    },
    TextandNumberonly: function (event) {

        var theEvent = event || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /^[A-Z0-9 ]*$/;

        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    },
    AutocompleteText: function (requiredFields) {
        $(requiredFields.controlId).autocomplete({
            source: requiredFields.source,
            select: requiredFields.select
        });
    },
    InitializeDatePicker: function (requiredFields) {
        $(requiredFields.control).datepicker({
            dateFormat: requiredFields.format == null ? 'dd-mm-yy' : requiredFields.format,
            changeMonth: requiredFields.changeMonth == null ? true : requiredFields.changeMonth,
            changeYear: requiredFields.changeYear == null ? true : requiredFields.changeYear,
            maxDate: requiredFields.maxDate,
            minDate: requiredFields.minDate,
            yearRange: requiredFields.yearRange,
            onSelect: requiredFields.onSelect
        });
    },
    SetDatePickerValue: function (id, value) {
        $(id).datepicker("setDate", value);
    },
    DdlChangeTrigger: function (controlDdl, value) {
        $(controlDdl).val(value).trigger('input');
    },
    OnChangeListener: function (control, errorMessage, labelControl) {
        $(control).on('input', function () {

            if (Common.IsControlEmpty(control))
                $(labelControl).text(errorMessage);
            else
                $(labelControl).text('');
        });
    },
    AttachChangeListener: function (controlsToValidate) {

        for (var index = 0; index < controlsToValidate.length; index++) {
            var control = $(controlsToValidate[index]).prop('control');
            var errorMessage = $(controlsToValidate[index]).prop('errorMessage');
            var labelControl = $(controlsToValidate[index]).prop('lblControl');

            Common.OnChangeListener(control, errorMessage, labelControl);
        }
    },
    RemoveListener: function (controls) {

        for (var index = 0; index < controls.length; index++) {
            var control = $(controls[index]).prop('control');
            //$(control).off();
            $(control).unbind('input');
            //var errorMessage = $(controlsToValidate[index]).prop('errorMessage');
            var labelControl = $(controls[index]).prop('lblControl');
            $(labelControl).text('');
            //Common.OnChangeListener(control, errorMessage, labelControl);
        }
    },

    AddDeleteItem: function (arry, item, status) {

        if (status == 'A' || status == 'a') {

            for (var i = 0; i < item.length; i++) {
                arry.push(item[i]);
            }
            return arry;
        }
        else {
            return arry.filter(function (e) {
                return e !== item;
            });
        }
    },

    AddDeleteMultipleItem: function (arry, item, status) {
        if (status == 'A' || status == 'a') {
            for (var i = 0; i < item.length; i++) {
                arry.push(item[i]);
            }
            return arry;
        }
        else {
            return arry.filter(function (val) {
                return item.indexOf(val) == -1;
            });
        }
    },
    ValidateAlphaNumeric: function (control) {

        var alphabetsOnlyRegex = /^[a-zA-Z0-9&]*$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    ValidateAlphaNumericWithMinLength: function (control) {

        var alphabetsOnlyRegex = /^([a-zA-Z0-9_-]){5,}$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    ValidateAccountNumber: function (control) {

        var alphabetsOnlyRegex = /^\d{11,}$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    ValidateNumberWithTwoDecimal: function (control) {

        var alphabetsOnlyRegex = /^[1-9]\d*(\.\d+)?$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    ValidatePanNo: function (control) {

        var alphabetsOnlyRegex = /^([A-Z]{5})(\d{4})([A-Z]{1})$/;
        if ($(control).val() != "")
            return alphabetsOnlyRegex.test($(control).val());
        else
            return true;

    },
    ValidateEmail: function (control) {

        return emailIdPattern.test($(control).val());
    },
    ContactNumberWithSpecialChar: function (control) {

        var alphabetsOnlyRegex = /^\+?[0-9]{6,}$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    FaxNumber: function (control) {

        var alphabetsOnlyRegex = /^\d{5,}$/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    ContainsOnlyNumber: function (control) {
        
        var alphabetsOnlyRegex = /^[0-9]*$/;
        if ($(control).val() != "")
            return alphabetsOnlyRegex.test($(control).val());
        else
            return true;
    },
    ValidateContainsOnlyAphabets(controlsToValidate) {
        
        var isValid = true;

        for (var i = 0; i < controlsToValidate.length; i++) {

            var control = $(controlsToValidate[i]).prop('control');
            var lblControl = $(controlsToValidate[i]).prop('lblControl');
            var errorMessage = $(controlsToValidate[i]).prop('errorMessage');

            if (!Common.ContainsOnlyAphabets(control)) {
                $(lblControl).text(errorMessage);
                isValid = false;
            }
            else
                $(lblControl).text("");
        }
        return isValid;
    },
    ValidateAphabetsWithSpecialChar(controlsToValidate) {
        
        var isValid = true;

        for (var i = 0; i < controlsToValidate.length; i++) {

            var control = $(controlsToValidate[i]).prop('control');
            var lblControl = $(controlsToValidate[i]).prop('lblControl');
            var errorMessage = $(controlsToValidate[i]).prop('errorMessage');

            if (!Common.ContainsAphabetsWithSpecialChar(control)) {
                $(lblControl).text(errorMessage);
                isValid = false;
            }
            else
                $(lblControl).text("");
        }
        return isValid;
    },
    ValidatePincodeTextboxCharacter(controlsToValidate) {

        var isValid = true;

        for (var i = 0; i < controlsToValidate.length; i++) {

            var control = $(controlsToValidate[i]).prop('control');
            var countryId = $(controlsToValidate[i]).prop('countryId');
            var lblControl = $(controlsToValidate[i]).prop('lblControl');

            var pincountry = countryId;

            if ($(control).val() != '') {

                if (pincountry == Enum.Country.India) {
                    if (!Common.ContainsOnlyNumber(control)) {
                        $(lblControl).text('Invalid pincode');
                        isValid = false;
                    } else {
                        $(lblControl).text('');
                    }
                }
                else {
                    if (!Common.ValidateAlphaNumeric(control)) {

                        $(lblControl).text('Invalid pincode');
                        isValid = false;
                    } else {
                        $(lblControl).text('');
                    }
                }
            }
        }
        return isValid;
    },
    ValidateEmails(controlsToValidate) {


        var isValid = true;

        for (var i = 0; i < controlsToValidate.length; i++) {

            var control = $(controlsToValidate[i]).prop('control');
            var lblControl = $(controlsToValidate[i]).prop('lblControl');
            if ($(control).val() != '') {

                if (!Common.IsValidEmailAddress($(control).val())) {
                    $(lblControl).text('Invalid Email address');
                    isValid = false;
                }
                else {
                    $(lblControl).text('');

                }
            }
        }
        return isValid;
    },
    ValidateMobile(controlsToValidate) {

        var isValid = true;

        for (var i = 0; i < controlsToValidate.length; i++) {

            var control = $(controlsToValidate[i]).prop('control');
            var lblControl = $(controlsToValidate[i]).prop('lblControl');
            if ($(control).val() != '') {
                if (!Common.ContactNumberWithSpecialChar(control)) {
                    $(lblControl).text('Invalid mobile number');
                    isValid = false;
                }
                else {
                    $(lblControl).text('');
                }
            }
        }
        return isValid;
    },
    ValidateAlphaNumericFields(controlsToValidate) {


        var isValid = true;

        for (var i = 0; i < controlsToValidate.length; i++) {

            var control = $(controlsToValidate[i]).prop('control');
            var msg = $(controlsToValidate[i]).prop('errorMessage');
            var lblControl = $(controlsToValidate[i]).prop('lblControl');
            if ($(control).val() != "") {
                if (!Common.ValidateAlphaNumeric(control)) {
                    $(lblControl).text(msg);
                    isValid = false;
                } else {
                    $(lblControl).text('');
                }
            }
        }
        return isValid;
    },
    ValidatePanNos(controlsToValidate) {


        var isValid = true;

        for (var i = 0; i < controlsToValidate.length; i++) {

            var controlPan = $(controlsToValidate[i]).prop('controlPan');
            var controlGst = $(controlsToValidate[i]).prop('controlGst');
            var lblControl = $(controlsToValidate[i]).prop('lblControl');

            if ($("#" + controlPan).val() != "") {

                if (Common.CheckPanNo(controlPan) == false) {
                    $(lblControl).text("Invalid PAN Number");
                    isValid = false;
                }
                else {
                    if ($(controlGst).val() != '') {
                        if ($(controlGst).val().substring(2, 12) != $("#" + controlPan).val()) {
                            $(lblControl).text("PAN should be match with GST no");
                            isValid = false;
                        }
                        else {
                            $(lblControl).text('');
                        }
                    }
                }

            } else {
                $(lblControl).text('');
            }
        }
        return isValid;
    },
    ValidateGstNos(controlsToValidate) {


        var isValid = true;

        for (var i = 0; i < controlsToValidate.length; i++) {

            var controlGst = $(controlsToValidate[i]).prop('controlGst');
            var controlPan = $(controlsToValidate[i]).prop('controlPan');
            var lblPan = $(controlsToValidate[i]).prop('lblPanControl');
            var lblGst = $(controlsToValidate[i]).prop('lblGstControl');
            var lblStateCode = $(controlsToValidate[i]).prop('stateCode');
            var lblstate = $(controlsToValidate[i]).prop('lblStateId');

            if ($("#" + controlGst).val() != "") {

                if (Common.CheckGSTNo(controlGst) == false) {
                    $(lblGst).text("Invalide GST number");
                    isValid = false;
                }
                else {
                    $(lblPan).text("");
                    $(lblGst).text("");
                    $(controlPan).val($("#" + controlGst).val().substring(2, 12));
                    if (lblStateCode != "") {
                        if (lblStateCode != $("#" + controlGst).val().substring(0, 2)) {
                            $(lblGst).text("State code from GST no must be match with state code");
                            isValid = false;
                        } else {
                            $(lblGst).text("");
                            $(lblstate).text('');
                        }
                    } else {
                        $(lblGst).text("");
                        $(controlPan).val('');
                        $("#" + controlGst).val('');
                        $(lblstate).text('Please select state');
                        isValid = false;
                    }
                }
            }
        }
        return isValid;
    },
    ValidateWebsiteURL: function (control) {
        //
        var alphabetsOnlyRegex = /@^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$@i/;
        var containsAlphabets = alphabetsOnlyRegex.test($(control).val());
        return containsAlphabets;
    },
    FormatToTextTypeDate: function (date) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(date);
        var dt = new Date(parseFloat(results[1]));
        var d = new Date(dt),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    },
    FormatToJqueryDatePicker: function (date) {
        var month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    },
    CheckFileExtension: function (uploadFile) {
        
        var allowedFiles = [".doc", ".docx", ".pdf"];
       // var allowedFiles = [".pdf"];
        var fileUpload = uploadFile;

        //var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        var regex = new RegExp("(" + allowedFiles.join('|') + ")$");
        if (!regex.test(fileUpload.toLowerCase())) {

            return false;
        }


        return true;

    },
    GetFileExtension: function (filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
    },

    HideMultipleControl: function (controls) {
        for (var index = 0; index < controls.length; index++)
            $(controls[index]).hide();

    },
    ShowMultipleControl: function (controls) {
        for (var index = 0; index < controls.length; index++)
            $(controls[index]).show();

    },
    DisableMultipleControl: function (controls) {
        for (var index = 0; index < controls.length; index++)
            $(controls[index]).prop("disabled", true);

    },
    GetFormatedDate: function (val) {
        
        var result = DatePattern.exec(val);
        if (result != null)
            var fmtDate = new Date(parseFloat(result[1]));
        return fmtDate;

    },
    AgeCalculate: function (val) {
        

        var currentYear = new Date().getFullYear();
        var birthdate = new Date(val).getFullYear();
        var age = currentYear - birthdate;
        return age;


    },
    RetirmentDate: function (val) {
        
        var retirmentdate = new Date(val);

        retirmentdate.setFullYear(retirmentdate.getFullYear() + 58);

        var year = retirmentdate.getFullYear();
        var month = retirmentdate.getMonth();
        var day = retirmentdate.getDay();

        return day + '-' + month + '-' + year;
    },
    GetDate: function (controlId) {
        return $(controlId).datepicker("getDate");
    },
    GetLongDate: function (controlId) {
        var date = $(controlId).val().split('-');
        return date[0] + '-' + Common.GetMonth(date[1]) + '-' + date[2]
    },
    SetmaxLength: function (controlerId, length) {
        $(controlerId).attr("maxlength", length);
    },
    CheckLength: function (controlerId, length, errorMsg, errorLabel) {
        

        if ($(controlerId).val() != '') {
            if ($(controlerId).val().length < length) {
                $(controlerId).val('');
                $(errorLabel).text(errorMsg);
            }
            else {
                $(errorLabel).text('');
            }
        }



    },
    ConvertDate: function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-');
    },
    SessionExpired: function (message) {
        swal(message, '', 'info').then(function () { location.href = '/User/Login' });
    },
    SessionExpiredResponse: function (response) {
        
        if (!response.Success) {
            swal(response.ErrorMessage, '', 'error');
            window.location.href = url;
        }
    },
    GetJqueryFormatedDate: function (val) {
        return $.format.date(val, "dd-MM-yyyy");
    },
    AjaxError: function (response) {
        debugger;
        $('.loader-bg').hide();

        if (response.Unauthorized) {
            swal(response.ErrorMessage, '', 'info');
        }
        else {
            swal('Something Went wrong!', '', 'error');
        }     
        console.log(response.message)
    },
    GetMonth: function (num) {
        var monthName = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        return monthName[num - 1];
    },

}