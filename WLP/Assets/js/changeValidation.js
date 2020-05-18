//status owner
$(document).on("change", "#stsOwner", function () {

    var stsOwner = $("#stsOwner").val();
    var machineID = $("#machineID").val();
    var lotNo = $("#lotNo").val();

    $('option').remove('.status');

    $.post(
        base_url + "promis/get_status",
        {
            "stsOwner": stsOwner
        },
        function (data) {

            var StatusDesc = '';
            //stsDes
            StatusDesc += "<option class='status' value=''></option>";
            $.each(data, function (i, status) {
                StatusDesc += "<option class='status' value='" + status.description + "'>" + status.description + "</option>";
            });

            $("#stsDes").append(StatusDesc);

        }

    );

    $.post(
    base_url + "promis/check_track_by_machine",
    {
        "machineID": machineID,
    },
    function (track_by_machine) {
        $.post(

        base_url + "promis/check_track_by_lot",
        {
            "lotNo": lotNo,
        },
        function (track_by_lot) {
            var status_owner_track = $("#status_owner_track").val();
            var status_track = $("#status_track").val();
            var machine = $("#machineID").val();

            //Dynamic Filter

            if (status_track == "LSG REPAIR") {// LSG repair release to ptroduction

                if ($("#stsOwner").val() == "PRODUCTION") {
                    $("#pkgLine").prop('disabled', true);
                    //$(".status_owner").hide();
                    //$(".status").hide();
                    $("#lotNo").prop('disabled', true);
                    $("#prodName").prop('disabled', true);
                    $("#waferID").prop('disabled', true);
                    $("#bin1").prop('disabled', true);
                    $("#total_ng_units_results").prop('disabled', true);
                    $("#unpicked_device").prop('disabled', true);
                    $("#marking_surface").prop('disabled', true);
                    $("#bump_leads").prop('disabled', true);
                    $("#missing").prop('disabled', true);
                    $("#lsg_sample").prop('disabled', true);
                    $("#vi5_sample").prop('disabled', true);

                }
            }

            if (status_owner_track == "SETUP") // setup relase to production
            {
                if (status_track == "SETUP CONVERSION" || status_track == "NEW SETUP") {
                    if ($("#stsOwner").val() == "PRODUCTION") {
                        $("#bin1").prop('disabled', true);
                        $("#total_ng_units_results").prop('disabled', true);
                        $("#unpicked_device").prop('disabled', true);
                        $("#marking_surface").prop('disabled', true);
                        $("#bump_leads").prop('disabled', true);
                        $("#missing").prop('disabled', true);
                        $("#lsg_sample").prop('disabled', true);
                        $("#vi5_sample").prop('disabled', true);
                        $("#pbft_min").val(0);
                        $("#pbft_max").val(0);
                    }
                    if (status_track != "SETUP CONVERSION" || status_track != "NEW SETUP") {
                        $("#pbft_min").val(0);
                        $("#pbft_max").val(0);
                    }

                }
                else {
                    if ($("#stsOwner").val() == "PRODUCTION") {
                        $("#bin1").prop('disabled', true);
                        $("#total_ng_units_results").prop('disabled', true);
                        $("#unpicked_device").prop('disabled', true);
                        $("#marking_surface").prop('disabled', true);
                        $("#bump_leads").prop('disabled', true);
                        $("#missing").prop('disabled', true);
                        $("#lsg_sample").prop('disabled', true);
                        $("#vi5_sample").prop('disabled', true);

                    }
                }

            }

            if (status_owner_track == "PRODUCTION") { //Production to setup-lsg-wait-handler-pm-wait
                if ($("#stsDes").val() == "LSG WAIT" || $("#stsDes").val() == "HANDLER PM" || $("#stsDes").val() == "HANDLER WAIT" || $("#stsOwner").val() == "SETUP") {
                    $("#lotNo").prop('disabled', true);
                    $("#prodName").prop('disabled', true);
                    $("#waferID").prop('disabled', true);
                    $("#failure_mech").prop('disabled', true);
                    $("#part_spec").prop('disabled', true);
                    $("#lsg_repair_type").prop('disabled', true);
                    $("#pkgType").prop('disabled', true);
                }
            }

            if (status_track == "HANDLER PM") // handler pm release to production
            {

                if ($("#stsOwner").val() == "PRODUCTION") {
                    $(".package_line").hide();
                    //$(".status_owner").hide();
                    //$(".status").hide();
                    $("#lotNo").prop('disabled', true);
                    $("#prodName").prop('disabled', true);
                    $("#waferID").prop('disabled', true);
                    $("#bin1").prop('disabled', true);
                    $("#total_ng_units_results").prop('disabled', true);
                    $("#unpicked_device").prop('disabled', true);
                    $("#marking_surface").prop('disabled', true);
                    $("#bump_leads").prop('disabled', true);
                    $("#missing").prop('disabled', true);
                    $("#lsg_sample").prop('disabled', true);
                    $("#vi5_sample").prop('disabled', true);

                }
            }
            //final check
            if ($("#stsOwner").val() != "PRODUCTION") {
                $('#track_in').hide();
                $('#track_out').hide();
            }

        });
    });
});

$(document).on("change", "#stsDes", function () {

    var machineID = $("#machineID").val();
    var stsOwner = $("#stsOwner").val();
    var machineID = $("#machineID").val();
    var lotNo = $("#lotNo").val();
    var status_owner_track = $("#status_owner_track").val();
    var status_track = $("#status_track").val();
    var machine = $("#machineID").val();

    $.post(
    base_url + "promis/check_track_by_machine",
    {
        "machineID": machineID,
    },
    function (track_by_machine) {
        $.post(

        base_url + "promis/check_track_by_lot",
        {
            "lotNo": lotNo,
        },
        function (track_by_lot) {
            //track data
            if ((track_by_machine.track_in == 1 && track_by_machine.track_out == 0) || (track_by_machine.track_in == 1 && track_by_machine.track_out == 0)) { // track check using machine ID
                //machine still tracked
                if ($("#stsDes").val() == "RUNNING PRODUCTION") {
                    console.log('this');
                    $('#track_in').hide();
                    if (track_by_lot.machine == machine) {
                        $('#track_out').show();
                        $('#track_in').hide();

                        $('#bin1').prop('disabled', false);
                        $("#total_ng_units_results").prop('disabled', false);
                        $("#unpicked_device").prop('disabled', false);
                        $("#marking_surface").prop('disabled', false);
                        $("#bump_leads").prop('disabled', false);
                        $("#missing").prop('disabled', false);
                        $("#swi").prop('disabled', false);
                    }
                    else {
                        $('#track_out').hide();
                    }

                    $('.track').attr('value', '');
                    //carrier/cover value checker

                    $('#carrier_tape_lot_no').val("");
                    $('#cover_tape_lot_no').val("");
                }
                else {

                    var carrier_tape = $('#carrier_tape_lot_no').attr("placeholder");
                    var cover_tape = $('#cover_tape_lot_no').attr("placeholder");

                    $('#carrier_tape_lot_no').val(carrier_tape);
                    $('#cover_tape_lot_no').val(cover_tape);
                    $('#track_in').hide();
                    $('#track_out').hide();

                    $('#bin1').prop('disabled', true);
                    $("#total_ng_units_results").prop('disabled', true);
                    $("#unpicked_device").prop('disabled', true);
                    $("#marking_surface").prop('disabled', true);
                    $("#bump_leads").prop('disabled', true);
                    $("#missing").prop('disabled', true);
                    $("#swi").prop('disabled', true);
                }
            }
            else if ((track_by_lot.track_in == 1 && track_by_lot.track_out == 0) || (track_by_lot.track_in == 1 && track_by_lot.track_out == 0)) {
                //lot still tracked in

                if ($("#stsDes").val() == "RUNNING PRODUCTION") {
                    $('#track_in').hide();
                    if (track_by_lot.machine == machine) {
                        $('#track_out').show();
                        $('#track_in').hide();
                    }
                    else {
                        $('#track_out').hide();
                    }
                    $('.track').attr('value', '');
                }

                else {
                    var carrier_tape = $('#carrier_tape_lot_no').attr("placeholder");
                    var cover_tape = $('#cover_tape_lot_no').attr("placeholder");

                    $('#carrier_tape_lot_no').val(carrier_tape);
                    $('#cover_tape_lot_no').val(cover_tape);
                    $('#track_in').hide();
                    $('#track_out').hide();

                    $('#bin1').prop('disabled', true);
                    $("#total_ng_units_results").prop('disabled', true);
                    $("#unpicked_device").prop('disabled', true);
                    $("#marking_surface").prop('disabled', true);
                    $("#bump_leads").prop('disabled', true);
                    $("#missing").prop('disabled', true);
                    $("#swi").prop('disabled', true);
                }
            }

            else if ((track_by_machine.track_in == 1 && track_by_machine.track_out == 1) || (track_by_machine.track_in == null && track_by_machine.track_out == null)) {
                //can track in by machine
                if ($("#stsDes").val() == "RUNNING PRODUCTION"){
                    $('#track_in').show();
                    $('#track_out').hide();
                    $('.track').attr('value', '');

                    $('#bin1').prop('disabled', true);
                    $("#total_ng_units_results").prop('disabled', true);
                    $("#unpicked_device").prop('disabled', true);
                    $("#marking_surface").prop('disabled', true);
                    $("#bump_leads").prop('disabled', true);
                    $("#missing").prop('disabled', true);
                    $("#swi").prop('disabled', true);

                }

                else {
                    $('#track_in').hide();
                    $('#track_out').hide();
                }
            }

            else if ((track_by_lot.track_in == 1 && track_by_lot.track_out == 1) || (track_by_lot.track_in == null && track_by_lot.track_out == null)) {
                //can track in by lot id
                if($("#stsDes").val() == "RUNNING PRODUCTION"){
                    $('#track_in').show();
                    $('#track_out').hide();
                    $('.track').attr('value', '');

                    $('#bin1').prop('disabled', true);
                    $("#total_ng_units_results").prop('disabled', true);
                    $("#unpicked_device").prop('disabled', true);
                    $("#marking_surface").prop('disabled', true);
                    $("#bump_leads").prop('disabled', true);
                    $("#missing").prop('disabled', true);
                    $("#swi").prop('disabled', true);
                }

            }
            else {
                //alert("track available")
                $('#track_in').hide();
                $('#track_out').hide();

                $('#bin1').prop('disabled', true);
                $("#total_ng_units_results").prop('disabled', true);
                $("#unpicked_device").prop('disabled', true);
                $("#marking_surface").prop('disabled', true);
                $("#bump_leads").prop('disabled', true);
                $("#missing").prop('disabled', true);
                $("#swi").prop('disabled', true);
            }
        });
    });
});

$(document).on("change", "#prodName", function () {

    $('option').remove('.pkgType');
    $('option').remove('.uph');
    var id = $(this).val();
    var machineID = $("#machineID").val();
    var machinePlatform = $('#machinePlatform').val();
    //alert('FAMILY NAME:' + id);
    //alert(machineID);
    //alert(machinePlatform);
    $('option').remove('.stat');

    $.post(
         base_url + "promis/get_package_data",
         {
             "id": id
         },
         function (data) {
             display = "<option class='pkgType' value='" + data.Pkg_Type + "'>" + data.Pkg_Type + "</option>"
             $("#pkgType").append(display);
             //stsDes
         }
     );

    //$.post(
    //    base_url + "promis/get_uph_check",
    //    {
    //        "handlerPF": machinePlatform,
    //        "family": id
    //    },
    //    function (data) {
    //        $("#uph_select").append("<option class='uph' value='" + data.uph + "'>" + data.uph + "</option>;");
    //    }
    //);
    $.post(
         base_url + "promis/get_uph",
         {
             "machinePF": machinePlatform,
             "family": id,

         },
         function (data) {
             if (data.uph == null) {
                 $("#uph_select").append("<option class='uph' value='0'>0</option>;");
             }
             else {
                 $("#uph_select").append("<option class='uph' value='" + data.uph + "'>" + data.uph + "</option>;");
             }

             //
         }

     );
});

$(document).on("change", "#lotNo", function () {
    if ($("#lotNo").val() == "" || $("#lotNo").val() == "N/A") {
        $('#track_in').prop('disabled', true);
    }

});