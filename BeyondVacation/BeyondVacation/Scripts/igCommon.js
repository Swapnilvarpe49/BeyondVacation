var igFeatures = [
    //{
    //    name: "Sorting",
    //    type: "local",
    //    persist: true
    //},
    {
        name: 'Selection',
        mode: 'row',
        multipleSelection: true,
        activation: true
    }
];

var igFeaturePaging = {
    name: 'Paging',
    type: "local",
    pageSize: 15
};

var IgCommon = {
    validateCharactersOnly: { pattern: /^[A-Za-z]{1,25}$/, onblur: true, onchange: true },
    validateNumbersOnly: { pattern: /^[0-9]*$/, onblur: true, onchange: true },
    validateMobileNo: { pattern: /^[6789]\d{9}$/, onblur: true, onchange: true },
    featureFiltering: { name: "Filtering", allowFiltering: true, caseSensitive: false },
    featureIgRow: { name: 'Updating', enableAddRow: false, enableDeleteRow: false },
    featuresAddNewRow: { name: 'Updating', enableAddRow: true, enableDeleteRow: true },
    featuresDropdown: { name: 'Updating', enableAddRow: true, enableDeleteRow: true, columnSettings: null },

    featuresCheckbox1: {
        name: 'RowSelectors',
        enableCheckBoxes: true,
        enableSelectAllForPaging: true,
        enableRowNumbering: false,
        checkBoxStateChanging: function (evt, ui) { isFiredFromCheckbox = true; }
    },
    featureCheckbox2: {
        name: 'Selection',
        multipleSelection: true,
        rowSelectionChanged: null,
        mode: 'cell',
        activation: true,
        multipleCellSelectOnClick: true,
        rowSelectionChanging: function (evt, ui) { if (isFiredFromCheckbox) { isFiredFromCheckbox = false; } else { return false; } }
    },
    featuresCheckboxForSingleSelection1: {
        name: 'RowSelectors',
        enableCheckBoxes: true,
        enableSelectAllForPaging: true,
        enableRowNumbering: false,
        checkBoxStateChanging: null
    },
    featuresCheckboxForSingleSelection2: {
        name: 'Selection',
        multipleSelection: false,
        rowSelectionChanged: null,
        mode: 'row',
        activation: true,
        multipleCellSelectOnClick: false,
        rowSelectionChanging: null
    },
    
    featuresRowselection1: {
        name: 'RowSelectors',
        enableSelectAllForPaging: true,
        enableRowNumbering: false
       
    },
    featuresRowselection2: {
        name: 'Selection',
        multipleSelection: false,
        rowSelectionChanged: null,
        mode: 'row',
        activation: true,
        multipleCellSelectOnClick: false
        
    },
    featuresRowselectiontest: {
        name: 'RowSelectors'
        //multipleSelection: false,
        //rowSelectorClicked: function (evt, ui) {
        //    alert('calling')
        //}
        //mode: 'row',
        //activation: true,
        //multipleCellSelectOnClick: false

    },
    
    BindDropdownIgCombo: function (requiredFields) {
        $(requiredFields.control).igCombo({
            dataSource: requiredFields.data,
            textKey: requiredFields.textKey,
            valueKey: requiredFields.valueKey,
            initialSelectedItems: [{ value: requiredFields.initialValue }],
            selectionChanged: requiredFields.selectionChanged,
            dropDownOnFocus: true,
            disabled: requiredFields.disabled, 
            multiSelection: requiredFields.multiSelection
        });
    },

    BindCheckboxDropdownIgCombo: function (control, data, initialValue, selectionChanging) {
        var initialValueArray = [];
        for (var index = 0; index < initialValue.length; index++) {
            var obj = {
                value: initialValue[index]
            }
            initialValueArray.push(obj);
        }
        $(control).igCombo({
            dataSource: data,
            textKey: "NAME",
            valueKey: "ID",
            multiSelection: {
                enabled: true,
                showCheckboxes: true
            },
            dropDownOnFocus: true,
            initialSelectedItems: initialValueArray,
            selectionChanging: selectionChanging
        });
    },

    IsItemSelectedIgCombo: function (ui) {
        return (ui.items && ui.items[0]);
    },

    GetSelectedIdIgCombo: function (ui) {
        
        if (IgCommon.IsItemSelected(ui))
            return ui.items[0].data.Key;
        else
            return '';
    },

    GetSelectedValueIgCombo: function (ui) {
        if (IgCommon.IsItemSelected(ui))
            return ui.items[0].data.Value;
        else
            return '';
    },
    IsItemSelected: function (ui) {
        return (ui.items && ui.items[0]);
    },
    DisableDropDownIgCombo: function (control) {
        $(control).igCombo("option", "disabled", true);
    },

    DisableMultipleDropDownIgCombo: function (controls) {
        for (var index = 0; index < controls.length; index++)
            $(controls[index]).igCombo("option", "disabled", true);
    },

    EnableDropDownIgCombo: function (control) {
        $(control).igCombo("option", "disabled", false);
        //$(control).igCombo("option", "mode", "editable");
    },

    EnableMultipleDropDownIgCombo: function (controls) {
        for (var index = 0; index < controls.length; index++)
            $(controls[index]).igCombo("option", "disabled", false);
    },

    GetDropdownInitialValueIgCombo: function (control, initialId) {
        var item = $(control).igCombo('itemsFromValue', initialId);
        return item.data.Value;
    },
    SetInitialValueIgCombo: function (control, value) {
        $(control).igCombo('value', value);
    },

    BindGridIgGrid: function (requiredFields) {
        if (requiredFields.features != null)
            requiredFields.features.push(igFeaturePaging);
        $(requiredFields.control).igGrid({
            autoGenerateColumns: requiredFields.autoGenerateColumns == null ? false : requiredFields.autoGenerateColumns,
            renderCheckboxes: requiredFields.enableCheckBox == null ? false : requiredFields.enableCheckBox,
            columns: requiredFields.columns,
            autoCommit: true,
            dataSource: requiredFields.data,
            width: requiredFields.width == null ? '500px' : requiredFields.width,
            features: requiredFields.features == null ? igFeatures : requiredFields.features,
            primaryKey: requiredFields.primaryKey,
            rowsRendered: requiredFields.rowsRendered
        });
    },

    GetGridSelectedRowIgGrid: function (igGridId, selectedId) {
        var dataRows = $(igGridId).igGrid("dataSourceObject");
        return $.grep(dataRows, function (e) { return e.ID === selectedId; });
    },

    SetGridInitialData: function(gridId, data) {
        $(gridId).igGrid('option', 'dataSource', data);
        $(gridId).igGrid("dataBind");
    },

    BindHierarchicalGridIgGrid: function (requiredFields) {
        if (requiredFields.features != null)
            requiredFields.features.push(igFeaturePaging);
        $(requiredFields.control).igHierarchicalGrid({
            autoGenerateColumns: requiredFields.autoGenerateColumns == null ? false : requiredFields.autoGenerateColumns,
            dataSource: requiredFields.data,
            autoCommit: true,
            initialDataBindDepth: requiredFields.depth,
            autoGenerateLayouts: requiredFields.autoGenerateLayouts,
            initialExpandDepth: requiredFields.initialExpandDepth,
            columns: requiredFields.columns,
            columnLayouts: requiredFields.innerGrid,
            width: requiredFields.width == null ? '500px' : requiredFields.width,
            primaryKey: requiredFields.primaryKey,
            features: requiredFields.features == null ? igFeatures : requiredFields.features,
            renderCheckboxes: requiredFields.enableCheckBox == null ? false : requiredFields.enableCheckBox
        });
    },
    GetAddedRecords: function(igGridId) {
        return  $(igGridId).data().igGrid.dataSource._transactionLog;
    },
    GetAllGridRows: function(gridId) {
        //return $(gridId).igGrid("option", "dataSource");

        var allRows = $(gridId).data("igGrid").dataSource._data; //$(gridId).igGrid("option", "dataSource");
        if (allRows != null)
            return allRows;
        else {
            var dataSource = $(gridId).data("igGrid").dataSource;
            var newRecordsList = [];
            for (var index = 0; index < dataSource._accumulatedTransactionLog.length; index++)
                newRecordsList.push(dataSource._accumulatedTransactionLog[index].row);

            return newRecordsList;
            //var existingRows = $(gridId).igGrid("option", "dataSource");
            //allRows = existingRows.concat(newRecordsList);
            //return allRows;
        }
        
        //return $(gridId).data("igGrid").dataSource.allTransactions();
    },
    DeselectAll: function(control) {
        
        $(control).igCombo("deselectAll", "{}", true);
    },
    ClearIgSelectedValue: function(control) {
        $(control).igCombo('value', '');
        $(control).val('');
    },
    GridCommit: function(gridId) {
        $(gridId).igGrid("commit");
    },
    BindCascadeIgCombo: function (control, DataSource) {
        control = "#" + control
        
        $(control).igCombo("deselectAll", "{}", true);
        $(control).igCombo("option", "dataSource", DataSource);
        $(control).igCombo("dataBind");

    },
    SetIgcomboFocus: function (control) {
        $(control).igCombo("textInput").focus()
    },
    SetIgDateEditorDisabled: function(control) {
        $(control).igDateEditor("option", "disabled", true);
    },
    SetIgDateEditorEnabled: function (control) {
        $(control).igDateEditor("option", "disabled", false);
    },
    GridRowsTotalCount: function (control) {
        return $(control).igGrid("totalRecordsCount");
    },
    GridRowsDeletedData: function (ui) {
        return  ui.element[0].dataset;
    },
    
}