$(document).on("click", "#wlpID", function () {
    
    var DataId = $(this).attr("data-machine-id");
    $('#myModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    })
    showData(DataId);

});

function showData(DataId) {
    
    $.post( //on ready
        base_url + "promis/show_data",
        {
            "id": DataId
        },
        function (data) {

            $.post(
                base_url + "promis/check_track_by_machine",
                {
                    "machineID": data.Tester_ID,
                },
                function (track_by_machine) {
                    $.post(

                    base_url + "promis/check_track_by_lot",
                    {
                        "lotNo": data.Lot_Name,
                    },
                    function (track_by_lot) {

                        var status_owner_track = $("#status_owner_track").val();
                        var status_track = $("#status_track").val();
                        var machine = $("#machineID").val();
                        $("#carrier_tape_lot_no").val(data.carrier_tape_lot_no).prop("placeholder", data.carrier_tape_lot_no);;
                        $("#cover_tape_lot_no").val(data.cover_tape_lot_no).prop("placeholder", data.cover_tape_lot_no);
                        $(".setup_flg").val(data.setup_flg);

                        
                        //track data
                        if ((track_by_machine.track_in == 1 && track_by_machine.track_out == 0)) { // track check using machine ID
                            //MACHINE STILL TRACKED IN
                            console.log('machine tracked in');
                            if ($("#stsOwner").val() == "PRODUCTION" && $("#stsDes").val() == "RUNNING PRODUCTION") {
                                $('#track_in').hide();
                                $("#lotNo").prop('disabled', true);
                               
                                //$('#carrier_tape_lot_no').prop('disabled', true);
                                //$('#cover_tape_lot_no').prop('disabled', true);
                                //$('#pbft_min').prop('disabled', true);
                                //$('#pbft_max').prop('disabled', true);

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

                                    $('#carrier_tape_lot_no').val("");
                                    $('#cover_tape_lot_no').val("");
                                }
                                else {
                                    $('#track_out').hide();
                                }

                                $('.track').attr('value', '');
                            }

                            else {

                                console.log('0');
                                $('#track_in').hide();
                                $('#track_out').hide();
                                $("#lotNo").prop('disabled', true);
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
                        else if ((track_by_lot.track_in == 1 && track_by_lot.track_out == 0) || (track_by_lot.track_in == 1 && track_by_lot.track_out == 0)){
                            //LOT STILL TRACKED IN
                            console.log('lot tracked in');
                            if($("#stsOwner").val() == "PRODUCTION" && $("#stsDes").val() == "RUNNING PRODUCTION"){
                                $('#track_in').hide();
                                $("#carrier_tape_lot_no").prop("placeholder", "");
                                $("#cover_tape_lot_no").prop("placeholder", "");
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
                                $('#track_in').hide();
                                $('#track_out').hide();
                            }
                        }

                        else if ((track_by_machine.track_in == 1 && track_by_machine.track_out == 1) || (track_by_machine.track_in == null && track_by_machine.track_out == null)) {
                            //CAN TRACK IN BY MACHINE
                            console.log('can track in by machine');
                            if ($("#stsOwner").val() == "PRODUCTION" && $("#stsDes").val() == "RUNNING PRODUCTION") {

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

                                $("#carrier_tape_lot_no").prop("placeholder", "");
                                $("#cover_tape_lot_no").prop("placeholder", "");
                            }
                            else
                            {
                                $('#track_in').hide();
                                $('#track_out').hide();
                            }

                        }

                        else if ((track_by_lot.track_in == 1 && track_by_lot.track_out == 1) || (track_by_lot.track_in == null && track_by_lot.track_out == null)) {
                            //CAN TRACK IN BY LOT ID
                            console.log('can track in by lot id');
                            if ($("#stsOwner").val() == "PRODUCTION" && $("#stsDes").val() == "RUNNING PRODUCTION") {
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

                                $("#carrier_tape_lot_no").prop("placeholder", "");
                                $("#cover_tape_lot_no").prop("placeholder", "");
                            }

                            else {
                                $('#track_in').hide();
                                $('#track_out').hide();
                            }
                        }

                        else {
                            //TRACK AVAILABLE
                            console.log('track available');
                            $('#track_in').hide();
                            $('#track_out').hide();
                            $("#carrier_tape_lot_no").prop("placeholder", "");
                            $("#cover_tape_lot_no").prop("placeholder", "");
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

                var handlerID = data.Handler_ID;
                var family = data.Device;
                var pkgType = data.pkg_type;
                var StatusOwner = ''; //status owner
                var pkgLine = '';
                $("#lotNo").attr("data-temp-lot-no", data.Lot_Name);
                $("#date").val(data.File_DateTime);
                $("#pbft_min").val(data.pbft_min);
                $("#pbft_max").val(data.pbft_max);
                $("#machineID").val(data.Tester_ID);
                $("#swi").val(data.swi);
                $("#swi_mode").val(data.swi_mode);
                $("#pkgLine").append("<option class = 'pkgLine to_remove' value = " + data.Prod_Line + "> " + data.Prod_Line + "</option>");
                $.post(
                    base_url + "promis/get_prod_line",
                    function (data) {
                        var prod_line = '';
                        $.each(data, function (i, prdl) {

                            if (data.ProdLine == $("#pkgLine").val()) {

                            }
                            else {
                                prod_line += "<option class = 'pkgLine to_remove' value = " + prdl.ProdLine + "> " + prdl.ProdLine + "</option>"
                            }
                        });

                        $("#pkgLine").append(prod_line);
                    }
                );
                
                $.post(
                    base_url + "promis/get_handler_mode",
                    {
                        "handlerID": handlerID
                    },
                    function (data) {

                        $('#machinePlatform').val(data.equipt_model);
                        //alert(data.equipt_model);
                        $.post(
                            base_url + "promis/get_uph",
                            {
                                "machinePF": data.equipt_model,
                                "family": family,
                            },
                            function (data) {

                                if (data.uph == null) {
                                    $("#uph_select").append("<option class='uph to_remove' value='0'>0</option>;");
                                }
                                else {
                                    $("#uph_select").append("<option class='uph to_remove' value='" + data.uph + "'>" + data.uph + "</option>;");
                                }

                                //
                            }
                        );
                    }
                );

                StatusOwner += "<option class= 'stat_Owner to_remove' value='" + data.Status_Owner + "'>" + data.Status_Owner + "</option>";

                $.post(
                    base_url + "promis/get_status_owner",
                    function (stsO) {

                        $.each(stsO, function (i, StsOwner) {
                            if (StsOwner.owner == data.Status_Owner)//if the array data found a match it will only leave a black
                            {
                            }
                            else {
                                StatusOwner += "<option class= 'stat_Owner to_remove' value='" + StsOwner.owner + "'>" + StsOwner.owner + "</option>";
                            }

                        });
                        $("#stsOwner").append(StatusOwner);
                    }
                );

                var stat = ''; //status
                stat += "<option class='status' value='" + data.Status_Desc + "'>" + data.Status_Desc + "</option>";
                $('#status_track').val(data.Status_Desc);
                $('#status_owner_track').val(data.Status_Owner);
                var stsOwner = data.Status_Owner;

                $.post(
                    base_url + "promis/get_status",
                    {
                        "stsOwner": stsOwner
                    },
                    function (stsOwner) {
                        $.each(stsOwner, function (i, desc) {

                            if (desc.description == data.Status_Desc) {
                            }
                            else {
                                stat += "<option class='status' value='" + desc.description + "'>" + desc.description + "</option>";
                            }

                        });

                        $("#stsDes").append(stat);

                    }

                );

                var show_device = ''; //family

                show_device += "<option class='fam to_remove' value='" + data.Device + "'>" + data.Device + "</option>";

                $.post(
                    base_url + "promis/get_device",

                    function (device) {
                        $.each(device, function (i, family) {

                            if (family.family == data.Device) {
                            }
                            else {
                                show_device += "<option class='status to_remove' value='" + family.family + "'>" + family.family + "</option>";
                            }

                        });
                        $("#prodName").append(show_device);
                    }
                )

                $("#lotNo").val(data.Lot_Name); // lot no
                $("#waferID").val(data.waferID);
                $("#failure_mech").val(data.failure_mechanism);
                $("#part_spec").val(data.part_specification);
                //$(".process").val(data.process);
                
                var pkg_type = '' // pkg type
                pkg_type = "<option class='pkgType to_remove' value='" + data.pkg_type + "'>" + data.pkg_type + "</option>"
                $("#pkgType").append(pkg_type);
                $.post(
                    base_url + "promis/get_user",
                    function (usr) {
                        var users = '';
                       
                        $.each(usr, function (i, username) {

                            users += "<option class='user' value='" + username.email_address + "'>" + username.email_address + "</option>";
                            
                        });
                        $("#user").append(users);
                        $("#user").val(data.Who);
                    }
                );
                
                //track in track out conditioning

                //$.post(
                //    base_url + "promis/check_lot",
                //    {
                //        "machineID": data.Tester_ID,
                //        "lotNo": data.Lot_Name
                //    },
                //    function (lot)
                //    {
                //        if (lot.track_in == 1 && lot.track_out == 0)
                //        {
                //            $(".good_units").hide();
                //            $(".total_ng_units_results").hide();
                //            $(".unpicked_device").hide();
                //            $(".marking_surface").hide();
                //            $(".bump_leads").hide();
                //            $(".missing").hide();
                //            $(".lsg_sample").hide();
                //            $(".vi5_sample").hide();
                //            $(".failure_mechanism").hide();
                //            $(".part_specification").hide();
                //            $(".lsg_repair_type").hide();
                //            $('#track_in').attr('disabled', true);
                //        }
                //    }
                //);
            }
        );
    }

$(document).on("click", "button.close", function () {
    //$('option').remove('.fam');
    //$('option').remove('.stat_Owner');
    //$('option').remove('.status');
    //$('option').remove('.pkgType');
    //$('option').remove('.pkgLine');
    //$('option').remove('.uph');
    $(".to_remove").remove();

    //$('#track_in').prop('disabled', false);
    //$('#track_out').prop('disabled', false);
    //$('#lotNo').prop('disabled', false);
    //$("#bin1").prop('disabled', false);
    //$("#total_ng_units_results").prop('disabled', false);
    //$("#unpicked_device").prop('disabled', false);
    //$("#marking_surface").prop('disabled', false);
    //$("#bump_leads").prop('disabled', false);
    //$("#missing").prop('disabled', false);
    //$("#lsg_sample").prop('disabled', false);
    //$("#vi5_sample").prop('disabled', false);
    //$("#failure_mech").prop('disabled', false);
    //$("#part_spec").prop('disabled', false);
    //$("#lsg_repair_type").prop('disabled', false);
    //$("#pkgLine").prop('disabled', false);
    //$("#stsOwner").prop('disabled', false);
    //$("#stsDes").prop('disabled', false);

    //$("#prodName").prop('disabled', false);
    //$("#waferID").prop('disabled', false);
    $(".to_disable").prop('disabled', false);
    $("#track_in").show();
    $("#track_out").show();
    $('#lotNo').attr('readonly', false);
    $('.track').attr('value', '');
});