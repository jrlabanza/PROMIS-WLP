$(document).on("click", "#save", function (e) {
    e.preventDefault();
    var lotNo = $("#lotNo").attr("data-temp-lot-no");
    Update_Machine(lotNo);
});

$(document).on("click", "#track_in", function (e) {
    e.preventDefault();
    var track = "TRACK IN";
    var carrier_tape_lot_no = $('#carrier_tape_lot_no').val();
    var cover_tape_lot_no = $('#cover_tape_lot_no').val();
    var lotNo = $("#lotNo").val();
    if (carrier_tape_lot_no == "") {
        alert('PLEASE INPUT CARRIER TAPE DESCRIPTION!');
    }
    if (cover_tape_lot_no == "") {
        alert('PLEASE INPUT COVER TAPE LOT#!');
    }
    else {
        $.post(
            base_url + "promis/check_track_by_lot",
            {
                "lotNo": lotNo
            },
            function (lot) {
                if ((lot.track_in == 1 && lot.track_out == 0) && (lot.machine != machineID)) { //lot id checking
                    alert("LOT ID IN USE ON ANOTHER MACHINE, PLEASE TRY AGAIN");
                }
                else {
                    if (lot.track_in == 1 && lot.track_out == 1) {//lot id duplication check
                        alert("LOT ID ALREADY TRACKED OUT. CANNOT BE TRACKED IN AGAIN");
                    }
                    else {
                        if ((lot.track_in == 1 && lot.track_out == 0) && stsOwner == "SETUP") {//cannot setup during track in
                            alert("CANNOT SETUP WHEN TRACKED IN!");
                        }
                        else {
                            $.post(
                            base_url + "promis/carrier_tape_check",
                            {
                                "carrier_tape_lot_no": carrier_tape_lot_no
                            },
                            function (carrier_tape_check) {
                                console.log(carrier_tape_check);

                                if (carrier_tape_check["carrier_tape_validation"] == "CARRIER TAPE IS VALID") {
                                    Update_Machine(lotNo, track);
                                }
                                else if (carrier_tape_check["carrier_tape_validation"] == "CARRIER TAPE IS INVALID") {
                                    alert("CARRIER TAPE IS INVALID");
                                }
                                else {
                                    alert("INVALID RESULTS, CHECK QUERY");
                                }

                            });

                        }
                    }
                }
            });

    }


});

$(document).on("click", "#track_out", function (e) {
    e.preventDefault();
    var track = "TRACK OUT";
    var carrier_tape_lot_no = $('#carrier_tape_lot_no').val();
    var cover_tape_lot_no = $('#cover_tape_lot_no').val();
    var prev_carrier_tape_lot_no = $('#carrier_tape_lot_no').attr("placeholder");
    var prev_cover_tape_lot_no = $('#cover_tape_lot_no').attr("placeholder");
    var lotNo = $("#lotNo").val();
    if (carrier_tape_lot_no == "" || cover_tape_lot_no == "") {
        if (carrier_tape_lot_no == "" && cover_tape_lot_no != "") {
            alert('PLEASE INPUT CARRIER TAPE DESCRIPTION!');
        }
        else if (cover_tape_lot_no == "" && carrier_tape_lot_no != "") {
            alert('PLEASE INPUT COVER TAPE LOT#!');
        }
        else {
            alert('PLEASE INPUT CARRIER TAPE DESCRIPTION/COVER TAPE LOT#!');
        }
    }
    else {
        if (prev_carrier_tape_lot_no != carrier_tape_lot_no) {

            //alert("\tCARRIER TAPE \t\nOUT: " + carrier_tape_lot_no + " vs IN: " + prev_carrier_tape_lot_no + " \n\tDOES NOT MATCH");

            $('.alertModalMessage').html("CARRIER TAPE<br> OUT: " + carrier_tape_lot_no + " vs IN: " + prev_carrier_tape_lot_no + "<br>DOES NOT MATCH");
            $('#alertModal').modal('show');
            $('.alertModal').click(function () {
                $('#alertModal').modal('hide');
            });
        }
        else if (prev_cover_tape_lot_no != cover_tape_lot_no) {
            //alert("\tCOVER TAPE \t\nOUT: "+ cover_tape_lot_no + " vs  IN: " + prev_cover_tape_lot_no + " \n\tDOES NOT MATCH");

            $('.alertModalMessage').html("COVER TAPE<br> OUT: " + cover_tape_lot_no + " vs IN: " + prev_cover_tape_lot_no + "<br>DOES NOT MATCH");
            $('#alertModal').modal('show');
            $('.alertModal').click(function () {
                $('#alertModal').modal('hide');
            });
        }
        else {
            Update_Machine(lotNo,track);
        }
    }
});

//$(document).on("click", "#track_in", function ()
//{

//    if ($("#lotNo").val() == "" || $("#lotNo").val() == "N/A") {
//        alert('Please Input LOT NO.');
//    }
//    else
//    {
//        $('input.track').val('TRACK IN');
//        $('#track_in').attr('disabled', true);
//        $('.failure_mech').hide();
//        $('.part_specification').hide();
//        $('.lsg_repair_type').hide();
//        $(".good_units").hide();
//        $(".total_ng_units_results").hide();
//        $(".unpicked_device").hide();
//        $(".marking_surface").hide();
//        $(".bump_leads").hide();
//        $(".missing").hide();
//        $(".lsg_sample").hide();
//        $(".vi5_sample").hide();

//    }
//});

//$(document).on("click", "#track_out", function () {

//    $('input.track').val('TRACK OUT');
//    $('#track_out').attr('disabled', true);
//    $(".failure_mechanism").hide();
//    $(".part_specification").hide();
//    $(".lsg_repair_type").hide();
//    $(".package_line").hide();
//    $(".status_owner").hide();
//    $(".status").hide();
//    $(".lot_no").hide();
//    $(".family_name").hide();
//    $(".wafer_id").hide();
//});

function Update_Machine(lotNo,track) {
    var dateTime = new Date($.now());
    var date = Date.parse(dateTime);
    var date1 = date.toString('dd-MMM-yyyy HH:mm:ss');
    var date2 = date.toString('yyyyMMddHHmmss');
    var date3 = date.toString('M/d/yyyy HH:mm');
    var machineID = $("#machineID").val();
    var machinePF = $("#machinePlatform").val();
    var stsOwner = $("option:selected", "#stsOwner").text(); 
    var stsDes = $("option:selected", "#stsDes").text();
    var prodName = $("option:selected", "#prodName").text();
    var pkgLine_temp = $("option:selected", "#pkgLine").text();
    var pkgLine = pkgLine_temp.trim();
    var waferID = $("#waferID").val();
    var failure_mechanism = $("option:selected", "#failure_mech").text();
    var part_specification = $("#part_spec").val();
    var lsg_repair_type = $("option:selected", "#lsg_repair_type").text();
    var uph = $("option:selected", "#uph_select").text();
    var pkgType = $("option:selected", "#pkgType").text();
    var pbft_min = $("#pbft_min").val();
    var pbft_max = $("#pbft_max").val();
    var bin1 = $("#bin1").val();
    var total_ng_units_results = $("#total_ng_units_results").val();
    var unpicked_device = $("#unpicked_device").val();
    var marking_surface = $("#marking_surface").val();
    var bump_leads = $("#bump_leads").val();
    var missing = $("#bump_leads").val();
    var lsg_sample = $("#lsg_sample").val();
    var vi5_sample = $("#vi5_sample").val();
    var group = $("option:selected", "#group").text();
    var user = $("option:selected", "#user").text();
    var temp_remarks = $("#remarks").val();
    var remarks = temp_remarks.trim();
    var pass = $("#pass").val();
    var swi_mode = $('option:selected', '#swi_mode').text();
    var swi = $('#swi').val();
    var carrier_tape_lot_no = $('#carrier_tape_lot_no').val();
    var cover_tape_lot_no = $('#cover_tape_lot_no').val();

    if ((carrier_tape_lot_no == "" || cover_tape_lot_no == "") && ($('#carrier_tape_lot_no').attr("placeholder") != "" || $('#cover_tape_lot_no').attr("placeholder") != "")) {
        carrier_tape_lot_no = $('#carrier_tape_lot_no').attr("placeholder");
        cover_tape_lot_no = $('#cover_tape_lot_no').attr("placeholder");
    }
    var material_id = $(".inputTxt").val();
    var setup_flg = $(".setup_flg").val();
    //var track = $(".track").val();
    if (track == "TRACK IN") {
        var track_in = 1;
        var track_out = 0;
    }
    else if (track == "TRACK OUT") {
        var track_in = 1;
        var track_out = 1;
        stsDes = "IDLE";
    }

    if ($("#lotNo").val() == "" || $("#lotNo").val() == "N/A") {//lot verifcation
        alert("PLEASE INPUT LOT NO.");
    }
    else {

        if ($("#pbft_min").val() == 0 && $("#pbft_max").val() == 0 && setup_flg == 1 && stsDes == "RUNNING PRODUCTION") {//pbft required after setup to running production
            alert("PLEASE INPUT PBFT");
        }
        else {

            if (stsDes == "SETUP CONVERSION" || stsDes == "NEW SETUP") {//set flag if going to setup
                setup_flg = 1;
            }

            if ((pbft_min < 10 || pbft_max > 70) && setup_flg == 1 && stsDes == "RUNNING PRODUCTION") {//pbft limitation checking
                alert("INVALID PBFT VALUES PLEASE CONTACT: SUPPORT");
            }

            else {
                if (setup_flg == 1 && stsDes == "RUNNING PRODUCTION") { //setup->runningproduction
                    setup_flg = 0;
                }
                $.post(
                   base_url + "promis/hash_test",
                   {
                       "pass": pass
                   },
                   function (password) {
                       $.post(
                            base_url + "promis/check_user",
                            {
                                "user": user,
                                "pass": password
                            },
                            function (access) {

                                var WLP_DATA_UPDATE = {
                                    "machineID": machineID,
                                    "machinePF": machinePF,
                                    "stsOwner": stsOwner,
                                    "stsDes": stsDes,
                                    "prodName": prodName,
                                    "lotNo": lotNo,
                                    "uph": uph,
                                    "pkgType": pkgType,
                                    "remarks": remarks,
                                    "group": group,
                                    "user": user,
                                    "date1": date1,
                                    "date2": date2,
                                    "date3": date3,
                                    "waferID": waferID,
                                    "failure_mechanism": failure_mechanism,
                                    "part_specification": part_specification,
                                    "lsg_repair_type": lsg_repair_type,
                                    "pbft_min": pbft_min,
                                    "pbft_max": pbft_max,
                                    "total_ng_units_result": total_ng_units_results,
                                    "bin1": bin1,
                                    "unpicked_device": unpicked_device,
                                    "marking_surface": marking_surface,
                                    "bump_leads": bump_leads,
                                    "missing": missing,
                                    "lsg_sample": lsg_sample,
                                    "vi5_sample": vi5_sample,
                                    "pkgLine": pkgLine,
                                    "swi_mode": swi_mode,
                                    "swi": swi,
                                    "carrier_tape_lot_no": carrier_tape_lot_no,
                                    "cover_tape_lot_no": cover_tape_lot_no,
                                    //"process": process,
                                    "track_in": track_in,
                                    "track_out": track_out,
                                    "setup_flg": setup_flg
                                }


                                if (access.email_address != null) {

                                    $.post(
                                        base_url + "promis/update_machine",
                                        WLP_DATA_UPDATE,
                                        function (data) {
                                            $.post(
                                                base_url + "promis/update_machine_history",
                                                WLP_DATA_UPDATE,
                                                function (history) {
                                                    if (track == "TRACK IN" || track == "TRACK OUT") {
                                                        $.post(
                                                             base_url + "promis/track_lot",
                                                             WLP_DATA_UPDATE,
                                                             function (track) {
                                                                 console.log('trackable');
                                                                 window.location.reload();
                                                             }
                                                         )
                                                    }
                                                    else {
                                                        console.log('no track');
                                                        window.location.reload();
                                                    }
                                                }
                                            )
                                        }
                                    );
                                }
                                else {
                                    alert('Invalid Credentials, Please Try Again');
                                }
                            }
                        )
                   }
                )
            }
        }
    }
}