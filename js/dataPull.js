console.log("refreshing1");
$(function () {

    var client = new WindowsAzure.MobileServiceClient("https://ideapilems.azure-mobile.net/", "DuKsKkjiWPNhyyAgpyWuAFkTarwhpY18"),
        ideatable = client.getTable('ideapileDB');
        console.log("refreshing1");
        function refreshideaTable() {
            console.log("refreshing");
        var query = ideatable.where({  });
        query.read().then(function (ideas) {
            var listItems = $.map(ideas, function (item) {
                return $('<li>')
                    .attr('data-todoitem-id', item.id)
                    //.append($('<button class="item-delete">Delete</button>'))
                    .append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
                    .append($('<div>').append($('<p>').text(item.idea)));
            });

            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + ideas.length + '</strong> item(s)');
        }, handleError);
        console.log("refreshing1");
    }

    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }

    function getIdeaPileId(formElement) {
        return $(formElement).closest('li').attr('data-ideapileDB-id');
    }
    // Handle update
    $(document.body).on('change', '.item-text', function () {
        var newText = $(this).val();
        ideatable.update({ id: getIdeaPileId(this), text: newText }).then(null, handleError);
    });

    $(document.body).on('change', '.item-complete', function () {
        var isComplete = $(this).prop('checked');
        ideatable.update({ id: getIdeaPileId(this), complete: isComplete }).then(refreshideaTable, handleError);
    });

    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        ideatable.del({ id: getIdeaPileId(this) }).then(refreshideaTable, handleError);
    });

    // On initial load, start by fetching the current data
    refreshideaTable();

});



//Below is the class example we had.
/*$(function () {
    var client = new WindowsAzure.MobileServiceClient('https://sydneymobileservice.azure-mobile.net/', 'RNgsOkuITiaoZoQngpuHnOxehkfUTx68'),
        todoItemTable = client.getTable('todoitem');

    // Read current data and rebuild UI.
    // If you plan to generate complex UIs like this, consider using a JavaScript templating library.
    function refreshTodoItems() {
        var query = todoItemTable.where({ complete: false });

        query.read().then(function (todoItems) {
            var listItems = $.map(todoItems, function (item) {
                return $('<li>')
                    .attr('data-todoitem-id', item.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
                    .append($('<div>').append($('<input class="item-text">').val(item.text)));
            });

            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
        }, handleError);
    }

    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }

    function getTodoItemId(formElement) {
        return $(formElement).closest('li').attr('data-todoitem-id');
    }

    // Handle insert
    $('#add-item').submit(function (evt) {
        var textbox = $('#new-item-text'),
            itemText = textbox.val();
        if (itemText !== '') {
            todoItemTable.insert({ text: itemText, complete: false, priority: 5 }).then(refreshTodoItems, handleError);
        }
        textbox.val('').focus();
        evt.preventDefault();
    });

    // Handle update
    $(document.body).on('change', '.item-text', function () {
        var newText = $(this).val();
        todoItemTable.update({ id: getTodoItemId(this), text: newText }).then(null, handleError);
    });

    $(document.body).on('change', '.item-complete', function () {
        var isComplete = $(this).prop('checked');
        todoItemTable.update({ id: getTodoItemId(this), complete: isComplete }).then(refreshTodoItems, handleError);
    });

    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems, handleError);
    });

    // On initial load, start by fetching the current data
    refreshTodoItems();
});
*/