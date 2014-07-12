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
                return $('<tr>')
                    .attr('data-todoitem-id', item.id)
                    //.append($('<button class="item-delete">Delete</button>'))
                    .append($('<td>').append($('<p>').text(item.idea)))
                    .append($('<td>').append($('<p>').text(item.name)))
                //.append($('<td>').append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete)))
                ;
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
    setInterval(refreshideaTable,2500);

});