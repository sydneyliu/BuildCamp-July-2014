$(function() {
    var client = new WindowsAzure.MobileServiceClient("https://ideapilems.azure-mobile.net/", "DuKsKkjiWPNhyyAgpyWuAFkTarwhpY18"),
        ideatable = client.getTable('ideapileDB');

    //// Handle insert
    //$('#add-item').submit(function(evt) {
    //    var ideabox = $('#idea'),//'#new-item-text'),
    //        ideaText = ideabox.val(),
    //        namebox = $('#name'),
    //        nameText = namebox.val(),
    //        emailbox = $('#email'),
    //        emailText = emailbox.val(),
    //        notebox = $('#notes'),
    //        noteText = notebox.val();
    //    if (ideaText !== '') {
    //        ideatable.insert({ idea: ideaText, name: nameText, email: emailText, note: noteText})
    //    }
    //    evt.preventDefault();
    //});
    $('#submit-button').click(function (evt) {
        var ideabox = $('#idea'),//'#new-item-text'),
            ideaText = ideabox.val(),
            namebox = $('#name'),
            nameText = namebox.val(),
            emailbox = $('#email'),
            emailText = emailbox.val(),
            notebox = $('#notes'),
            noteText = notebox.val();
        if (ideaText !== '') {
            ideatable.insert({ idea: ideaText, name: nameText, email: emailText, note: noteText });
        }
        evt.preventDefault();
<<<<<<< HEAD
    });
=======
    }
    );

    
>>>>>>> 28c5554bdeac02cf18dc58cf360c2dd34da33f8f
});