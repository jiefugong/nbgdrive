define([
    'jquery',
    'base/js/utils',
    'base/js/namespace'
], function (
    $, utils, Jupyter
) {
    function createDisplayDiv() {
        $('#maintoolbar-container').append(
            $('<div>').attr('id', 'nbgdrive-display')
                      .addClass('btn-group')
                      .addClass('pull-right')
            .append(
                $('<input>').attr('id', 'nbgdrive-authentication')
                           .attr('type', 'text')
            ).append(
                $('<button>').attr('id', 'nbgdrive-button')
                             .text('Submit')
                             .click(function() {
                                // TODO: Change this button click to make a JS post request with 
                                // the information in the input bar

                                // Grey out this field or remove these items if we have already been authenticated
                                var gdrive_auth_id = $("#nbgdrive-authentication").val();
                                $.post(utils.get_body_data('baseUrl') + 'gauth', {message: gdrive_auth_id}, function(data) {
                                    console.log(data);
                                });
                             })
            )
        );
    }

    function autosyncDriveFiles() {
        // TODO: 
        // replace $.getJSON with a regular get request to the driveSync URL
        // so that we don't have to handle the data.
        $.getJSON(utils.get_body_data('baseUrl') + 'gsync', function(data) {
            var display = String(data['status']);
            console.log ("Received JSON: " + display);
        });
    }

    function checkAutosyncTime() {
        console.log ("Checking the current date for autosync.");
        var date = new Date();
        if (date.getHours() === 3  && date.getMinutes() === 0) {
            autosyncDriveFiles();
        }
    }

    /* For the Google Authentication

    * 1. Create an input text field and a button
    * 2. Button takes the text from the field and needs to call a gdrive function
    * 3. Not really sure how to pass in the field from form into gdrive function
        seems like they all have to be stateless? 
    * 4. Assuming information is passed in, can verify now.

    1. Create a server side function that will run gdrive about and store the string
    as JSON somewhere (we will cut the result to get the URL to visit)
    2. Extract the URL to visit on the client side and alert it to the user
    3. Create input field w/ button, assume user will post the correct input and 
    send that as JSON to the server
    4. Server then extracts the JSON and echoes that into gdrive about in order to authorize. */


    var load_ipython_extension = function () {
        /* TODO: Check to see if the user has been authenticated. If not, create the display for key submission. */

        /* Creates the input text and button for Drive authentication. */
        createDisplayDiv();
        
        /* Triggers the directory to be created a single time. Assumes that authentication
           has succeeded by now. */
        $.getJSON(utils.get_body_data('baseUrl') + 'gdrive', function(data) {
            var display = String(data['status']);
            console.log ("Received JSON: " + display);
        });

        $.getJSON(utils.get_body_data('baseURL') + 'gauth', function(data) {
            var display = String(data['hello']);
            console.log ("Received: " + display);
        });

        /* Create a function that checks the time every minute, autosyncs when 3 AM. */
        setInterval(checkAutosyncTime, 1000 * 60);

        var action = {
            icon: 'fa-cloud', // a font-awesome class used on buttons, etc
            help    : 'Manually syncs the home directory with Google Drive',
            help_index : 'zz',
            handler : autosyncDriveFiles
        }

        var prefix = 'gsync_extension';
        var action_name = 'show-alert';

        var full_action_name = Jupyter.actions.register(action, name, prefix); // returns 'my_extension:show-alert'
        Jupyter.toolbar.add_buttons_group([full_action_name]);        
    };

    return {
        load_ipython_extension: load_ipython_extension,
    };
});
